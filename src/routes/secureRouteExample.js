import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import DashboardV2 from '@/pages/DashboardV2';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
export const SecureRoute = () => {
    const { hasRole } = usePermissions();
    return hasRole('admin') ? (_jsx(Suspense, { fallback: _jsx("div", { children: "Loading dashboard..." }), children: _jsx(PlatformLayout, { children: _jsx(DashboardV2, {}) }) })) : (_jsx("div", { className: "p-6 text-red-600", children: "Unauthorized" }));
};
