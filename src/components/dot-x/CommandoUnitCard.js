import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bot, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
export const CommandoUnitCard = ({ unit = {
    id: "ai-unit-1",
    name: "Sierra Alpha",
    status: "active",
    type: "Intelligence Gathering",
    stats: {
        power: 85,
        deployments: 12,
        success: 98
    }
}, onDeploy }) => {
    return (_jsxs("div", { className: "frosted-card h-full", children: [_jsx("div", { className: "glossy-overlay" }), _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Bot, { className: "h-5 w-5 text-silver-300/70 mr-2" }), _jsx("h3", { className: "text-silver-100 font-medium", children: unit.name })] }), _jsx("div", { className: `px-2 py-1 rounded-full text-xs font-medium ${unit.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                                    unit.status === 'deployed' ? 'bg-redmetal-400/30 text-silver-300' :
                                        'bg-amber-500/20 text-amber-300'}`, children: unit.status.charAt(0).toUpperCase() + unit.status.slice(1) })] }), _jsx("p", { className: "text-silver-300/70 text-sm mb-4", children: unit.type }), _jsxs("div", { className: "grid grid-cols-3 gap-2 mb-4", children: [_jsxs("div", { className: "bg-black-800/50 p-2 rounded-lg text-center", children: [_jsx("div", { className: "text-xl font-bold text-redmetal-400 tabular-nums", children: unit.stats.power }), _jsx("div", { className: "text-xs text-silver-300/60", children: "Power" })] }), _jsxs("div", { className: "bg-black-800/50 p-2 rounded-lg text-center", children: [_jsx("div", { className: "text-xl font-bold text-silver-100 tabular-nums", children: unit.stats.deployments }), _jsx("div", { className: "text-xs text-silver-300/60", children: "Ops" })] }), _jsxs("div", { className: "bg-black-800/50 p-2 rounded-lg text-center", children: [_jsxs("div", { className: "text-xl font-bold text-emerald-400 tabular-nums", children: [unit.stats.success, "%"] }), _jsx("div", { className: "text-xs text-silver-300/60", children: "Success" })] })] }), onDeploy && unit.status !== 'deployed' && (_jsxs(Button, { onClick: () => onDeploy(unit.id), className: "w-full bg-redmetal-600 hover:bg-redmetal-400 text-silver-100 border border-silver-300/20", size: "sm", children: [_jsx(Shield, { className: "h-4 w-4 mr-2" }), " Deploy Unit"] }))] })] }));
};
