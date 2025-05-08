
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Zap, MessageSquare, Smartphone, Globe } from 'lucide-react';
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

  // Avatar team members with updated specialities
  const teamAvatars = [
    { name: "Nova", role: "Defense Specialist", specialty: "Cybersecurity & Threat Response", image: "public/lovable-uploads/d13002c2-2ff3-4e7e-b622-17975822f3e6.png" },
    { name: "Echo", role: "Intelligence Lead", specialty: "Data Analysis & Strategic Planning", image: "public/lovable-uploads/d90a5f2a-f854-4226-9a9a-ce348f35efe2.png" },
    { name: "Zephyr", role: "Field Agent", specialty: "Covert Operations & Reconnaissance", image: "public/lovable-uploads/f8d80e78-f644-4b77-a2f3-a951edf8dfd4.png" },
    { name: "Pulse", role: "Communications", specialty: "Network Integration & Signal Management", image: "public/lovable-uploads/3bdd3ffc-1723-4582-bc57-33f3ce3e8763.png" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section - Made smaller */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-900 to-purple-900 p-6 text-white shadow-xl">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="mb-3 text-4xl font-bold tracking-tight font-sans">Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">DOT-X Command Center</span></h1>
          <p className="mb-4 text-blue-100 text-xl">Unleashing AI superpowers to protect and serve</p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg font-semibold px-6 py-6">Deploy AI Agents</Button>
            <Button variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800/50 text-lg font-semibold px-6 py-6">View Mission Log</Button>
          </div>
        </div>
      </div>
      
      {/* Avatar Team Section */}
      <div className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-lg p-8 shadow-lg">
        <h2 className="mb-8 text-4xl font-bold text-white font-sans text-center">OUR DOT-X COMMANDOS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {teamAvatars.map((avatar, index) => (
            <div key={index} className="flex flex-col items-center">
              <Avatar className="h-40 w-40 border-2 border-indigo-500 mb-4 shadow-lg shadow-indigo-500/30">
                <AvatarImage src={avatar.image} alt={avatar.name} />
                <AvatarFallback className="bg-indigo-900 text-white text-2xl">{avatar.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-2xl text-white font-bold font-sans mb-1">{avatar.name}</h3>
                <p className="text-indigo-300 text-xl mb-1">{avatar.role}</p>
                <p className="text-blue-200 text-sm font-light">{avatar.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mission Status Section */}
      <div className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-lg p-8 shadow-lg">
        <h2 className="mb-8 text-4xl font-bold text-white font-sans">Active AI Missions</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {missions.map((mission) => (
            <Card key={mission.id} className="bg-gray-800/60 border-gray-700 text-white backdrop-blur-sm hover:bg-gray-800/80 transition-colors shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex flex-col items-center text-center">
                  <div className="text-3xl font-bold text-red-400 mb-1 font-sans">{mission.name}</div>
                  <div className="text-xl text-white">{mission.displayName}</div>
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg text-center">Mission #{mission.id}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-lg">Status: <span className={mission.status === "Active" ? "text-green-400" : mission.status === "In Progress" ? "text-yellow-400" : "text-gray-400"}>{mission.status}</span></span>
                  <span className="font-bold text-lg">{mission.completion}%</span>
                </div>
                <div className="h-4 w-full rounded-full bg-gray-700">
                  <div 
                    className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-inner shadow-blue-500/50" 
                    style={{ width: `${mission.completion}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Performance Metrics */}
      <div className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-lg p-8 shadow-lg">
        <h2 className="mb-8 text-4xl font-bold text-white font-sans">AI Performance Metrics</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.name} className="bg-gray-800/60 border-gray-700 text-white shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-300">{metric.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold font-sans">{metric.value}</div>
                <div className={`text-lg ${
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
