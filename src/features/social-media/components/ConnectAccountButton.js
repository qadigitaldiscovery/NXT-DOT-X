import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";
export function ConnectAccountButton({ onConnect }) {
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleConnect = () => {
        if (selectedPlatform) {
            onConnect(selectedPlatform);
            setIsDialogOpen(false);
            setSelectedPlatform('');
        }
    };
    const platformOptions = [
        { value: 'twitter', label: 'Twitter / X' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'tiktok', label: 'TikTok' },
        { value: 'pinterest', label: 'Pinterest' },
        { value: 'youtube', label: 'YouTube' }
    ];
    return (_jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx("a", { href: "#", onClick: (e) => {
                        e.preventDefault();
                        setIsDialogOpen(true);
                    }, className: "w-full h-36 flex items-center justify-center border-2 border-dashed bg-muted/50 hover:bg-muted rounded-md", "aria-label": "Connect new social media account", children: _jsxs("div", { className: "flex flex-col items-center justify-center", children: [_jsx(PlusCircle, { className: "h-8 w-8 mb-2", "aria-hidden": "true" }), _jsx("span", { className: "font-medium", children: "Connect Account" })] }) }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Connect Social Media Account" }), _jsx(DialogDescription, { children: "Select a platform to connect your social media account." })] }), _jsx("div", { className: "grid gap-4 py-4", children: _jsx("div", { className: "grid grid-cols-4 items-center gap-4", children: _jsxs(Select, { value: selectedPlatform, onValueChange: (value) => setSelectedPlatform(value), children: [_jsx(SelectTrigger, { className: "col-span-4", children: _jsx(SelectValue, { placeholder: "Select platform" }) }), _jsx(SelectContent, { children: platformOptions.map((platform) => (_jsx(SelectItem, { value: platform.value, children: platform.label }, platform.value))) })] }) }) }), _jsx("div", { className: "flex justify-end", children: _jsx("a", { href: "#", onClick: (e) => {
                                e.preventDefault();
                                handleConnect();
                            }, className: cn("inline-flex items-center justify-center rounded-md text-sm font-medium", "bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4", !selectedPlatform && "opacity-50 pointer-events-none"), "aria-label": "Connect to selected platform", children: "Connect Account" }) })] })] }));
}
