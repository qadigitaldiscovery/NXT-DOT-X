import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import RiskRegisterPage from "@/pages/auto/RiskRegisterPage";
import { AlertCircle, Shield, BarChart3, FileText, Settings } from 'lucide-react';
export const RiskRegisterNavCategories = [
    {
        name: "Risk Register",
        label: "Risk Register",
        items: [
            { label: "Dashboard", path: "/risk-register", icon: AlertCircle },
            { label: "Risk Matrix", path: "/risk-register/matrix", icon: Shield },
            { label: "Analytics", path: "/risk-register/analytics", icon: BarChart3 },
            { label: "Reports", path: "/risk-register/reports", icon: FileText },
            { label: "Settings", path: "/risk-register/settings", icon: Settings }
        ]
    }
];
export const RiskRegisterRoutes = () => {
    return [
        _jsxs(Route, { path: "/risk-register", children: [_jsx(Route, { index: true, element: _jsx(PlatformLayout, { moduleTitle: "Risk Register", navCategories: RiskRegisterNavCategories, children: _jsx(RiskRegisterPage, {}) }) }), _jsx(Route, { path: "matrix", element: _jsx(PlatformLayout, { moduleTitle: "Risk Matrix", navCategories: RiskRegisterNavCategories, children: _jsx(RiskRegisterPage, {}) }) }), _jsx(Route, { path: "analytics", element: _jsx(PlatformLayout, { moduleTitle: "Risk Analytics", navCategories: RiskRegisterNavCategories, children: _jsx(RiskRegisterPage, {}) }) }), _jsx(Route, { path: "reports", element: _jsx(PlatformLayout, { moduleTitle: "Risk Reports", navCategories: RiskRegisterNavCategories, children: _jsx(RiskRegisterPage, {}) }) }), _jsx(Route, { path: "settings", element: _jsx(PlatformLayout, { moduleTitle: "Risk Register Settings", navCategories: RiskRegisterNavCategories, children: _jsx(RiskRegisterPage, {}) }) })] }, "risk-register-index")
    ];
};
