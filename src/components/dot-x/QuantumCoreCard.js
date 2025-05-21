import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const QuantumCoreCard = ({ core = {
    progress: 64,
    days: [35, 41, 45, 64, 38, 43, 52, 42, 38, 45]
} }) => {
    // Find the index of the highest value (for highlighting)
    const highestIndex = core.days.indexOf(Math.max(...core.days));
    return (_jsxs("div", { className: "frosted-card h-full", children: [_jsx("div", { className: "glossy-overlay" }), _jsxs("div", { className: "flex flex-col h-full", children: [_jsx("h3", { className: "text-silver-300/80 mb-2 font-medium", children: "Quantum Progress" }), _jsxs("div", { className: "relative my-6", children: [_jsx("div", { className: "absolute w-full h-px bg-black-800 top-1/2 -translate-y-1/2" }), _jsxs("div", { className: "absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-redmetal-400 text-silver-100 rounded-full px-3 py-1 text-xs font-medium", children: [core.progress, "%"] })] }), _jsx("div", { className: "mt-8 flex items-end justify-between h-24", children: core.days.map((value, index) => {
                            const dayNumber = index + 11; // Starting from day 11
                            const height = `${value}%`;
                            const isHighlight = index === highestIndex;
                            return (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: `w-3 rounded-full ${isHighlight ? 'bg-silver-300' : 'bg-redmetal-400'}`, style: { height } }), _jsx("span", { className: `text-xs mt-2 ${isHighlight ? 'text-silver-100' : 'text-silver-300/60'} tabular-nums`, children: dayNumber })] }, index));
                        }) })] })] }));
};
