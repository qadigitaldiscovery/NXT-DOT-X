
import React from 'react';
import { Users, BookOpen, Settings, Database } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AdminItem {
  id: string;
  name: string;
  icon: React.ReactElement;
  path: string;
}

const Administration: React.FC = () => {
  const navigate = useNavigate();
  
  const adminItems = [
    { 
      id: "users", 
      name: "Users", 
      icon: <Users className="h-5 w-5" />, 
      path: "/admin/users"
    },
    { 
      id: "customers", 
      name: "Customers", 
      icon: <Users className="h-5 w-5" />, 
      path: "/admin/customers"
    },
    { 
      id: "documentation", 
      name: "Documentation", 
      icon: <BookOpen className="h-5 w-5" />, 
      path: "/admin/documentation"
    },
    { 
      id: "system-settings", 
      name: "System Settings", 
      icon: <Settings className="h-5 w-5" />, 
      path: "/admin/system-settings"
    },
    { 
      id: "database", 
      name: "Database Admin", 
      icon: <Database className="h-5 w-5" />, 
      path: "/admin/database"
    }
  ];

  const handleAdminClick = (id: string, path: string) => {
    toast.info(`Navigating to ${id}`);
    navigate(path);
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-100">ADMINISTRATION</h2>
      
      <div className="grid grid-cols-1 gap-3">
        {adminItems.map(item => (
          <Card 
            key={item.id}
            className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer backdrop-blur-sm bg-black/50 border-white/20"
            onClick={() => handleAdminClick(item.id, item.path)}
          >
            <CardContent className="p-3 flex items-center">
              <div className="p-2 rounded-full bg-blue-500/30 mr-3">
                {React.cloneElement(item.icon, { className: `${item.icon.props.className} text-white` })}
              </div>
              <p className="text-sm font-medium text-white">{item.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Administration;
