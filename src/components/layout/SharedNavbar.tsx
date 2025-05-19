import { Button } from '@/components/ui/button';
import { Menu, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface SharedNavbarProps {
  onMenuClick: () => void;
  moduleTitle?: string;
}

export function SharedNavbar({ onMenuClick, moduleTitle }: SharedNavbarProps) {
  const location = useLocation();
  const getTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    return path.split('/').filter(Boolean).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' / ');
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">{moduleTitle || getTitle()}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

