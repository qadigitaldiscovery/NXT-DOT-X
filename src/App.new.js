import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ModulesProvider } from "./context/ModulesContext";
import { Toaster } from "sonner";
import DashboardLayout from "./components/layout/DashboardLayout";
import MasterDash from "./pages/MasterDash";
export default function App() {
    return (_jsx(AuthProvider, { children: _jsx(ThemeProvider, { children: _jsx(ModulesProvider, { children: _jsx(BrowserRouter, { children: _jsxs(Suspense, { fallback: _jsx("p", { className: "p-4", "aria-label": "Loading application", children: "Loading\u2026" }), children: [_jsx(Toaster, { position: "top-right", richColors: true, closeButton: true, toastOptions: {
                                    className: "toast"
                                } }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/master" }) }), _jsx(Route, { path: "/master", element: _jsx(DashboardLayout, {}), children: _jsx(Route, { index: true, element: _jsx(MasterDash, {}) }) })] })] }) }) }) }) }));
}
