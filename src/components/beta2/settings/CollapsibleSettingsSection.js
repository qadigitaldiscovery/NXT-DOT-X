import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
export const CollapsibleSettingsSection = ({ title, description, children, footerContent, defaultOpen = true, }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    return (_jsx(Card, { children: _jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: title }), description && _jsx(CardDescription, { children: description })] }), _jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "sm", children: [isOpen ? (_jsx(ChevronUp, { className: "h-4 w-4" })) : (_jsx(ChevronDown, { className: "h-4 w-4" })), _jsx("span", { className: "sr-only", children: "Toggle" })] }) })] }), _jsxs(CollapsibleContent, { children: [_jsx(CardContent, { className: "pt-0", children: children }), footerContent && (_jsx(CardFooter, { className: "flex justify-end gap-2", children: footerContent }))] })] }) }));
};
