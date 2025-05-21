import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { SidebarItem } from './SidebarItem';
export const SidebarCategoryMenu = ({ title, items, currentPath }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    return (_jsxs("div", { className: "mb-2", children: [_jsxs("div", { className: "flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-800/50", onClick: toggleExpand, children: [_jsx("span", { className: "text-sm font-semibold text-gray-300", children: title }), _jsx("svg", { className: `w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })] }), isExpanded && (_jsx("ul", { className: "mt-1 space-y-1", children: items.map((item, index) => {
                    const isActive = item.path === currentPath;
                    const itemIcon = item.icon ? _jsx(item.icon, { className: "w-5 h-5" }) : null;
                    return (_jsx("li", { className: "px-1", children: _jsx(SidebarItem, { label: item.label, path: item.path, icon: itemIcon, isActive: isActive, textColor: "text-gray-400", textHoverColor: "hover:text-white", activeBgColor: "bg-blue-900/50", activeTextColor: "text-white", hoverBgColor: "hover:bg-gray-800/50" }, index) }, index));
                }) }))] }));
};
