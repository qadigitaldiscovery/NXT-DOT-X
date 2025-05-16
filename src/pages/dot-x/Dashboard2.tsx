
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, Shield, Zap, Brain, BarChart2, Users, Code, Database } from 'lucide-react';

const DotXDashboard2 = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">DOT-X-2 Advanced Command Center</h1>
        <p className="text-muted-foreground">Enhanced version with upgraded AI agents and neural shield protection</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-blue-500/20">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-500" />
                <span>AI Commandos</span>
              </CardTitle>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                Active
              </Badge>
            </div>
            <CardDescription>Enhanced AI unit with improved capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-blue-950/20 rounded-lg">
                  <span className="text-xs text-blue-300">Deployed Agents</span>
                  <span className="text-xl font-bold">12</span>
                </div>
                <div className="flex flex-col p-3 bg-blue-950/20 rounded-lg">
                  <span className="text-xs text-blue-300">Operations</span>
                  <span className="text-xl font-bold">36</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30 text-blue-100">
                  <Zap className="h-4 w-4" />
                  Deploy Elite Commando Unit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/20">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                <span>Neural Shield V2</span>
              </CardTitle>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
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
        
        <Card className="border-green-500/20">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-green-500" />
                <span>Command Center 2.0</span>
              </CardTitle>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Upgraded
              </Badge>
            </div>
            <CardDescription>Enhanced control interface with predictive analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-green-950/20 rounded-lg">
                  <span className="text-xs text-green-300">Active Missions</span>
                  <span className="text-xl font-bold">5</span>
                </div>
                <div className="flex flex-col p-3 bg-green-950/20 rounded-lg">
                  <span className="text-xs text-green-300">Success Rate</span>
                  <span className="text-xl font-bold">99.5%</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 border-green-500/30 text-green-100">
                  <Zap className="h-4 w-4" />
                  Enhanced Command Interface
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-amber-500/20">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-500" />
                <span>Elite Operations</span>
              </CardTitle>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                Active
              </Badge>
            </div>
            <CardDescription>Advanced team coordination with AI assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-amber-950/20 rounded-lg">
                  <span className="text-xs text-amber-300">Team Members</span>
                  <span className="text-xl font-bold">16</span>
                </div>
                <div className="flex flex-col p-3 bg-amber-950/20 rounded-lg">
                  <span className="text-xs text-amber-300">Field Ops</span>
                  <span className="text-xl font-bold">9</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-100">
                  <Users className="h-4 w-4" />
                  Enhanced Team Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/20">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-cyan-500" />
                <span>Quantum Algorithms</span>
              </CardTitle>
              <Badge variant="outline" className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20">
                New
              </Badge>
            </div>
            <CardDescription>Next-generation computation and cryptography</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-cyan-950/20 rounded-lg">
                  <span className="text-xs text-cyan-300">Processing Power</span>
                  <span className="text-xl font-bold">125 PQbits</span>
                </div>
                <div className="flex flex-col p-3 bg-cyan-950/20 rounded-lg">
                  <span className="text-xs text-cyan-300">Algorithms</span>
                  <span className="text-xl font-bold">17</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30 text-cyan-100">
                  <Code className="h-4 w-4" />
                  Access Quantum Core
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-rose-500/20">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-rose-500" />
                <span>Hypercore Database</span>
              </CardTitle>
              <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
                Secure
              </Badge>
            </div>
            <CardDescription>Ultra-secure quantum-resistant data storage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-rose-950/20 rounded-lg">
                  <span className="text-xs text-rose-300">Storage</span>
                  <span className="text-xl font-bold">8.5 PB</span>
                </div>
                <div className="flex flex-col p-3 bg-rose-950/20 rounded-lg">
                  <span className="text-xs text-rose-300">Encryption</span>
                  <span className="text-xl font-bold">Level 9</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/30 text-rose-100">
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
