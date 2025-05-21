import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { getLinkClassName } from '@/lib/link-utils';
export const ModuleCard = ({ title, path, features = [], description, variant = 'default' }) => {
    const navigate = useNavigate();
    const handleModuleClick = () => {
        navigate(path);
    };
    const handleFeatureClick = (featurePath, e) => {
        e.stopPropagation();
        navigate(featurePath);
    };
    const variantStyles = {
        default: 'border-gray-200 bg-card hover:border-primary/20 hover:shadow-md',
        active: 'border-green-500/30 bg-green-50 dark:bg-green-950/20',
        inactive: 'border-gray-200 bg-gray-50/50 dark:bg-gray-900/30 opacity-70'
    };
    return (_jsxs(Card, { className: cn("transition-all duration-200 cursor-pointer h-full relative", variantStyles[variant]), onClick: handleModuleClick, children: [_jsxs(CardHeader, { className: "pb-2 relative z-10", children: [_jsx(CardTitle, { className: "font-bold tracking-tight text-gray-800 dark:text-white text-2xl text-left", children: title }), description && _jsx(CardDescription, { className: "text-gray-600 dark:text-gray-300", children: description })] }), _jsx(CardContent, { className: "pb-2 relative z-10", children: _jsx("div", { className: "space-y-1.5", children: features.map((feature, index) => (_jsx("a", { href: feature.path, onClick: e => handleFeatureClick(feature.path, e), className: "text-sm hover:underline flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white", "aria-label": `Open ${feature.name}`, children: _jsx("span", { className: "ml-1 text-base text-center", children: feature.name }) }, index))) }) }), _jsx(CardFooter, { className: "relative z-10", children: _jsxs("a", { href: path, onClick: e => {
                        e.preventDefault();
                        handleModuleClick();
                    }, className: cn(getLinkClassName(), "text-sm font-medium flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"), "aria-label": `Go to ${title}`, children: ["View ", title, _jsx(ArrowRight, { className: "ml-1 h-4 w-4", "aria-hidden": "true" })] }) })] }));
};
