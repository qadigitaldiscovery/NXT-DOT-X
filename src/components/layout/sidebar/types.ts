
import { ElementType, ComponentPropsWithoutRef } from 'react';

export type SidebarState = "expanded" | "collapsed";

export interface NavItem {
  label: string;
  path?: string;
  href?: string;
  icon?: ElementType;
  activeMatchPattern?: string | RegExp;
  children?: NavItem[];
  badge?: string | number;
  onClick?: () => void;
}

export interface NavCategory {
  name: string;
  label: string;
  items: NavItem[];
}

export interface SidebarContext {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
}

export interface SidebarProviderProps extends ComponentPropsWithoutRef<"div"> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
