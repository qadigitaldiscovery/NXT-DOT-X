import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { UserCircle } from "lucide-react";
export function UserMenu() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut();
            // Navigation is handled in AuthContext
        }
        catch (error) {
            console.error("Error during logout:", error);
        }
    };
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "relative h-8 w-8 rounded-full", children: _jsx(UserCircle, { className: "h-6 w-6" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuLabel, { children: [user?.name || user?.email || "Guest", user?.role && _jsxs("span", { className: "text-xs ml-1 text-muted-foreground", children: ["(", user.role, ")"] })] }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { onClick: () => navigate("/settings"), children: "Settings" }), user?.role === "admin" && (_jsx(DropdownMenuItem, { onClick: () => navigate("/admin/users"), children: "User Management" })), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { onClick: handleLogout, className: "text-red-500", children: "Logout" })] })] }));
}
