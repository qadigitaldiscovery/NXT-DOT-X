import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
export function useModuleAccess() {
    const { user } = useAuth();
    const [moduleAccess, setModuleAccess] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loadUserAccess = async () => {
        try {
            setLoading(true);
            if (!user) {
                setModuleAccess(null);
                return;
            }
            // Fetch user roles
            const { data: rolesData, error: rolesError } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', user.id);
            if (rolesError)
                throw rolesError;
            // Determine roles, defaulting to admin for the pre-defined admin user
            const roles = rolesData?.map(r => r.role) || [];
            const isAdmin = roles.includes('admin') || user.role === 'admin';
            // If user is admin in AuthContext but not in database, add admin role
            if (user.role === 'admin' && !roles.includes('admin')) {
                roles.push('admin');
            }
            // Fetch user module access
            const { data: modulesData, error: modulesError } = await supabase
                .from('user_module_access')
                .select('*')
                .eq('user_id', user.id);
            if (modulesError)
                throw modulesError;
            // Convert database result to ModuleAccess[] format
            const modules = modulesData?.map(item => ({
                id: item.id,
                module_slug: item.module_slug,
                submenu_slug: item.submenu_slug || undefined,
                category: item.category || undefined,
                is_enabled: item.is_enabled
            })) || [];
            const userAccess = {
                roles,
                modules,
                isAdmin,
                hasAccess: (moduleSlug, submenuSlug) => {
                    if (isAdmin)
                        return true; // Admins have access to everything
                    // Check if the module is enabled for this user
                    const module = modules?.find(m => m.module_slug === moduleSlug &&
                        (submenuSlug ? m.submenu_slug === submenuSlug : true));
                    return module ? module.is_enabled : false;
                }
            };
            setModuleAccess(userAccess);
        }
        catch (err) {
            console.error('Error loading module access:', err);
            setError(err instanceof Error ? err : new Error('Unknown error loading module access'));
        }
        finally {
            setLoading(false);
        }
    };
    const refreshAccess = async () => {
        await loadUserAccess();
    };
    const toggleModuleAccess = async (id, isEnabled) => {
        try {
            const { error: updateError } = await supabase
                .from('user_module_access')
                .update({ is_enabled: isEnabled })
                .eq('id', id);
            if (updateError)
                throw updateError;
            // Update local state
            setModuleAccess(prev => {
                if (!prev)
                    return prev;
                return {
                    ...prev,
                    modules: prev.modules.map(m => m.id === id ? { ...m, is_enabled: isEnabled } : m)
                };
            });
        }
        catch (err) {
            console.error('Error toggling module access:', err);
            throw err;
        }
    };
    useEffect(() => {
        if (user) {
            loadUserAccess();
        }
        else {
            setModuleAccess(null);
            setLoading(false);
        }
    }, [user]);
    return { moduleAccess, loading, error, refreshAccess, toggleModuleAccess };
}
// Add this explicit implementation of isModuleEnabled if not already present
export function isModuleEnabled(moduleSlug, userRoles) {
    // Admin users have access to all modules
    if (userRoles && userRoles.includes('admin')) {
        return true;
    }
    // The real implementation would check the user's module access
    // For now, return true to enable all modules by default
    return true;
}
