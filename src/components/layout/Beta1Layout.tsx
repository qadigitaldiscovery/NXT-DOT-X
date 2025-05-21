
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

export function Beta1Layout() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <UnifiedSidebar
            homeItem={homeItem}
            moduleTitle="Beta 1"
            useGlobalNavigation={true}
          />
          <div className="flex-1 flex flex-col">
            <SharedNavbar moduleTitle="Beta 1" />
            <main className="flex-1 overflow-auto p-4">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Beta1Layout;
