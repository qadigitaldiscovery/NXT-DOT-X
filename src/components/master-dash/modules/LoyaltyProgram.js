import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgePercent } from "lucide-react";
const LoyaltyProgram = () => {
    return (_jsxs(Card, { className: "col-span-1", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg font-bold", children: "Loyalty Program" }), _jsx(CardDescription, { children: "Manage customer rewards and points" })] }), _jsx(BadgePercent, { className: "h-4 w-4 text-muted-foreground" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Active Members:" }), _jsx("span", { className: "font-medium", children: "8,492" })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Total Points:" }), _jsx("span", { className: "font-medium", children: "1.2M" })] }), _jsx("div", { className: "mt-2", children: _jsx(Button, { size: "sm", children: "Manage Program" }) })] }) })] }));
};
export default LoyaltyProgram;
