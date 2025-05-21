import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
export function SearchBar({ value, onChange, placeholder = 'Search database...', searchTerm, setSearchTerm, }) {
    // Handle both new and old prop patterns
    const handleChange = (e) => {
        const newValue = e.target.value;
        if (onChange)
            onChange(newValue);
        if (setSearchTerm)
            setSearchTerm(newValue);
    };
    // Use searchTerm if provided, otherwise use value
    const inputValue = searchTerm !== undefined ? searchTerm : value;
    return (_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" }), _jsx(Input, { className: "pl-8", placeholder: placeholder, value: inputValue, onChange: handleChange })] }));
}
