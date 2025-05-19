
import { Button } from '@/components/ui/button';
import { Menu, User, Settings, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SharedNavbarProps {
  onMenuClick: () => void;
  moduleTitle?: string;
}

export function SharedNavbar({ onMenuClick, moduleTitle }: SharedNavbarProps) {
  const location = useLocation();
  
  const getTitle = () => {
    if (moduleTitle) return moduleTitle;
    
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    
    // Format the path into a readable title (e.g., "/data-management/settings" -> "Data Management / Settings")
    return path.split('/').filter(Boolean).map(
      word => word.charAt(0).toUpperCase() + word.slice(1).replace(/-/g, ' ')
    ).join(' / ');
  };

  return (
    <header className={cn(
      "sticky top-0 z-30 flex h-14 items-center justify-between border-b",
      "bg-gradient-to-r from-redmetal-800 to-black text-white",
      "px-4 sm:px-6"
    )}>
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-redmetal-700 mr-2" 
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">{getTitle()}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-white hover:bg-redmetal-700">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-redmetal-700">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-redmetal-700">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
