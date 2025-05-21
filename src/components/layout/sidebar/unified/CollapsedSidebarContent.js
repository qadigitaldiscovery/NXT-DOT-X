import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function CollapsedSidebarContent({ homeItem, navItems, isItemActive, handleItemClick }) {
    return (_jsxs("div", { className: "flex flex-col items-center py-4 overflow-y-auto", children: [homeItem && (_jsx(Button, { variant: "ghost", className: cn("w-10 h-10 p-0 mb-4 text-gray-300 hover:text-white hover:bg-gray-800", isItemActive(homeItem) && "bg-gray-800 text-white"), onClick: () => handleItemClick(homeItem), title: homeItem.label, children: homeItem.icon && _jsx(homeItem.icon, { className: "h-5 w-5" }) })), navItems.flatMap(category => category.items?.map((item, index) => (_jsx(Button, { variant: "ghost", className: cn("w-10 h-10 p-0 mb-1 text-gray-300 hover:text-white hover:bg-gray-800", isItemActive(item) && "bg-gray-800 text-white"), onClick: () => handleItemClick(item), title: item.label, children: item.icon && _jsx(item.icon, { className: "h-5 w-5" }) }, `icon-${item.label}-${index}`))))] }));
}
