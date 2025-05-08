
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface MasterDashHeaderProps {
  user: { username: string; role: string } | null;
}

const MasterDashHeader: React.FC<MasterDashHeaderProps> = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  return (
    <header className="text-white shadow-sm bg-slate-700/80 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold">DOT-X  |  BUSINESS MANAGEMENT PLATFORM</span>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="text-sm">
              Logged in as: <span className="font-semibold">{user.username}</span>
              <span className="ml-2 px-2 py-1 bg-slate-600 rounded-full text-xs">{user.role}</span>
            </div>
          )}
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 text-white hover:bg-[#a51919]">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MasterDashHeader;
