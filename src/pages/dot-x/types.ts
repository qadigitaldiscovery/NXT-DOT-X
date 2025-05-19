
export interface CommandoUnit {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'standby' | 'deployed';
  capabilities: string[];
  stats: {
    deployments: number;
    successRate: number;
    threatNeutralized: number;
  };
}

export interface ShieldStatus {
  level: number;
  threatLevel: 'minimal' | 'low' | 'moderate' | 'high' | 'critical';
  blockedAttacks: number;
  lastAttackDate?: Date;
  encryptionStrength: string;
}

export interface MissionStatus {
  active: number;
  completed: number;
  success: number;
  pending: number;
}

export interface QuantumCore {
  processingPower: string;
  algorithms: number;
  status: 'online' | 'offline' | 'maintenance';
  efficiency: number;
}

export interface DataCore {
  storage: string;
  encryptionLevel: number;
  backups: number;
  integrity: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'field' | 'standby';
  specialization: string[];
}
