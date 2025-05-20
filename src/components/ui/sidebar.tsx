
import React, { createContext, useContext, useState } from 'react';
import { cn } from "@/lib/utils";


interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return { 
    isOpen: context.isOpen, 
    toggle: context.toggle,
    toggleSidebar: context.toggle  // Add this alias for backwards compatibility
  };
}

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function SidebarProvider({ children, defaultOpen = true }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
}

export function Sidebar({ children, className }: SidebarProps) {
  const { isOpen } = useSidebar();

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen transition-transform",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "w-64 bg-background border-r",
      className
    )}>
      {children}
    </aside>
  );
}

export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      {children}
    </div>
  );
}

export function SidebarContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex-1 overflow-y-auto py-4", className)}>
      {children}
    </div>
  );
}

export function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mt-auto", className)}>
      {children}
    </div>
  );
}

export function SidebarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-3 py-2", className)}>
      {children}
    </div>
  );
}

export function SidebarGroupLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn("mb-2 px-4 text-sm font-semibold text-foreground/60", className)}>
      {children}
    </h3>
  );
}

export function SidebarMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <nav className={cn("space-y-1", className)}>
      {children}
    </nav>
  );
}

export function SidebarMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-2", className)}>
      {children}
    </div>
  );
}

interface SidebarMenuButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  isActive?: boolean;
  className?: string;
}

export function SidebarMenuButton({ 
  children, 
  onClick, 
  tooltip, 
  isActive, 
  className 
}: SidebarMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={cn(
        "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium",
        "hover:bg-accent hover:text-accent-foreground",
        isActive ? "bg-accent text-accent-foreground" : "text-foreground/60",
        className
      )}
    >
      {children}
    </button>
  );
}
