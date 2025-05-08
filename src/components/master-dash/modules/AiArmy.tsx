
import React from 'react';
import { Bot, ShieldCheck, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { toast } from 'sonner';

interface AiItem {
  id: string;
  name: string;
  icon: React.ReactElement;
  path: string;
  description: string;
}

const AiArmy: React.FC = () => {
  // AI Army data with descriptions
  const aiArmyData = [
    { 
      id: "ai-assistant", 
      name: "AI Assistant", 
      icon: <Bot className="h-5 w-5" />, 
      path: "/ai-army/assistant",
      description: "Your personal AI assistant for everyday tasks"
    },
    { 
      id: "ai-shield", 
      name: "AI Shield", 
      icon: <ShieldCheck className="h-5 w-5" />, 
      path: "/ai-army/shield",
      description: "Protect your systems with AI-powered security"
    },
    { 
      id: "ai-commander", 
      name: "AI Commander", 
      icon: <Shield className="h-5 w-5" />, 
      path: "/ai-army/commander",
      description: "Command and coordinate your AI resources"
    },
  ];

  const handleAiArmyClick = (aiId: string, path: string) => {
    toast.info(`AI Army ${aiId} is being deployed`);
    // We would navigate here if the paths were implemented
    // navigate(path);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2 text-gray-100 mt-8">AI ARMY</h2>
      <p className="text-gray-300 mb-6">Deploy your AI agents to assist with tasks</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
        {aiArmyData.map(ai => (
          <HoverCard key={ai.id}>
            <HoverCardTrigger asChild>
              <Card 
                className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer backdrop-blur-sm bg-black/50 border-white/20"
                onClick={() => handleAiArmyClick(ai.id, ai.path)}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="p-3 rounded-full bg-blue-500/30 mb-3">
                    {React.cloneElement(ai.icon, { className: `${ai.icon.props.className} text-white` })}
                  </div>
                  <p className="text-sm font-medium text-white">{ai.name.toUpperCase()}</p>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent className="backdrop-blur-md bg-black/80 border-slate-700 text-white">
              <div className="text-sm">
                <p className="font-semibold">{ai.name}</p>
                <p className="text-slate-300">{ai.description}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </section>
  );
};

export default AiArmy;
