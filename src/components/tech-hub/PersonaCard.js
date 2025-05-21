import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
export const PersonaCard = ({ persona, isSelected, onClick }) => {
    return (_jsxs(Card, { className: `cursor-pointer transition-all hover:shadow-md ${isSelected ? `border-2 border-${persona.color.split(' ')[0].replace('bg-', '')}` : 'border hover:border-gray-300'}`, onClick: onClick, children: [_jsx(CardHeader, { className: "p-4 pb-0", children: _jsxs("div", { className: "flex items-center gap-2", children: [persona.icon, _jsx(CardTitle, { className: "text-lg", children: persona.name })] }) }), _jsx(CardContent, { className: "p-4 pt-2", children: _jsxs(CardDescription, { className: "line-clamp-2", children: [persona.description.split('.')[0], "."] }) })] }));
};
export default PersonaCard;
