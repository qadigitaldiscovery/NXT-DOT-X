import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight, Layers, Settings, Users, AlertTriangle } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { useUserPreferences } from '@/hooks/useUserPreferences';
// This component handles the root path and redirects based on authentication status
const Index = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const { preferences, setPreferences } = useUserPreferences({
        module: 'home',
        key: 'last_visited',
        defaultValue: { timestamp: new Date().toISOString() }
    });
    // Update last visited timestamp
    useEffect(() => {
        if (user) {
            setPreferences({ timestamp: new Date().toISOString() });
        }
    }, [user, setPreferences]);
    useEffect(() => {
        // Wait until auth state is loaded
        if (!loading) {
            if (user) {
                console.log('User authenticated, redirecting to dashboard');
                navigate('/master', { replace: true });
            }
            else {
                console.log('User not authenticated, redirecting to landing page');
                navigate('/landing', { replace: true });
            }
        }
    }, [user, loading, navigate]);
    // Define navigation categories for this page
    const categories = [
        {
            name: "General",
            label: "General", // Adding the required label property
            items: [
                { label: "Dashboard", href: "/", icon: Home },
                { label: "Projects", href: "/projects", icon: Layers },
                { label: "RAG Dashboard", href: "/dashboard/rag", icon: AlertTriangle },
                { label: "Users", href: "/admin/users", icon: Users, roles: ["admin"] },
                { label: "Settings", href: "/settings", icon: Settings, roles: ["admin", "manager"] }
            ]
        }
    ];
    // Custom navigation footer with back, home, and forward buttons
    const navigationFooter = (_jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate(-1), className: "text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10", children: _jsx(ChevronLeft, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate('/'), className: "text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10", children: _jsx(Home, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate(1), className: "text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg w-10 h-10", children: _jsx(ChevronRight, { className: "h-5 w-5" }) })] }));
    // Return loading state while determining where to redirect
    return (_jsx("div", { className: "flex h-screen w-full items-center justify-center bg-gray-100", children: _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-700", children: "Loading..." }), _jsx("p", { className: "mt-2 text-gray-500", children: "Preparing your experience" })] }) }));
};
export default Index;
