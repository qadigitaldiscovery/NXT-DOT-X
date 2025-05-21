import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
const GuideStep = ({ stepNumber, title, description }) => (_jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "bg-purple-100 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center", children: _jsx("span", { className: "font-bold text-purple-600", children: stepNumber }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: title }), _jsx("p", { className: "text-sm text-muted-foreground", children: description })] })] }));
export const GettingStartedGuide = () => {
    const steps = [
        {
            title: "Enroll Members",
            description: "Members can join the loyalty program and start earning points. Points are tracked automatically based on purchases."
        },
        {
            title: "Earn Points",
            description: "Members earn 1 point for every $1 spent on purchases. Additional points can be awarded for special promotions."
        },
        {
            title: "Redeem Rewards",
            description: "Members can redeem their points for various rewards including discounts, store credit, and exclusive benefits."
        },
        {
            title: "Track Performance",
            description: "Use the analytics dashboard to monitor program performance, member engagement, and redemption patterns."
        }
    ];
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Getting Started" }), _jsx(CardDescription, { children: "Learn how to use the loyalty program management system" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-6", children: steps.map((step, index) => (_jsx(GuideStep, { stepNumber: index + 1, title: step.title, description: step.description }, index))) }) })] }));
};
