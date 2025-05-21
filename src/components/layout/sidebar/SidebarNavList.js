import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SidebarItem } from './SidebarItem';
import { cn } from '../../../lib/utils';
export function SidebarNavList({ categories = [], items = [], activeItemKey, onItemClick, isCollapsed, textColor = "text-gray-700", textHoverColor = "hover:text-gray-900", activeBgColor = "bg-gray-100", activeTextColor = "text-gray-900", hoverBgColor = "hover:bg-gray-50", expandedCategories = [], onCategoryToggle, userRole, expandedItems, onToggleExpand }) {
    // Check if an item or any of its children has the active path
    const isItemActive = (item) => {
        if (activeItemKey === item.path || activeItemKey === item.href) {
            return true;
        }
        // Check children if they exist
        if (item.children && item.children.length > 0) {
            return item.children.some(child => isItemActive(child));
        }
        return false;
    };
    // If items are provided but no categories, create a default category
    const allCategories = categories.length > 0 ? categories : items.length > 0 ? [{
            name: 'default',
            label: 'Navigation',
            items: items
        }] : [];
    // Filter items that the user has access to based on their role
    const filterItemsByRole = (items, role) => {
        if (!role)
            return items;
        return items.filter(item => {
            // If no roles specified, everyone can see it
            if (!item.roles || item.roles.length === 0)
                return true;
            // Otherwise, check if user role is in the allowed roles
            return item.roles.includes(role);
        });
    };
    // Process categories to filter items based on user role
    const processedCategories = allCategories.map(category => ({
        ...category,
        items: filterItemsByRole(category.items, userRole)
    })).filter(category => category.items.length > 0); // Remove empty categories
    if (processedCategories.length === 0) {
        return null;
    }
    return _jsx("div", { className: cn("space-y-6", isCollapsed && "items-center"), children: processedCategories.map(category => {
            const isExpanded = expandedCategories.includes(category.name || '') || expandedItems && category.label && expandedItems.includes(category.label);
            return _jsxs("div", { className: "space-y-2", children: [!isCollapsed && _jsx("h3", { onClick: () => {
                            if (onCategoryToggle && category.name) {
                                onCategoryToggle(category.name);
                            }
                            else if (onToggleExpand && category.label) {
                                onToggleExpand(category.label);
                            }
                        }, className: "px-[21px] font-light", children: category.label || category.name }), (!isCollapsed || !onCategoryToggle) && (isExpanded || !onCategoryToggle) && category.items && _jsx("div", { className: "pl-3 space-y-1", children: category.items.map(item => {
                            const isActive = isItemActive(item);
                            const itemIcon = item.icon ? _jsx(item.icon, { className: "w-5 h-5" }) : undefined;
                            return _jsx(SidebarItem, { label: item.label, path: item.path, icon: itemIcon, isActive: isActive, textColor: textColor, textHoverColor: textHoverColor, activeBgColor: activeBgColor, activeTextColor: activeTextColor, hoverBgColor: hoverBgColor, onClick: () => onItemClick && onItemClick(item.path || item.href || item.label) }, item.label);
                        }) })] }, category.name || category.label);
        }) });
}
