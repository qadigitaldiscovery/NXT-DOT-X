import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
export const GaugeRating = ({ value, maxValue, label, description }) => {
    // Calculate percentage and colors
    const percentage = (value / maxValue) * 100;
    const getColor = (percent) => {
        if (percent >= 90)
            return '#22C55E'; // green-500
        if (percent >= 70)
            return '#EAB308'; // yellow-500
        return '#EF4444'; // red-500
    };
    const color = getColor(percentage);
    // Calculate SVG arc parameters
    const radius = 80;
    const strokeWidth = 12;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: label }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsxs("div", { className: "relative w-48 h-48", children: [_jsxs("svg", { className: "transform -rotate-90 w-full h-full", viewBox: `0 0 ${radius * 2} ${radius * 2}`, children: [_jsx("circle", { className: "text-gray-200", strokeWidth: strokeWidth, stroke: "currentColor", fill: "transparent", r: normalizedRadius, cx: radius, cy: radius }), _jsx("circle", { className: "transition-all duration-300", strokeWidth: strokeWidth, strokeDasharray: circumference + ' ' + circumference, strokeDashoffset: strokeDashoffset, strokeLinecap: "round", stroke: color, fill: "transparent", r: normalizedRadius, cx: radius, cy: radius })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx("span", { className: "text-4xl font-bold", style: { color }, children: value }) })] }), description && (_jsx("p", { className: "mt-4 text-sm text-gray-600 text-center", children: description }))] }) })] }));
};
