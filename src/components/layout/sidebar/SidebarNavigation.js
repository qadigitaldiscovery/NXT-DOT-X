import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
export const SidebarNavigation = ({ categories, userRole }) => {
    const location = useLocation();
    // Check if an item or any of its children has the active path
    const isItemActive = (item) => {
        const path = item.href || item.path || '';
        if (item.activeMatchPattern) {
            if (typeof item.activeMatchPattern === 'string') {
                return location.pathname.includes(item.activeMatchPattern);
            }
            else if (item.activeMatchPattern instanceof RegExp) {
                return item.activeMatchPattern.test(location.pathname);
            }
        }
        // Check if current path matches or is a child of the item path
        return location.pathname === path || path !== '/' && path !== '' && location.pathname.startsWith(path);
    };
    // Filter items that the user has access to based on their role
    const canAccessItem = (item) => {
        if (!item.roles || item.roles.length === 0)
            return true;
        if (!userRole)
            return false;
        return item.roles.includes(userRole);
    };
    // Render categories and items
    return _jsx("div", { className: "space-y-6", children: categories.map(category => {
            // Filter items based on user role
            const accessibleItems = category.items.filter(canAccessItem);
            // Skip rendering empty categories
            if (accessibleItems.length === 0)
                return null;
            return _jsxs("div", { className: "space-y-2 py-0 my-0", children: [_jsx("h3", { className: "font-bold text-sm uppercase tracking-wider text-blue-100 py-0 my-0 px-[17px]", children: category.label || category.name }), _jsx("div", { className: "space-y-1 pl-2", children: accessibleItems.map(item => {
                            const isActive = isItemActive(item);
                            const itemPath = item.href || item.path || '#';
                            // Get icon component if available
                            const IconComponent = item.icon;
                            return _jsxs(NavLink, { to: itemPath, className: ({ isActive: linkActive }) => cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors", isActive || linkActive ? "bg-blue-800/50 text-white" : "text-blue-100 hover:bg-blue-900/50 hover:text-white"), children: [IconComponent && _jsx(IconComponent, { className: "h-5 w-5" }), _jsx("span", { className: "font-thin", children: item.label })] }, `${category.label}-${item.label}`);
                        }) })] }, category.name || category.label);
        }) });
};
