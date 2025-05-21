import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import DotXLayout from "../components/layout/DotXLayout";
import DotXDashboard from "../pages/dot-x/Dashboard";
import DotXDashboard2 from "../pages/dot-x/Dashboard2";
import DotXApi from "../pages/dot-x/Api";
import DotXDataServices from "../pages/dot-x/DataServices";
import DotXPlugins from "../pages/dot-x/Plugins";
import DotXSettings from "../pages/dot-x/Settings";
import NotFound from "../pages/NotFound";
export const DotXRoutes = () => {
    return [
        _jsxs(Route, { path: "/dot-x", element: _jsx(DotXLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(DotXDashboard, {}) }), _jsx(Route, { path: "dot-x-2", element: _jsx(DotXDashboard2, {}) }), _jsx(Route, { path: "api", element: _jsx(DotXApi, {}) }), _jsx(Route, { path: "data-services", element: _jsx(DotXDataServices, {}) }), _jsx(Route, { path: "plugins", element: _jsx(DotXPlugins, {}) }), _jsx(Route, { path: "settings", element: _jsx(DotXSettings, {}) }), _jsx(Route, { path: "command-center", element: _jsx(DotXDashboard, {}) }), _jsx(Route, { path: "agents", element: _jsx(DotXDashboard, {}) }), _jsx(Route, { path: "reports", element: _jsx(DotXDashboard, {}) }), _jsx(Route, { path: "knowledge", element: _jsx(DotXDashboard, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }, "dot-x")
    ];
};
