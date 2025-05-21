import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { formatDate } from "../../../lib/utils";
export const PerformanceChart = ({ data, title, label }) => {
    // Find min and max values for scaling
    const values = data.map(d => d.value);
    const maxValue = Math.max(...values, 100);
    const minValue = Math.min(...values, 0);
    // Calculate dimensions
    const width = 600;
    const height = 300;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    // Scale values to chart dimensions
    const scaleY = (value) => {
        return chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight + padding;
    };
    const scaleX = (index) => {
        return (index / (data.length - 1)) * chartWidth + padding;
    };
    // Generate path data
    const pathData = data.map((point, index) => {
        const x = scaleX(index);
        const y = scaleY(point.value);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    // Generate area path data
    const areaPathData = `
    ${pathData}
    L ${scaleX(data.length - 1)} ${scaleY(minValue)}
    L ${scaleX(0)} ${scaleY(minValue)}
    Z
  `;
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: title }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "w-full overflow-x-auto", children: _jsxs("svg", { width: width, height: height, className: "w-full", children: [[0, 25, 50, 75, 100].map((tick) => (_jsxs(React.Fragment, { children: [_jsx("line", { x1: padding, y1: scaleY(tick), x2: width - padding, y2: scaleY(tick), stroke: "#e5e7eb", strokeDasharray: "4,4" }), _jsx("text", { x: padding - 10, y: scaleY(tick), textAnchor: "end", alignmentBaseline: "middle", className: "text-xs text-gray-500", children: tick })] }, tick))), _jsx("path", { d: areaPathData, fill: "url(#gradient)", opacity: 0.2 }), _jsx("path", { d: pathData, fill: "none", stroke: "#3b82f6", strokeWidth: 2 }), data.map((point, index) => (_jsxs("g", { children: [_jsx("circle", { cx: scaleX(index), cy: scaleY(point.value), r: 4, fill: "#3b82f6" }), _jsx("text", { x: scaleX(index), y: height - padding / 2, textAnchor: "middle", className: "text-xs text-gray-500", children: formatDate(point.date) })] }, index))), _jsx("defs", { children: _jsxs("linearGradient", { id: "gradient", x1: "0", x2: "0", y1: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#3b82f6", stopOpacity: 0.4 }), _jsx("stop", { offset: "100%", stopColor: "#3b82f6", stopOpacity: 0.1 })] }) })] }) }), _jsx("div", { className: "mt-4", children: _jsx("p", { className: "text-sm text-gray-500", children: label }) })] })] }));
};
