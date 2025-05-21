import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Outlet } from 'react-router-dom';
import { sidebarMenu } from '@/config/sidebarMenu';
import { ChevronRight, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
export const VendorLayout = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const isMobile = useIsMobile();
    React.useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false);
        }
        else {
            setSidebarOpen(true);
        }
    }, [isMobile]);
    return (_jsxs("div", { className: "flex h-screen overflow-hidden bg-gray-50", children: [_jsxs("aside", { className: cn("bg-gray-900 text-gray-100 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-10 md:relative", sidebarOpen ? "w-64" : "w-0 md:w-16"), children: [_jsxs("div", { className: "h-16 flex items-center justify-between px-4", children: [_jsx("div", { className: "flex items-center space-x-2", children: sidebarOpen && (_jsx("span", { className: "text-xl font-semibold", children: "Healthcare" })) }), _jsx("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "md:block hidden text-gray-400 hover:text-white", "aria-label": sidebarOpen ? "Collapse sidebar" : "Expand sidebar", title: sidebarOpen ? "Collapse sidebar" : "Expand sidebar", children: _jsx(ChevronRight, { className: cn("h-5 w-5 transition-transform", !sidebarOpen && "rotate-180") }) })] }), _jsx("div", { className: "overflow-y-auto h-[calc(100vh-64px)]", children: _jsx("nav", { className: "px-2 py-4", children: _jsx("ul", { className: "space-y-1", children: sidebarMenu.map((item) => (_jsx("li", { children: _jsxs("a", { href: item.path, className: "flex items-center py-2 px-3 text-sm rounded hover:bg-gray-800", "aria-label": item.label, children: [_jsx(item.icon, { className: "h-5 w-5 mr-3", "aria-hidden": "true" }), sidebarOpen && _jsx("span", { children: item.label })] }) }, item.key))) }) }) })] }), _jsxs("div", { className: "flex flex-col flex-1 overflow-hidden", children: [_jsxs("header", { className: "bg-white shadow-sm h-16 flex items-center px-4 md:px-6", children: [_jsx("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "md:hidden text-gray-500 hover:text-gray-700 mr-4", "aria-label": sidebarOpen ? "Close menu" : "Open menu", title: sidebarOpen ? "Close menu" : "Open menu", children: sidebarOpen ?
                                    _jsx(X, { className: "h-6 w-6", "aria-hidden": "true" }) :
                                    _jsx(Menu, { className: "h-6 w-6", "aria-hidden": "true" }) }), _jsx("h1", { className: "text-xl font-semibold", children: "Healthcare Supplier Dashboard" })] }), _jsx("main", { className: "flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50", children: _jsx(Outlet, {}) })] })] }));
};
export default VendorLayout;
