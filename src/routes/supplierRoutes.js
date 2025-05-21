import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from 'react-router-dom';
import EnhancedSuppliersPage from '../pages/data-management/enhanced-suppliers';
export const SupplierRoutes = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/suppliers", element: _jsx(EnhancedSuppliersPage, {}) }), _jsx(Route, { path: "/suppliers/:supplierId", element: _jsx(EnhancedSuppliersPage, {}) })] }));
};
