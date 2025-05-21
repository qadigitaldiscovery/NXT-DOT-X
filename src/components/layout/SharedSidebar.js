import { jsx as _jsx } from "react/jsx-runtime";
import { UnifiedSidebar } from './UnifiedSidebar';
import { Home } from 'lucide-react';
const defaultHomeItem = {
    label: 'Home',
    href: '/dashboard',
    icon: Home
};
export function SharedSidebar({ homeItem = defaultHomeItem, moduleTitle = 'Navigation', useGlobalNavigation = true, ...props }) {
    return (_jsx(UnifiedSidebar, { homeItem: homeItem, moduleTitle: moduleTitle, useGlobalNavigation: useGlobalNavigation, ...props }));
}
