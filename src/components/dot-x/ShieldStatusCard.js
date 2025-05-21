import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowUpRight } from "lucide-react";
export const ShieldStatusCard = ({ status = {
    level: 1248,
    change: 3.51,
    description: "Shield Integrity"
} }) => {
    return (_jsxs("div", { className: "frosted-card h-full", children: [_jsx("div", { className: "glossy-overlay" }), _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex justify-between mb-4", children: [_jsx("div", { className: "bg-black-800/70 rounded-full p-2", children: _jsx(ArrowUpRight, { className: "h-4 w-4 text-silver-300/70" }) }), _jsxs("span", { className: "text-emerald-400 font-medium tabular-nums", children: ["+", status.change, "%"] })] }), _jsxs("div", { className: "mt-4 flex-1", children: [_jsx("div", { className: "flex items-end", children: _jsx("span", { className: "text-4xl font-bold tracking-tight text-silver-100 tabular-nums", children: status.level.toLocaleString() }) }), _jsx("p", { className: "text-silver-300/70 mt-1", children: status.description })] })] })] }));
};
