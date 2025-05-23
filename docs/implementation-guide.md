# Route Implementation Guide

This document provides an overview of the hierarchical routing structure and RBAC implementation for the NXT-DOT-X platform.

## Overview

The routing implementation follows the hierarchical structure:

1. **Global Landing**
   - Main Dashboard
   - Module Quick Access
   - System Status and Notifications

2. **Global Technology Management**
   - System Administration
   - Access Control
   - Platform Integration
   - AI & Intelligence
   - Documentation & Support

3. **Global Modules**
   - Customer Management
   - Supplier Management
   - Document & File Management
   - Communications Hub

4. **Business Modules**
   - Data Management
   - Project Management
   - Social Media Management
   - Operations & Monitoring
   - Marketing & Brand Management
   - Loyalty Program

5. **Automation & Workflows**

6. **Web Services**

## RBAC Integration

Role-Based Access Control (RBAC) is implemented through:

- **Permission Definitions**: Centralized in `src/utils/rbac/permissions.ts`
- **Route Guards**: Implemented in `src/utils/rbac/RouteGuard.tsx`
- **Navigation Filtering**: Based on permissions in `src/utils/rbac/sidebarUtils.ts`

### Permission Model

Permissions follow a `resource:action` naming convention:
- `view:dashboard` - Basic dashboard access
- `manage:users` - User management capability
- `customer:view` - View customer data
- `customer:edit` - Edit customer data

### Roles

Four primary roles are pre-configured:
- **Admin**: Full system access
- **Manager**: Access to most modules with edit capabilities
- **User**: Limited access with mostly view permissions
- **Guest**: Dashboard-only access

## File Structure

```
src/
├── assets/
│   └── styles/
│       └── layout.css
├── components/
│   └── Navigation.tsx
├── layouts/
│   └── MainLayout.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── NotFound.tsx
│   └── Unauthorized.tsx
├── routes/
│   ├── index.tsx
│   ├── IndexRouter.tsx
│   └── [module]Routes.tsx
├── utils/
│   └── rbac/
│       ├── permissions.ts
│       ├── RouteGuard.tsx
│       └── sidebarUtils.ts
├── App.css
└── App.tsx
```

## Implementation Details

### Route Protection

Routes are protected using the `RouteGuard` component:

```tsx
<Route path="/customer-management/*" element={
  <RouteGuard requiredPermissions={Permission.CUSTOMER_VIEW}>
    <CustomerManagementRoutes />
  </RouteGuard>
} />
```

### Navigation Filtering

The sidebar navigation is dynamically filtered based on the user's permissions:

```tsx
const navItems = getNavigationForUserRole(userRole);
```

## Deployment

1. Ensure all dependencies are installed: `npm install`
2. Build the application: `npm run build`
3. Deploy the built assets to the hosting environment

## Testing

Routes should be tested for:
- **Access Control**: Verify permissions work correctly
- **Navigation**: Ensure sidebar shows appropriate items
- **Layout**: Confirm layout works on all pages

## Future Enhancements

- **User Context**: Replace mock user with actual authentication system
- **Module-Specific Guards**: Add fine-grained permission checks within modules
- **Audit Logging**: Track route access and permission denials
- **Custom Error Pages**: Enhance error handling with more specific messages