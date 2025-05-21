import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUserPermissions } from '@/hooks/useUserPermissions';
import { AlertOctagon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
const PermissionGuard = ({ requiredPermission, children, fallback }) => {
    const { hasPermission, hasAnyPermission } = useUserPermissions();
    const { user } = useAuth();
    // Admin users bypass all permission checks
    if (user?.role === 'admin') {
        return _jsx(_Fragment, { children: children });
    }
    // Check permissions
    const hasAccess = Array.isArray(requiredPermission)
        ? hasAnyPermission(requiredPermission)
        : hasPermission(requiredPermission);
    // Default fallback component
    const defaultFallback = (_jsxs("div", { className: "flex flex-col items-center justify-center p-6 text-center", children: [_jsx(AlertOctagon, { className: "h-12 w-12 text-muted-foreground mb-4" }), _jsx("h3", { className: "font-medium text-lg mb-1", children: "Access Restricted" }), _jsx("p", { className: "text-muted-foreground", children: "You don't have permission to access this feature." })] }));
    // Render children if they have access, otherwise render fallback
    return hasAccess ? _jsx(_Fragment, { children: children }) : _jsx(_Fragment, { children: fallback || defaultFallback });
};
export default PermissionGuard;
