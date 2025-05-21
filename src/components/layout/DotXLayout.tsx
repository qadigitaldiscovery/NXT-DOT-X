
import { Outlet } from 'react-router-dom';
import { SharedNavbar } from './SharedNavbar';
import { Sidebar } from '@/components/ui/sidebar';

export function DotXLayout() {
  const handleMenuClick = () => {
    console.log('Menu clicked');
    // Implement menu toggle functionality if needed
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="flex flex-1">
        <Sidebar className="border-r bg-black/80 backdrop-blur-sm text-white">
          {/* Sidebar content can be added here if needed */}
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <SharedNavbar onMenuClick={handleMenuClick} moduleTitle="DOT-X COMMAND CENTER" />
          <main className="flex-1 overflow-auto p-6 text-white">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DotXLayout;
