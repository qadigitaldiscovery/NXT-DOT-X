
import React from 'react';
import { ModuleCard } from '../ModuleCard';
import { BrainCircuit } from 'lucide-react';

const AiArmy = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="AI Army"
        icon={<BrainCircuit className="h-8 w-8" />}
        path="/ai-army"
        variant="red"
        features={[
          { name: 'AI Studio', path: '/ai-army/studio' },
          { name: 'Bot Management', path: '/ai-army/bots' }
        ]}
      />
    </div>
  );
};

export default AiArmy;
