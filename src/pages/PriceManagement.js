import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Save, ArrowUpRight, ArrowDownRight } from 'lucide-react';
// Mock product data
const productsData = [
    {
        id: 1,
        sku: 'AT-SPK-001',
        name: 'Premium Bookshelf Speaker',
        supplier: 'AudioTech Pro',
        cost: 249.99,
        discount: 15,
        currentRetail: 399.99,
        competitorAvg: 419.99,
        newRetail: 399.99
    },
    {
        id: 2,
        sku: 'VE-DSP-120',
        name: '4K HDR Display Monitor',
        supplier: 'VisualEdge',
        cost: 599.99,
        discount: 12,
        currentRetail: 899.99,
        competitorAvg: 879.99,
        newRetail: 899.99
    },
    {
        id: 3,
        sku: 'SV-AMP-220',
        name: 'Multi-Channel Power Amplifier',
        supplier: 'SoundVision',
        cost: 349.99,
        discount: 18,
        currentRetail: 599.99,
        competitorAvg: 629.99,
        newRetail: 599.99
    },
    {
        id: 4,
        sku: 'MM-MIC-320',
        name: 'Studio Condenser Microphone',
        supplier: 'MediaMax',
        cost: 129.99,
        discount: 10,
        currentRetail: 229.99,
        competitorAvg: 239.99,
        newRetail: 229.99
    },
    {
        id: 5,
        sku: 'AT-CAB-105',
        name: 'Premium HDMI Cable 3m',
        supplier: 'AudioTech Pro',
        cost: 24.99,
        discount: 25,
        currentRetail: 49.99,
        competitorAvg: 54.99,
        newRetail: 49.99
    },
];
// Mock categories
const categories = [
    { id: 1, name: "All Categories" },
    { id: 2, name: "Speakers" },
    { id: 3, name: "Displays" },
    { id: 4, name: "Amplifiers" },
    { id: 5, name: "Microphones" },
    { id: 6, name: "Accessories" },
];
// Mock suppliers
const suppliers = [
    { id: 1, name: "All Suppliers" },
    { id: 2, name: "AudioTech Pro" },
    { id: 3, name: "VisualEdge" },
    { id: 4, name: "SoundVision" },
    { id: 5, name: "MediaMax" },
];
const PriceManagement = () => {
    const [selectedCategory, setSelectedCategory] = useState("1");
    const [selectedSupplier, setSelectedSupplier] = useState("1");
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState(productsData);
    const { toast } = useToast();
    const handleSaveChanges = () => {
        toast.success({
            title: "Changes Saved",
            description: "Your price changes have been saved successfully."
        });
    };
    const handlePriceChange = (id, newPrice) => {
        setProducts(products.map(product => product.id === id ? { ...product, newRetail: newPrice } : product));
    };
    const applyBulkPriceChange = (method, value) => {
        const newProducts = products.map(product => {
            let newPrice = product.newRetail;
            switch (method) {
                case "increase-percent":
                    newPrice = product.currentRetail * (1 + value / 100);
                    break;
                case "decrease-percent":
                    newPrice = product.currentRetail * (1 - value / 100);
                    break;
                case "match-competitor":
                    newPrice = product.competitorAvg;
                    break;
                case "beat-competitor":
                    newPrice = product.competitorAvg * (1 - value / 100);
                    break;
                case "fixed-margin":
                    // Calculate price that would give the desired margin percentage
                    const marginMultiplier = 1 / (1 - value / 100);
                    newPrice = product.cost * marginMultiplier;
                    break;
            }
            return { ...product, newRetail: Math.round(newPrice * 100) / 100 };
        });
        setProducts(newProducts);
        toast.success({
            title: "Bulk Update Applied",
            description: `Price changes have been calculated and applied to all visible products.`
        });
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Price Management" }), _jsxs(Tabs, { defaultValue: "product-list", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 mb-4", children: [_jsx(TabsTrigger, { value: "product-list", children: "Product List" }), _jsx(TabsTrigger, { value: "bulk-changes", children: "Bulk Price Changes" })] }), _jsxs(TabsContent, { value: "product-list", className: "space-y-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Product Filter" }), _jsx(CardDescription, { children: "Filter products by category, supplier or search term" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "category", children: "Category" }), _jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a category" }) }), _jsx(SelectContent, { children: categories.map(category => (_jsx(SelectItem, { value: category.id.toString(), children: category.name }, category.id))) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "supplier", children: "Supplier" }), _jsxs(Select, { value: selectedSupplier, onValueChange: setSelectedSupplier, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a supplier" }) }), _jsx(SelectContent, { children: suppliers.map(supplier => (_jsx(SelectItem, { value: supplier.id.toString(), children: supplier.name }, supplier.id))) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "search", children: "Search" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { id: "search", type: "search", placeholder: "Search products...", className: "pl-8", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] })] })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Product Price Management" }), _jsx(CardDescription, { children: "Manage and update individual product prices" })] }), _jsxs(CardContent, { children: [_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "SKU" }), _jsx(TableHead, { children: "Product" }), _jsx(TableHead, { children: "Cost" }), _jsx(TableHead, { children: "Discount" }), _jsx(TableHead, { children: "Current Retail" }), _jsx(TableHead, { children: "Competitor Avg" }), _jsx(TableHead, { children: "New Retail" }), _jsx(TableHead, { children: "Margin" })] }) }), _jsx(TableBody, { children: products
                                                            .filter(product => (selectedCategory === "1" || product.name.includes(categories.find(c => c.id.toString() === selectedCategory)?.name || "")) &&
                                                            (selectedSupplier === "1" || product.supplier === suppliers.find(s => s.id.toString() === selectedSupplier)?.name) &&
                                                            (searchTerm === "" ||
                                                                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                                product.sku.toLowerCase().includes(searchTerm.toLowerCase())))
                                                            .map((product) => {
                                                            const margin = ((product.newRetail - product.cost) / product.newRetail) * 100;
                                                            const competitorDiff = ((product.newRetail - product.competitorAvg) / product.competitorAvg) * 100;
                                                            return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-mono", children: product.sku }), _jsx(TableCell, { className: "font-medium", children: product.name }), _jsxs(TableCell, { children: ["$", product.cost.toFixed(2)] }), _jsxs(TableCell, { children: [product.discount, "%"] }), _jsxs(TableCell, { children: ["$", product.currentRetail.toFixed(2)] }), _jsxs(TableCell, { className: "flex items-center gap-1", children: ["$", product.competitorAvg.toFixed(2), _jsx("span", { className: "text-xs ml-1", children: competitorDiff < 0 ? (_jsxs("span", { className: "text-green-500", children: [_jsx(ArrowDownRight, { className: "inline h-3 w-3" }), Math.abs(competitorDiff).toFixed(1), "%"] })) : competitorDiff > 0 ? (_jsxs("span", { className: "text-red-500", children: [_jsx(ArrowUpRight, { className: "inline h-3 w-3" }), competitorDiff.toFixed(1), "%"] })) : null })] }), _jsx(TableCell, { children: _jsx(Input, { type: "number", min: "0", step: "0.01", value: product.newRetail, onChange: (e) => handlePriceChange(product.id, parseFloat(e.target.value)), className: "w-24" }) }), _jsxs(TableCell, { className: margin < 30 ? "text-red-500" : margin > 50 ? "text-green-500" : "", children: [margin.toFixed(1), "%"] })] }, product.id));
                                                        }) })] }), _jsx("div", { className: "flex justify-end mt-6", children: _jsxs(Button, { onClick: handleSaveChanges, children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), "Save Changes"] }) })] })] })] }), _jsxs(TabsContent, { value: "bulk-changes", className: "space-y-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Bulk Price Updates" }), _jsx(CardDescription, { children: "Apply price changes to multiple products at once" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Percentage Change" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Increase Prices" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Input, { type: "number", min: "0", defaultValue: "5", className: "w-20" }), _jsx("span", { children: "%" }), _jsx(Button, { variant: "outline", onClick: () => applyBulkPriceChange("increase-percent", 5), children: "Apply" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Decrease Prices" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Input, { type: "number", min: "0", defaultValue: "5", className: "w-20" }), _jsx("span", { children: "%" }), _jsx(Button, { variant: "outline", onClick: () => applyBulkPriceChange("decrease-percent", 5), children: "Apply" })] })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Competitor-based Pricing" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Match Competitor" }), _jsx("div", { className: "flex items-center gap-2", children: _jsx(Button, { variant: "outline", onClick: () => applyBulkPriceChange("match-competitor", 0), className: "w-full", children: "Apply" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Beat Competitor" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Input, { type: "number", min: "0", defaultValue: "3", className: "w-20" }), _jsx("span", { children: "%" }), _jsx(Button, { variant: "outline", onClick: () => applyBulkPriceChange("beat-competitor", 3), children: "Apply" })] })] })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Margin-based Pricing" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Set Fixed Margin" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Input, { type: "number", min: "0", defaultValue: "40", className: "w-20" }), _jsx("span", { children: "%" }), _jsx(Button, { variant: "outline", onClick: () => applyBulkPriceChange("fixed-margin", 40), children: "Apply" })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Sets prices to achieve the specified margin percentage across all products." })] })] }), _jsxs("div", { className: "pt-4", children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Promotional Pricing" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Create Promotion" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Select, { defaultValue: "discount", children: [_jsx(SelectTrigger, { className: "w-32", children: _jsx(SelectValue, { placeholder: "Type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "discount", children: "Discount %" }), _jsx(SelectItem, { value: "clearance", children: "Clearance" }), _jsx(SelectItem, { value: "bundle", children: "Bundle" })] })] }), _jsx(Input, { type: "number", min: "0", defaultValue: "15", className: "w-20" }), _jsx("span", { children: "%" }), _jsx(Button, { variant: "outline", children: "Apply" })] })] })] })] })] }), _jsx("div", { className: "pt-4 border-t", children: _jsxs("div", { className: "flex justify-end gap-4", children: [_jsx(Button, { variant: "outline", children: "Reset All" }), _jsxs(Button, { onClick: handleSaveChanges, children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), "Save All Changes"] })] }) })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Pricing Preview" }), _jsx(CardDescription, { children: "Preview your bulk price changes before applying them" })] }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "SKU" }), _jsx(TableHead, { children: "Product" }), _jsx(TableHead, { children: "Current Retail" }), _jsx(TableHead, { children: "New Retail" }), _jsx(TableHead, { children: "Change" }), _jsx(TableHead, { children: "New Margin" }), _jsx(TableHead, { children: "Vs. Competitor" })] }) }), _jsx(TableBody, { children: products
                                                        .filter(product => (selectedCategory === "1" || product.name.includes(categories.find(c => c.id.toString() === selectedCategory)?.name || "")) &&
                                                        (selectedSupplier === "1" || product.supplier === suppliers.find(s => s.id.toString() === selectedSupplier)?.name) &&
                                                        (searchTerm === "" ||
                                                            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                            product.sku.toLowerCase().includes(searchTerm.toLowerCase())))
                                                        .map((product) => {
                                                        const priceDiff = ((product.newRetail - product.currentRetail) / product.currentRetail) * 100;
                                                        const margin = ((product.newRetail - product.cost) / product.newRetail) * 100;
                                                        const vsCompetitor = ((product.newRetail - product.competitorAvg) / product.competitorAvg) * 100;
                                                        return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-mono", children: product.sku }), _jsx(TableCell, { className: "font-medium", children: product.name }), _jsxs(TableCell, { children: ["$", product.currentRetail.toFixed(2)] }), _jsxs(TableCell, { children: ["$", product.newRetail.toFixed(2)] }), _jsx(TableCell, { children: _jsx("div", { className: "flex items-center", children: priceDiff !== 0 ? (_jsxs(_Fragment, { children: [priceDiff < 0 ? (_jsx(ArrowDownRight, { className: "mr-1 h-4 w-4 text-amber-500" })) : (_jsx(ArrowUpRight, { className: "mr-1 h-4 w-4 text-blue-500" })), _jsxs("span", { className: priceDiff < 0 ? "text-amber-500" : "text-blue-500", children: [Math.abs(priceDiff).toFixed(1), "%"] })] })) : (_jsx("span", { children: "0.0%" })) }) }), _jsxs(TableCell, { className: margin < 30 ? "text-red-500" : margin > 50 ? "text-green-500" : "", children: [margin.toFixed(1), "%"] }), _jsx(TableCell, { children: _jsx("div", { className: "flex items-center", children: vsCompetitor < 0 ? (_jsxs("span", { className: "text-green-500", children: ["Lower by ", Math.abs(vsCompetitor).toFixed(1), "%"] })) : vsCompetitor > 0 ? (_jsxs("span", { className: "text-red-500", children: ["Higher by ", vsCompetitor.toFixed(1), "%"] })) : (_jsx("span", { children: "Matched" })) }) })] }, product.id));
                                                    }) })] }) })] })] })] })] }));
};
export default PriceManagement;
