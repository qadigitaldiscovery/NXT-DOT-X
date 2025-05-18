
import { useNavigate } from 'react-router-dom';
import { ModuleCard } from '../ModuleCard';
import { Bot, BrainCircuit } from 'lucide-react';

const AiArmy = () => {
  const navigate = useNavigate();

  const aiModules = [
    {
      title: 'AI Studio',
      description: 'Create and manage AI models and flows',
      icon: <BrainCircuit className="h-8 w-8 text-purple-500" />,
      path: '/ai-army/studio',
      onClick: () => navigate('/ai-army/studio')
    },
    {
      title: 'Bot Management',
      description: 'Configure and deploy AI bots to various platforms',
      icon: <Bot className="h-8 w-8 text-purple-500" />,
      path: '/ai-army/bots',
      onClick: () => navigate('/ai-army/bots')
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
            description={module.description}
            icon={module.icon}
            onClick={module.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default AiArmy;
