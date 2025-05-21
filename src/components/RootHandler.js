import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const RootHandler = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    React.useEffect(() => {
        console.log("RootHandler: Auth state", { isAuthenticated });
        if (isAuthenticated) {
            console.log("RootHandler: Authenticated, navigating to dashboard");
            navigate('/dashboard', { replace: true });
        }
        else {
            console.log("RootHandler: Not authenticated, navigating to landing page");
            navigate('/landing', { replace: true });
        }
    }, [isAuthenticated, navigate]);
    return (_jsx("div", { className: "h-screen w-full flex items-center justify-center", children: _jsx("div", { className: "animate-pulse text-primary", children: "Redirecting..." }) }));
};
export default RootHandler;
