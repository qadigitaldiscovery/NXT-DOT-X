import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { SharedNavbar } from './SharedNavbar';
import { Sidebar } from '@/components/ui/sidebar';
export function DotXLayout() {
    const handleMenuClick = () => {
        console.log('Menu clicked');
        // Implement menu toggle functionality if needed
    };
    return (_jsx("div", { className: "flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700", children: _jsxs("div", { className: "flex flex-1", children: [_jsx(Sidebar, { className: "border-r bg-black/80 backdrop-blur-sm text-white" }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(SharedNavbar, { onMenuClick: handleMenuClick, moduleTitle: "DOT-X COMMAND CENTER" }), _jsx("main", { className: "flex-1 overflow-auto p-6 text-white", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsx(Outlet, {}) }) })] })] }) }));
}
