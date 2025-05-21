import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Navigate } from "react-router-dom";
import VendorDetailPage from '@/pages/vendors/VendorDetailPage';
import SupplierDirectoryPage from '@/pages/supplier-management/SupplierDirectoryPage';
// Supplier management routes now support both redirects and direct paths
export const SupplierManagementRoutes = () => {
    return [
        _jsxs(Route, { path: "/supplier-management", children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "/supplier-management/directory", replace: true }) }), _jsx(Route, { path: "directory", element: _jsx(SupplierDirectoryPage, {}) }), _jsx(Route, { path: "settings", element: _jsx(Navigate, { to: "/data-management/suppliers/settings", replace: true }) }), _jsx(Route, { path: ":id", element: _jsx(VendorDetailPage, {}) }), _jsx(Route, { path: "new", element: _jsx(Navigate, { to: "/data-management/suppliers/new", replace: true }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/supplier-management/directory", replace: true }) })] }, "supplier-management")
    ];
};
