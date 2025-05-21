import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
const MasterDash = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("all");
    // Define module categories
    const modules = {
        all: [
            { title: "Data Management", description: "Manage costs, pricing, suppliers, and more", color: "bg-nxt-primary", route: "/data-management" },
            { title: "Loyalty Rewards", description: "Reward and engage your loyal customers", color: "bg-nxt-secondary", route: "/loyalty-rewards" },
            { title: "Trading System", description: "Access trading analytics and operations", color: "bg-nxt-accent", route: "/trading-system" },
            { title: "Tech Hub", description: "Access AI tools and technical integrations", color: "bg-purple-600", hoverColor: "hover:bg-purple-700", route: "/tech-hub" },
            { title: "Social Media", description: "Manage social accounts and content", color: "bg-blue-600", hoverColor: "hover:bg-blue-700", route: "/social-media" },
            { title: "DOT-X", description: "Advanced command center with AI agents", color: "bg-indigo-600", hoverColor: "hover:bg-indigo-700", route: "/dot-x" },
            { title: "Project Management", description: "Manage projects, tasks and team collaboration", color: "bg-green-600", hoverColor: "hover:bg-green-700", route: "/projects" }
        ],
        data: [
            { title: "Data Management", description: "Manage costs, pricing, suppliers, and more", color: "bg-nxt-primary", route: "/data-management" }
        ],
        marketing: [
            { title: "Loyalty Rewards", description: "Reward and engage your loyal customers", color: "bg-nxt-secondary", route: "/loyalty-rewards" },
            { title: "Social Media", description: "Manage social accounts and content", color: "bg-blue-600", hoverColor: "hover:bg-blue-700", route: "/social-media" }
        ],
        tech: [
            { title: "Tech Hub", description: "Access AI tools and technical integrations", color: "bg-purple-600", hoverColor: "hover:bg-purple-700", route: "/tech-hub" },
            { title: "DOT-X", description: "Advanced command center with AI agents", color: "bg-indigo-600", hoverColor: "hover:bg-indigo-700", route: "/dot-x" }
        ],
        operations: [
            { title: "Trading System", description: "Access trading analytics and operations", color: "bg-nxt-accent", route: "/trading-system" },
            { title: "Project Management", description: "Manage projects, tasks and team collaboration", color: "bg-green-600", hoverColor: "hover:bg-green-700", route: "/projects" }
        ]
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col relative", children: [_jsx("div", { className: "absolute inset-0 z-0", style: {
                    backgroundImage: `url('/masterdash-bg.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }, children: _jsx("div", { className: "absolute inset-0 bg-black/60" }) }), _jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-10", children: [_jsx("h1", { className: "text-4xl font-bold mb-4 text-white", children: "Welcome to NXT Level Platform" }), _jsx("p", { className: "text-lg text-gray-200 mb-6", children: "Select a module to get started" }), _jsx("div", { className: "mb-8", children: _jsx(Tabs, { value: activeTab, onValueChange: setActiveTab, children: _jsxs(TabsList, { className: "bg-black/30 border border-white/20", children: [_jsx(TabsTrigger, { value: "all", children: "All" }), _jsx(TabsTrigger, { value: "data", children: "Data" }), _jsx(TabsTrigger, { value: "marketing", children: "Marketing" }), _jsx(TabsTrigger, { value: "tech", children: "Tech" }), _jsx(TabsTrigger, { value: "operations", children: "Operations" })] }) }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: modules[activeTab].map((module, index) => (_jsxs("div", { className: `${module.color} text-white rounded-xl p-8 shadow-lg ${module.hoverColor || `hover:${module.color.replace('bg-', 'bg-')}/90`} transition flex flex-col items-center cursor-pointer`, onClick: () => navigate(module.route), children: [_jsx("span", { className: "text-2xl font-semibold mb-2", children: module.title }), _jsx("span", { className: "text-sm opacity-80 text-center", children: module.description })] }, index))) })] })] }));
};
export default MasterDash;
