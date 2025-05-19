
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent">DOT-X-2 Advanced Command Center</h1>
        <p className="text-muted-foreground">Enhanced version with upgraded AI agents and neural shield protection</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-900/10 to-purple-900/5">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-indigo-500" />
                <span>AI Commandos</span>
              </CardTitle>
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                Active
              </Badge>
            </div>
            <CardDescription>Enhanced AI unit with improved capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-indigo-950/20 rounded-lg">
                  <span className="text-xs text-indigo-300">Deployed Agents</span>
                  <span className="text-xl font-bold">12</span>
                </div>
                <div className="flex flex-col p-3 bg-indigo-950/20 rounded-lg">
                  <span className="text-xs text-indigo-300">Operations</span>
                  <span className="text-xl font-bold">36</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/30 text-indigo-100">
                  <Zap className="h-4 w-4" />
                  Deploy Elite Commando Unit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-indigo-900/5">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                <span>Neural Shield V2</span>
              </CardTitle>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                Enhanced
              </Badge>
            </div>
            <CardDescription>Next-gen protection system with quantum encryption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-purple-950/20 rounded-lg">
                  <span className="text-xs text-purple-300">Threat Level</span>
                  <span className="text-xl font-bold">Minimal</span>
                </div>
                <div className="flex flex-col p-3 bg-purple-950/20 rounded-lg">
                  <span className="text-xs text-purple-300">Blocks</span>
                  <span className="text-xl font-bold">2,745</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 text-purple-100">
                  <Shield className="h-4 w-4" />
                  Advanced Shield Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-violet-500/20 bg-gradient-to-br from-violet-900/10 to-purple-900/5">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-violet-500" />
                <span>Command Center 2.0</span>
              </CardTitle>
              <Badge variant="outline" className="bg-violet-500/10 text-violet-400 border-violet-500/20">
                Upgraded
              </Badge>
            </div>
            <CardDescription>Enhanced control interface with predictive analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-violet-950/20 rounded-lg">
                  <span className="text-xs text-violet-300">Active Missions</span>
                  <span className="text-xl font-bold">5</span>
                </div>
                <div className="flex flex-col p-3 bg-violet-950/20 rounded-lg">
                  <span className="text-xs text-violet-300">Success Rate</span>
                  <span className="text-xl font-bold">99.5%</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-violet-500/10 hover:bg-violet-500/20 border-violet-500/30 text-violet-100">
                  <Zap className="h-4 w-4" />
                  Enhanced Command Interface
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-900/10 to-violet-900/5">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-fuchsia-500" />
                <span>Elite Operations</span>
              </CardTitle>
              <Badge variant="outline" className="bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20">
                Active
              </Badge>
            </div>
            <CardDescription>Advanced team coordination with AI assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-fuchsia-950/20 rounded-lg">
                  <span className="text-xs text-fuchsia-300">Team Members</span>
                  <span className="text-xl font-bold">16</span>
                </div>
                <div className="flex flex-col p-3 bg-fuchsia-950/20 rounded-lg">
                  <span className="text-xs text-fuchsia-300">Field Ops</span>
                  <span className="text-xl font-bold">9</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-100">
                  <Users className="h-4 w-4" />
                  Enhanced Team Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-900/10 to-fuchsia-900/5">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-indigo-500" />
                <span>Quantum Algorithms</span>
              </CardTitle>
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                New
              </Badge>
            </div>
            <CardDescription>Next-generation computation and cryptography</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-indigo-950/20 rounded-lg">
                  <span className="text-xs text-indigo-300">Processing Power</span>
                  <span className="text-xl font-bold">125 PQbits</span>
                </div>
                <div className="flex flex-col p-3 bg-indigo-950/20 rounded-lg">
                  <span className="text-xs text-indigo-300">Algorithms</span>
                  <span className="text-xl font-bold">17</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/30 text-indigo-100">
                  <Code className="h-4 w-4" />
                  Access Quantum Core
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-indigo-900/5">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-500" />
                <span>Hypercore Database</span>
              </CardTitle>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                Secure
              </Badge>
            </div>
            <CardDescription>Ultra-secure quantum-resistant data storage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-purple-950/20 rounded-lg">
                  <span className="text-xs text-purple-300">Storage</span>
                  <span className="text-xl font-bold">8.5 PB</span>
                </div>
                <div className="flex flex-col p-3 bg-purple-950/20 rounded-lg">
                  <span className="text-xs text-purple-300">Encryption</span>
                  <span className="text-xl font-bold">Level 9</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 text-purple-100">
                  <Database className="h-4 w-4" />
                  Access Data Core
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DotXDashboard2;
