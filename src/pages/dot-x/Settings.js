import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
const DotXSettings = () => {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "DOT-X Settings" }), _jsx("p", { className: "text-muted-foreground", children: "Configure DOT-X platform preferences" })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Platform Settings" }), _jsx(CardDescription, { children: "Configure global DOT-X preferences" })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Settings configuration will be available in future releases." }) })] })] }));
};
export default DotXSettings;
