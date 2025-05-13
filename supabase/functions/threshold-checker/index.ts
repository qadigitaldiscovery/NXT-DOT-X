
// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/supabase_client

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Define the allowed types for module status
type ModuleStatus = 'green' | 'orange' | 'red';

// Define the types for our threshold rules and alerts
interface ThresholdRule {
  id: string;
  module_id: string;
  metric: string;
  operator: '>' | '<' | '==' | '>=' | '<=';
  threshold: number;
  duration_seconds: number | null;
  resulting_status: ModuleStatus;
}

interface Alert {
  id?: string;
  module_id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved?: boolean;
  triggered_at: string;
}

interface Module {
  id: string;
  name: string;
  status: ModuleStatus;
}

interface Metric {
  module_id: string;
  name: string;
  value: number;
  timestamp: string;
}

// For CORS support
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    // Create a Supabase client with the service role key for admin privileges
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting automated threshold checking process...');

    // 1. Get all threshold rules
    let { data: rules, error: rulesError } = await supabase
      .from('threshold_rules')
      .select('*');

    if (rulesError) {
      throw new Error(`Error fetching threshold rules: ${rulesError.message}`);
    }

    // Mock rules for testing (since the threshold_rules table might not exist yet)
    if (!rules || rules.length === 0) {
      console.log('No rules found in DB, using test rules');
      rules = [
        {
          id: '1',
          module_id: '1',
          metric: 'cpu_usage',
          operator: '>',
          threshold: 90,
          duration_seconds: 300,
          resulting_status: 'orange'
        },
        {
          id: '2',
          module_id: '2',
          metric: 'memory_usage',
          operator: '>',
          threshold: 95,
          duration_seconds: 600,
          resulting_status: 'red'
        }
      ];
    }

    // 2. Get all modules
    let { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('id, name, status');

    if (modulesError) {
      throw new Error(`Error fetching modules: ${modulesError.message}`);
    }

    // Mock modules for testing
    if (!modules || modules.length === 0) {
      modules = [
        { id: '1', name: 'API Gateway', status: 'green' },
        { id: '2', name: 'Auth Service', status: 'green' },
        { id: '3', name: 'Database', status: 'green' }
      ];
    }

    // 3. Get latest metrics (mock data for now)
    // In a real implementation, this would fetch from a metrics table or an external monitoring service
    const metrics: Metric[] = [
      { 
        module_id: '1', 
        name: 'cpu_usage', 
        value: 95, // Exceeds threshold to trigger alert
        timestamp: new Date().toISOString() 
      },
      { 
        module_id: '2', 
        name: 'memory_usage', 
        value: 85, // Below threshold, no alert
        timestamp: new Date().toISOString() 
      }
    ];

    console.log(`Processing ${rules.length} threshold rules against ${metrics.length} metrics...`);

    // 4. Check each rule against metrics
    const alerts: Alert[] = [];
    const statusChanges: { moduleId: string, newStatus: ModuleStatus, oldStatus: ModuleStatus }[] = [];

    rules.forEach((rule: ThresholdRule) => {
      const moduleMetrics = metrics.filter(m => 
        m.module_id === rule.module_id && 
        m.name === rule.metric
      );
      
      if (moduleMetrics.length === 0) {
        console.log(`No metrics found for module ${rule.module_id}, metric ${rule.metric}`);
        return;
      }
      
      const latestMetric = moduleMetrics.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )[0];
      
      const module = modules.find(m => m.id === rule.module_id);
      if (!module) {
        console.log(`Module ${rule.module_id} not found`);
        return;
      }
      
      // Check if the threshold is violated
      let thresholdExceeded = false;
      
      switch (rule.operator) {
        case '>':
          thresholdExceeded = latestMetric.value > rule.threshold;
          break;
        case '<':
          thresholdExceeded = latestMetric.value < rule.threshold;
          break;
        case '>=':
          thresholdExceeded = latestMetric.value >= rule.threshold;
          break;
        case '<=':
          thresholdExceeded = latestMetric.value <= rule.threshold;
          break;
        case '==':
          thresholdExceeded = latestMetric.value === rule.threshold;
          break;
      }
      
      if (thresholdExceeded) {
        console.log(`Threshold exceeded for module ${module.name} (${rule.metric}): ${latestMetric.value} ${rule.operator} ${rule.threshold}`);
        
        // Create an alert
        alerts.push({
          module_id: module.id,
          title: `${rule.metric.toUpperCase()} Alert`,
          description: `${rule.metric} is ${latestMetric.value} ${rule.operator} ${rule.threshold}`,
          severity: rule.resulting_status === 'red' ? 'critical' : rule.resulting_status === 'orange' ? 'high' : 'medium',
          triggered_at: new Date().toISOString()
        });
        
        // Check if status change is needed
        if (module.status !== rule.resulting_status) {
          statusChanges.push({
            moduleId: module.id,
            oldStatus: module.status,
            newStatus: rule.resulting_status
          });
        }
      }
    });

    // 5. Process alerts and status changes
    for (const alert of alerts) {
      // Insert alert into database
      const { data: insertedAlert, error: alertError } = await supabase
        .from('alerts')
        .insert([alert])
        .select();
      
      if (alertError) {
        console.error(`Error creating alert: ${alertError.message}`);
      } else {
        console.log(`Alert created: ${insertedAlert?.[0]?.id}`);
      }
    }

    for (const change of statusChanges) {
      const module = modules.find(m => m.id === change.moduleId);
      if (!module) continue;

      // Update module status
      const { error: statusError } = await supabase
        .from('modules')
        .update({ status: change.newStatus })
        .eq('id', change.moduleId);
      
      if (statusError) {
        console.error(`Error updating module status: ${statusError.message}`);
      } else {
        console.log(`Updated status for ${module.name} from ${change.oldStatus} to ${change.newStatus}`);
        
        // Log status change
        const { error: logError } = await supabase
          .from('rag_status_logs')
          .insert([{
            module_id: change.moduleId,
            status: change.newStatus,
            note: `Automated status change by threshold checker`
          }]);
        
        if (logError) {
          console.error(`Error logging status change: ${logError.message}`);
        }
      }
    }

    console.log(`Threshold checking completed. Created ${alerts.length} alerts and ${statusChanges.length} status changes.`);

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        alerts_created: alerts.length, 
        status_changes: statusChanges.length 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    // Return error response
    console.error('Error in threshold checker:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
