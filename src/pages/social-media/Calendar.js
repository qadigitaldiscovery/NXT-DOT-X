import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
const SocialMediaCalendar = () => {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Post Calendar" }), _jsx("p", { className: "text-muted-foreground", children: "Schedule and manage content publication" })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Content Calendar" }), _jsx(CardDescription, { children: "Plan and schedule social media posts" })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Content calendar features will be available in future releases." }) })] })] }));
};
export default SocialMediaCalendar;
