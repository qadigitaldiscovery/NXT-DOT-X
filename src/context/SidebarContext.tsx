
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ 
  children, 
  defaultOpen = true 
}) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(isMobile ? false : defaultOpen);

  // Adjust sidebar state when screen size changes
  useEffect(() => {
    setIsOpen(!isMobile && defaultOpen);
  }, [isMobile, defaultOpen]);

  const toggle = () => setIsOpen(prev => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};
