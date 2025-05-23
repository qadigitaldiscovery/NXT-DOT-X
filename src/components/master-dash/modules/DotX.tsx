
import React from 'react';
import { Zap } from 'lucide-react';
import { ModuleCard } from '../ModuleCard';

const DotX = () => {
  return (
    <ModuleCard
      title="DOT-X Operations"
      description="Advanced system operations and quantum processing"
      icon={<Zap size={24} />}
      features={[
        { name: 'Mission Control', path: '/dot-x/control' },
        { name: 'Data Core', path: '/dot-x/data' },
        { name: 'Quantum Processing', path: '/dot-x/quantum' },
        { name: 'Team Operations', path: '/dot-x/team' }
      ]}
      onClick={() => window.location.href = '/dot-x'}
    />
  );
};

export default DotX;
