import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
const SidebarContext = createContext(undefined);
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
export const SidebarProvider = ({ children, defaultOpen = true }) => {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(isMobile ? false : defaultOpen);
    // Adjust sidebar state when screen size changes
    useEffect(() => {
        setIsOpen(!isMobile && defaultOpen);
    }, [isMobile, defaultOpen]);
    const toggle = () => setIsOpen(prev => !prev);
    return (_jsx(SidebarContext.Provider, { value: { isOpen, setIsOpen, toggle }, children: children }));
};
