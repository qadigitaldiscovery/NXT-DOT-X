import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function SidebarHomeItem({ homeItem, isActive, onClick }) {
    return (_jsx("div", { className: "px-3 pt-4", children: _jsxs(Button, { variant: "ghost", className: cn("w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 mb-2", isActive && "bg-gray-800 text-white"), onClick: onClick, children: [homeItem.icon && _jsx(homeItem.icon, { className: "mr-2 h-5 w-5" }), homeItem.label] }) }));
}
