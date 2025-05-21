import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSupplier } from '../../hooks/suppliers';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { CreditSummaryCard } from './credit/CreditSummaryCard';
import { GaugeRating } from './credit/GaugeRating';
import { PerformanceChart } from './performance/PerformanceChart';
import { ReportViewer } from './reports/ReportViewer';
export const SupplierDetail = ({ supplierId }) => {
    const { data: supplier, isLoading } = useSupplier(supplierId);
    if (isLoading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Supplier Details" }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex items-center justify-center p-8", children: "Loading supplier details..." }) })] }));
    }
    if (!supplier) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Supplier Details" }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex items-center justify-center p-8", children: "Supplier not found" }) })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: supplier.name }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Code" }), _jsx("p", { className: "font-medium", children: supplier.code })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Status" }), _jsx("p", { className: "font-medium capitalize", children: supplier.status })] }), supplier.contact_name && (_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Contact" }), _jsx("p", { className: "font-medium", children: supplier.contact_name })] })), supplier.email && (_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Email" }), _jsx("p", { className: "font-medium", children: supplier.email })] }))] }) })] }), _jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "performance", children: "Performance" }), _jsx(TabsTrigger, { value: "reports", children: "Reports" })] }), _jsx(TabsContent, { value: "overview", children: _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [supplier.creditRating && (_jsx(CreditSummaryCard, { rating: supplier.creditRating.rating, description: supplier.creditRating.description, limit: supplier.creditRating.limit, score: supplier.creditRating.score })), supplier.performance && (_jsx(GaugeRating, { value: supplier.performance.overall, maxValue: 100, label: "Overall Performance", description: "Based on delivery, quality, and responsiveness" }))] }) }), _jsx(TabsContent, { value: "performance", children: supplier.performance?.history && (_jsx(PerformanceChart, { data: supplier.performance.history, title: "Performance History", label: "Performance score over time" })) }), _jsx(TabsContent, { value: "reports", children: _jsx(ReportViewer, { reports: supplier.reports || [], onView: (report) => window.open(report.url, '_blank'), onDownload: (report) => {
                                const link = document.createElement('a');
                                link.href = report.url;
                                link.download = report.title;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            } }) })] })] }));
};
