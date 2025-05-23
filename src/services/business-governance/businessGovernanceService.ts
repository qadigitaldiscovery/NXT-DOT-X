import { BusinessRule, RuleContext, RuleEvaluationResult, RuleApplicationLogData } from '../../types/business-governance';
// Assume supabase client is imported or initialized globally
// For this task, you can mock or assume a simple client connection:
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// Placeholder for supabase client for now.
// In a real application, this would be properly initialized and perhaps injected.
import { createClient, SupabaseClient, PostgrestError } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

let supabase: SupabaseClient;

if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn("Supabase URL or Anon Key not set. Using mock Supabase client.");

    const mockQueryBuilder = () => {
        const chainableMethods: any = {
            eq: function (column: string, value: any) {
                return this;
            },
            or: function (conditions: string) {
                return this;
            },
            order: function (column: string, options: { ascending: boolean }) {
                return this;
            },
            select: function (columns?: string) {
                return this;
            },
            single: () => Promise.resolve({ data: null, error: null as PostgrestError | null }),
            maybeSingle: () => Promise.resolve({ data: null, error: null as PostgrestError | null }),
            limit: (count: number) => this,
            then: (callback: (result: { data: any[]; error: PostgrestError | null }) => any) => Promise.resolve({ data: [], error: null as PostgrestError | null }).then(callback)
        };
        return chainableMethods;
    };

    supabase = {
        from: (tableName: string) => ({
            insert: (data: any) => ({
                select: () => ({
                    single: () => Promise.resolve({ data: { ...data, id: 'mock-id-' + Math.random().toString(36).substring(7), created_at: new Date().toISOString(), updated_at: new Date().toISOString() }, error: null as PostgrestError | null })
                })
            }),
            select: (columns?: string) => mockQueryBuilder(),
            update: (data: any) => ({
                eq: (column: string, value: any) => ({
                    select: () => ({
                        single: () => Promise.resolve({ data: null, error: null as PostgrestError | null })
                    })
                })
            }),
            delete: () => ({
                eq: (column: string, value: any) => Promise.resolve({ data: null, error: null as PostgrestError | null })
            })
        })
    } as unknown as SupabaseClient;
} else {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}


export class BusinessGovernanceService {
    private tableName: string = 'business_rules';

    async createRule(ruleData: Omit<BusinessRule, 'id' | 'created_at' | 'updated_at'>): Promise<BusinessRule> {
        const { data, error } = await supabase.from(this.tableName)
            .insert(ruleData)
            .select()
            .single();

        if (error) {
            console.error('Error creating business rule:', error);
            throw new Error(`Failed to create business rule: ${error.message}`);
        }
        return data as BusinessRule;
    }

    async getRule(id: string): Promise<BusinessRule | null> {
        const { data, error } = await supabase.from(this.tableName)
            .select('*')
            .eq('id', id)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
            console.error(`Error fetching business rule with ID ${id}:`, error);
            throw new Error(`Failed to fetch business rule: ${error.message}`);
        }
        return data as BusinessRule | null;
    }

    async updateRule(id: string, updates: Partial<Omit<BusinessRule, 'id' | 'created_at' | 'updated_at'>>): Promise<BusinessRule | null> {
        const { data, error } = await supabase.from(this.tableName)
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error(`Error updating business rule with ID ${id}:`, error);
            throw new Error(`Failed to update business rule: ${error.message}`);
        }
        return data as BusinessRule | null;
    }

    async deleteRule(id: string): Promise<void> {
        const { error } = await supabase.from(this.tableName)
            .delete()
            .eq('id', id);

        if (error) {
            console.error(`Error deleting business rule with ID ${id}:`, error);
            throw new Error(`Failed to delete business rule: ${error.message}`);
        }
    }

    async getApplicableRules(moduleId: string, triggerEvent: string): Promise<BusinessRule[]> {
        const { data, error } = await supabase.from(this.tableName)
            .select('*')
            .eq('is_active', true)
            .eq('application_method', triggerEvent)
            .or(`scope.eq.global,applicable_modules.cs.{${moduleId}}`); // Filter by global or module-specific

        if (error) {
            console.error(`Error fetching applicable rules for module ${moduleId}, event ${triggerEvent}:`, error);
            throw new Error(`Failed to fetch applicable rules: ${error.message}`);
        }
        return data as BusinessRule[];
    }

    async getAllRules(): Promise<BusinessRule[]> {
        const { data, error } = await supabase.from(this.tableName)
            .select('*')
            .order('name', { ascending: true }); // Order by name for consistency

        if (error) {
            console.error('Error fetching all business rules:', error);
            throw new Error(`Failed to fetch all business rules: ${error.message}`);
        }
        return data as BusinessRule[];
    }
    async evaluateRule(ruleId: string, context: RuleContext): Promise<RuleEvaluationResult> {
        const rule = await this.getRule(ruleId);

        if (!rule || !rule.is_active) {
            return {
                ruleId,
                success: false,
                message: `Rule with ID ${ruleId} not found or is inactive.`
            };
        }

        try {
            if (!rule.rule_definition || !rule.rule_definition.condition || !Array.isArray(rule.rule_definition.condition)) {
                return {
                    ruleId: rule.id,
                    success: false,
                    message: `Rule "${rule.name}" has an invalid or missing rule_definition condition.`
                };
            }

            const conditions = rule.rule_definition.condition;
            let allConditionsMet = true;
            const failedConditions: string[] = [];

            for (const condition of conditions) {
                const payloadValue = context.payload?.[condition.field];
                let conditionMet = false;

                switch (condition.operator) {
                    case '===':
                        conditionMet = payloadValue === condition.value;
                        break;
                    case '!==':
                        conditionMet = payloadValue !== condition.value;
                        break;
                    case '>':
                        conditionMet = payloadValue > condition.value;
                        break;
                    case '<':
                        conditionMet = payloadValue < condition.value;
                        break;
                    case '>=':
                        conditionMet = payloadValue >= condition.value;
                        break;
                    case '<=':
                        conditionMet = payloadValue <= condition.value;
                        break;
                    // Add more operators as needed
                    default:
                        console.warn(`Unsupported operator encountered: ${condition.operator}`);
                        allConditionsMet = false; // Treat as failure for unsupported operator
                        failedConditions.push(`Unsupported operator: ${condition.operator}`);
                        break;
                }

                if (!conditionMet) {
                    allConditionsMet = false;
                    failedConditions.push(`${condition.field} ${condition.operator} ${condition.value} (Actual: ${payloadValue})`);
                }
            }

            if (allConditionsMet) {
                return {
                    ruleId: rule.id,
                    success: true,
                    message: `Rule "${rule.name}" evaluated successfully. All conditions met.`
                };
            } else {
                return {
                    ruleId: rule.id,
                    success: false,
                    message: `Rule "${rule.name}" failed evaluation. Conditions not met: ${failedConditions.join(', ')}`,
                    data: { failedConditions }
                };
            }

        } catch (error: any) {
            console.error(`Error during evaluation of rule ${ruleId}:`, error);
            return {
                ruleId,
                success: false,
                message: `An internal error occurred during rule evaluation: ${error.message}`
            };
        }
    }

    async logRuleApplication(logData: RuleApplicationLogData): Promise<void> {
        const { error } = await supabase.from('rule_application_logs')
            .insert(logData);

        if (error) {
            console.error('Error logging rule application:', error);
            throw new Error(`Failed to log rule application: ${error.message}`);
        }
    }
}

export const businessGovernanceService = new BusinessGovernanceService();