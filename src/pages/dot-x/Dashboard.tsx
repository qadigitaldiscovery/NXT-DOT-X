
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useDotX } from '@/hooks/useDotX';
import { useModules } from '@/context/ModulesContext';
import { CommandoUnitCard } from '@/components/dot-x/CommandoUnitCard';
import { ShieldStatusCard } from '@/components/dot-x/ShieldStatusCard';
import { MissionControlCard } from '@/components/dot-x/MissionControlCard';
import { QuantumCoreCard } from '@/components/dot-x/QuantumCoreCard';
import { DataCoreCard } from '@/components/dot-x/DataCoreCard';
import { TeamOperationsCard } from '@/components/dot-x/TeamOperationsCard';
import { Loader2 } from 'lucide-react';

const DotXDashboard = () => {
  const { hasAccess } = useModules();
  const { 
    commandoUnits,
    shieldStatus,
    missionStatus,
    quantumCore,
    dataCore,
    teamMembers,
    loading,
    error,
    deployCommando,
    upgradeShield
  } = useDotX();

  useEffect(() => {
    // Check module access
    const hasModuleAccess = hasAccess('dot-x');
    if (!hasModuleAccess) {
      toast.error('Access denied', {
        description: 'You do not have access to the DOT-X module'
      });
    }
  }, [hasAccess]);

  const handleDeployCommando = (unitId: string) => {
    deployCommando(unitId);
    toast.success('Commando unit deployed', {
      description: 'AI Commando unit has been successfully deployed'
    });
  };

  const handleUpgradeShield = () => {
    upgradeShield();
    toast.success('Shield upgraded', {
      description: 'Neural Shield has been successfully enhanced'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-red-500">Error loading DOT-X systems</h3>
        <p className="text-gray-400 mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">DOT-X Command Center</h1>
        <p className="text-muted-foreground">Advanced command center with AI agents and neural shield protection</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* AI Commandos Section */}
        {commandoUnits.map(unit => (
          <CommandoUnitCard 
            key={unit.id} 
            unit={unit} 
            onDeploy={handleDeployCommando} 
          />
        ))}
        
        {/* Neural Shield */}
        {shieldStatus && (
          <ShieldStatusCard 
            status={shieldStatus} 
            onUpgrade={handleUpgradeShield} 
          />
        )}
        
        {/* Mission Control */}
        {missionStatus && (
          <MissionControlCard 
            status={missionStatus} 
          />
        )}
        
        {/* Team Operations */}
        {teamMembers.length > 0 && (
          <TeamOperationsCard 
            members={teamMembers} 
          />
        )}
        
        {/* Quantum Core */}
        {quantumCore && (
          <QuantumCoreCard 
            core={quantumCore} 
          />
        )}
        
        {/* Data Core */}
        {dataCore && (
          <DataCoreCard 
            core={dataCore} 
          />
        )}
      </div>
    </div>
  );
};

export default DotXDashboard;
