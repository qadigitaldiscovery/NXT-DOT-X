import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
const ResultsPanel = ({ result, persona, clearResult }) => {
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg", children: "Results" }), _jsxs(CardDescription, { children: ["Output from ", persona.name] })] }), _jsx(CardContent, { children: _jsx("div", { className: "bg-muted p-4 rounded-md whitespace-pre-wrap font-mono text-sm", children: result }) }), _jsxs(CardFooter, { className: "flex justify-end gap-4", children: [_jsx("a", { href: "#", onClick: (e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(result);
                            toast.success("Results copied to clipboard");
                        }, className: "text-sm text-blue-600 hover:text-blue-800 hover:underline", children: "Copy Results" }), _jsx("a", { href: "#", onClick: (e) => {
                            e.preventDefault();
                            clearResult();
                        }, className: "text-sm text-gray-600 hover:text-gray-800 hover:underline", children: "Clear Results" })] })] }));
};
export default ResultsPanel;
