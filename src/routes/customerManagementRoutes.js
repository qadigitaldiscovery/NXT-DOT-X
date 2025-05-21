import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import CustomerDashboard from "@/pages/customer-management/CustomerDashboard";
import CustomerDirectoryPage from "@/pages/customer-management/CustomerDirectoryPage";
import CustomerSettings from "@/pages/customer-management/CustomerSettings";
import NewCustomerPage from "@/pages/customer-management/NewCustomerPage";
import EditCustomerPage from "@/pages/customer-management/EditCustomerPage";
import { Users, Settings, BarChart3, FileUp, Home } from 'lucide-react';
const customerNavCategories = [
    {
        name: "CUSTOMER MANAGEMENT",
        label: "CUSTOMER MANAGEMENT",
        items: [
            { label: 'Dashboard', icon: Home, path: '/customer-management' },
            { label: 'Customer Directory', icon: Users, path: '/customer-management/directory' },
            { label: 'Customer Settings', icon: Settings, path: '/customer-management/settings' },
            { label: 'Customer Analytics', icon: BarChart3, path: '/customer-analytics' },
            { label: 'Upload Files', icon: FileUp, path: '/data-management/uploads' }
        ]
    }
];
export const CustomerManagementRoutes = () => {
    return [
        _jsxs(Route, { path: "/customer-management", children: [_jsx(Route, { index: true, element: _jsx(PlatformLayout, { moduleTitle: "Customer Management", navCategories: customerNavCategories, children: _jsx(CustomerDashboard, {}) }) }), _jsx(Route, { path: "directory", element: _jsx(PlatformLayout, { moduleTitle: "Customer Directory", navCategories: customerNavCategories, children: _jsx(CustomerDirectoryPage, {}) }) }), _jsx(Route, { path: "settings", element: _jsx(PlatformLayout, { moduleTitle: "Customer Settings", navCategories: customerNavCategories, children: _jsx(CustomerSettings, {}) }) }), _jsx(Route, { path: "new", element: _jsx(PlatformLayout, { moduleTitle: "New Customer", navCategories: customerNavCategories, children: _jsx(NewCustomerPage, {}) }) }), _jsx(Route, { path: ":id", element: _jsx(PlatformLayout, { moduleTitle: "Edit Customer", navCategories: customerNavCategories, children: _jsx(EditCustomerPage, {}) }) })] }, "customer-management-index")
    ];
};
