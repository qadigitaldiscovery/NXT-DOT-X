
import { NavItem } from "@/components/layout/sidebar/types";

export interface SidebarItemConfig extends NavItem {
  requiredRoles?: string[];
  requiredPermissions?: string[];
}

export interface SidebarGroupConfig {
  title: string;
  items: SidebarItemConfig[];
}

export interface ModulePermission {
  module: string;
  access: boolean;
}
