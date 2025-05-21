import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Search, Menu, BellRing, Settings, UserCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/context/SidebarContext';
export function SharedNavbar({ moduleTitle = "Dashboard", onMenuClick }) {
    const { user, signOut } = useAuth();
    const { toggle } = useSidebar();
    // Use the provided onMenuClick if available, otherwise use sidebar.toggle
    const handleMenuClick = () => {
        if (onMenuClick) {
            onMenuClick();
        }
        else {
            toggle();
        }
    };
    return (_jsxs("header", { className: "bg-gray-900 text-white z-10 border-b border-gray-800 flex h-14 items-center justify-between px-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", size: "icon", onClick: handleMenuClick, className: "md:hidden h-8 w-8 text-gray-300", children: [_jsx(Menu, { className: "h-5 w-5" }), _jsx("span", { className: "sr-only", children: "Toggle menu" })] }), _jsx("h1", { className: "text-lg font-semibold", children: moduleTitle })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "hidden md:flex relative", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" }), _jsx("input", { placeholder: "Search...", className: "bg-gray-800 border-gray-700 rounded pl-8 h-9 w-[200px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" })] }), _jsx(Button, { variant: "ghost", size: "icon", className: "ml-2 text-gray-300", children: _jsx(BellRing, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "ml-2 text-gray-300", children: _jsx(Settings, { className: "h-5 w-5" }) }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "sm", className: "ml-2 gap-2", children: [_jsx(UserCircle, { className: "h-5 w-5" }), _jsx("span", { className: "hidden md:inline text-sm font-normal", children: user?.email?.split('@')[0] || 'User' })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: "Profile" }), _jsx(DropdownMenuItem, { children: "Settings" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { onClick: signOut, children: "Sign Out" })] })] })] })] }));
}
