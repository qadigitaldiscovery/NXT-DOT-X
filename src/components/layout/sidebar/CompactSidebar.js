import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
export const CompactSidebar = ({ navItems, }) => {
    const location = useLocation();
    return (_jsx("div", { className: "flex flex-col items-center space-y-4 py-2", children: navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            const Icon = item.icon;
            return (_jsxs("div", { className: "relative group", "aria-label": item.label, children: [_jsx("a", { href: item.path, className: cn("flex flex-col items-center justify-center w-10 h-10 rounded-md", isActive ? "bg-indigo-500 text-white" : "text-gray-300 hover:bg-indigo-900/50 hover:text-white", "transition-colors"), children: Icon && _jsx(Icon, { className: "h-5 w-5" }) }), _jsx("div", { className: "absolute left-12 px-2 py-1 bg-gray-800 text-xs text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", children: item.label })] }, item.path || item.label));
        }) }));
};
export default CompactSidebar;
