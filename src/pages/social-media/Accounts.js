import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
const SocialMediaAccounts = () => {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Social Media Accounts" }), _jsx("p", { className: "text-muted-foreground", children: "Manage connected social media profiles" })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Account Management" }), _jsx(CardDescription, { children: "Connect and manage social media accounts" })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Social media account management features will be available in future releases." }) })] })] }));
};
export default SocialMediaAccounts;
