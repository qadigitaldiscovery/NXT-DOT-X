
export interface NavItem {
  label: string;
  href?: string;
  path?: string;  // For backward compatibility
  icon?: any;
  roles?: string[];
}
