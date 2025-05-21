import { HomeIcon, BuildingIcon, BarChartIcon, SettingsIcon } from 'lucide-react';
/**
 * Generates navigation items based on user permissions
 * @param userPermissions The user's permissions
 * @returns An array of navigation items
 */
export const getNavItemsByPermission = (userPermissions) => {
    const permittedNavItems = [];
    if (userPermissions.includes('modules.admin')) {
        permittedNavItems.push({
            label: 'Administration',
            path: '/admin',
            icon: SettingsIcon,
        });
    }
    if (userPermissions.includes('modules.dashboard')) {
        permittedNavItems.push({
            label: 'Dashboard',
            path: '/dashboard',
            icon: HomeIcon,
        });
    }
    if (userPermissions.includes('modules.suppliers')) {
        permittedNavItems.push({
            label: 'Suppliers',
            path: '/suppliers',
            icon: BuildingIcon,
        });
    }
    if (userPermissions.includes('modules.customers')) {
        permittedNavItems.push({
            label: 'Customers',
            path: '/customers',
            icon: () => import('lucide-react').then(mod => mod.Users),
        });
    }
    return permittedNavItems;
};
/**
 * Generates navigation items based on module permissions
 * @param modulePermissions Array of module permissions
 * @returns An array of navigation items
 */
export const generateNavItems = (modulePermissions) => {
    const navItems = [];
    modulePermissions.forEach(mp => {
        if (mp.module === 'dashboard') {
            navItems.push({
                label: 'Dashboard',
                path: '/dashboard',
                icon: HomeIcon
            });
        }
        if (mp.module === 'suppliers') {
            navItems.push({
                label: 'Suppliers',
                path: '/suppliers',
                icon: BuildingIcon
            });
        }
        if (mp.module === 'costs') {
            navItems.push({
                label: 'Cost Analysis',
                path: '/costs',
                icon: BarChartIcon
            });
        }
        if (mp.module === 'settings') {
            navItems.push({
                label: 'Settings',
                path: '/settings',
                icon: SettingsIcon
            });
        }
    });
    return navItems;
};
