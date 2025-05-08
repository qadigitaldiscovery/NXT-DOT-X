import React from 'react';
// Old Navbar and Sidebar are removed
// import { Navbar } from './Navbar';
// import { Sidebar } from './Sidebar';
import { SharedSidebar } from './SharedSidebar'; // Import SharedSidebar
import { SharedNavbar } from './SharedNavbar';   // Import SharedNavbar
import { useIsMobile } from '@/hooks/use-mobile';

// Import items needed for Data Management notifications, if they are to be re-added here
import { Button } from '@/components/ui/button';
import { BellIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSupplierCosts } from '@/hooks/use-supplier-costs';
import { useSupplierUploads } from '@/hooks/use-supplier-uploads';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Re-import necessary icons for nav items
import { 
  Users, FileUp, Database, BarChart3, LineChart, ArrowDownUp, FileDown, FileCode, 
  Settings // Keep Settings if used elsewhere or potentially for module settings link
} from 'lucide-react';

// Define or import NavItem/NavCategory types if not exported from SharedSidebar
interface NavItem { label: string; icon: React.ElementType; path: string; }
interface NavCategory { name: string; items: NavItem[]; }

interface DashboardLayoutProps {
  children: React.ReactNode;
  // title prop is now handled by SharedNavbar via moduleTitle
  // navItems prop is now handled by SharedSidebar
}

// Define Data Management specific navigation items
const dataManagementNavItems: NavCategory[] = [
  { 
    name: "Suppliers", 
    items: [
      { label: 'Suppliers', icon: Users, path: '/data-management/suppliers' },
      // Add other supplier related links if needed, e.g., New Supplier, maybe Costs under a supplier?
    ]
  },
  { 
    name: "Uploads", 
    items: [
      { label: 'File Uploads', icon: FileUp, path: '/data-management/uploads' },
      // Add New Upload link?
    ]
  },
  { 
    name: "Costing & Pricing", 
    items: [
      { label: 'Supplier Costing', icon: Database, path: '/data-management/supplier-costing' }, // Link to the page we added
      { label: 'Cost Analysis', icon: BarChart3, path: '/data-management/cost-analysis' },
      { label: 'Competitor Pricing', icon: LineChart, path: '/data-management/competitor-pricing' },
      { label: 'Price Management', icon: ArrowDownUp, path: '/data-management/price-management' }
    ]
  },
  { 
    name: "Data Utilities", 
    items: [
      { label: 'Exports', icon: FileDown, path: '/data-management/exports' },
      { label: 'API Management', icon: FileCode, path: '/data-management/apis' },
      // { label: 'Settings', icon: Settings, path: '/data-management/settings' } // Module settings, might differ from global
    ]
  }
  // Add other categories like Reports, Settings for this module if applicable
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate(); // For notification clicks

  // Data Management specific notification logic
  const { data: pendingCosts = [] } = useSupplierCosts({ status: 'pending_approval' });
  const { data: pendingUploads = [] } = useSupplierUploads();
  const totalPending = pendingCosts.length + pendingUploads.filter(u => u.status === 'pending').length;

  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const textColor = 'text-gray-200'; // For consistency if used in notification button

  const dataManagementNotificationArea = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("relative text-gray-500 hover:bg-gray-100")}>
          <BellIcon className="h-5 w-5" />
          {totalPending > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs">{totalPending}</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-white border-gray-200 text-gray-700 shadow-lg">
        <DropdownMenuLabel className="text-gray-800 font-medium">Data Management Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200" />
        {pendingCosts.length > 0 && (
          <DropdownMenuItem onClick={() => navigate('/data-management/supplier-costing')} className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700">
            <div className="flex flex-col w-full"><span className="font-medium text-gray-800">{pendingCosts.length} cost{pendingCosts.length !== 1 ? 's' : ''} pending approval</span><span className="text-xs text-gray-500">Click to view</span></div>
          </DropdownMenuItem>
        )}
        {pendingUploads.filter(u => u.status === 'pending').map(upload => (
          <DropdownMenuItem key={upload.id} onClick={() => navigate('/data-management/uploads')} className="hover:bg-gray-100 focus:bg-gray-100 text-gray-700">
            <div className="flex flex-col w-full"><span className="font-medium text-gray-800">File ready: {upload.file_name}</span><span className="text-xs text-gray-500">Click to process</span></div>
          </DropdownMenuItem>
        ))}
        {totalPending === 0 && (<div className="py-4 text-center text-gray-400">No new notifications</div>)}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <SharedSidebar 
        open={sidebarOpen} 
        onToggle={toggleSidebar} 
      />
      <div className={cn(
          "flex flex-col flex-1 overflow-hidden",
          // "md:rounded-tl-xl" // Removing rounded corner based on new screenshot style
        )}>
        <SharedNavbar 
          onMenuClick={toggleSidebar} // Pass the toggle handler to the button in Navbar
          moduleTitle="Data Management" 
          notificationArea={dataManagementNotificationArea} 
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white"> {/* Changed content bg to white */}
          {children}
        </main>
      </div>
    </div>
  );
};
