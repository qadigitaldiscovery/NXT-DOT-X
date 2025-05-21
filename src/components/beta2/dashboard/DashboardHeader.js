import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
export const DashboardHeader = ({ title, description, heading, subheading }) => {
    const navigate = useNavigate();
    // Use the new props if available, otherwise fall back to the old ones
    const displayTitle = heading || title;
    const displayDescription = subheading || description;
    return (_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: displayTitle }), _jsx("p", { className: "text-muted-foreground", children: displayDescription })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx(Button, { variant: "outline", onClick: () => navigate('/prototypes'), children: "Back to Selector" }) })] }));
};
