import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Topbar = ({ onMenuClick, moduleTitle }) => {
    return (_jsxs("header", { className: "h-16 bg-white shadow flex items-center px-4 dark:bg-neutral-900", children: [_jsx("button", { onClick: onMenuClick, className: "text-gray-600 dark:text-gray-300 mr-4", type: "button", "aria-label": "Toggle menu", children: "\u2630" }), _jsx("h1", { className: "text-xl font-semibold", children: moduleTitle || "Dashboard" })] }));
};
export default Topbar;
