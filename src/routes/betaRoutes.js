import { jsx as _jsx } from "react/jsx-runtime";
import Beta1Dashboard from "../pages/Beta1Dashboard";
import Beta2Dashboard from "../pages/Beta2Dashboard";
import Beta2Analytics from "../pages/Beta2Analytics";
import ModuleAutoPage from "../pages/auto/ModuleAutoPage";
export const BetaRoutes = [
    {
        path: "/beta1/dashboard",
        element: _jsx(Beta1Dashboard, {}),
    },
    {
        path: "/beta1/*",
        element: _jsx(ModuleAutoPage, {}),
    },
    {
        path: "/beta2/dashboard",
        element: _jsx(Beta2Dashboard, {}),
    },
    {
        path: "/beta2/analytics",
        element: _jsx(Beta2Analytics, {}),
    },
    {
        path: "/beta2/members",
        element: _jsx(ModuleAutoPage, {}),
    },
    {
        path: "/beta2/rewards",
        element: _jsx(ModuleAutoPage, {}),
    },
    {
        path: "/beta2/settings",
        element: _jsx(ModuleAutoPage, {}),
    },
    {
        path: "/beta2/*",
        element: _jsx(ModuleAutoPage, {}),
    },
];
