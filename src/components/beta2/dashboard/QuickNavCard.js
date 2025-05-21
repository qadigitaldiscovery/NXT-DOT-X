import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export const QuickNavCard = ({ title, description, icon: Icon, path, iconBgClass = "bg-purple-100", iconClass = "text-purple-600" }) => {
    const navigate = useNavigate();
    return (_jsxs(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", onClick: () => navigate(path), children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx("div", { className: `${iconBgClass} rounded-full w-10 h-10 flex items-center justify-center`, children: _jsx(Icon, { className: `h-5 w-5 ${iconClass}` }) }), _jsx(CardTitle, { className: "text-xl mt-2", children: title }), _jsx(CardDescription, { children: description })] }), _jsx(CardFooter, { className: "pt-0 pb-4", children: _jsxs(Link, { to: path, className: "text-sm text-purple-600 font-medium flex items-center hover:underline", children: ["View ", title, _jsx(ArrowRight, { className: "ml-1 h-4 w-4" })] }) })] }));
};
