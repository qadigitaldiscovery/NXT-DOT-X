import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "sonner";
import AppRoutes from "@/routes/AppRoutes";
import ErrorBoundary from "@/components/ErrorBoundary";
export default function App() {
    return (_jsx(Router, { children: _jsx(ErrorBoundary, { children: _jsx(AuthProvider, { children: _jsx(ThemeProvider, { children: _jsxs(Suspense, { fallback: _jsx("p", { className: "p-4", children: "Loading\u2026" }), children: [_jsx(Toaster, { position: "top-right", richColors: true }), _jsx(AppRoutes, {})] }) }) }) }) }));
}
