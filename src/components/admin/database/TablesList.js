import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { TableItem } from './TableItem';
import { SearchBar } from './SearchBar';
import { RefreshButton } from './RefreshButton';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';
const TablesList = ({ tables, isLoading, searchTerm, setSearchTerm, refetchTables }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const handleRefreshTables = async () => {
        try {
            setIsRefreshing(true);
            await refetchTables();
            toast.success("Table list refreshed successfully");
        }
        catch (error) {
            toast.error("Failed to refresh tables");
            console.error("Refresh error:", error);
        }
        finally {
            setIsRefreshing(false);
        }
    };
    return (_jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-center pb-4", children: [_jsx(SearchBar, { value: searchTerm, onChange: setSearchTerm, searchTerm: searchTerm, setSearchTerm: setSearchTerm }), _jsx(RefreshButton, { isRefreshing: isRefreshing, onRefresh: handleRefreshTables })] }), isLoading ? (_jsx(LoadingState, {})) : (_jsxs("div", { className: "grid grid-cols-1 gap-4", children: [tables && tables.map((table) => (_jsx(TableItem, { table: table, refetchTables: refetchTables }, table.name))), tables && tables.length === 0 && _jsx(EmptyState, {})] }))] }) }));
};
export default TablesList;
