import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
export function DocumentViewer({ content, title, onClose }) {
    return (_jsxs(Card, { className: "h-full overflow-auto", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsx(CardTitle, { children: title }), _jsx(Button, { variant: "outline", size: "sm", onClick: onClose, children: "Close" })] }), _jsx(CardContent, { children: _jsx("div", { className: "prose max-w-none", children: _jsx(ReactMarkdown, { children: content }) }) })] }));
}
