
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Bot, Zap, Users, Brain, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  // AI mission data
  const missions = [
    { id: 1, name: "Neural Network Defense", status: "Active", completion: 67 },
    { id: 2, name: "Data Quantum Leap", status: "In Progress", completion: 34 },
    { id: 3, name: "Sentient AI Integration", status: "Pending", completion: 0 },
  ];

  // AI performance metrics
  const metrics = [
    { name: "Processing Power", value: "98.7%", trend: "up" },
    { name: "Neural Connections", value: "1.2M", trend: "up" },
    { name: "Threat Detection", value: "99.2%", trend: "stable" },
    { name: "Response Time", value: "0.03ms", trend: "down" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-900 to-indigo-900 p-8 text-white shadow-xl">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">DOT-X Command Center</span></h1>
          <p className="mb-6 text-xl text-blue-100">Unleashing AI superpowers to protect and serve</p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">Deploy AI Agents</Button>
            <Button variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800/50">View Mission Log</Button>
          </div>
        </div>
      </div>
      
      {/* Mission Status Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-white">Active AI Missions</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => (
            <Card key={mission.id} className="bg-gray-800/60 border-gray-700 text-white backdrop-blur-sm hover:bg-gray-800/80 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-400" />
                  {mission.name}
                </CardTitle>
                <CardDescription className="text-gray-300">Mission #{mission.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex items-center justify-between">
                  <span>Status: <span className={mission.status === "Active" ? "text-green-400" : mission.status === "In Progress" ? "text-yellow-400" : "text-gray-400"}>{mission.status}</span></span>
                  <span>{mission.completion}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-700">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" 
                    style={{ width: `${mission.completion}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* AI Systems Overview */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-white">AI Systems Overview</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <SystemCard icon={<Shield className="h-8 w-8" />} name="Defense Matrix" status="Online" color="green" />
          <SystemCard icon={<Bot className="h-8 w-8" />} name="AI Core" status="Optimal" color="blue" />
          <SystemCard icon={<Zap className="h-8 w-8" />} name="Power System" status="97%" color="purple" />
          <SystemCard icon={<Users className="h-8 w-8" />} name="Team Sync" status="Active" color="indigo" />
          <SystemCard icon={<Brain className="h-8 w-8" />} name="Neural Net" status="Learning" color="pink" />
          <SystemCard icon={<Star className="h-8 w-8" />} name="Mission Control" status="Ready" color="amber" />
        </div>
      </div>
      
      {/* Performance Metrics */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-white">AI Performance Metrics</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.name} className="bg-gray-800/60 border-gray-700 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">{metric.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`text-xs ${
                  metric.trend === 'up' ? 'text-green-400' : 
                  metric.trend === 'down' ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'} {metric.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper component for system cards
const SystemCard = ({ icon, name, status, color }: { icon: React.ReactNode, name: string, status: string, color: string }) => {
  const getColorClass = () => {
    switch(color) {
      case 'green': return 'from-green-500 to-emerald-700';
      case 'blue': return 'from-blue-500 to-blue-700';
      case 'purple': return 'from-purple-500 to-violet-700';
      case 'indigo': return 'from-indigo-500 to-indigo-700';
      case 'pink': return 'from-pink-500 to-rose-700';
      case 'amber': return 'from-amber-500 to-orange-700';
      default: return 'from-blue-500 to-indigo-700';
    }
  };
  
  return (
    <Card className="bg-gray-800/60 border-gray-700 text-white overflow-hidden">
      <div className={`h-1 w-full bg-gradient-to-r ${getColorClass()}`}></div>
      <CardContent className="p-4 text-center">
        <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-700/50`}>
          {React.cloneElement(icon as React.ReactElement, { 
            className: `text-${color}-400` 
          })}
        </div>
        <h3 className="font-medium">{name}</h3>
        <p className={`text-xs text-${color}-400`}>{status}</p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
