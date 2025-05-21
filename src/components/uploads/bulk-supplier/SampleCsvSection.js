import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export function SampleCsvSection() {
    const downloadSampleCsv = () => {
        // Create sample CSV content with required and optional fields
        const headers = ["name", "code", "contact_name", "email", "phone", "website", "payment_terms", "status"];
        const sampleData = [
            ["Acme Supplies", "ACME001", "John Doe", "john@acme.com", "+1-555-123-4567", "https://acme.com", "Net 30", "active"],
            ["GlobalTech", "GTECH002", "Jane Smith", "jane@globaltech.com", "+1-555-987-6543", "https://globaltech.com", "Net 45", "active"],
            ["Local Distributors", "LDIST003", "Robert Johnson", "robert@localdist.com", "+1-555-456-7890", "https://localdist.com", "Net 15", "active"]
        ];
        // Convert to CSV string
        const csvContent = [
            headers.join(','),
            ...sampleData.map(row => row.join(','))
        ].join('\n');
        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'sample_suppliers.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs(Alert, { children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Required CSV Format" }), _jsx(AlertDescription, { children: _jsxs("div", { className: "mt-2 space-y-2", children: [_jsx("p", { children: "Your CSV file must include the following headers:" }), _jsxs("div", { className: "flex flex-wrap gap-2 mt-1", children: [_jsx(Badge, { variant: "outline", className: "bg-red-50 text-red-800 hover:bg-red-100 border-red-200", children: "name*" }), _jsx(Badge, { variant: "outline", className: "bg-red-50 text-red-800 hover:bg-red-100 border-red-200", children: "code*" }), _jsx(Badge, { variant: "outline", children: "contact_name" }), _jsx(Badge, { variant: "outline", children: "email" }), _jsx(Badge, { variant: "outline", children: "phone" }), _jsx(Badge, { variant: "outline", children: "website" }), _jsx(Badge, { variant: "outline", children: "payment_terms" }), _jsx(Badge, { variant: "outline", children: "status" })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "* Required fields" })] }) })] }), _jsx("div", { className: "flex justify-end", children: _jsxs(Button, { variant: "outline", size: "sm", onClick: downloadSampleCsv, className: "flex items-center gap-1", children: [_jsx(Download, { className: "h-4 w-4" }), "Download Sample CSV"] }) })] }));
}
