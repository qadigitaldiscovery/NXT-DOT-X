import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { X, Menu } from 'lucide-react';
export function SidebarHeader({ isOpen, onToggle, moduleTitle }) {
    return (_jsxs("div", { className: "flex h-14 items-center justify-between border-b border-gray-800 bg-gray-900 text-white px-4", children: [isOpen && _jsx("span", { className: "font-semibold truncate", children: moduleTitle }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onToggle, className: "h-8 w-8 p-0 text-white hover:bg-gray-800", children: isOpen ? _jsx(X, { className: "h-4 w-4" }) : _jsx(Menu, { className: "h-4 w-4" }) })] }));
}
