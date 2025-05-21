
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

export function Beta2Layout() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="flex flex-1">
          <UnifiedSidebar
            homeItem={homeItem}
            moduleTitle="Beta 2"
            useGlobalNavigation={true}
          />
          <div className="flex-1 flex flex-col">
            <SharedNavbar moduleTitle="Beta 2" />
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

export default Beta2Layout;
