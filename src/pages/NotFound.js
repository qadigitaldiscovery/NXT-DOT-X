import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
const NotFound = () => {
    const location = useLocation();
    React.useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: _jsxs("div", { className: "text-center space-y-6 p-8", children: [_jsx("div", { className: "bg-dashboard-primary rounded-full h-24 w-24 flex items-center justify-center mx-auto", children: _jsx("span", { className: "text-5xl font-bold text-white", children: "404" }) }), _jsx("h1", { className: "text-3xl font-bold text-dashboard-heading", children: "Page Not Found" }), _jsx("p", { className: "text-xl text-muted-foreground max-w-md", children: "Sorry, we couldn't find the page you're looking for. The page might have been moved or deleted." }), _jsx(Button, { asChild: true, size: "lg", className: "mt-6", children: _jsxs(Link, { to: "/", children: [_jsx(Home, { className: "mr-2 h-5 w-5" }), "Return to Dashboard"] }) })] }) }));
};
export default NotFound;
