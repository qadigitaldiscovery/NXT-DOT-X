import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Shield, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const Unauthorized = () => {
    const navigate = useNavigate();
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100", children: _jsx(Card, { className: "w-full max-w-md mx-4", children: _jsx(CardContent, { className: "pt-6 pb-8 px-8", children: _jsxs("div", { className: "flex flex-col items-center text-center", children: [_jsx("div", { className: "rounded-full bg-red-100 p-4 mb-4", children: _jsx(Shield, { className: "h-12 w-12 text-red-600" }) }), _jsx("h1", { className: "text-2xl font-bold mb-2", children: "Access Denied" }), _jsx("p", { className: "text-gray-500 mb-6", children: "You don't have permission to access this page. If you believe this is an error, please contact an administrator." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 w-full", children: [_jsxs(Button, { variant: "default", className: "w-full", onClick: () => navigate('/'), children: [_jsx(Home, { className: "mr-2 h-4 w-4" }), "Go to Dashboard"] }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => navigate(-1), children: "Go Back" })] })] }) }) }) }));
};
export default Unauthorized;
