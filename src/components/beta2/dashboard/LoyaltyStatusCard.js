import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Medal } from 'lucide-react';
export function LoyaltyStatusCard() {
    // Mock data - in a real app, this would come from a data hook
    const loyaltyData = {
        tier: 'Gold',
        points: 2450,
        nextTierPoints: 3000,
        progress: 82,
        benefits: ['Priority Support', 'Exclusive Offers', 'Free Shipping'],
    };
    return (_jsxs(Card, { className: "overflow-hidden", children: [_jsxs(CardHeader, { className: "bg-gradient-to-r from-amber-500 to-orange-600 text-white pb-3", children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Trophy, { className: "h-5 w-5" }), "Loyalty Status"] }), _jsx(CardDescription, { className: "text-amber-100", children: "Your current tier and progress" })] }), _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Medal, { className: "h-5 w-5 text-amber-500" }), _jsxs("span", { className: "text-lg font-semibold", children: [loyaltyData.tier, " Member"] })] }), _jsxs(Badge, { variant: "secondary", children: [loyaltyData.points, " Points"] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { children: "Progress to Platinum" }), _jsxs("span", { children: [loyaltyData.points, "/", loyaltyData.nextTierPoints, " pts"] })] }), _jsx(Progress, { value: loyaltyData.progress, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-sm font-medium text-muted-foreground", children: "Tier Benefits" }), _jsx("ul", { className: "list-disc list-inside space-y-1 pl-1", children: loyaltyData.benefits.map((benefit, index) => (_jsx("li", { className: "text-sm", children: benefit }, index))) })] })] }) })] }));
}
