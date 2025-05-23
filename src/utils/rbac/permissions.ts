/**
 * Permissions and roles definitions for the application
 * Centralizes all RBAC-related constants and types
 */

// Define all possible permissions in the system
export enum Permission {
  // Global permissions
  VIEW_DASHBOARD = 'view:dashboard',
  
  // User management
  MANAGE_USERS = 'manage:users',
  VIEW_USERS = 'view:users',
  
  // Module-specific permissions (Global Technology Management)
  ADMIN_ACCESS = 'admin:access',
  SYSTEM_CONFIG = 'system:config',
  INTEGRATION_MANAGE = 'integration:manage',
  API_MANAGE = 'api:manage',
  
  // Global Modules permissions
  CUSTOMER_VIEW = 'customer:view',
  CUSTOMER_EDIT = 'customer:edit',
  CUSTOMER_PROFILE_MANAGE = 'customer:profile:manage',
  SUPPLIER_VIEW = 'supplier:view',
  SUPPLIER_EDIT = 'supplier:edit',
  PRODUCT_VIEW = 'product:view',
  PRODUCT_EDIT = 'product:edit',
  FILE_VIEW = 'file:view',
  FILE_UPLOAD = 'file:upload',
  FILE_DELETE = 'file:delete',
  COMMUNICATION_ACCESS = 'communication:access',
  COMMUNICATION_EDIT = 'communication:edit',
  
  // Business Modules permissions
  DATA_MANAGEMENT_ACCESS = 'data:access',
  DATA_MANAGEMENT_EDIT = 'data:edit',
  PROJECT_VIEW = 'project:view',
  PROJECT_EDIT = 'project:edit',
  SOCIAL_MEDIA_ACCESS = 'social:access',
  SOCIAL_MEDIA_EDIT = 'social:edit',
  OPERATIONS_ACCESS = 'operations:access',
  OPERATIONS_EDIT = 'operations:edit',
  MARKETING_ACCESS = 'marketing:access',
  MARKETING_EDIT = 'marketing:edit',
  LOYALTY_ACCESS = 'loyalty:access',
  LOYALTY_EDIT = 'loyalty:edit',
  
  // RAG + Operations
  RAG_VIEW = 'rag:view',
  RAG_MANAGE = 'rag:manage',
  
  // Automation & Workflows
  AUTOMATION_ACCESS = 'automation:access',
  WORKFLOW_EDIT = 'workflow:edit',
  
  // Web Services
  WEB_SERVICES_ACCESS = 'web:services:access',
  WEB_SERVICES_MANAGE = 'web:services:manage',
  API_ACCESS = 'api:access',
  
  // AI & Intelligence
  AI_ACCESS = 'ai:access',
  DOT_X_ACCESS = 'dotx:access',
  AI_EXTRACT_ACCESS = 'ai:extract:access',
  
  // Trading System
  TRADING_SYSTEM_ACCESS = 'trading:system:access',
  TRADING_SYSTEM_EDIT = 'trading:system:edit',
  
  // Beta Routes
  BETA_ACCESS = 'beta:access',
  
  // Other modules
  EVENTS_ACCESS = 'events:access',
  CATEGORIES_ACCESS = 'categories:access',
  REQUESTS_ACCESS = 'requests:access',
  CONTRACTS_ACCESS = 'contracts:access',
  SCORECARDS_ACCESS = 'scorecards:access',
  RISK_REGISTER_ACCESS = 'risk:register:access',
  ENTITIES_ACCESS = 'entities:access'
}

// Define standard roles and their permissions
export interface Role {
  name: string;
  permissions: Permission[];
}

export const ROLES: Record<string, Role> = {
  ADMIN: {
    name: 'Administrator',
    permissions: Object.values(Permission), // Admin has all permissions
  },
  
  MANAGER: {
    name: 'Manager',
    permissions: [
      Permission.VIEW_DASHBOARD,
      Permission.VIEW_USERS,
      Permission.CUSTOMER_VIEW,
      Permission.CUSTOMER_EDIT,
      Permission.CUSTOMER_PROFILE_MANAGE,
      Permission.SUPPLIER_VIEW,
      Permission.SUPPLIER_EDIT,
      Permission.PRODUCT_VIEW,
      Permission.PRODUCT_EDIT,
      Permission.FILE_VIEW,
      Permission.FILE_UPLOAD,
      Permission.COMMUNICATION_ACCESS,
      Permission.COMMUNICATION_EDIT,
      Permission.DATA_MANAGEMENT_ACCESS,
      Permission.DATA_MANAGEMENT_EDIT,
      Permission.PROJECT_VIEW,
      Permission.PROJECT_EDIT,
      Permission.SOCIAL_MEDIA_ACCESS,
      Permission.OPERATIONS_ACCESS,
      Permission.MARKETING_ACCESS,
      Permission.LOYALTY_ACCESS,
      Permission.RAG_VIEW,
      Permission.AUTOMATION_ACCESS,
      Permission.WEB_SERVICES_ACCESS,
      Permission.API_ACCESS,
      Permission.AI_ACCESS,
      Permission.DOT_X_ACCESS,
      Permission.TRADING_SYSTEM_ACCESS,
      Permission.EVENTS_ACCESS,
      Permission.CATEGORIES_ACCESS,
      Permission.REQUESTS_ACCESS,
      Permission.CONTRACTS_ACCESS,
      Permission.SCORECARDS_ACCESS,
      Permission.RISK_REGISTER_ACCESS,
      Permission.ENTITIES_ACCESS,
    ],
  },
  
  USER: {
    name: 'User',
    permissions: [
      Permission.VIEW_DASHBOARD,
      Permission.CUSTOMER_VIEW,
      Permission.SUPPLIER_VIEW,
      Permission.PRODUCT_VIEW,
      Permission.FILE_VIEW,
      Permission.COMMUNICATION_ACCESS,
      Permission.PROJECT_VIEW,
      Permission.SOCIAL_MEDIA_ACCESS,
      Permission.OPERATIONS_ACCESS,
      Permission.MARKETING_ACCESS,
      Permission.LOYALTY_ACCESS,
      Permission.RAG_VIEW,
      Permission.API_ACCESS,
      Permission.AI_ACCESS,
      Permission.EVENTS_ACCESS,
      Permission.TRADING_SYSTEM_ACCESS,
    ],
  },
  
  GUEST: {
    name: 'Guest',
    permissions: [
      Permission.VIEW_DASHBOARD,
    ],
  },
  
  BETA_TESTER: {
    name: 'Beta Tester',
    permissions: [
      Permission.VIEW_DASHBOARD,
      Permission.BETA_ACCESS,
    ],
  },
};

// Helper functions
export function hasPermission(userRole: string, requiredPermission: Permission): boolean {
  const role = ROLES[userRole];
  if (!role) return false;
  
  return role.permissions.includes(requiredPermission);
}

export function hasAnyPermission(userRole: string, requiredPermissions: Permission[]): boolean {
  return requiredPermissions.some(permission => hasPermission(userRole, permission));
}

export function hasAllPermissions(userRole: string, requiredPermissions: Permission[]): boolean {
  return requiredPermissions.every(permission => hasPermission(userRole, permission));
}