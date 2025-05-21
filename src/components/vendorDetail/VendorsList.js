import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useVendors } from '@/hooks/useVendorDetail';
import { getCreditRating } from '@/utils/vendorCalculations';
export function VendorsList() {
    const { data: vendors, isLoading, error } = useVendors();
    const navigate = useNavigate();
    if (isLoading) {
        return _jsx("div", { className: "text-center py-8", children: "Loading vendors..." });
    }
    if (error) {
        return _jsx("div", { className: "text-center py-8 text-red-500", children: "Error loading vendors" });
    }
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-4", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Healthcare Suppliers" }), _jsx(Button, { onClick: () => navigate('/data-management/supplier-vendors/new'), children: "Add New Partner" })] }), _jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Company Name" }), _jsx(TableHead, { children: "Local Score" }), _jsx(TableHead, { children: "Risk Rating" }), _jsx(TableHead, { children: "Created" }), _jsx(TableHead, {})] }) }), _jsx(TableBody, { children: vendors?.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "text-center py-8 text-muted-foreground", children: "No vendors found. Get started by adding your first supplier." }) })) : (vendors?.map((vendor) => {
                                // Get rating for each vendor based on local score
                                const score = vendor.localScore ?? vendor.local_score;
                                const [ratingCode, riskDesc] = score
                                    ? getCreditRating(score)
                                    : ['N/A', 'Not Assessed'];
                                return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: vendor.company_name || vendor.name }), _jsx(TableCell, { children: score ?? 'N/A' }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: `w-5 h-5 rounded-full flex items-center justify-center text-xs text-white
                          ${ratingCode === 'A' ? 'bg-green-500' :
                                                            ratingCode === 'B' ? 'bg-lime-500' :
                                                                ratingCode === 'C' ? 'bg-yellow-500' :
                                                                    ratingCode === 'D' ? 'bg-orange-500' :
                                                                        ratingCode === 'E' ? 'bg-red-500' : 'bg-gray-400'}`, children: ratingCode }), _jsx("span", { children: riskDesc })] }) }), _jsx(TableCell, { children: vendor.created_at
                                                ? new Date(vendor.created_at).toLocaleDateString()
                                                : 'N/A' }), _jsx(TableCell, { children: _jsx(Button, { variant: "ghost", onClick: () => navigate(`/data-management/supplier-vendors?id=${vendor.id}&type=vendor`), children: "View Details" }) })] }, vendor.id));
                            })) })] }) })] }));
}
