
import { Outlet } from 'react-router-dom';
import { SharedNavbar } from './SharedNavbar';
import { SidebarProvider } from '@/context/SidebarContext';
import { UnifiedSidebar } from './UnifiedSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Home } from 'lucide-react';
import { NavItem } from './sidebar/types';

const homeItem: NavItem = {
  label: 'Back to Dashboard',
  href: '/dashboard',
  icon: Home
};

export function BrandMarketingLayout() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="flex flex-1">
          <UnifiedSidebar
            homeItem={homeItem}
            moduleTitle="Brand Marketing"
            useGlobalNavigation={true}
          />
          <div className="flex-1 flex flex-col">
            <SharedNavbar moduleTitle="Brand Marketing" />
            <main className="flex-1 overflow-auto p-6">
              <div className="max-w-7xl mx-auto">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Make sure we have both named and default exports
export default BrandMarketingLayout;
