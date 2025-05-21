
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Search, Menu, BellRing, Settings, UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SharedNavbarProps {
  onMenuClick?: () => void;
  moduleTitle?: string;
}

export function SharedNavbar({ onMenuClick, moduleTitle = "Dashboard" }: SharedNavbarProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-gray-900 text-white z-10 border-b border-gray-800 flex h-14 items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMenuClick} 
          className="md:hidden h-8 w-8 text-gray-300"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-lg font-semibold">{moduleTitle}</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            placeholder="Search..."
            className="bg-gray-800 border-gray-700 rounded pl-8 h-9 w-[200px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <Button variant="ghost" size="icon" className="ml-2 text-gray-300">
          <BellRing className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="ml-2 text-gray-300">
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="ml-2 gap-2">
              <UserCircle className="h-5 w-5" />
              <span className="hidden md:inline text-sm font-normal">
                {user?.email?.split('@')[0] || 'User'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
