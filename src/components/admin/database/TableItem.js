import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
export function TableItem({ name, description, onClick, table, refetchTables }) {
    const handleClick = () => {
        if (onClick)
            onClick();
        if (refetchTables && table) {
            // For backward compatibility
            console.log(`Table ${table.name} clicked`);
        }
    };
    // Use either direct name or table.name
    const displayName = table?.name || name || '';
    return (_jsxs("div", { className: "flex items-center justify-between border-b py-3 px-4 hover:bg-muted/50 cursor-pointer", onClick: handleClick, children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("div", { className: "font-medium", children: displayName }), (description || (table && `${table.row_count} rows, ${table.size}`)) && (_jsx("div", { className: "text-sm text-muted-foreground", children: description || (table && `${table.row_count} rows, ${table.size}`) }))] }), _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(ChevronRight, { className: "h-4 w-4" }) })] }));
}
