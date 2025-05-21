import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const PartnersList = () => {
    const partners = [
        {
            id: 1,
            name: "Quantum Analytica",
            description: "AI Powered Insights, Human-Centric Impacts",
            logo: "/path/to/quantum-logo.svg"
        }
        // More partners can be added here later
    ];
    return (_jsx("div", { className: "w-full mt-8", children: _jsx("div", { className: "flex flex-wrap justify-center gap-6", children: partners.map(partner => (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("p", { className: "text-sm text-gray-400", children: partner.name }), _jsx("p", { className: "text-xs text-gray-500", children: partner.description })] }, partner.id))) }) }));
};
