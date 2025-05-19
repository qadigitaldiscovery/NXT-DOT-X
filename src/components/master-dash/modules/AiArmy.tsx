
import { ModuleCard } from '../ModuleCard';
import { Bot, BrainCircuit } from 'lucide-react';

const AiArmy = () => {
  const aiModules = [
    {
      title: 'AI Studio',
      icon: <BrainCircuit className="h-7 w-7 text-purple-500" />,
      path: '/ai-army/studio',
      color: "bg-gradient-to-br from-purple-50 to-purple-100"
    },
    {
      title: 'Bot Management',
      icon: <Bot className="h-7 w-7 text-indigo-500" />,
      path: '/ai-army/bots',
      color: "bg-gradient-to-br from-indigo-50 to-indigo-100"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">AI Army</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiModules.map((module, index) => (
          <ModuleCard
            key={index}
            title={module.title}
            icon={module.icon}
            path={module.path}
            color={module.color}
          />
        ))}
      </div>
    </div>
  );
};

export default AiArmy;
