import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
interface MasterDashHeaderProps {
  user: {
    username: string;
    role: string;
  } | null;
}
const MasterDashHeader: React.FC<MasterDashHeaderProps> = ({
  user
}) => {
  const {
    logout
  } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/landing');
  };
  return <header className="shadow-md border-b border-white/10">
      {/* Dark red/black frosted glass effect */}
      <div className="backdrop-blur-md bg-gradient-to-r from-black/80 via-[#a51919]/70 to-black/80">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center">
            <span className="font-bold text-gradient bg-gradient-to-r from-white via-white/90 to-gray-300 bg-clip-text text-transparent text-4xl">DOT-X  |  BUSINESS MANAGEMENT PLATFORM</span>
          </div>
          <div className="flex items-center gap-4">
            {user && <div className="text-sm text-white">
                Logged in as: <span className="font-semibold">{user.username}</span>
                <span className="ml-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs border border-white/10">{user.role}</span>
              </div>}
            <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 text-white hover:bg-[#a51919] transition-all duration-200">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>;
};
export default MasterDashHeader;