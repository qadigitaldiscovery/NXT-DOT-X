import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
const DataManagementSettings = () => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Data Management Settings" }), _jsx("p", { className: "text-muted-foreground", children: "Manage your application preferences" }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "User Preferences" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "displayName", children: "Display Name" }), _jsx(Input, { id: "displayName", defaultValue: "Admin User" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email Address" }), _jsx(Input, { id: "email", type: "email", defaultValue: "admin@example.com" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "darkMode", children: "Dark Mode" }), _jsx(Switch, { id: "darkMode" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "notifications", children: "Email Notifications" }), _jsx(Switch, { id: "notifications", defaultChecked: true })] }), _jsx(Button, { className: "mt-4", children: "Save Changes" })] })] })] }));
};
export default DataManagementSettings;
