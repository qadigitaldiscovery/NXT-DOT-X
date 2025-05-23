export interface BusinessRule {
    id: string;
    name: string;
    description?: string;
    rule_definition: any; // Represents JSONB in DB
    type: string;
    scope: string;
    applicable_modules?: string[];
    application_method: string;
    frequency: string;
    is_active: boolean;
    created_at: string; // Or Date
    updated_at: string; // Or Date
}
export interface RuleContext {
    moduleId: string;
    triggerEvent: string;
    payload?: any;
    userId?: string;
    entityId?: string;
    ruleId?: string;
}
export interface RuleEvaluationResult {
    ruleId: string;
    success: boolean;
    message?: string;
    data?: any;
}
export interface RuleApplicationLogData {
    rule_id: string;
    applied_at?: string; // Or Date
    context_data?: any;
    result?: any;
    triggered_actions?: string[];
    entity_id?: string;
    user_id?: string;
    created_at?: string; // Or Date
}