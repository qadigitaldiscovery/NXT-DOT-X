import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import KpiCard from '@/components/dashboard-v2/KpiCard';
const DashboardV2 = () => {
    return (_jsxs("div", { children: [_jsx("h1", { children: "Dashboard V2" }), _jsx(Button, { children: "Click me" }), _jsx(Card, { children: _jsx(KpiCard, { title: "Total Revenue", value: "$1M", change: 10 }) })] }));
};
export default DashboardV2;
