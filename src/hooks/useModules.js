import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
export function useModules() {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    useEffect(() => {
        async function fetchModules() {
            try {
                setLoading(true);
                setError(null);
                // In a real application, this data would come from a database
                // For this demo, we'll use hardcoded data
                const availableModules = [
                    {
                        id: 'data-management',
                        name: 'Data Management',
                        path: '/dashboard/data-management',
                        description: 'Manage and analyze business data',
                        status: 'enabled',
                        features: [
                            { name: 'Cost Analysis', path: '/dashboard/data-management/cost-analysis' },
                            { name: 'Supplier Costing', path: '/dashboard/data-management/supplier-costing' },
                            { name: 'Document Management', path: '/dashboard/data-management/documents' },
                            { name: 'Price Management', path: '/dashboard/data-management/pricing' },
                        ],
                    },
                    {
                        id: 'social-media',
                        name: 'Social Media',
                        path: '/dashboard/social-media',
                        description: 'Manage social media accounts and analytics',
                        status: 'enabled',
                        features: [
                            { name: 'Accounts', path: '/dashboard/social-media/accounts' },
                            { name: 'Calendar', path: '/dashboard/social-media/calendar' },
                            { name: 'Engagement', path: '/dashboard/social-media/engagement' },
                            { name: 'Settings', path: '/dashboard/social-media/settings' },
                        ],
                    },
                    {
                        id: 'brand-marketing',
                        name: 'Brand Marketing',
                        path: '/dashboard/brand-marketing',
                        description: 'Manage brand marketing strategies',
                        status: 'enabled',
                        features: [
                            { name: 'SEO Keywords', path: '/dashboard/brand-marketing/keywords' },
                            { name: 'Brand Trust', path: '/dashboard/brand-marketing/trust' },
                            { name: 'Market Perception', path: '/dashboard/brand-marketing/perception' },
                        ],
                    },
                    {
                        id: 'trading-system',
                        name: 'Trading System',
                        path: '/dashboard/trading-system',
                        description: 'Manage trading activities',
                        status: 'enabled',
                        features: [
                            { name: 'Dashboard', path: '/dashboard/trading-system/dashboard' },
                            { name: 'Trades', path: '/dashboard/trading-system/trades' },
                            { name: 'History', path: '/dashboard/trading-system/history' },
                            { name: 'Analytics', path: '/dashboard/trading-system/analytics' },
                        ],
                    },
                    {
                        id: 'project-management',
                        name: 'Project Management',
                        path: '/dashboard/project-management',
                        description: 'Manage projects and tasks',
                        status: 'enabled',
                        features: [
                            { name: 'Dashboard', path: '/dashboard/project-management/dashboard' },
                            { name: 'Kanban', path: '/dashboard/project-management/kanban' },
                            { name: 'Gantt', path: '/dashboard/project-management/gantt' },
                        ],
                    },
                    {
                        id: 'dot-x',
                        name: 'DotX',
                        path: '/dashboard/dot-x',
                        description: 'Advanced Dot-X platform tools',
                        status: 'enabled',
                        features: [
                            { name: 'Dashboard', path: '/dashboard/dot-x/dashboard' },
                            { name: 'API', path: '/dashboard/dot-x/api' },
                            { name: 'Data Services', path: '/dashboard/dot-x/data-services' },
                            { name: 'Plugins', path: '/dashboard/dot-x/plugins' },
                        ],
                    },
                    {
                        id: 'tech-hub',
                        name: 'Tech Hub',
                        path: '/dashboard/tech-hub',
                        description: 'Access to technical resources and tools',
                        status: 'enabled',
                        features: [
                            { name: 'Personas', path: '/dashboard/tech-hub/personas' },
                            { name: 'Tech Config', path: '/dashboard/tech-hub/config' },
                        ],
                    },
                    {
                        id: 'communications',
                        name: 'Communications',
                        path: '/dashboard/communications',
                        description: 'Manage customer communications',
                        status: 'enabled',
                    },
                    {
                        id: 'automation-workflow',
                        name: 'Workflow Automation',
                        path: '/dashboard/automation-workflow',
                        description: 'Automate business processes',
                        status: 'enabled',
                    },
                    {
                        id: 'operations',
                        name: 'Operations',
                        path: '/dashboard/operations',
                        description: 'Manage business operations',
                        status: 'enabled',
                    },
                    {
                        id: 'web-services',
                        name: 'Web Services',
                        path: '/dashboard/web-services',
                        description: 'Configure and manage web services',
                        status: 'enabled',
                    },
                ];
                setModules(availableModules);
                setLoading(false);
            }
            catch (error) {
                console.error('Error fetching modules:', error);
                setError('Failed to load modules.');
                setLoading(false);
            }
        }
        fetchModules();
    }, [user]);
    return { modules, loading, error };
}
