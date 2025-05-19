
import { ModuleCard } from '../ModuleCard';

const AiArmy = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="AI Army"
        path="/ai-army"
        variant="default"
        features={[
          { name: 'AI Studio', path: '/ai-army/studio' },
          { name: 'Bot Management', path: '/ai-army/bots' },
          { name: 'Training Center', path: '/ai-army/training' },
          { name: 'AI Metrics', path: '/ai-army/metrics' }
        ]}
      />
    </div>
  );
};

export default AiArmy;
