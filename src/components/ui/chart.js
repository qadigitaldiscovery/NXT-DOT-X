import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './chart.css';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export function Chart({ data, options, title, height, width }) {
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                },
            },
            title: {
                display: !!title,
                text: title || '',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    const mergedOptions = {
        ...defaultOptions,
        ...options,
    };
    return (_jsx("div", { className: "chart-container", style: { height: height || 400, width: width || '100%' }, children: _jsx(Line, { data: data, options: mergedOptions }) }));
}
export function ChartLegend({ items }) {
    return (_jsx("div", { className: "chart-legend", children: items.map((item, index) => (_jsxs("div", { className: "chart-legend-item", children: [_jsx("div", { className: "chart-legend-color", style: { backgroundColor: item.color } }), _jsx("span", { children: item.label })] }, index))) }));
}
export function ChartTooltip({ x, y, content }) {
    return (_jsx("div", { className: "chart-tooltip", style: { left: x, top: y }, children: content }));
}
