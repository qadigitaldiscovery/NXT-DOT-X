import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon, BellIcon, UserCircle, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
interface NavbarProps {
  onMenuClick: () => void;
}
export const Navbar = ({
  onMenuClick
}: NavbarProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/landing');
  };
  return <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          {isMobile && <Button variant="ghost" size="icon" onClick={onMenuClick}>
              <MenuIcon className="h-5 w-5" />
            </Button>}
          <div className="ml-4 flex items-center gap-2">
            <h2 className="text-dashboard-heading font-extrabold text-4xl px-0 mx-px">DATA MANAGEMENT MODULE </h2>
            
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>;
};