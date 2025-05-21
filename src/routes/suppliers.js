import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from 'react-router-dom';
import SuppliersPage from '../pages/SuppliersPage';
import NewSupplierPage from '../pages/NewSupplierPage';
import EditSupplierPage from '../pages/EditSupplierPage';
import SupplierCostsPage from '../pages/SupplierCostsPage';
import UploadsPage from '../pages/UploadsPage';
import NewUploadPage from '../pages/NewUploadPage';
export const SupplierRoutes = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(SuppliersPage, {}) }), _jsx(Route, { path: "/new", element: _jsx(NewSupplierPage, {}) }), _jsx(Route, { path: "/:id", element: _jsx(EditSupplierPage, {}) }), _jsx(Route, { path: "/costs", element: _jsx(SupplierCostsPage, {}) }), _jsx(Route, { path: "/uploads", element: _jsx(UploadsPage, {}) }), _jsx(Route, { path: "/uploads/new", element: _jsx(NewUploadPage, {}) })] }));
};
