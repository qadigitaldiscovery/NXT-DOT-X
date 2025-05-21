import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
export const SidebarItem = ({ label, path, icon, isActive = false, textColor = "text-blue-100", textHoverColor = "hover:text-white", activeBgColor = "bg-blue-800/50", activeTextColor = "text-white", hoverBgColor = "hover:bg-blue-900/50", onClick }) => {
    const itemClasses = cn("flex items-center px-3 py-2 rounded-md transition-colors", isActive ? activeTextColor : textColor, isActive ? activeBgColor : hoverBgColor, !isActive && textHoverColor, "hover:underline");
    if (path) {
        return (_jsxs(NavLink, { to: path, className: itemClasses, onClick: onClick, "aria-label": label, children: [icon && _jsx("span", { className: "mr-2", "aria-hidden": "true", children: icon }), _jsx("span", { className: "text-sm", children: label })] }));
    }
    return (_jsxs("a", { href: "#", className: itemClasses, onClick: (e) => {
            e.preventDefault();
            if (onClick)
                onClick();
        }, "aria-label": label, children: [icon && _jsx("span", { className: "mr-2", "aria-hidden": "true", children: icon }), _jsx("span", { className: "text-sm", children: label })] }));
};
