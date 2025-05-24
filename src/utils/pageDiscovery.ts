import React from 'react';

export interface PageInfo {
  name: string;
  path: string;
  component: React.ComponentType;
}

// This function dynamically imports all available pages
export const getAvailablePages = (): PageInfo[] => {
  const pages: PageInfo[] = [
    // Data Management Pages
    { name: 'Data Management Dashboard', path: '/data-management', component: React.lazy(() => import('../pages/data-management/DashboardHome')) },
    { name: 'Cost Analysis', path: '/data-management/cost-analysis', component: React.lazy(() => import('../pages/data-management/cost-management/CostAnalysis')) },
    { name: 'Suppliers Overview', path: '/data-management/suppliers', component: React.lazy(() => import('../pages/data-management/SuppliersOverviewPage')) },
    { name: 'Documents', path: '/data-management/documents', component: React.lazy(() => import('../pages/data-management/documents/DocumentsPage')) },
    { name: 'Export Data', path: '/data-management/export', component: React.lazy(() => import('../pages/data-management/data/ExportData')) },
    
    // Brand Marketing Pages
    { name: 'Brand Dashboard', path: '/brand-marketing', component: React.lazy(() => import('../pages/brand-marketing/BrandDashboard')) },
    { name: 'Brand Analytics', path: '/brand-marketing/analytics', component: React.lazy(() => import('../pages/brand-marketing/BrandAnalytics')) },
    { name: 'Brand Trust', path: '/brand-marketing/trust', component: React.lazy(() => import('../pages/brand-marketing/BrandTrust')) },
    { name: 'Market Perception', path: '/brand-marketing/perception', component: React.lazy(() => import('../pages/brand-marketing/MarketPerception')) },
    { name: 'Requesty AI', path: '/brand-marketing/requesty', component: React.lazy(() => import('../pages/brand-marketing/RequestyPage')) },
    
    // Loyalty Pages
    { name: 'Loyalty Dashboard', path: '/loyalty', component: React.lazy(() => import('../pages/LoyaltyDashboard')) },
    { name: 'Loyalty Analytics', path: '/loyalty/analytics', component: React.lazy(() => import('../pages/LoyaltyAnalytics')) },
    { name: 'Members', path: '/loyalty/members', component: React.lazy(() => import('../pages/LoyaltyMembers')) },
    { name: 'Rewards', path: '/loyalty/rewards', component: React.lazy(() => import('../pages/LoyaltyRewards')) },
    
    // Trading System Pages
    { name: 'Trading Dashboard', path: '/trading-system', component: React.lazy(() => import('../pages/TradingSystemDashboard')) },
    { name: 'Trading Analytics', path: '/trading-system/analytics', component: React.lazy(() => import('../pages/TradingSystemAnalytics')) },
    { name: 'Trading History', path: '/trading-system/history', component: React.lazy(() => import('../pages/TradingSystemHistory')) },
    { name: 'Trading Trades', path: '/trading-system/trades', component: React.lazy(() => import('../pages/TradingSystemTrades')) },
    
    // Project Management Pages
    { name: 'Projects Dashboard', path: '/project-management', component: React.lazy(() => import('../pages/project-management/ProjectsDashboardPage')) },
    { name: 'Kanban Board', path: '/project-management/kanban', component: React.lazy(() => import('../pages/project-management/KanbanBoardPage')) },
    { name: 'Gantt Chart', path: '/project-management/gantt', component: React.lazy(() => import('../pages/project-management/GanttChartPage')) },
    
    // RAG Dashboard Pages
    { name: 'RAG Dashboard', path: '/rag-dashboard', component: React.lazy(() => import('../pages/rag-dashboard/RAGDashboardPage')) },
    { name: 'RAG Analytics', path: '/rag-dashboard/analytics', component: React.lazy(() => import('../pages/RAGAnalytics')) },
    
    // Admin Pages
    { name: 'User Management', path: '/admin/users', component: React.lazy(() => import('../pages/admin/UserManagement')) },
    { name: 'Database Admin', path: '/admin/database', component: React.lazy(() => import('../pages/admin/DatabaseAdminPage')) },
    { name: 'Documentation', path: '/admin/documentation', component: React.lazy(() => import('../pages/admin/DocumentationPage')) },
    
    // Tech Hub Pages
    { name: 'Tech Hub Personas', path: '/tech-hub', component: React.lazy(() => import('../pages/TechHubPersonas')) },
    { name: 'Tech Hub Settings', path: '/tech-hub/settings', component: React.lazy(() => import('../pages/TechHubSettings')) },
    { name: 'APIs Management', path: '/tech-hub/apis', component: React.lazy(() => import('../pages/ApiManagementPage')) },
    
    // Social Media Pages
    { name: 'Social Media Dashboard', path: '/social-media', component: React.lazy(() => import('../pages/social-media/Dashboard')) },
    { name: 'Social Accounts', path: '/social-media/accounts', component: React.lazy(() => import('../pages/social-media/Accounts')) },
    { name: 'Social Calendar', path: '/social-media/calendar', component: React.lazy(() => import('../pages/social-media/Calendar')) },
    { name: 'Social Engagement', path: '/social-media/engagement', component: React.lazy(() => import('../pages/social-media/Engagement')) },
    
    // Customer Management Pages
    { name: 'Customer Dashboard', path: '/customer-management', component: React.lazy(() => import('../pages/customer-management/CustomerDashboard')) },
    { name: 'Customer Directory', path: '/customer-management/directory', component: React.lazy(() => import('../pages/customer-management/CustomerDirectoryPage')) },
    
    // DOT-X Pages
    { name: 'DOT-X Dashboard', path: '/dot-x', component: React.lazy(() => import('../pages/dot-x/Dashboard')) },
    { name: 'DOT-X API', path: '/dot-x/api', component: React.lazy(() => import('../pages/dot-x/Api')) },
    { name: 'DOT-X Data Services', path: '/dot-x/data-services', component: React.lazy(() => import('../pages/dot-x/DataServices')) },
    { name: 'DOT-X Plugins', path: '/dot-x/plugins', component: React.lazy(() => import('../pages/dot-x/Plugins')) },
    
    // Other Pages
    { name: 'Settings', path: '/settings', component: React.lazy(() => import('../pages/Settings')) },
    { name: 'WebDev Module', path: '/webdev', component: React.lazy(() => import('../pages/WebDevModule')) },
  ];

  return pages;
};
