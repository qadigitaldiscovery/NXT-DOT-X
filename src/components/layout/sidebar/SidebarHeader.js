import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
export const SidebarHeader = ({ open, onToggle }) => {
    const isMobile = useIsMobile();
    return (_jsxs("div", { className: cn("flex items-center justify-between p-4 border-b border-sidebar-border", !open && "md:justify-center"), children: [_jsx("div", { className: cn("flex items-center space-x-2", !open && "md:hidden"), children: open ? (_jsx("img", { src: "/lovable-uploads/80f9379c-254b-4238-9d1c-bb90577397d9.png", alt: "NXT DOT X", className: "h-8" })) : (_jsx("div", { className: "h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold", children: "NX" }) })) }), isMobile && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onToggle, className: "text-sidebar-foreground md:hidden", children: _jsx(ChevronLeft, { className: "h-5 w-5" }) }))] }));
};
