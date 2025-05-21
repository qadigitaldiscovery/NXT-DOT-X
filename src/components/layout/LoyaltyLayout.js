import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { SharedNavbar } from './SharedNavbar';
import { Sidebar } from '@/components/ui/sidebar';
export function LoyaltyLayout() {
    const handleMenuClick = () => {
        console.log('Menu clicked');
        // Implement menu toggle functionality if needed
    };
    return (_jsx("div", { className: "flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50", children: _jsxs("div", { className: "flex flex-1", children: [_jsx(Sidebar, { className: "border-r bg-white/80 backdrop-blur-sm" }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(SharedNavbar, { onMenuClick: handleMenuClick, moduleTitle: "Loyalty Rewards" }), _jsx("main", { className: "flex-1 overflow-auto p-6", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsx(Outlet, {}) }) })] })] }) }));
}
