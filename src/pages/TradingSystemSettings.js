import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const TradingSystemSettings = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Settings" }), _jsx("p", { className: "text-muted-foreground", children: "Trading System settings and configuration" })] }), _jsx(Button, { variant: "outline", onClick: () => navigate('/trading-system'), children: "Back to Dashboard" })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Trading System Settings" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Trading System settings options will be available in future releases." }) })] })] }));
};
export default TradingSystemSettings;
