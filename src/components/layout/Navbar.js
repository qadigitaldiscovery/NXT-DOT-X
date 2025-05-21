import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
export function Navbar({ onMenuClick }) {
    return (_jsxs("header", { className: "sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 sm:px-6", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden", onClick: onMenuClick, children: _jsx(Menu, { className: "h-5 w-5" }) }), _jsx("h1", { className: "text-xl font-semibold ml-2", children: "Dashboard" })] }), _jsx("div", { className: "flex items-center gap-4" })] }));
}
