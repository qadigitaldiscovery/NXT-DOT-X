import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Save, Trash, Percent, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
// Mock product data for South African market in ZAR
const productsData = [
    {
        id: 1,
        sku: 'AT-SPK-001',
        name: 'Premium Bookshelf Speaker',
        supplier: 'AudioTech Pro',
        cost: 4299.99,
        discount: 15,
        currentRetail: 7499.99,
        competitorAvg: 7899.99,
        newRetail: 7499.99
    },
    {
        id: 2,
        sku: 'VE-DSP-120',
        name: '4K HDR Display Monitor',
        supplier: 'VisualEdge',
        cost: 8999.99,
        discount: 12,
        currentRetail: 14999.99,
        competitorAvg: 14499.99,
        newRetail: 14999.99
    },
    {
        id: 3,
        sku: 'SV-AMP-220',
        name: 'Multi-Channel Power Amplifier',
        supplier: 'SoundVision',
        cost: 5999.99,
        discount: 18,
        currentRetail: 9999.99,
        competitorAvg: 10499.99,
        newRetail: 9999.99
    },
    {
        id: 4,
        sku: 'MM-MIC-320',
        name: 'Studio Condenser Microphone',
        supplier: 'MediaMax',
        cost: 1999.99,
        discount: 10,
        currentRetail: 3499.99,
        competitorAvg: 3699.99,
        newRetail: 3499.99
    },
    {
        id: 5,
        sku: 'AT-CAB-105',
        name: 'Premium HDMI Cable 3m',
        supplier: 'AudioTech Pro',
        cost: 399.99,
        discount: 25,
        currentRetail: 899.99,
        competitorAvg: 999.99,
        newRetail: 899.99
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
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    // Format currency in ZAR
    const formatZAR = (value) => {
        return `R${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    };
    const handleSaveChanges = () => {
        toast({
            title: "Changes Saved",
            description: "Your price changes have been saved successfully.",
        });
    };
    const handlePriceChange = (id, newPrice) => {
        setProducts(products.map(product => product.id === id ? { ...product, newRetail: newPrice } : product));
    };
    const applyBulkPriceChange = (method, value) => {
        const newProducts = products.map(product => {
            // Only modify selected products if any are selected, otherwise modify all
            if (selectedProductIds.length > 0 && !selectedProductIds.includes(product.id)) {
                return product;
            }
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
        const affectedCount = selectedProductIds.length > 0 ? selectedProductIds.length : products.length;
        toast({
            title: "Bulk Update Applied",
            description: `Price changes have been applied to ${affectedCount} product(s).`,
        });
    };
    const handleSelectProduct = (id, isChecked) => {
        if (isChecked) {
            setSelectedProductIds([...selectedProductIds, id]);
        }
        else {
            setSelectedProductIds(selectedProductIds.filter(productId => productId !== id));
        }
    };
    const handleSelectAll = (isChecked) => {
        setSelectAll(isChecked);
        if (isChecked) {
            // Select all visible/filtered products
            const visibleProductIds = products
                .filter(product => (selectedCategory === "1" || categories.find(c => c.id.toString() === selectedCategory)?.name.includes(product.name)) &&
                (selectedSupplier === "1" || product.supplier === suppliers.find(s => s.id.toString() === selectedSupplier)?.name) &&
                (searchTerm === "" ||
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.sku.toLowerCase().includes(searchTerm.toLowerCase())))
                .map(product => product.id);
            setSelectedProductIds(visibleProductIds);
        }
        else {
            setSelectedProductIds([]);
        }
    };
    const handleDeleteSelected = () => {
        if (selectedProductIds.length === 0)
            return;
        // Filter out the selected products
        const newProducts = products.filter(product => !selectedProductIds.includes(product.id));
        setProducts(newProducts);
        setSelectedProductIds([]);
        setSelectAll(false);
        toast({
            title: "Products Removed",
            description: `${selectedProductIds.length} product(s) have been removed.`,
        });
    };
    const filteredProducts = products.filter(product => (selectedCategory === "1" || categories.find(c => c.id.toString() === selectedCategory)?.name.includes(product.name)) &&
        (selectedSupplier === "1" || product.supplier === suppliers.find(s => s.id.toString() === selectedSupplier)?.name) &&
        (searchTerm === "" ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase())));
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Price Management (ZAR)" }), _jsxs(Tabs, { defaultValue: "product-list", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 mb-4", children: [_jsx(TabsTrigger, { value: "product-list", children: "Product List" }), _jsx(TabsTrigger, { value: "bulk-changes", children: "Bulk Price Changes" })] }), _jsxs(TabsContent, { value: "product-list", className: "space-y-6", children: [_jsxs(Card, { className: "backdrop-blur-md bg-white/30 border border-white/10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Product Filter" }), _jsx(CardDescription, { children: "Filter products by category, supplier or search term" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "category", children: "Category" }), _jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a category" }) }), _jsx(SelectContent, { children: categories.map(category => (_jsx(SelectItem, { value: category.id.toString(), children: category.name }, category.id))) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "supplier", children: "Supplier" }), _jsxs(Select, { value: selectedSupplier, onValueChange: setSelectedSupplier, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a supplier" }) }), _jsx(SelectContent, { children: suppliers.map(supplier => (_jsx(SelectItem, { value: supplier.id.toString(), children: supplier.name }, supplier.id))) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "search", children: "Search" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { id: "search", type: "search", placeholder: "Search products...", className: "pl-8", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] })] })] }) })] }), _jsxs(Card, { className: "backdrop-blur-md bg-white/30 border border-white/10", children: [_jsxs(CardHeader, { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Product Price Management" }), _jsx(CardDescription, { children: "Manage and update individual product prices" })] }), _jsxs("div", { className: "flex space-x-2", children: [selectedProductIds.length > 0 && (_jsxs(Button, { variant: "outline", onClick: handleDeleteSelected, className: "text-red-500", children: [_jsx(Trash, { className: "mr-2 h-4 w-4" }), "Remove Selected (", selectedProductIds.length, ")"] })), _jsxs(Button, { onClick: handleSaveChanges, children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), "Save Changes"] })] })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "rounded-md border overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[40px]", children: _jsx(Checkbox, { checked: selectAll && filteredProducts.length > 0, onCheckedChange: handleSelectAll }) }), _jsx(TableHead, { children: "SKU" }), _jsx(TableHead, { children: "Product" }), _jsx(TableHead, { children: "Cost" }), _jsx(TableHead, { children: "Current Price" }), _jsx(TableHead, { children: "Competitor Avg" }), _jsx(TableHead, { children: "New Price" }), _jsx(TableHead, { children: "Margin" })] }) }), _jsx(TableBody, { children: filteredProducts.map(product => {
                                                                const margin = ((product.newRetail - product.cost) / product.newRetail) * 100;
                                                                const competitorDiff = ((product.newRetail - product.competitorAvg) / product.competitorAvg) * 100;
                                                                return (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Checkbox, { checked: selectedProductIds.includes(product.id), onCheckedChange: (checked) => handleSelectProduct(product.id, !!checked) }) }), _jsx(TableCell, { className: "font-mono", children: product.sku }), _jsx(TableCell, { children: _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: product.name }), _jsx("div", { className: "text-xs text-muted-foreground", children: product.supplier })] }) }), _jsx(TableCell, { children: formatZAR(product.cost) }), _jsx(TableCell, { children: formatZAR(product.currentRetail) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center", children: [formatZAR(product.competitorAvg), _jsx("span", { className: "ml-2 text-xs", children: competitorDiff < 0 ? (_jsxs("span", { className: "text-green-500 flex items-center", children: [_jsx(ArrowDownRight, { className: "h-3 w-3 mr-1" }), Math.abs(competitorDiff).toFixed(1), "%"] })) : (_jsxs("span", { className: "text-amber-500 flex items-center", children: [_jsx(ArrowUpRight, { className: "h-3 w-3 mr-1" }), competitorDiff.toFixed(1), "%"] })) })] }) }), _jsx(TableCell, { children: _jsx(Input, { type: "number", value: product.newRetail, onChange: (e) => {
                                                                                    const value = parseFloat(e.target.value);
                                                                                    if (!isNaN(value)) {
                                                                                        handlePriceChange(product.id, value);
                                                                                    }
                                                                                }, className: "w-28" }) }), _jsx(TableCell, { children: _jsxs("div", { className: "font-medium", children: [margin.toFixed(1), "%"] }) })] }, product.id));
                                                            }) })] }) }), filteredProducts.length === 0 && (_jsx("div", { className: "py-6 text-center text-muted-foreground", children: "No products match your search criteria" }))] })] })] }), _jsx(TabsContent, { value: "bulk-changes", className: "space-y-6", children: _jsxs(Card, { className: "backdrop-blur-md bg-white/30 border border-white/10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Bulk Price Changes" }), _jsxs(CardDescription, { children: ["Apply price changes to ", selectedProductIds.length > 0 ? `${selectedProductIds.length} selected products` : "all products"] })] }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Increase Prices By Percentage" }), _jsxs("div", { className: "flex items-center mt-2", children: [_jsx(Input, { type: "number", min: "0", max: "100", defaultValue: "5", className: "w-20" }), _jsx("span", { className: "mx-2", children: _jsx(Percent, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", onClick: () => applyBulkPriceChange("increase-percent", 5), children: "Apply" })] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Decrease Prices By Percentage" }), _jsxs("div", { className: "flex items-center mt-2", children: [_jsx(Input, { type: "number", min: "0", max: "100", defaultValue: "5", className: "w-20" }), _jsx("span", { className: "mx-2", children: _jsx(Percent, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", onClick: () => applyBulkPriceChange("decrease-percent", 5), children: "Apply" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Match Competitor Average" }), _jsx("div", { className: "flex items-center mt-2", children: _jsx(Button, { variant: "outline", className: "w-full", onClick: () => applyBulkPriceChange("match-competitor", 0), children: "Apply" }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Beat Competitor Average By" }), _jsxs("div", { className: "flex items-center mt-2", children: [_jsx(Input, { type: "number", min: "0", max: "100", defaultValue: "3", className: "w-20" }), _jsx("span", { className: "mx-2", children: _jsx(Percent, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", onClick: () => applyBulkPriceChange("beat-competitor", 3), children: "Apply" })] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Set Fixed Margin" }), _jsxs("div", { className: "flex items-center mt-2", children: [_jsx(Input, { type: "number", min: "0", max: "100", defaultValue: "40", className: "w-20" }), _jsx("span", { className: "mx-2", children: _jsx(Percent, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", onClick: () => applyBulkPriceChange("fixed-margin", 40), children: "Apply" })] })] })] })] }), _jsxs("div", { className: "flex justify-end space-x-2 pt-4", children: [_jsx(Button, { variant: "outline", onClick: () => {
                                                            setProducts(productsData);
                                                            setSelectedProductIds([]);
                                                            setSelectAll(false);
                                                        }, children: "Reset Changes" }), _jsxs(Button, { onClick: handleSaveChanges, children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), "Save All Changes"] })] })] }) })] }) })] })] }));
};
export default PriceManagement;
