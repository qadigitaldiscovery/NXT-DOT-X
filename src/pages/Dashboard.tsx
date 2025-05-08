
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Zap, MessageSquare, Smartphone, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard = () => {
  // AI mission data - with four missions: Mobile, Voice Web, Chat, Social Media Marketing
  const missions = [
    { id: 1, name: "DOT-XM", displayName: "Mobile - Voice", icon: <Smartphone className="h-5 w-5 text-blue-400" />, status: "Active", completion: 75 },
    { id: 2, name: "DOT-XW", displayName: "Voice Web", icon: <Globe className="h-5 w-5 text-blue-400" />, status: "In Progress", completion: 62 },
    { id: 3, name: "DOT-XC", displayName: "Chat Channels", icon: <MessageSquare className="h-5 w-5 text-blue-400" />, status: "Active", completion: 89 },
    { id: 4, name: "DOT-XS", displayName: "Social Media Marketing", icon: <Zap className="h-5 w-5 text-blue-400" />, status: "In Progress", completion: 44 },
  ];

  // AI performance metrics
  const metrics = [
    { name: "Processing Power", value: "98.7%", trend: "up" },
    { name: "Neural Connections", value: "1.2M", trend: "up" },
    { name: "Threat Detection", value: "99.2%", trend: "stable" },
    { name: "Response Time", value: "0.03ms", trend: "down" },
  ];

  // Updated team members with the correct AI agent names
  const teamAvatars = [
    { name: "DOT-XM", role: "Mobile Voice Assistant", specialty: "Voice Commands & Mobile Integration", image: "/lovable-uploads/d13002c2-2ff3-4e7e-b622-17975822f3e6.png" },
    { name: "DOT-XW", role: "Voice Web Assistant", specialty: "Web Navigation & Voice Control", image: "/lovable-uploads/d90a5f2a-f854-4226-9a9a-ce348f35efe2.png" },
    { name: "DOT-XC", role: "Chat Channels", specialty: "Real-time Communication & Support", image: "/lovable-uploads/f8d80e78-f644-4b77-a2f3-a951edf8dfd4.png", hasDemoButton: true },
    { name: "DOT-XS", role: "Social Media Marketing", specialty: "Content Strategy & Audience Engagement", image: "/lovable-uploads/3bdd3ffc-1723-4582-bc57-33f3ce3e8763.png" },
  ];

  const handleVapiDemo = () => {
    // Updated URL to a working Vapi demo link
    window.open('https://app.vapi.ai/demo', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Avatar Team Section - Improved styling with larger avatars */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900/70 rounded-lg p-6 shadow-lg">
        <h2 className="mb-8 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-200">DOT-X COMMANDOS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {teamAvatars.map((avatar, index) => (
            <div key={index} className="flex flex-col items-center transform transition-all duration-300 hover:scale-105 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 blur-lg opacity-50 group-hover:opacity-80 transition-opacity"></div>
                {/* Increased avatar size by ~40% */}
                <Avatar className="h-44 w-44 border-2 border-indigo-500 shadow-lg shadow-indigo-500/20 relative z-10">
                  <AvatarImage src={avatar.image} alt={avatar.name} className="object-cover" />
                  <AvatarFallback className="bg-indigo-900 text-white text-lg">{avatar.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-xl text-white font-bold mb-1">{avatar.name}</h3>
                <p className="text-indigo-300 text-sm mb-1">{avatar.role}</p>
                <p className="text-blue-200 text-xs font-light mb-2">{avatar.specialty}</p>
                {avatar.hasDemoButton && (
                  <Button 
                    onClick={handleVapiDemo} 
                    className="mt-2 bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 rounded-full px-4 py-1 text-sm"
                  >
                    Talk to {avatar.name} <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mission Status Section */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900/70 rounded-lg p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">Active AI Missions</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {missions.map((mission) => (
            <Card key={mission.id} className="bg-slate-900/80 border-blue-900/50 text-white backdrop-blur-sm hover:bg-slate-800/80 transition-colors shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex flex-col items-center text-center">
                  <div className="text-xl font-bold text-blue-400 mb-1">{mission.name}</div>
                  <div className="text-sm text-white">{mission.displayName}</div>
                </CardTitle>
                <CardDescription className="text-blue-300 text-xs text-center">Mission #{mission.id}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Status: <span className={mission.status === "Active" ? "text-green-400" : mission.status === "In Progress" ? "text-yellow-400" : "text-gray-400"}>{mission.status}</span></span>
                  <span className="font-bold">{mission.completion}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800/80">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" 
                    style={{ width: `${mission.completion}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Performance Metrics */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900/70 rounded-lg p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">AI Performance Metrics</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.name} className="bg-slate-900/80 border-blue-800/30 text-white shadow-md overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-transparent to-blue-900/10 pointer-events-none"></div>
              <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-sm font-medium text-blue-300">{metric.name}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">{metric.value}</div>
                <div className={`text-sm ${
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

export default Dashboard;
