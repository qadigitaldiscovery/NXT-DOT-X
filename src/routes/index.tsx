import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute          from '@/components/ProtectedRoute';
import RootHandler             from '@/components/RootHandler';
import DashboardLayout         from '@/components/layout/DashboardLayout';
import CustomerManagementLayout from '@/components/layout/CustomerManagementLayout';
import TradingSystemLayout     from '@/components/layout/TradingSystemLayout';
import { SidebarProvider }     from '@/components/ui/sidebar';

// lazy pages
const Landing           = lazy(() => import('@/pages/Landing'));
const MasterDash        = lazy(() => import('@/pages/MasterDash'));
const RAGDashboardPage  = lazy(() => import('@/pages/rag-dashboard/RAGDashboardPage'));
const PrototypeSelector = lazy(() => import('@/pages/PrototypeSelector'));
const CustomerForm      = lazy(() => import('@/components/customers/CustomerForm'));
const Beta1Dashboard    = lazy(() => import('@/pages/Beta1Dashboard'));

const BillingPlaceholder = () => (
  <div className="p-6 text-white">
    <h1 className="mb-4 text-2xl font-semibold">Billing Page</h1>
    <p>Billing information will go here.</p>
  </div>
);

/* ———————————————————————————————————————————————
   Single definitive list of routes (React-Router v6)
   ——————————————————————————————————————————————— */
export const routes: RouteObject[] = [
  /* public */
  { path: '/landing',      element: <Landing /> },
  { path: '/unauthorized', element: <Landing /> },
  { path: '/',             element: <RootHandler /> },

  /* protected dashboard area */
  {
    element: (
      <ProtectedRoute>
        <SidebarProvider>
          <DashboardLayout />
        </SidebarProvider>
      </ProtectedRoute>
    ),
    children: [
      { path: '/master',          element: <MasterDash /> },
      { path: '/dashboard/rag',   element: <RAGDashboardPage /> },
      { path: '/prototypes',      element: <PrototypeSelector /> },
      { path: '/beta1',           element: <Beta1Dashboard /> },

      /* trading-system subtree keeps its own layout */
      { path: '/trading-system/*', element: <TradingSystemLayout /> },

      /* redirect that used to sit in AppRoutes */
      {
        path: '/data-management/customers',
        element: <Navigate to="/customer-management/directory" replace />,
      },

      /* settings/billing */
      {
        path: '/settings/billing',
        element: <BillingPlaceholder />,
      },

      /* admin pages (your AdminRoutes() output) */
      /* --- paste <RouteObject> children from AdminRoutes here if you want them inline --- */
    ],
  },

  /* customer-management area (own sidebar + layout) */
  {
    element: (
      <ProtectedRoute>
        <SidebarProvider>
          <CustomerManagementLayout />
        </SidebarProvider>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/customer-management/new',
        element: <CustomerForm />,
      },
      {
        path: '/customer-management/edit/:id',
        element: <CustomerForm isEditing />,
      },
      {
        path: '/customer-management/directory',
        element: (
          <div className="p-8">
            <h1 className="mb-6 text-2xl font-bold">Customer Directory</h1>
            {/* Customer list would go here */}
          </div>
        ),
      },
    ],
  },

  /* catch-all  → landing */
  { path: '*', element: <Navigate to="/landing" replace /> },
];
