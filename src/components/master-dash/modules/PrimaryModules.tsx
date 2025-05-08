
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Bot, BarChart3, Gift, ArrowDownUp, BrainCircuit } from 'lucide-react';

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

  // Primary module prototypes data
  const primaryModules = [{
    id: "dot-x",
    name: "DOT-X",
    description: "The next generation business intelligence platform",
    path: "/dot-x",
    icon: <Bot className="h-16 w-16 text-white" />,
    bgColor: "from-blue-500 to-blue-700",
    permission: "modules.dotx"
  }, {
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
    id: "trading-system",
    name: "Trading System Module",
    description: "Inventory and order management",
    path: "/trading-system",
    icon: <ArrowDownUp className="h-16 w-16 text-white" />,
    bgColor: "from-green-500 to-green-700",
    permission: "modules.trading"
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
    <section>
      <h1 className="text-3xl font-bold mb-2 text-gray-100">PRIMARY MODULES</h1>
      <p className="text-gray-300 mb-6">Select one of our core business modules to get started</p>
      
      {/* Primary Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {primaryModules.map(module => (
          <Card 
            key={module.id} 
            className="overflow-hidden transition-all duration-300 hover:shadow-xl shadow-md hover:scale-105 backdrop-blur-sm bg-black/50 border-white/20"
          >
            <CardHeader className="pb-2">
              <CardTitle className="font-bold text-2xl text-center text-white">{module.name.toUpperCase()}</CardTitle>
              <CardDescription className="text-base text-slate-300">{module.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2 pb-6">
              <Button className="w-full bg-[#c01c1c] hover:bg-[#a51919] font-medium text-lg py-6" onClick={() => handleModuleClick(module.id, module.path)}>
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
