import { Button } from '@/components/ui/button';
import { MenuIcon, BellIcon, UserCircle,  } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSupplierCosts } from '@/hooks/use-supplier-costs';
import { useSupplierUploads } from '@/hooks/use-supplier-uploads';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({
  onMenuClick
}: NavbarProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Get unread notifications count
  const { data: pendingCosts = [] } = useSupplierCosts({ status: 'pending_approval' });
  const { data: pendingUploads = [] } = useSupplierUploads();
  
  const totalPending = pendingCosts.length + pendingUploads.filter(u => u.status === 'pending').length;
  
  const handleLogout = () => {
    logout();
    navigate('/landing');
  };
  
  return <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          {isMobile && <Button variant="ghost" size="icon" onClick={onMenuClick}>
              <MenuIcon className="h-5 w-5" />
            </Button>}
          <div className="ml-4 flex items-center gap-2">
            <h2 className="text-dashboard-heading font-extrabold text-4xl px-0 mx-px">DATA MANAGEMENT MODULE </h2>
            
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
                {totalPending > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalPending}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {pendingCosts.length > 0 && (
                <DropdownMenuItem onClick={() => navigate('/beta1/costs')}>
                  <div className="flex flex-col w-full">
                    <span className="font-medium">
                      {pendingCosts.length} cost{pendingCosts.length !== 1 ? 's' : ''} pending approval
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Click to view and approve
                    </span>
                  </div>
                </DropdownMenuItem>
              )}
              
              {pendingUploads.filter(u => u.status === 'pending').map(upload => (
                <DropdownMenuItem key={upload.id} onClick={() => navigate('/beta1/uploads')}>
                  <div className="flex flex-col w-full">
                    <span className="font-medium">
                      File ready for processing: {upload.file_name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Click to process supplier file
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
              
              {totalPending === 0 && (
                <div className="py-4 text-center text-muted-foreground">
                  No new notifications
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{user?.username || 'User'} ({user?.role || 'Unknown'})</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/users')}>User Management</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>;
};
