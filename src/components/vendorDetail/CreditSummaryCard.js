import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export const CreditSummaryCard = ({ rating, description, limit, score }) => {
    // Determine color based on rating
    const getRatingColor = (rating) => {
        switch (rating.toUpperCase()) {
            case 'A':
            case 'B':
                return 'text-green-500';
            case 'C':
                return 'text-yellow-500';
            case 'D':
            case 'E':
            case 'F':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };
    const ratingColor = getRatingColor(rating);
    return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-lg", children: "Credit Summary" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "border-r pr-4", children: [_jsx("div", { className: "text-sm text-muted-foreground mb-1", children: "Rating" }), _jsx("div", { className: `text-3xl font-bold ${ratingColor}`, children: rating })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-muted-foreground mb-1", children: "Description" }), _jsx("div", { className: `text-base font-medium ${ratingColor}`, children: description })] }), _jsxs("div", { className: "border-r pr-4", children: [_jsx("div", { className: "text-sm text-muted-foreground mb-1", children: "Credit Limit" }), _jsx("div", { className: "text-lg font-medium", children: limit })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-muted-foreground mb-1", children: "Local Score" }), _jsx("div", { className: "text-lg font-medium", children: score })] })] }) })] }));
};
