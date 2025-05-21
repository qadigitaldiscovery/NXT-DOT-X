import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { formatCurrency } from "../../../lib/utils";
export const CreditSummaryCard = ({ rating, description, limit, score }) => {
    const getRatingColor = (rating) => {
        switch (rating.toUpperCase()) {
            case 'A':
                return 'text-green-600';
            case 'B':
                return 'text-yellow-600';
            default:
                return 'text-red-600';
        }
    };
    const getScoreColor = (score) => {
        if (score >= 90)
            return 'text-green-600';
        if (score >= 70)
            return 'text-yellow-600';
        return 'text-red-600';
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Credit Summary" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Rating" }), _jsx("p", { className: `text-2xl font-bold ${getRatingColor(rating)}`, children: rating }), _jsx("p", { className: "text-sm text-gray-600", children: description })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Credit Score" }), _jsx("p", { className: `text-2xl font-bold ${getScoreColor(score)}`, children: score }), _jsx("p", { className: "text-sm text-gray-600", children: "Out of 100" })] }), _jsxs("div", { className: "col-span-2", children: [_jsx("p", { className: "text-sm text-gray-500", children: "Credit Limit" }), _jsx("p", { className: "text-xl font-semibold text-gray-900", children: formatCurrency(parseFloat(limit.replace(/[^0-9.-]+/g, ''))) })] })] }) })] }));
};
