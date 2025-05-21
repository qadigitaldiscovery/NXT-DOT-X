import { LayoutDashboard, Building2, FileText, FolderKanban, Briefcase, Users, Building, LineChart, GitCompareArrows, FileCode, Files, CalendarClock, AlertCircle, FileInput, Settings } from 'lucide-react';
export const sidebarMenu = [
    { key: 'dashboards', label: 'Dashboards', path: '/dashboards', icon: LayoutDashboard },
    { key: 'vendors', label: 'Vendors', path: '/vendors', icon: Building2 },
    { key: 'contracts', label: 'Contracts', path: '/contracts', icon: FileText },
    { key: 'categories', label: 'Categories', path: '/categories', icon: FolderKanban },
    { key: 'projects', label: 'Projects', path: '/projects', icon: Briefcase },
    { key: 'teams', label: 'Teams', path: '/teams', icon: Users },
    { key: 'entities', label: 'Entities', path: '/entities', icon: Building },
    { key: 'scorecards', label: 'Scorecards', path: '/scorecards', icon: LineChart },
    { key: 'workflows', label: 'Workflows', path: '/workflows', icon: GitCompareArrows },
    { key: 'ai-extract', label: 'AI Extract', path: '/ai-extract', icon: FileCode },
    { key: 'files', label: 'Files', path: '/files', icon: Files },
    { key: 'events', label: 'Events', path: '/events', icon: CalendarClock },
    { key: 'risk-register', label: 'Risk Register', path: '/risk-register', icon: AlertCircle },
    { key: 'requests', label: 'Submit Requests', path: '/requests', icon: FileInput },
    {
        key: 'admin',
        label: 'Admin Panel',
        path: '/admin',
        icon: Settings,
        permissions: ['admin'],
        children: [
            { key: 'api-settings', label: 'API Settings', path: '/admin/api', icon: FileCode },
            { key: 'user-roles', label: 'User & Roles', path: '/admin/users', icon: Users },
            { key: 'logs', label: 'Audit Logs', path: '/admin/logs', icon: CalendarClock },
        ]
    }
];
