import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const { commandoUnits, shieldStatus, missionStatus, quantumCore, dataCore, teamMembers, loading, error, deployCommando, upgradeShield } = useDotX();
    useEffect(() => {
        // Check module access
        const hasModuleAccess = hasAccess('dot-x');
        if (!hasModuleAccess) {
            toast.error('Access denied', {
                description: 'You do not have access to the DOT-X module'
            });
        }
    }, [hasAccess]);
    const handleDeployCommando = (unitId) => {
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
        return (_jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: _jsx(Loader2, { className: "h-8 w-8 animate-spin text-redmetal-400" }) }));
    }
    if (error) {
        return (_jsxs("div", { className: "p-6 text-center", children: [_jsx("h3", { className: "text-xl font-semibold text-redmetal-400", children: "Error loading DOT-X systems" }), _jsx("p", { className: "text-gray-400 mt-2", children: error.message })] }));
    }
    return (_jsxs("div", { className: "space-y-8 bg-black-900 p-6 rounded-xl", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight bg-gradient-to-r from-silver-100 to-silver-300/80 bg-clip-text text-transparent", children: "DOT-X Command Center" }), _jsx("p", { className: "text-silver-300/70", children: "Advanced command center with AI agents and neural shield protection" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [commandoUnits.map(unit => (_jsx(CommandoUnitCard, { unit: unit, onDeploy: handleDeployCommando }, unit.id))), shieldStatus && (_jsx(ShieldStatusCard, { status: shieldStatus, onUpgrade: handleUpgradeShield })), missionStatus && (_jsx(MissionControlCard, { status: missionStatus })), teamMembers.length > 0 && (_jsx(TeamOperationsCard, { members: teamMembers })), quantumCore && (_jsx(QuantumCoreCard, { core: quantumCore })), dataCore && (_jsx(DataCoreCard, { core: dataCore }))] })] }));
};
export default DotXDashboard;
