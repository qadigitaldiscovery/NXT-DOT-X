import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
export const SidebarNavItem = ({ item, isActive, onClick }) => {
    const { label, path, href, icon: Icon } = item;
    const itemPath = path || href || '#';
    return (_jsxs(NavLink, { to: itemPath, className: cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors", isActive ? "bg-blue-800/50 text-white" : "text-blue-100 hover:bg-blue-900/50 hover:text-white"), onClick: (e) => {
            if (itemPath === '#') {
                e.preventDefault();
            }
            onClick();
        }, children: [Icon && _jsx(Icon, { className: "h-5 w-5" }), _jsx("span", { children: label })] }));
};
