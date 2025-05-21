import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserMenu } from '@/components/user-menu';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navCategories } from '@/components/layout/sidebar/NavigationConfig';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Use memo to prevent unnecessary re-renders
const Topbar = memo(({ moduleTitle = '' }) => {
    // Get top-level navigation items from all categories
    const mainNavLinks = navCategories.map(category => ({
        name: category.label || '',
        href: `/${category.label?.toLowerCase().replace(/\s+/g, '-') || ''}`,
    }));
    return (_jsx("header", { className: "bg-white dark:bg-gray-800 shadow-sm z-10 border-b border-gray-100 dark:border-gray-700", children: _jsxs("div", { className: "px-6 py-3 flex items-center justify-between", children: [_jsx("div", { children: _jsx("h1", { className: "text-lg font-medium text-blue-600 dark:text-blue-400", children: moduleTitle }) }), _jsx("nav", { className: "hidden md:flex space-x-4", children: mainNavLinks.map((item) => (_jsx(NavLink, { to: item.href, className: ({ isActive }) => cn("px-2 py-1 rounded text-sm font-medium", isActive
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-300"), children: item.name }, item.name))) }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Button, { variant: "ghost", size: "icon", children: _jsx(Search, { className: "h-5 w-5 text-gray-500" }) }), _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(Bell, { className: "h-5 w-5 text-gray-500" }) }), _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(HelpCircle, { className: "h-5 w-5 text-gray-500" }) }), _jsx(ThemeToggle, {}), _jsx(UserMenu, {})] })] }) }));
});
// Add display name for debugging
Topbar.displayName = 'Topbar';
export default Topbar;
