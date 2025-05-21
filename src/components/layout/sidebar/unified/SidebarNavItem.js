import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function SidebarNavItem({ item, isActive, onClick }) {
    return (_jsxs(Button, { variant: "ghost", className: cn("w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50 py-1.5 h-auto", isActive && "bg-gray-800/50 text-white"), onClick: onClick, children: [item.icon && _jsx(item.icon, { className: "mr-2 h-4 w-4" }), _jsx("span", { className: "text-sm", children: item.label })] }));
}
