
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MasterDash = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  // Define module categories
  const modules = {
    all: [
      { title: "Data Management", description: "Manage costs, pricing, suppliers, and more", color: "bg-nxt-primary", route: "/data-management" },
      { title: "Loyalty Rewards", description: "Reward and engage your loyal customers", color: "bg-nxt-secondary", route: "/loyalty-rewards" },
      { title: "Trading System", description: "Access trading analytics and operations", color: "bg-nxt-accent", route: "/trading-system" },
      { title: "Tech Hub", description: "Access AI tools and technical integrations", color: "bg-purple-600", hoverColor: "hover:bg-purple-700", route: "/tech-hub" },
      { title: "Social Media", description: "Manage social accounts and content", color: "bg-blue-600", hoverColor: "hover:bg-blue-700", route: "/social-media" },
      { title: "DOT-X", description: "Advanced command center with AI agents", color: "bg-indigo-600", hoverColor: "hover:bg-indigo-700", route: "/dot-x" }
    ],
    data: [
      { title: "Data Management", description: "Manage costs, pricing, suppliers, and more", color: "bg-nxt-primary", route: "/data-management" }
    ],
    marketing: [
      { title: "Loyalty Rewards", description: "Reward and engage your loyal customers", color: "bg-nxt-secondary", route: "/loyalty-rewards" },
      { title: "Social Media", description: "Manage social accounts and content", color: "bg-blue-600", hoverColor: "hover:bg-blue-700", route: "/social-media" }
    ],
    tech: [
      { title: "Tech Hub", description: "Access AI tools and technical integrations", color: "bg-purple-600", hoverColor: "hover:bg-purple-700", route: "/tech-hub" },
      { title: "DOT-X", description: "Advanced command center with AI agents", color: "bg-indigo-600", hoverColor: "hover:bg-indigo-700", route: "/dot-x" }
    ],
    operations: [
      { title: "Trading System", description: "Access trading analytics and operations", color: "bg-nxt-accent", route: "/trading-system" }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/masterdash-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content with z-index to appear above the background */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-10">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to NXT Level Platform</h1>
        <p className="text-lg text-gray-200 mb-6">Select a module to get started</p>
        
        {/* Tab Navigation */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black/30 border border-white/20">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="tech">Tech</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {modules[activeTab as keyof typeof modules].map((module, index) => (
            <div
              key={index}
              className={`${module.color} text-white rounded-xl p-8 shadow-lg ${module.hoverColor || `hover:${module.color.replace('bg-', 'bg-')}/90`} transition flex flex-col items-center cursor-pointer`}
              onClick={() => navigate(module.route)}
            >
              <span className="text-2xl font-semibold mb-2">{module.title}</span>
              <span className="text-sm opacity-80 text-center">{module.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasterDash;
