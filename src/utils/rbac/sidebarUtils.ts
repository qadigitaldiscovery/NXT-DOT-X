import { Permission, hasPermission, hasAnyPermission } from './permissions';
import { IconMap } from '../icons'; // Corrected import path

/**
 * Interface for navigation items in the sidebar
 */
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: keyof typeof IconMap; // Use keys of IconMap for type safety
  children?: NavItem[];
  requiredPermissions: Permission[];
}

/**
 * The complete navigation structure following the hierarchical design
 */
export const FULL_NAVIGATION: NavItem[] = [
  // A. Global Landing
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: 'dashboard',
    requiredPermissions: [Permission.VIEW_DASHBOARD]
  },
  
  // B. Global Technology Management
  {
    id: 'tech-hub',
    label: 'Technology Hub',
    path: '/tech-hub',
    icon: 'settings',
    requiredPermissions: [Permission.ADMIN_ACCESS, Permission.SYSTEM_CONFIG],
    children: [
      {
        id: 'admin',
        label: 'System Administration',
        path: '/admin',
        requiredPermissions: [Permission.ADMIN_ACCESS]
      },
      {
        id: 'access-control',
        label: 'Access Control',
        path: '/tech-hub/access',
        requiredPermissions: [Permission.ADMIN_ACCESS]
      },
      {
        id: 'integration',
        label: 'Platform Integration',
        path: '/tech-hub/integration',
        requiredPermissions: [Permission.INTEGRATION_MANAGE]
      },
      {
        id: 'ai-intelligence',
        label: 'AI & Intelligence',
        path: '/tech-hub/ai',
        requiredPermissions: [Permission.ADMIN_ACCESS]
      },
      {
        id: 'documentation',
        label: 'Documentation',
        path: '/tech-hub/docs',
        requiredPermissions: [Permission.VIEW_DASHBOARD]
      }
    ]
  },
  
  // C. Global Modules
  {
    id: 'global-modules',
    label: 'Global Modules',
    path: '',
    icon: 'folder', // Example icon for global modules
    requiredPermissions: [
      Permission.CUSTOMER_VIEW, 
      Permission.SUPPLIER_VIEW, 
      Permission.FILE_VIEW, 
      Permission.COMMUNICATION_ACCESS
    ],
    children: [
      {
        id: 'customer-management',
        label: 'Customer Management',
        path: '/customer-management',
        requiredPermissions: [Permission.CUSTOMER_VIEW]
      },
      {
        id: 'supplier-management',
        label: 'Supplier Management',
        path: '/supplier-management',
        requiredPermissions: [Permission.SUPPLIER_VIEW]
      },
      {
        id: 'vendors',
        label: 'Vendors',
        path: '/vendors',
        requiredPermissions: [Permission.SUPPLIER_VIEW]
      },
      {
        id: 'files',
        label: 'Document & File Management',
        path: '/files',
        requiredPermissions: [Permission.FILE_VIEW]
      },
      {
        id: 'communications',
        label: 'Communications Hub',
        path: '/communications',
        requiredPermissions: [Permission.COMMUNICATION_ACCESS]
      }
    ]
  },
  
  // D. Business Modules
  {
    id: 'business-modules',
    label: 'Business Modules',
    path: '',
    icon: 'briefcase', // Example icon for business modules
    requiredPermissions: [
      Permission.DATA_MANAGEMENT_ACCESS,
      Permission.PROJECT_VIEW,
      Permission.SOCIAL_MEDIA_ACCESS,
      Permission.OPERATIONS_ACCESS,
      Permission.MARKETING_ACCESS,
      Permission.LOYALTY_ACCESS
    ],
    children: [
      {
        id: 'data-management',
        label: 'Data Management',
        path: '/data-management',
        requiredPermissions: [Permission.DATA_MANAGEMENT_ACCESS]
      },
      {
        id: 'projects',
        label: 'Project Management',
        path: '/projects',
        requiredPermissions: [Permission.PROJECT_VIEW]
      },
      {
        id: 'social-media',
        label: 'Social Media Management',
        path: '/social-media',
        requiredPermissions: [Permission.SOCIAL_MEDIA_ACCESS]
      },
      {
        id: 'operations',
        label: 'Operations & Monitoring',
        path: '/operations',
        requiredPermissions: [Permission.OPERATIONS_ACCESS]
      },
      {
        id: 'brand-marketing',
        label: 'Marketing & Brand Management',
        path: '/brand-marketing',
        requiredPermissions: [Permission.MARKETING_ACCESS]
      },
      {
        id: 'loyalty-rewards',
        label: 'Loyalty Program',
        path: '/loyalty-rewards',
        requiredPermissions: [Permission.LOYALTY_ACCESS]
      }
    ]
  },
  
  // E. Automation & Workflows
  {
    id: 'automation',
    label: 'Automation & Workflows',
    path: '/automation',
    icon: 'zap', // Example icon for automation
    requiredPermissions: [Permission.AUTOMATION_ACCESS]
  },
  
  // F. Web Services
  {
    id: 'web-services',
    label: 'Web Services',
    path: '/web-services',
    icon: 'globe', // Example icon for web services
    requiredPermissions: [Permission.API_ACCESS]
  }
];

/**
 * Filter navigation items based on user role permissions
 * @param navItems Array of navigation items to filter
 * @param userRole The user's role in the system
 * @returns Filtered navigation items the user has permission to see
 */
export function filterNavItemsByPermission(navItems: NavItem[], userRole: string): NavItem[] {
  return navItems
    .filter(item => {
      // Check if user has any of the required permissions for this item
      const hasItemPermission = hasAnyPermission(userRole, item.requiredPermissions);
      
      // Filter children recursively if they exist
      if (item.children) {
        item.children = filterNavItemsByPermission(item.children, userRole);
      }
      
      // Include this item if user has permission OR if it has children with permissions
      return hasItemPermission || (item.children && item.children.length > 0);
    })
    .map(item => ({
      ...item,
      // Remove empty children arrays
      children: item.children && item.children.length > 0 ? item.children : undefined
    }));
}

/**
 * Get navigation items for a specific user role
 * @param userRole The user's role in the system
 * @returns Navigation items the user has permission to see
 */
export function getNavigationForUserRole(userRole: string): NavItem[] {
  return filterNavItemsByPermission(FULL_NAVIGATION, userRole);
}
