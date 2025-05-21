import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { VendorsList } from '@/components/vendorDetail/VendorsList';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';
import { useVendors } from '@/hooks/useVendorDetail';
import { useSuppliers } from '@/hooks/use-suppliers';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, FileUp, BarChart2, Users, FileText, RefreshCw, Upload } from 'lucide-react';
import { vendorToPartner, supplierToPartner } from '@/types/partner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BulkSupplierUpload } from '@/components/uploads/BulkSupplierUpload';
export default function SupplierVendors() {
    const navigate = useNavigate();
    const { data: vendors = [], isLoading: vendorsLoading, refetch: refetchVendors } = useVendors();
    const { data: suppliers = [], isLoading: suppliersLoading, refetch: refetchSuppliers } = useSuppliers();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [partners, setPartners] = useState([]);
    const [activeTab, setActiveTab] = useState('unified');
    const [showBulkUploadDialog, setShowBulkUploadDialog] = useState(false);
    // Get URL parameters for redirects from old pages
    const location = window.location;
    const params = new URLSearchParams(location.search);
    const idParam = params.get('id');
    const typeParam = params.get('type');
    // Set appropriate tab based on URL parameters
    useEffect(() => {
        if (typeParam === 'vendor') {
            setActiveTab('vendors');
            if (idParam) {
                // Find the specific vendor in the list
                const vendor = vendors.find(v => v.id === idParam);
                if (vendor) {
                    // Could highlight this vendor or show details
                    console.log('Redirected to vendor:', vendor);
                }
            }
        }
        else if (typeParam === 'supplier') {
            setActiveTab('suppliers');
            if (idParam) {
                // Find the specific supplier in the list
                const supplier = suppliers.find(s => s.id === idParam);
                if (supplier) {
                    // Could highlight this supplier or show details
                    console.log('Redirected to supplier:', supplier);
                }
            }
        }
    }, [typeParam, idParam, vendors, suppliers]);
    // Process vendors and suppliers into unified partners
    useEffect(() => {
        const vendorPartners = vendors.map(vendor => vendorToPartner(vendor));
        const supplierPartners = suppliers.map(supplier => supplierToPartner(supplier));
        setPartners([...vendorPartners, ...supplierPartners]);
    }, [vendors, suppliers]);
    // Mock data for credit scores
    const creditScores = {
        A: 'Very Low Risk',
        B: 'Low Risk',
        C: 'Moderate Risk',
        D: 'High Risk',
        F: 'Very High Risk'
    };
    // Filter function for partners
    const filterPartners = (items, type, search) => {
        return items.filter(item => {
            // Filter by type
            if (type === 'vendor' && item.type !== 'vendor')
                return false;
            if (type === 'supplier' && item.type !== 'supplier')
                return false;
            if (type.startsWith('credit-') && item.credit_rating !== type.split('-')[1].toUpperCase())
                return false;
            // Filter by search term
            if (search && !item.name?.toLowerCase().includes(search.toLowerCase()))
                return false;
            return true;
        });
    };
    // Filtered partners based on current filter settings
    const filteredPartners = filterPartners(partners, filterType, searchTerm);
    // Handle refresh of partners data
    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await Promise.all([refetchVendors(), refetchSuppliers()]);
        }
        catch (error) {
            console.error("Error refreshing partners data", error);
        }
        finally {
            setIsRefreshing(false);
        }
    };
    // Handle bulk upload
    const handleBulkUpload = () => {
        setShowBulkUploadDialog(true);
    };
    return (_jsxs("div", { className: "container mx-auto py-6 space-y-8", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Supplier Vendors" }), _jsx("p", { className: "text-gray-500", children: "Unified management system for suppliers and vendors" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { onClick: () => navigate('/data-management/suppliers/new'), variant: "default", children: "Add New Supplier" }), _jsxs(Button, { onClick: handleBulkUpload, variant: "outline", children: [_jsx(Upload, { className: "mr-2 h-4 w-4" }), "Bulk Import"] }), _jsxs(Button, { onClick: handleRefresh, variant: "outline", disabled: isRefreshing, children: [_jsx(RefreshCw, { className: `mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}` }), "Refresh"] }), _jsx(Button, { onClick: () => navigate('/data-management'), variant: "outline", children: "Back to Dashboard" })] })] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-start", children: [_jsxs(Card, { className: "w-full md:w-1/4", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quick Stats" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-blue-50 p-4 rounded-md", children: [_jsx("p", { className: "text-sm text-blue-800", children: "Total Partners" }), _jsx("p", { className: "text-2xl font-bold", children: partners.length })] }), _jsxs("div", { className: "bg-green-50 p-4 rounded-md", children: [_jsx("p", { className: "text-sm text-green-800", children: "Active" }), _jsx("p", { className: "text-2xl font-bold", children: partners.filter(p => p.status !== 'inactive').length })] }), _jsxs("div", { className: "bg-yellow-50 p-4 rounded-md", children: [_jsx("p", { className: "text-sm text-yellow-800", children: "Vendors" }), _jsx("p", { className: "text-2xl font-bold", children: partners.filter(p => p.type === 'vendor').length })] }), _jsxs("div", { className: "bg-purple-50 p-4 rounded-md", children: [_jsx("p", { className: "text-sm text-purple-800", children: "Suppliers" }), _jsx("p", { className: "text-2xl font-bold", children: partners.filter(p => p.type === 'supplier').length })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Quick Actions" }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { variant: "outline", className: "w-full justify-start", size: "sm", children: [_jsx(FileUp, { className: "mr-2 h-4 w-4" }), "Import Partners"] }), _jsxs(Button, { variant: "outline", className: "w-full justify-start", size: "sm", children: [_jsx(BarChart2, { className: "mr-2 h-4 w-4" }), "View Reports"] }), _jsxs(Button, { variant: "outline", className: "w-full justify-start", size: "sm", children: [_jsx(Users, { className: "mr-2 h-4 w-4" }), "Manage Contacts"] }), _jsxs(Button, { variant: "outline", className: "w-full justify-start", size: "sm", children: [_jsx(FileText, { className: "mr-2 h-4 w-4" }), "Export Data"] })] })] })] })] }), _jsxs(Card, { className: "w-full md:w-3/4", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [_jsx(CardTitle, { children: "Partners Directory" }), _jsxs("div", { className: "flex gap-2 w-full md:w-auto", children: [_jsxs("div", { className: "relative w-full md:w-64", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" }), _jsx(Input, { placeholder: "Search partners...", className: "pl-8", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsxs(Select, { value: filterType, onValueChange: setFilterType, children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Filter by type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Partners" }), _jsx(SelectItem, { value: "vendor", children: "Vendors Only" }), _jsx(SelectItem, { value: "supplier", children: "Suppliers Only" }), _jsx(SelectItem, { value: "credit-a", children: "Credit Score A" }), _jsx(SelectItem, { value: "credit-b", children: "Credit Score B" }), _jsx(SelectItem, { value: "credit-c", children: "Credit Score C+" })] })] })] })] }) }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: activeTab, onValueChange: (value) => setActiveTab(value), children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "unified", children: "Unified View" }), _jsx(TabsTrigger, { value: "vendors", children: "Vendors" }), _jsx(TabsTrigger, { value: "suppliers", children: "Suppliers" })] }), _jsx(TabsContent, { value: "unified", className: "mt-6", children: (vendorsLoading || suppliersLoading) ? (_jsxs("div", { className: "p-12 text-center", children: [_jsx(RefreshCw, { className: "h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" }), _jsx("p", { children: "Loading partners data..." })] })) : filteredPartners.length === 0 ? (_jsxs("div", { className: "p-12 text-center", children: [_jsx("p", { className: "text-gray-500", children: "No partners found matching your filters." }), _jsx(Button, { onClick: () => { setFilterType('all'); setSearchTerm(''); }, variant: "link", className: "mt-2", children: "Clear filters" })] })) : (_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Type" }), _jsx(TableHead, { children: "Credit Rating" }), _jsx(TableHead, { children: "Credit Score" }), _jsx(TableHead, { children: "Annual Spend" }), _jsx(TableHead, { children: "Status" })] }) }), _jsx(TableBody, { children: filteredPartners.slice(0, 20).map((partner, index) => (_jsxs(TableRow, { className: "cursor-pointer hover:bg-gray-50", onClick: () => {
                                                                const path = `/data-management/suppliers?id=${partner.id || index}`;
                                                                navigate(path);
                                                            }, children: [_jsx(TableCell, { className: "font-medium", children: partner.name }), _jsx(TableCell, { children: _jsx("span", { className: `${partner.type === 'vendor' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'} px-2 py-1 rounded-full text-xs`, children: partner.type === 'vendor' ? 'Vendor' : 'Supplier' }) }), _jsx(TableCell, { children: partner.credit_rating }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: `h-3 w-3 rounded-full mr-2 ${partner.credit_rating === 'A' ? 'bg-green-500' :
                                                                                    partner.credit_rating === 'B' ? 'bg-yellow-500' :
                                                                                        partner.credit_rating === 'C' ? 'bg-orange-500' : 'bg-red-500'}` }), creditScores[partner.credit_rating || 'B']] }) }), _jsxs(TableCell, { children: ["$", typeof partner.annual_spend === 'string' ? partner.annual_spend : partner.annual_spend?.toFixed(0)] }), _jsx(TableCell, { children: _jsx("span", { className: `${partner.status === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} px-2 py-1 rounded-full text-xs`, children: partner.status || 'Active' }) })] }, `${partner.type}-${index}`))) })] })) }), _jsx(TabsContent, { value: "vendors", className: "mt-6", children: _jsx("div", { className: "max-h-[500px] overflow-y-auto", children: _jsx(VendorsList, {}) }) }), _jsx(TabsContent, { value: "suppliers", className: "mt-6", children: _jsx("div", { className: "max-h-[500px] overflow-y-auto", children: _jsx(SuppliersTable, {}) }) })] }) })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Credit Risk Overview" }), _jsx(CardDescription, { children: "Review credit ratings across all partners" })] }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-4", children: Object.entries(creditScores).map(([rating, description]) => {
                                const count = partners.filter(p => p.credit_rating === rating).length;
                                return (_jsx(Card, { className: `border-l-4 ${rating === 'A' ? 'border-l-green-500' :
                                        rating === 'B' ? 'border-l-yellow-500' :
                                            rating === 'C' ? 'border-l-orange-500' :
                                                rating === 'D' ? 'border-l-red-500' : 'border-l-red-700'}`, children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Rating" }), _jsx("p", { className: "text-3xl font-bold", children: rating }), _jsx("p", { className: "text-sm mt-1", children: description })] }), _jsx("div", { className: `h-12 w-12 rounded-full flex items-center justify-center ${rating === 'A' ? 'bg-green-100 text-green-800' :
                                                        rating === 'B' ? 'bg-yellow-100 text-yellow-800' :
                                                            rating === 'C' ? 'bg-orange-100 text-orange-800' :
                                                                rating === 'D' ? 'bg-red-100 text-red-800' : 'bg-red-200 text-red-900'}`, children: _jsx("span", { className: "text-lg font-bold", children: count || 0 }) })] }) }) }, rating));
                            }) }) })] }), _jsx(Dialog, { open: showBulkUploadDialog, onOpenChange: setShowBulkUploadDialog, children: _jsxs(DialogContent, { className: "max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Bulk Supplier Import" }) }), _jsx(BulkSupplierUpload, {})] }) })] }));
}
