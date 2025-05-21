import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
import { cn } from "@/lib/utils";
const SidebarContext = createContext(undefined);
export function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return {
        isOpen: context.isOpen,
        toggle: context.toggle,
        toggleSidebar: context.toggle // Add this alias for backwards compatibility
    };
}
export function SidebarProvider({ children, defaultOpen = true }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const toggle = () => setIsOpen(!isOpen);
    return (_jsx(SidebarContext.Provider, { value: { isOpen, toggle }, children: children }));
}
export function Sidebar({ children, className }) {
    const { isOpen } = useSidebar();
    return (_jsx("aside", { className: cn("fixed left-0 top-0 z-40 h-screen transition-transform", isOpen ? "translate-x-0" : "-translate-x-full", "w-64 bg-background border-r", className), children: children }));
}
export function SidebarHeader({ children, className }) {
    return (_jsx("div", { className: cn("flex items-center", className), children: children }));
}
export function SidebarContent({ children, className }) {
    return (_jsx("div", { className: cn("flex-1 overflow-y-auto py-4", className), children: children }));
}
export function SidebarFooter({ children, className }) {
    return (_jsx("div", { className: cn("mt-auto", className), children: children }));
}
export function SidebarGroup({ children, className }) {
    return (_jsx("div", { className: cn("px-3 py-2", className), children: children }));
}
export function SidebarGroupLabel({ children, className }) {
    return (_jsx("h3", { className: cn("mb-2 px-4 text-sm font-semibold text-foreground/60", className), children: children }));
}
export function SidebarMenu({ children, className }) {
    return (_jsx("nav", { className: cn("space-y-1", className), children: children }));
}
export function SidebarMenuItem({ children, className }) {
    return (_jsx("div", { className: cn("px-2", className), children: children }));
}
export function SidebarMenuButton({ children, onClick, tooltip, isActive, className }) {
    return (_jsx("button", { onClick: onClick, title: tooltip, className: cn("flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium", "hover:bg-accent hover:text-accent-foreground", isActive ? "bg-accent text-accent-foreground" : "text-foreground/60", className), children: children }));
}
