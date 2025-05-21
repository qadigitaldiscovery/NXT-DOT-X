import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { SidebarNavList } from './sidebar/SidebarNavList';
import { CompactSidebar } from './sidebar/CompactSidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserMenu } from '@/components/user-menu';
import { useAuth } from '@/context/AuthContext';
const SharedDashboardLayout = ({ children, moduleTitle, navCategories, customFooterContent, showTopLeftToggle = true, removeBottomToggle = false, initialSidebarState = "expanded", onSidebarStateChange, sidebarClassName = "bg-gray-900" }) => {
    const [expandedItems, setExpandedItems] = useState([]);
    const [sidebarExpanded, setSidebarExpanded] = useState(initialSidebarState !== "collapsed");
    const { user } = useAuth();
    const currentRole = user?.role || 'user'; // Default to 'user' if no role found
    const handleToggleSidebar = () => {
        const newState = !sidebarExpanded;
        setSidebarExpanded(newState);
        // Persist sidebar state via callback
        if (onSidebarStateChange) {
            onSidebarStateChange(newState ? "expanded" : "collapsed");
        }
    };
    const handleToggleExpand = (label) => {
        if (expandedItems.includes(label)) {
            setExpandedItems(expandedItems.filter(item => item !== label));
        }
        else {
            setExpandedItems([...expandedItems, label]);
        }
    };
    return _jsxs("div", { className: "flex h-screen bg-gray-900 text-white", children: [_jsxs("aside", { className: `${sidebarClassName} transition-all duration-300 flex flex-col ${sidebarExpanded ? 'w-64' : 'w-16'} border-r border-gray-800`, children: [_jsxs("div", { className: "p-4 flex items-center justify-between border-b border-gray-800 rounded-sm bg-gray-900", children: [sidebarExpanded && _jsx("h1", { className: "text-lg font-semibold", children: "NXT Platform" }), showTopLeftToggle && _jsx("button", { onClick: handleToggleSidebar, className: "p-1 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white", children: sidebarExpanded ? _jsx(ChevronsLeft, { size: 18 }) : _jsx(ChevronsRight, { size: 18 }) })] }), _jsx("div", { className: "flex-1 overflow-y-auto py-2 bg-gray-900", children: sidebarExpanded ? _jsx(SidebarNavList, { categories: navCategories, userRole: currentRole, expandedCategories: expandedItems, onCategoryToggle: handleToggleExpand, textColor: "text-gray-300", textHoverColor: "hover:text-white", activeBgColor: "bg-gray-700", activeTextColor: "text-white", hoverBgColor: "hover:bg-gray-800/50" }) : _jsx(CompactSidebar, { navItems: navCategories.flatMap(cat => cat.items) }) }), customFooterContent && sidebarExpanded && _jsx("div", { children: customFooterContent }), !removeBottomToggle && _jsx("div", { className: "p-2 border-t border-gray-800 bg-gray-900", children: _jsx("button", { onClick: handleToggleSidebar, className: "w-full flex justify-center p-1 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white", children: sidebarExpanded ? _jsx(ChevronsLeft, { size: 18 }) : _jsx(ChevronsRight, { size: 18 }) }) })] }), _jsxs("div", { className: "flex flex-col flex-1 overflow-hidden", children: [_jsxs("header", { className: "border-b border-gray-800 p-4 flex items-center justify-between py-[9px] bg-slate-200", children: [_jsx("h1", { className: "text-gray-700 text-2xl font-extrabold", children: moduleTitle }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(ThemeToggle, {}), _jsx(UserMenu, {})] })] }), _jsx("main", { className: "flex-1 overflow-y-auto p-6 bg-zinc-50", children: children })] })] });
};
export default SharedDashboardLayout;
