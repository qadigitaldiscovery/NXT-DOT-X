import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';
export function SidebarCategory({ category, isExpanded, onToggle, onItemClick, isItemActive,
// isMobile parameter is intentionally not destructured as it's not used directly
 }) {
    return (_jsxs("div", { className: "mb-3", children: [_jsxs(Button, { variant: "ghost", className: "w-full justify-between items-center text-gray-400 hover:text-white hover:bg-gray-800/30 py-2", onClick: onToggle, children: [_jsx("span", { className: "text-xs font-semibold uppercase tracking-wider", children: category.label || category.name }), isExpanded ? (_jsx(ChevronDown, { className: "h-4 w-4" })) : (_jsx(ChevronRight, { className: "h-4 w-4" }))] }), isExpanded && (_jsx("div", { className: "pl-2 space-y-1 mt-1", children: category.items.map((item) => (_jsx(SidebarNavItem, { item: item, isActive: isItemActive(item), onClick: () => onItemClick(item) }, item.path || item.href || item.label))) }))] }));
}
