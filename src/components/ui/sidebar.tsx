import React, { createContext, useContext, useState } from 'react';

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
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar() {
  const { isOpen } = useSidebar();

  return (
    <aside className={`fixed left-0 top-0 z-40 h-screen transition-transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } w-64 bg-gray-800`}>
      <div className="h-full px-3 py-4 overflow-y-auto">
        <nav className="space-y-2">
          {/* Navigation items go here */}
        </nav>
      </div>
    </aside>
  );
}
