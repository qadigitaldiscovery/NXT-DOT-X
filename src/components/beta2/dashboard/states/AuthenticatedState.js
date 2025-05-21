import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
export const AuthenticatedState = ({ account }) => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-bold", children: "Welcome back, Valued Member!" }), _jsxs("p", { children: ["You have ", _jsx("span", { className: "font-bold text-xl", children: account.points_balance }), " points available"] }), _jsxs("p", { className: "text-sm text-white/80", children: ["Current tier: ", account.tier_level] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "secondary", onClick: () => navigate('/beta2/members'), children: "View Dashboard" }), _jsx(Button, { variant: "outline", className: "bg-transparent text-white border-white hover:bg-white/10", onClick: () => navigate('/beta2/rewards'), children: "Redeem Rewards" })] })] }));
};
