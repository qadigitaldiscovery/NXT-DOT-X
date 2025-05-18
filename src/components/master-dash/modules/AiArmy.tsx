
import { useNavigate } from 'react-router-dom';
import { ModuleCard } from '../ModuleCard';
import { BrainCircuit, Bot, Sparkles } from 'lucide-react';

const AiArmy = () => {
  const navigate = useNavigate();

  const aiModules = [
    {
      title: 'AI Personas',
      description: 'Specialized AI personas for specific business tasks',
      icon: <Bot className="h-8 w-8 text-purple-500" />,
      onClick: () => navigate('/tech-hub/personas')
    },
    {
      title: 'AI Assistants',
      description: 'Interactive AI assistants for various business processes',
      icon: <BrainCircuit className="h-8 w-8 text-purple-500" />,
      onClick: () => navigate('/tech-hub/assistants')
    },
    {
      title: 'AI Models',
      description: 'Configure and manage custom AI models',
      icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      onClick: () => navigate('/tech-hub/models')
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
