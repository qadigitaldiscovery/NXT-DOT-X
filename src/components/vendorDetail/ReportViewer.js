import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getReportUrl } from '@/services/vendorApi';
import { FileText, Download } from 'lucide-react';
import { useFetchCreditReport } from '@/hooks/useVendorDetail';
export function ReportViewer({ report, vendorId }) {
    const [url, setUrl] = useState(null);
    const { mutate: fetchReport, isPending } = useFetchCreditReport(vendorId);
    // Function to get and open the report
    const handleViewReport = async () => {
        if (!report?.file_path)
            return;
        try {
            const reportUrl = await getReportUrl(report.file_path);
            setUrl(reportUrl);
            window.open(reportUrl, '_blank');
        }
        catch (error) {
            console.error('Error getting report URL:', error);
        }
    };
    // Function to fetch a new credit report
    const handleFetchReport = () => {
        fetchReport();
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-xl flex items-center", children: [_jsx(FileText, { className: "mr-2", size: 20, "aria-hidden": "true" }), "Credit Reports"] }) }), _jsxs(CardContent, { children: [report ? (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Latest Report" }), _jsx("p", { className: "text-sm text-muted-foreground", children: new Date(report.fetched_at).toLocaleDateString() })] }), _jsxs("a", { href: "#", className: "inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", onClick: (e) => {
                                        e.preventDefault();
                                        handleViewReport();
                                    }, "aria-label": "View credit report", children: [_jsx(Download, { className: "mr-2", size: 16, "aria-hidden": "true" }), "View Report"] })] }) })) : (_jsx("div", { className: "space-y-4", children: _jsx("p", { className: "text-muted-foreground", children: "No reports available for this vendor." }) })), _jsxs("div", { className: "mt-4 border-t pt-4", children: [_jsx("a", { href: "#", onClick: (e) => {
                                    e.preventDefault();
                                    handleFetchReport();
                                }, className: `inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline ${isPending ? 'opacity-50 pointer-events-none' : ''}`, "aria-label": "Request new credit report", children: isPending ? 'Fetching...' : 'Request New Credit Report' }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Fetch the latest credit information from our providers." })] })] })] }));
}
