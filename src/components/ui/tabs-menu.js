import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
const TabsMenu = ({ items, value, onChange, className }) => {
    return (_jsx(Tabs, { value: value, onValueChange: onChange, className: cn("w-full", className), children: _jsx(TabsList, { className: "mb-4", children: items.map((item) => (_jsxs(TabsTrigger, { value: item.value, children: [item.icon && _jsx(item.icon, { className: "h-4 w-4 mr-1" }), item.label] }, item.value))) }) }));
};
export default TabsMenu;
