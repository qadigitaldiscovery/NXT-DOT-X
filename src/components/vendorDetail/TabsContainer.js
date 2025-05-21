import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { vendorDetailTabs } from '@/config/vendorTabs';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
export function TabsContainer({ children, vendorId }) {
    const [activeTab, setActiveTab] = useState('data');
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsxs(Tabs, { defaultValue: "data", value: activeTab, onValueChange: setActiveTab, className: "mt-4", children: [_jsx("div", { className: "border-b", children: _jsx(TabsList, { className: "overflow-x-auto w-full justify-start h-auto py-0 bg-transparent", children: vendorDetailTabs.map((tab) => {
                                if (tab.key === 'add') {
                                    return (_jsxs("button", { onClick: () => setAddDialogOpen(true), className: "ml-auto px-2 py-1 rounded-sm text-sm text-white bg-green-600 hover:bg-green-700 flex items-center", children: [_jsx(PlusCircle, { className: "h-4 w-4 mr-1" }), " ADD"] }, tab.key));
                                }
                                // Ensure tab.icon exists before rendering it as a component
                                const IconComponent = tab.icon;
                                return (_jsxs(TabsTrigger, { value: tab.key, className: "py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none", children: [IconComponent && _jsx(IconComponent, { className: "h-4 w-4 mr-2" }), tab.label] }, tab.key));
                            }) }) }), _jsx(TabsContent, { value: "data", className: "py-4", children: children }), vendorDetailTabs
                        .filter(tab => tab.key !== 'data' && tab.key !== 'add')
                        .map(tab => (_jsx(TabsContent, { value: tab.key, className: "py-4", children: _jsxs("div", { className: "text-center py-12 bg-muted/30 rounded-md", children: [_jsxs("h3", { className: "text-xl font-medium mb-2", children: [tab.label, " Module"] }), _jsx("p", { className: "text-muted-foreground", children: "This module is part of the complete Healthcare Supplier dashboard." })] }) }, tab.key)))] }), _jsx(Dialog, { open: addDialogOpen, onOpenChange: setAddDialogOpen, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Add New Record" }) }), _jsx("div", { className: "py-4 space-y-4", children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx("button", { className: "p-4 border rounded hover:bg-muted/50 text-center", children: "Add Credit Report" }), _jsx("button", { className: "p-4 border rounded hover:bg-muted/50 text-center", children: "Add Performance Data" }), _jsx("button", { className: "p-4 border rounded hover:bg-muted/50 text-center", children: "Add Contract" }), _jsx("button", { className: "p-4 border rounded hover:bg-muted/50 text-center", children: "Add Message" })] }) })] }) })] }));
}
