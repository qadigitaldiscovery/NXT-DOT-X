
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, Shield, Zap, Brain, BarChart2, Users } from 'lucide-react';

const DotXDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">DOT-X Command Center</h1>
        <p className="text-muted-foreground">Advanced command center with AI agents and neural shield protection</p>
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
            <CardDescription>Special operations AI unit for critical tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-blue-950/20 rounded-lg">
                  <span className="text-xs text-blue-300">Deployed Agents</span>
                  <span className="text-xl font-bold">8</span>
                </div>
                <div className="flex flex-col p-3 bg-blue-950/20 rounded-lg">
                  <span className="text-xs text-blue-300">Operations</span>
                  <span className="text-xl font-bold">24</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30 text-blue-100">
                  <Zap className="h-4 w-4" />
                  Deploy Commando Unit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/20">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                <span>Neural Shield</span>
              </CardTitle>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                Protected
              </Badge>
            </div>
            <CardDescription>Advanced protection system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-purple-950/20 rounded-lg">
                  <span className="text-xs text-purple-300">Threat Level</span>
                  <span className="text-xl font-bold">Low</span>
                </div>
                <div className="flex flex-col p-3 bg-purple-950/20 rounded-lg">
                  <span className="text-xs text-purple-300">Blocks</span>
                  <span className="text-xl font-bold">1,294</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 text-purple-100">
                  <Shield className="h-4 w-4" />
                  Shield Status Report
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
                <span>Mission Control</span>
              </CardTitle>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Online
              </Badge>
            </div>
            <CardDescription>Command and control interface</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-green-950/20 rounded-lg">
                  <span className="text-xs text-green-300">Active Missions</span>
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="flex flex-col p-3 bg-green-950/20 rounded-lg">
                  <span className="text-xs text-green-300">Success Rate</span>
                  <span className="text-xl font-bold">98%</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 border-green-500/30 text-green-100">
                  <Zap className="h-4 w-4" />
                  Open Command Center
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
                <span>Team Operations</span>
              </CardTitle>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                Active
              </Badge>
            </div>
            <CardDescription>Team coordination and deployment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-amber-950/20 rounded-lg">
                  <span className="text-xs text-amber-300">Team Members</span>
                  <span className="text-xl font-bold">12</span>
                </div>
                <div className="flex flex-col p-3 bg-amber-950/20 rounded-lg">
                  <span className="text-xs text-amber-300">Field Ops</span>
                  <span className="text-xl font-bold">7</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-100">
                  <Users className="h-4 w-4" />
                  Team Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DotXDashboard;
