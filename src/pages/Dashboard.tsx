
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Zap, MessageSquare, Smartphone, Globe, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard = () => {
  // AI mission data - reordered as requested: Mobile, Voice Web, Chat, Marketing
  const missions = [
    { id: 1, name: "DOT-X Voice Mobile", icon: <Smartphone className="h-5 w-5 text-blue-400" />, status: "Active", completion: 75 },
    { id: 2, name: "DOT-X Voice Web", icon: <Globe className="h-5 w-5 text-blue-400" />, status: "In Progress", completion: 62 },
    { id: 3, name: "DOT-X Chat", icon: <MessageSquare className="h-5 w-5 text-blue-400" />, status: "Active", completion: 89 },
    { id: 4, name: "DOT-X Marketing Social", icon: <Share2 className="h-5 w-5 text-blue-400" />, status: "In Progress", completion: 44 },
  ];

  // AI performance metrics
  const metrics = [
    { name: "Processing Power", value: "98.7%", trend: "up" },
    { name: "Neural Connections", value: "1.2M", trend: "up" },
    { name: "Threat Detection", value: "99.2%", trend: "stable" },
    { name: "Response Time", value: "0.03ms", trend: "down" },
  ];

  // Avatar team members - using the uploaded images
  const teamAvatars = [
    { name: "Nova", role: "Defense Specialist", image: "public/lovable-uploads/d13002c2-2ff3-4e7e-b622-17975822f3e6.png" },
    { name: "Echo", role: "Intelligence Lead", image: "public/lovable-uploads/d90a5f2a-f854-4226-9a9a-ce348f35efe2.png" },
    { name: "Zephyr", role: "Field Agent", image: "public/lovable-uploads/f8d80e78-f644-4b77-a2f3-a951edf8dfd4.png" },
    { name: "Pulse", role: "Communications", image: "public/lovable-uploads/46abd948-3036-41ca-b73e-020da91aee3e.png" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section - Made smaller */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-900 to-indigo-900 p-4 text-white shadow-xl">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">DOT-X Command Center</span></h1>
          <p className="mb-3 text-blue-100">Unleashing AI superpowers to protect and serve</p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">Deploy AI Agents</Button>
            <Button variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800/50">View Mission Log</Button>
          </div>
        </div>
      </div>
      
      {/* Avatar Team Section - Doubled in size */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-white">DOT-X Command Team</h2>
        <div className="grid grid-cols-4 gap-6 mb-8">
          {teamAvatars.map((avatar, index) => (
            <div key={index} className="flex flex-col items-center">
              <Avatar className="h-40 w-40 border-2 border-blue-500 mb-3">
                <AvatarImage src={avatar.image} alt={avatar.name} />
                <AvatarFallback className="bg-blue-900 text-white text-2xl">{avatar.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl text-white font-semibold">{avatar.name}</h3>
                <p className="text-blue-300">{avatar.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mission Status Section - Reduced to half size */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-white">Active AI Missions</h2>
        <div className="grid gap-4 grid-cols-4">
          {missions.map((mission) => (
            <Card key={mission.id} className="bg-gray-800/60 border-gray-700 text-white backdrop-blur-sm hover:bg-gray-800/80 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {mission.icon}
                  {mission.name}
                </CardTitle>
                <CardDescription className="text-gray-300 text-sm">Mission #{mission.id}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm">Status: <span className={mission.status === "Active" ? "text-green-400" : mission.status === "In Progress" ? "text-yellow-400" : "text-gray-400"}>{mission.status}</span></span>
                  <span className="font-bold text-sm">{mission.completion}%</span>
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
      
      {/* Performance Metrics - Kept at the bottom */}
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

export default Dashboard;
