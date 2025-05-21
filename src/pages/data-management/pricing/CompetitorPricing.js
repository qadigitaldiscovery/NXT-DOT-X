import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Upload, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
// Mock data for South African audio equipment competitors
const competitors = [
    { id: 1, name: "SoundWave SA" },
    { id: 2, name: "AudioXpress" },
    { id: 3, name: "MusicTech" },
    { id: 4, name: "SoundGuru" },
    { id: 5, name: "AudioPro SA" },
];
// Mock data for price comparison in ZAR
const priceComparisonData = [
    { category: 'Speakers', ourPrice: 4399, competitorAvg: 4699 },
    { category: 'Displays', ourPrice: 9999, competitorAvg: 9499 },
    { category: 'Amplifiers', ourPrice: 5699, competitorAvg: 6299 },
    { category: 'Microphones', ourPrice: 2499, competitorAvg: 2699 },
    { category: 'Accessories', ourPrice: 499, competitorAvg: 599 },
];
// Mock data for product competitor pricing in ZAR
const competitorProductsData = [
    {
        id: 1,
        sku: 'AT-SPK-001',
        name: 'Premium Bookshelf Speaker',
        ourPrice: 4999.99,
        competitor1: { name: 'SoundWave SA', price: 5299.99 },
        competitor2: { name: 'AudioXpress', price: 5099.99 },
        competitor3: { name: 'MusicTech', price: 4899.99 },
    },
    {
        id: 2,
        sku: 'VE-DSP-120',
        name: '4K HDR Display Monitor',
        ourPrice: 11999.99,
        competitor1: { name: 'SoundWave SA', price: 12499.99 },
        competitor2: { name: 'AudioXpress', price: 11799.99 },
        competitor3: { name: 'MusicTech', price: 11999.99 },
    },
    {
        id: 3,
        sku: 'SV-AMP-220',
        name: 'Multi-Channel Power Amplifier',
        ourPrice: 7499.99,
        competitor1: { name: 'SoundWave SA', price: 7299.99 },
        competitor2: { name: 'AudioXpress', price: 7699.99 },
        competitor3: { name: 'MusicTech', price: 7899.99 },
    },
    {
        id: 4,
        sku: 'MM-MIC-320',
        name: 'Studio Condenser Microphone',
        ourPrice: 2499.99,
        competitor1: { name: 'SoundWave SA', price: 2699.99 },
        competitor2: { name: 'AudioXpress', price: 2499.99 },
        competitor3: { name: 'SoundGuru', price: 2399.99 },
    },
    {
        id: 5,
        sku: 'AT-CAB-105',
        name: 'Premium HDMI Cable 3m',
        ourPrice: 599.99,
        competitor1: { name: 'AudioPro SA', price: 699.99 },
        competitor2: { name: 'AudioXpress', price: 499.99 },
        competitor3: { name: 'MusicTech', price: 599.99 },
    },
];
const CompetitorPricing = () => {
    const [selectedCompetitor, setSelectedCompetitor] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const { toast } = useToast();
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        if (!selectedFile || !selectedCompetitor) {
            toast({
                title: "Upload Error",
                description: "Please select both a competitor and a file.",
                variant: "destructive",
            });
            return;
        }
        // Simulate processing
        toast({
            title: "File Uploaded",
            description: `${selectedFile.name} has been uploaded and is now processing.`,
        });
        // Reset form
        setSelectedFile(null);
        setSelectedCompetitor("");
        // Reset file input
        const fileInput = document.getElementById('competitor-file-upload');
        if (fileInput)
            fileInput.value = '';
        // Simulate completion
        setTimeout(() => {
            toast({
                title: "Processing Complete",
                description: "Competitor pricing data has been processed successfully.",
            });
        }, 2000);
    };
    // Format currency in ZAR
    const formatZAR = (value) => {
        return `R${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Competitor Pricing (ZAR)" }), _jsxs(Card, { className: "backdrop-blur-md bg-white/30 border border-white/10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Upload Competitor Data" }), _jsx(CardDescription, { children: "Upload CSV or Excel files with competitor pricing data" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "grid gap-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "competitor", children: "Select Competitor" }), _jsxs(Select, { value: selectedCompetitor, onValueChange: setSelectedCompetitor, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a competitor" }) }), _jsx(SelectContent, { children: competitors.map(competitor => (_jsx(SelectItem, { value: competitor.id.toString(), children: competitor.name }, competitor.id))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "competitor-file-upload", children: "Upload File" }), _jsx("div", { className: "flex items-center gap-2", children: _jsx(Input, { id: "competitor-file-upload", type: "file", accept: ".csv,.xlsx,.xls", onChange: handleFileChange }) }), selectedFile && (_jsxs("p", { className: "text-sm text-muted-foreground", children: ["Selected: ", selectedFile.name] }))] })] }), _jsx("div", { className: "flex justify-end", children: _jsxs(Button, { onClick: handleUpload, disabled: !selectedFile || !selectedCompetitor, children: [_jsx(Upload, { className: "mr-2 h-4 w-4" }), "Upload File"] }) })] }) })] }), _jsxs(Card, { className: "backdrop-blur-md bg-white/30 border border-white/10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Price Comparison" }), _jsx(CardDescription, { children: "Our prices vs. competitor average by category (ZAR)" })] }), _jsx(CardContent, { className: "h-[350px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: priceComparisonData, layout: "vertical", margin: { top: 20, right: 30, left: 20, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { type: "number" }), _jsx(YAxis, { dataKey: "category", type: "category" }), _jsx(Tooltip, { formatter: (value) => formatZAR(value) }), _jsx(Legend, {}), _jsx(Bar, { dataKey: "ourPrice", name: "Our Price", fill: "#0EA5E9" }), _jsx(Bar, { dataKey: "competitorAvg", name: "Competitor Avg.", fill: "#64748B" })] }) }) })] }), _jsxs(Card, { className: "backdrop-blur-md bg-white/30 border border-white/10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Competitor Product Pricing" }), _jsx(CardDescription, { children: "Detailed competitor pricing by product (ZAR)" })] }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "SKU" }), _jsx(TableHead, { children: "Product" }), _jsx(TableHead, { children: "Our Price" }), _jsx(TableHead, { children: competitorProductsData[0].competitor1.name }), _jsx(TableHead, { children: competitorProductsData[0].competitor2.name }), _jsx(TableHead, { children: competitorProductsData[0].competitor3.name }), _jsx(TableHead, { children: "Avg. Diff" })] }) }), _jsx(TableBody, { children: competitorProductsData.map((product) => {
                                        const prices = [
                                            product.competitor1.price,
                                            product.competitor2.price,
                                            product.competitor3.price
                                        ];
                                        const avgCompetitorPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
                                        const priceDiff = ((product.ourPrice - avgCompetitorPrice) / avgCompetitorPrice) * 100;
                                        return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-mono", children: product.sku }), _jsx(TableCell, { className: "font-medium", children: product.name }), _jsx(TableCell, { children: formatZAR(product.ourPrice) }), _jsx(TableCell, { children: formatZAR(product.competitor1.price) }), _jsx(TableCell, { children: formatZAR(product.competitor2.price) }), _jsx(TableCell, { children: formatZAR(product.competitor3.price) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center", children: [priceDiff < 0 ? (_jsx(ArrowDownRight, { className: "mr-1 h-4 w-4 text-green-500" })) : (_jsx(ArrowUpRight, { className: "mr-1 h-4 w-4 text-red-500" })), _jsxs("span", { className: priceDiff < 0 ? "text-green-500" : "text-red-500", children: [Math.abs(priceDiff).toFixed(2), "%"] })] }) })] }, product.id));
                                    }) })] }) })] })] }));
};
export default CompetitorPricing;
