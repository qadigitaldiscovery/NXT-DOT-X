import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const MasterDashHeader = ({ user }) => {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await signOut();
        navigate('/landing');
    };
    return (_jsx("header", { className: "shadow-md border-b border-white/10", children: _jsx("div", { className: "backdrop-blur-md bg-gradient-to-r from-black/80 via-[#a51919]/70 to-black/80", children: _jsxs("div", { className: "container mx-auto flex justify-between items-center h-16 px-4", children: [_jsx("div", { className: "flex items-center", children: _jsx("span", { className: "font-bold text-gradient bg-gradient-to-r from-white via-white/90 to-gray-300 bg-clip-text text-transparent text-4xl", children: "DOT-X  |  BUSINESS MANAGEMENT PLATFORM" }) }), _jsxs("div", { className: "flex items-center gap-4", children: [user && (_jsxs("div", { className: "text-sm text-white", children: ["Logged in as: ", _jsx("span", { className: "font-semibold", children: user.username }), _jsx("span", { className: "ml-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs border border-white/10", children: user.role })] })), _jsxs(Button, { variant: "ghost", onClick: handleLogout, className: "flex items-center gap-2 text-white hover:bg-[#a51919] transition-all duration-200", children: [_jsx(LogOut, { className: "h-4 w-4" }), "Logout"] })] })] }) }) }));
};
export default MasterDashHeader;
