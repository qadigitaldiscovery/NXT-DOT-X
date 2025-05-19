
import { ModuleCard } from '../ModuleCard';
import { Brain } from 'lucide-react';

const DotX = () => {
  return (
    <div className="col-span-1">
      <ModuleCard
        title="Intelligence Management (DOT-X)"
        icon={<Brain className="h-8 w-8" />}
        path="/dot-x"
        variant="default"
        features={[
          { name: 'Command Center', path: '/dot-x/command-center' },
          { name: 'AI Agents', path: '/dot-x/agents' },
          { name: 'Intelligence Reports', path: '/dot-x/reports' },
          { name: 'Knowledge Base', path: '/dot-x/knowledge' }
        ]}
      />
    </div>
  );
};

export default DotX;
