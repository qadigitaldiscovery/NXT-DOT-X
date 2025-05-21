import { jsx as _jsx } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import VendorsPage from "@/pages/auto/VendorsPage";
import VendorDetailPage from "@/pages/vendors/VendorDetailPage";
export const VendorRoutes = () => {
    return [
        _jsx(Route, { path: "/vendors", element: _jsx(VendorsPage, {}) }, "vendors-index"),
        _jsx(Route, { path: "/vendors/:vendorId", element: _jsx(VendorDetailPage, {}) }, "vendor-detail")
    ];
};
