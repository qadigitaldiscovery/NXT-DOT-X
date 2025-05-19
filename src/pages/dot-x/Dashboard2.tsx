import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, Shield, Zap, Brain, BarChart2, Users, Code, Database } from 'lucide-react';
import { toast } from 'sonner';
import { useModules } from '@/context/ModulesContext';

const DotXDashboard2 = () => {
  const { hasAccess } = useModules();

  useEffect(() => {
    // Check module access
    const hasModuleAccess = hasAccess('dot-x', 'dot-x-2');
    if (!hasModuleAccess) {
      toast.error('Access denied', {
        description: 'You do not have access to the DOT-X-2 module'
      });
    }
  }, [hasAccess]);

  return (
    <div className="space-y-8 bg-black-900 p-6 rounded-xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-silver-100 to-silver-300/80 bg-clip-text text-transparent">DOT-X-2 Advanced Command Center</h1>
        <p className="text-silver-300/70">Enhanced version with upgraded AI agents and neural shield protection</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="frosted-card">
          <div className="glossy-overlay" />
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-silver-300/70" />
                <span className="text-silver-100 font-medium">AI Commandos</span>
              </div>
              <Badge variant="outline" className="bg-redmetal-400/10 text-silver-300 border-silver-300/20">
                Active
              </Badge>
            </div>
            <p className="text-silver-300/70 text-sm mt-2">Enhanced AI unit with improved capabilities</p>
          
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-black-800/50 rounded-lg">
                  <span className="text-xs text-silver-300/60">Deployed Agents</span>
                  <span className="text-xl font-bold text-silver-100 tabular-nums">12</span>
                </div>
                <div className="flex flex-col p-3 bg-black-800/50 rounded-lg">
                  <span className="text-xs text-silver-300/60">Operations</span>
                  <span className="text-xl font-bold text-silver-100 tabular-nums">36</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-redmetal-600/30 hover:bg-redmetal-400/40 border-silver-300/20 text-silver-100">
                  <Zap className="h-4 w-4" />
                  Deploy Elite Commando Unit
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="frosted-card">
          <div className="glossy-overlay" />
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-silver-300/70" />
                <span className="text-silver-100 font-medium">Neural Shield V2</span>
              </div>
              <Badge variant="outline" className="bg-redmetal-400/10 text-silver-300 border-silver-300/20">
                Enhanced
              </Badge>
            </div>
            <p className="text-silver-300/70 text-sm mt-2">Next-gen protection system with quantum encryption</p>
          
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-black-800/50 rounded-lg">
                  <span className="text-xs text-silver-300/60">Threat Level</span>
                  <span className="text-xl font-bold text-silver-100">Minimal</span>
                </div>
                <div className="flex flex-col p-3 bg-black-800/50 rounded-lg">
                  <span className="text-xs text-silver-300/60">Blocks</span>
                  <span className="text-xl font-bold text-silver-100 tabular-nums">2,745</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-redmetal-600/30 hover:bg-redmetal-400/40 border-silver-300/20 text-silver-100">
                  <Shield className="h-4 w-4" />
                  Advanced Shield Status
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="frosted-card">
          <div className="glossy-overlay" />
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-silver-300/70" />
                <span className="text-silver-100 font-medium">Command Center 2.0</span>
              </div>
              <Badge variant="outline" className="bg-redmetal-400/10 text-silver-300 border-silver-300/20">
                Upgraded
              </Badge>
            </div>
            <p className="text-silver-300/70 text-sm mt-2">Enhanced control interface with predictive analytics</p>
          
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-black-800/50 rounded-lg">
                  <span className="text-xs text-silver-300/60">Active Missions</span>
                  <span className="text-xl font-bold text-silver-100 tabular-nums">5</span>
                </div>
                <div className="flex flex-col p-3 bg-black-800/50 rounded-lg">
                  <span className="text-xs text-silver-300/60">Success Rate</span>
                  <span className="text-xl font-bold text-silver-100 tabular-nums">99.5%</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-redmetal-600/30 hover:bg-redmetal-400/40 border-silver-300/20 text-silver-100">
                  <Zap className="h-4 w-4" />
                  Enhanced Command Interface
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="frosted-card">
          <div className="glossy-overlay" />
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-silver-300/70" />
                <span className="text-silver-100 font-medium">Elite Operations</span>
              </div>
              <Badge variant="outline" className="bg-redmetal-400/10 text-silver-300 border-silver-300/20">
                Active
              </Badge>
            </div>
            <p className="text-silver-300/70 text-sm mt-2">Advanced team coordination with AI assistance</p>
          
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-black-800/50 rounded-lg">
                  <span className="text-xs text-silver-300/60">Team Members</span>
                  <span className="text-xl font-bold text-silver-100 tabular-nums">16</span>
                </div>
                <div className="flex flex-col p-3 bg-black-800/50 rounded-lg">
                  <span className="text-xs text-silver-300/60">Field Ops</span>
                  <span className="text-xl font-bold text-silver-100 tabular-nums">9</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-redmetal-600/30 hover:bg-redmetal-400/40 border-silver-300/20 text-silver-100">
                  <Users className="h-4 w-4" />
                  Enhanced Team Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="frosted-card">
          <div className="glossy-overlay" />
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-silver-300/70" />
                <span className="text-silver-100 font-medium">Quantum Algorithms</span>
              </div>
              <Badge variant="outline" className="bg-redmetal-400/10 text-silver-300 border-silver-300/20">
                New
              </Badge>
            </div>
            <p className="text-silver-300/70 text-sm mt-2">Next-generation computation and cryptography</p>
          
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-black-800/50 rounded-lg">
                  <span className="text-xs text-silver-300/60">Processing Power</span>
                  <span className="text-xl font-bold text-silver-100 tabular-nums">125 PQbits</span>
                </div>
                <div className="flex flex-col p-3 bg-black-800/50 rounded-lg">
                  <span className="text-xs text-silver-300/60">Algorithms</span>
                  <span className="text-xl font-bold text-silver-100 tabular-nums">17</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-redmetal-600/30 hover:bg-redmetal-400/40 border-silver-300/20 text-silver-100">
                  <Code className="h-4 w-4" />
                  Access Quantum Core
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="frosted-card">
          <div className="glossy-overlay" />
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-silver-300/70" />
                <span className="text-silver-100 font-medium">Hypercore Database</span>
              </div>
              <Badge variant="outline" className="bg-redmetal-400/10 text-silver-300 border-silver-300/20">
                Secure
              </Badge>
            </div>
            <p className="text-silver-300/70 text-sm mt-2">Ultra-secure quantum-resistant data storage</p>
          
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-black-800/50 rounded-lg">
                  <span className="text-xs text-silver-300/60">Storage</span>
                  <span className="text-xl font-bold text-silver-100 tabular-nums">8.5 PB</span>
                </div>
                <div className="flex flex-col p-3 bg-black-800/50 rounded-lg">
                  <span className="text-xs text-silver-300/60">Encryption</span>
                  <span className="text-xl font-bold text-silver-100 tabular-nums">Level 9</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-redmetal-600/30 hover:bg-redmetal-400/40 border-silver-300/20 text-silver-100">
                  <Database className="h-4 w-4" />
                  Access Data Core
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DotXDashboard2;
