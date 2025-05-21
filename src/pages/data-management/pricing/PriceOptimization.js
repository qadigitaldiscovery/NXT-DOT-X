import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from "@/hooks/use-toast";
// Sample data for price optimization charts
const priceElasticityData = [
    { price: 10, demand: 100, revenue: 1000 },
    { price: 15, demand: 85, revenue: 1275 },
    { price: 20, demand: 70, revenue: 1400 },
    { price: 25, demand: 55, revenue: 1375 },
    { price: 30, demand: 40, revenue: 1200 },
    { price: 35, demand: 28, revenue: 980 },
    { price: 40, demand: 20, revenue: 800 },
];
const competitorPricesData = [
    { competitor: 'Competitor A', price: 18 },
    { competitor: 'Competitor B', price: 22 },
    { competitor: 'Competitor C', price: 25 },
    { competitor: 'Industry Average', price: 21.5 },
];
const PriceOptimization = () => {
    const [currentPrice, setCurrentPrice] = React.useState(20);
    const [optimizationTarget, setOptimizationTarget] = React.useState("revenue");
    const handlePriceChange = (value) => {
        setCurrentPrice(value[0]);
    };
    const handleOptimize = () => {
        // In a real application, this would run an optimization algorithm
        const optimalPrice = optimizationTarget === "revenue" ? 20 : 15;
        setCurrentPrice(optimalPrice);
        // Fix the toast call to use the correct format
        toast({
            description: `Optimal price calculated: $${optimalPrice.toFixed(2)} based on ${optimizationTarget} optimization`,
        });
    };
    const getOptimalPoint = () => {
        return optimizationTarget === "revenue"
            ? { price: 20, demand: 70, revenue: 1400 }
            : { price: 15, demand: 85, revenue: 1275 };
    };
    const optimalPoint = getOptimalPoint();
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Price Optimization" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Current Price" }), _jsx(CardDescription, { children: "Your product's current price point" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "text-3xl font-bold", children: ["$", currentPrice.toFixed(2)] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Optimal Price" }), _jsxs(CardDescription, { children: ["Based on ", optimizationTarget] })] }), _jsx(CardContent, { children: _jsxs("div", { className: "text-3xl font-bold text-green-600", children: ["$", optimalPoint.price.toFixed(2)] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Expected Revenue" }), _jsx(CardDescription, { children: "At the current price point" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "text-3xl font-bold", children: ["$", (currentPrice * (100 - (currentPrice * 1.5))).toFixed(2)] }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "col-span-1 lg:col-span-2", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Price Elasticity Analysis" }), _jsx(CardDescription, { children: "Relationship between price, demand, and revenue" })] }), _jsx(CardContent, { className: "h-80", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: priceElasticityData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "price", label: { value: 'Price ($)', position: 'bottom' } }), _jsx(YAxis, { yAxisId: "left", label: { value: 'Demand', angle: -90, position: 'left' } }), _jsx(YAxis, { yAxisId: "right", orientation: "right", label: { value: 'Revenue ($)', angle: 90, position: 'right' } }), _jsx(Tooltip, { formatter: (value, name) => [`${value}${name === 'demand' ? ' units' : ' $'}`, name] }), _jsx(Legend, {}), _jsx(Line, { yAxisId: "left", type: "monotone", dataKey: "demand", stroke: "#8884d8", name: "Demand" }), _jsx(Line, { yAxisId: "right", type: "monotone", dataKey: "revenue", stroke: "#82ca9d", name: "Revenue" })] }) }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Price Adjustment" }), _jsx(CardDescription, { children: "Manually adjust pricing and see the impact" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "mb-8", children: [_jsxs("label", { className: "block text-sm font-medium mb-2", children: ["Set Price: $", currentPrice.toFixed(2)] }), _jsx(Slider, { defaultValue: [currentPrice], max: 40, min: 10, step: 0.5, onValueChange: handlePriceChange })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Optimization Target:" }), _jsx(Tabs, { value: optimizationTarget, onValueChange: setOptimizationTarget, className: "w-full", children: _jsxs(TabsList, { className: "grid grid-cols-2 mb-4", children: [_jsx(TabsTrigger, { value: "revenue", children: "Revenue" }), _jsx(TabsTrigger, { value: "volume", children: "Volume" })] }) })] })] }), _jsx(CardFooter, { children: _jsx(Button, { onClick: handleOptimize, className: "w-full", children: "Calculate Optimal Price" }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Competitor Analysis" }), _jsx(CardDescription, { children: "Your pricing relative to competitors" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: competitorPricesData.map((competitor, index) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: competitor.competitor }), _jsxs("span", { className: `font-semibold ${competitor.price > currentPrice ? 'text-red-500' : 'text-green-500'}`, children: ["$", competitor.price.toFixed(2), competitor.competitor !== 'Industry Average' && (_jsxs("span", { className: "text-xs ml-2", children: ["(", competitor.price > currentPrice ? '+' : '', "$", (competitor.price - currentPrice).toFixed(2), ")"] }))] })] }, index))) }) }), _jsxs(CardFooter, { className: "text-sm text-gray-500", children: ["Your price: $", currentPrice.toFixed(2)] })] })] })] }));
};
export default PriceOptimization;
