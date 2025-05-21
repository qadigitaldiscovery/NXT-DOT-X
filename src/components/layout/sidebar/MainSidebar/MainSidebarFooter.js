import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Home, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export const MainSidebarFooter = () => {
    const navigate = useNavigate();
    const handleDashboardClick = () => {
        navigate('/');
    };
    const handleSettingsClick = () => {
        navigate('/settings');
    };
    const handleHelpClick = () => {
        toast.info('Help documentation will be available soon');
    };
    return (_jsxs("div", { className: "flex justify-center space-x-2 bg-indigo-950/80 border-t border-indigo-900/50 py-3", children: [_jsx("a", { href: "/", onClick: (e) => {
                    e.preventDefault();
                    handleDashboardClick();
                }, className: cn("flex items-center justify-center w-10 h-10 rounded-lg", "bg-indigo-800/30 text-blue-200 hover:text-white hover:bg-indigo-700"), "aria-label": "Dashboard", children: _jsx(Home, { className: "h-5 w-5", "aria-hidden": "true" }) }), _jsx("a", { href: "/settings", onClick: (e) => {
                    e.preventDefault();
                    handleSettingsClick();
                }, className: cn("flex items-center justify-center w-10 h-10 rounded-lg", "bg-indigo-800/30 text-blue-200 hover:text-white hover:bg-indigo-700"), "aria-label": "Settings", children: _jsx(Settings, { className: "h-5 w-5", "aria-hidden": "true" }) }), _jsx("a", { href: "#", onClick: (e) => {
                    e.preventDefault();
                    handleHelpClick();
                }, className: cn("flex items-center justify-center w-10 h-10 rounded-lg", "bg-indigo-800/30 text-blue-200 hover:text-white hover:bg-indigo-700"), "aria-label": "Help", children: _jsx(HelpCircle, { className: "h-5 w-5", "aria-hidden": "true" }) })] }));
};
