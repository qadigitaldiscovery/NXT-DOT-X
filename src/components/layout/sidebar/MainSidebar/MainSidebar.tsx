// Fix TypeScript errors - add proper imports or type annotations
import React from 'react';
import { cn } from "@/lib/utils";
import { MainSidebarBackdrop } from "./MainSidebarBackdrop";
import { MainSidebarContent } from "./MainSidebarContent";
import { NavCategory, NavItem } from "../types";

export interface MainSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function MainSidebar({ isOpen = false, onClose, className }: MainSidebarProps) {
  return (
    <>
      <MainSidebarBackdrop isOpen={isOpen} onClose={onClose} />
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-r-border bg-secondary transition-transform duration-300 ease-in-out dark:border-r-muted/50",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <MainSidebarContent onClose={onClose} />
      </aside>
    </>
  );
}
