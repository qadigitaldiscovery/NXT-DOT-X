
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Bot, BarChart3, Gift, BrainCircuit } from 'lucide-react';

interface ModuleItem {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: React.ReactElement;
  bgColor: string;
  permission: string;
}

const PrimaryModules: React.FC = () => {
  const navigate = useNavigate();

  // Primary module prototypes data - Trading System module removed as requested
  const primaryModules = [{
    id: "data-management",
    name: "Data Management Module",
    description: "Dashboard with supplier costing and analysis",
    path: "/data-management",
    icon: <BarChart3 className="h-16 w-16 text-white" />,
    bgColor: "from-blue-500 to-blue-700",
    permission: "modules.data"
  }, {
    id: "loyalty-rewards",
    name: "Loyalty Rewards Module",
    description: "Loyalty program management platform",
    path: "/loyalty-rewards",
    icon: <Gift className="h-16 w-16 text-white" />,
    bgColor: "from-purple-500 to-purple-700",
    permission: "modules.loyalty"
  }, {
    id: "dot-x",
    name: "DOT-X",
    description: "The next generation business intelligence platform",
    path: "/dot-x",
    icon: <Bot className="h-16 w-16 text-white" />,
    bgColor: "from-blue-500 to-blue-700",
    permission: "modules.dotx"
  }, {
    id: "tech-hub",
    name: "Tech Hub Module",
    description: "AI personas and technology resources",
    path: "/tech-hub/personas",
    icon: <BrainCircuit className="h-16 w-16 text-white" />,
    bgColor: "from-amber-500 to-amber-700",
    permission: "modules.tech"
  }];

  const handleModuleClick = (moduleId: string, path: string) => {
    console.log(`Selected module: ${moduleId}`);
    navigate(path, {
      replace: true
    });
    setTimeout(() => {
      toast.success(`Welcome to ${moduleId} dashboard`);
    }, 500);
  };

  return (
    <section className="mb-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-100">PRIMARY MODULES</h1>
      <p className="text-gray-300 mb-6">Select one of our core business modules to get started</p>
      
      {/* Primary Modules - 2x2 grid with specific order */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {primaryModules.map((module, index) => (
          <Card 
            key={module.id} 
            className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-lg bg-black/10 border border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-center mb-4">
                {/* Enhanced 3D effect dark red frosted icon container */}
                <div className="p-3 rounded-full bg-gradient-to-br from-[#a51919] to-[#630d0d] shadow-lg border border-white/5 transform-gpu relative">
                  {/* Enhanced inner shadow and highlight for 3D effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-white/10 to-transparent opacity-60"></div>
                  {React.cloneElement(module.icon, { className: `${module.icon.props.className} drop-shadow-lg` })}
                </div>
              </div>
              <CardTitle className="font-bold text-2xl text-center text-white">{module.name.toUpperCase()}</CardTitle>
              <CardDescription className="text-base text-slate-300">{module.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2 pb-6">
              {/* Enhanced 3D metallic dark grey button with stronger depth effects */}
              <Button 
                className="w-full py-6 font-medium text-lg bg-gradient-to-b from-gray-600 to-gray-800 border border-gray-500/30 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:from-gray-700 hover:to-gray-900 hover:border-gray-400/50 hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)] text-white transition-all duration-200 transform hover:translate-y-[-2px] active:translate-y-[1px] active:shadow-[0_2px_5px_rgba(0,0,0,0.2)]" 
                onClick={() => handleModuleClick(module.id, module.path)}
              >
                Launch Module
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PrimaryModules;
