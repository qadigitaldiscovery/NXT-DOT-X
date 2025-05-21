import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
export function DocumentSearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };
    return (_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" }), _jsx(Input, { className: "pl-8", placeholder: "Search documents...", value: searchTerm, onChange: handleSearchChange })] }));
}
