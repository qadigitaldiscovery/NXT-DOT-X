import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Code2, Database, FileText, Globe, HelpCircle, Menu, Settings, Layers } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
// Define as React.FC for better type checking
const TechHubLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const navItems = [
        {
            icon: _jsx(Code2, { className: "h-5 w-5" }),
            label: 'API Management',
            href: '/tech-hub/api-management'
        },
        {
            icon: _jsx(Database, { className: "h-5 w-5" }),
            label: 'Database Admin',
            href: '/tech-hub/database'
        },
        {
            icon: _jsx(Globe, { className: "h-5 w-5" }),
            label: 'Integrations',
            href: '/tech-hub/integrations',
            isNew: true
        },
        {
            icon: _jsx(Layers, { className: "h-5 w-5" }),
            label: 'RAG Dashboard',
            href: '/tech-hub/rag-dashboard'
        },
        {
            icon: _jsx(FileText, { className: "h-5 w-5" }),
            label: 'Documentation',
            href: '/tech-hub/documentation'
        },
        {
            icon: _jsx(Clock, { className: "h-5 w-5" }),
            label: 'Activity Logs',
            href: '/tech-hub/activity'
        },
        {
            icon: _jsx(Settings, { className: "h-5 w-5" }),
            label: 'Settings',
            href: '/tech-hub/settings'
        },
        {
            icon: _jsx(HelpCircle, { className: "h-5 w-5" }),
            label: 'Support',
            href: '/tech-hub/support'
        }
    ];
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    return (_jsxs("div", { className: "flex h-screen overflow-hidden bg-background", children: [_jsxs("div", { className: cn("border-r bg-muted/40 transition-all duration-300 ease-in-out", sidebarOpen ? "w-64" : "w-16"), children: [_jsxs("div", { className: "flex h-14 items-center border-b px-4", children: [_jsxs(Button, { variant: "ghost", size: "icon", onClick: toggleSidebar, className: "h-8 w-8", children: [_jsx(Menu, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Toggle sidebar" })] }), sidebarOpen && _jsx("h2", { className: "ml-2 text-lg font-semibold", children: "Tech Hub" })] }), _jsx(ScrollArea, { className: "h-[calc(100vh-3.5rem)]", children: _jsx("div", { className: "p-2", children: _jsx("nav", { className: "grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center", children: navItems.map((item, index) => (_jsxs(Link, { to: item.href, className: cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", location.pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : "transparent"), children: [item.icon, sidebarOpen && (_jsxs("div", { className: "flex-1 flex items-center justify-between", children: [item.label, item.isNew && (_jsx("span", { className: "ml-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground", children: "New" }))] }))] }, index))) }) }) })] }), _jsx("div", { className: "flex-1 overflow-auto", children: _jsx(Outlet, {}) })] }));
};
// Export both as default and named export to support either import style
export default TechHubLayout;
export { TechHubLayout };
