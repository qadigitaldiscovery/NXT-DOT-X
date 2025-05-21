import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Code, Server, Database, Key } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
export const DeveloperAccess = () => {
    const navigate = useNavigate();
    return (_jsxs(Card, { className: "border border-gray-700 rounded-lg overflow-hidden shadow-md flex flex-col h-full bg-gray-800 hover:bg-gray-700", children: [_jsxs(CardHeader, { className: "bg-gray-800 p-4 border-b border-gray-700 flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-white text-lg md:text-xl", children: "Developer Access" }), _jsx(CardDescription, { className: "text-gray-300", children: "Tools & APIs for technical users" })] }), _jsx(Code, { className: "h-6 w-6 text-white", "aria-hidden": "true" })] }), _jsx(CardContent, { className: "p-4 flex-1 flex flex-col", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-md font-medium text-white", children: "Systems & APIs" }), _jsxs("div", { className: "grid grid-cols-1 gap-2", children: [_jsxs("a", { href: "/tech-hub/api-management", onClick: (e) => {
                                                e.preventDefault();
                                                navigate('/tech-hub/api-management');
                                            }, className: cn("flex items-start h-auto py-2 px-3 text-gray-200 hover:text-white hover:bg-gray-700 rounded-md", "transition-colors duration-200"), "aria-label": "API Keys Management", children: [_jsx(Key, { className: "mr-2 h-4 w-4 mt-1", "aria-hidden": "true" }), _jsxs("div", { className: "text-left", children: [_jsx("p", { className: "font-medium", children: "API Keys Management" }), _jsx("p", { className: "text-xs text-gray-400", children: "Configure API credentials" })] })] }), _jsxs("a", { href: "/admin/database", onClick: (e) => {
                                                e.preventDefault();
                                                navigate('/admin/database');
                                            }, className: cn("flex items-start h-auto py-2 px-3 text-gray-200 hover:text-white hover:bg-gray-700 rounded-md", "transition-colors duration-200"), "aria-label": "Database Management", children: [_jsx(Database, { className: "mr-2 h-4 w-4 mt-1", "aria-hidden": "true" }), _jsxs("div", { className: "text-left", children: [_jsx("p", { className: "font-medium", children: "Database Management" }), _jsx("p", { className: "text-xs text-gray-400", children: "Run queries and view tables" })] })] }), _jsxs("a", { href: "/tech-hub/integrations", onClick: (e) => {
                                                e.preventDefault();
                                                navigate('/tech-hub/integrations');
                                            }, className: cn("flex items-start h-auto py-2 px-3 text-gray-200 hover:text-white hover:bg-gray-700 rounded-md", "transition-colors duration-200"), "aria-label": "External Integrations", children: [_jsx(Server, { className: "mr-2 h-4 w-4 mt-1", "aria-hidden": "true" }), _jsxs("div", { className: "text-left", children: [_jsx("p", { className: "font-medium", children: "External Integrations" }), _jsx("p", { className: "text-xs text-gray-400", children: "Connect to third-party services" })] })] })] })] }), _jsx(Separator, { className: "bg-gray-700" }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-md font-medium text-white", children: "Developer Hub" }), _jsx("div", { className: "grid grid-cols-1 gap-2", children: _jsxs("a", { href: "/tech-hub", onClick: (e) => {
                                            e.preventDefault();
                                            navigate('/tech-hub');
                                        }, className: cn("w-full justify-between flex items-center px-4 py-2 rounded-md", "border border-gray-600 bg-gray-700 hover:bg-gray-600 text-white", "transition-colors duration-200"), "aria-label": "Open Developer Hub", children: [_jsx("span", { children: "Open Developer Hub" }), _jsx(Code, { className: "h-4 w-4 ml-2", "aria-hidden": "true" })] }) })] })] }) })] }));
};
export default DeveloperAccess;
