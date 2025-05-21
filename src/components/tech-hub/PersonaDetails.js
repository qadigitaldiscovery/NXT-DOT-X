import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
const PersonaDetails = ({ persona }) => {
    return (_jsxs(Card, { className: "h-full", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-2", children: [persona.icon, _jsxs("div", { children: [_jsx(CardTitle, { children: persona.name }), _jsx(CardDescription, { className: "mt-1", children: persona.description })] })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Traits" }), _jsx("div", { className: "flex flex-wrap gap-2", children: persona.traits.map((trait, index) => (_jsx("span", { className: "px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium", children: trait.name }, index))) })] }), _jsx(Separator, {}), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Responsibilities" }), _jsx("ul", { className: "list-disc pl-5 space-y-1 text-sm", children: persona.responsibilities.map((responsibility, index) => (_jsx("li", { children: responsibility.text }, index))) })] })] }) })] }));
};
export default PersonaDetails;
