
import { useState, useEffect } from 'react';
import { dotXService } from '../services/dotXService';
import { CommandoUnit, ShieldStatus, MissionStatus, QuantumCore, DataCore, TeamMember } from '../pages/dot-x/types';

export function useDotX() {
  const [commandoUnits, setCommandoUnits] = useState<CommandoUnit[]>([]);
  const [shieldStatus, setShieldStatus] = useState<ShieldStatus | null>(null);
  const [missionStatus, setMissionStatus] = useState<MissionStatus | null>(null);
  const [quantumCore, setQuantumCore] = useState<QuantumCore | null>(null);
  const [dataCore, setDataCore] = useState<DataCore | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // In a real app, these would be API calls
        const units = dotXService.getCommandoUnits();
        const shield = dotXService.getShieldStatus();
        const mission = dotXService.getMissionStatus();
        const quantum = dotXService.getQuantumCore();
        const data = dotXService.getDataCore();
        const team = dotXService.getTeamMembers();
        
        setCommandoUnits(units);
        setShieldStatus(shield);
        setMissionStatus(mission);
        setQuantumCore(quantum);
        setDataCore(data);
        setTeamMembers(team);
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load DOT-X data'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const deployCommando = (unitId: string) => {
    setCommandoUnits(prev => 
      prev.map(unit => 
        unit.id === unitId 
          ? { ...unit, status: 'deployed' as const, stats: { ...unit.stats, deployments: unit.stats.deployments + 1 } } 
          : unit
      )
    );
  };

  const upgradeShield = () => {
    if (shieldStatus) {
      setShieldStatus({
        ...shieldStatus,
        level: Math.min(shieldStatus.level + 1, 10),
        encryptionStrength: shieldStatus.level >= 9 ? "Maximum Quantum-resistant" : "Enhanced Quantum-resistant"
      });
    }
  };

  return {
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
  };
}
