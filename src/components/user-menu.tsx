
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { UserCircle, LogOut, Settings, UserPlus, ShieldCheck, Database } from "lucide-react";

export function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <UserCircle className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username || "Guest"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
            {user?.role && <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1" />
              {user.role}
            </p>}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          <Settings className="h-4 w-4 mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        {user?.role === "admin" && (
          <>
            <DropdownMenuItem onClick={() => navigate("/admin/users")}>
              <UserPlus className="h-4 w-4 mr-2" />
              <span>User Management</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/admin/database")}>
              <Database className="h-4 w-4 mr-2" />
              <span>Database Admin</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
          <LogOut className="h-4 w-4 mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
