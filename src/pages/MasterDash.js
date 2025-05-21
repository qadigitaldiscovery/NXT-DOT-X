import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DashboardModules from '../components/master-dash/DashboardModules';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
const MasterDash = () => {
    console.log("⭐ MasterDash component being rendered");
    const { user } = useAuth() || { user: null };
    if (!user) {
        console.log("⭐ No user, redirecting to landing page");
        return _jsx(Navigate, { to: "/landing", replace: true });
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("h1", { className: "text-3xl font-bold", children: "Welcome to the Business Management Platform" }) }), _jsx("div", { className: "grid gap-6", children: _jsx(DashboardModules, {}) })] }));
};
export default MasterDash;
