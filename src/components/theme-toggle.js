import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";
export const ThemeToggle = React.memo(() => {
    const { theme, toggleTheme } = useTheme();
    // Use a callback for click handler to prevent re-renders
    const handleThemeToggle = React.useCallback(() => {
        toggleTheme();
    }, [toggleTheme]);
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "icon", className: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700", children: [_jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-blue-500" }), _jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-300" }), _jsx("span", { className: "sr-only", children: "Toggle theme" })] }) }), _jsx(DropdownMenuContent, { align: "end", className: "bg-white border-gray-200 shadow-lg", children: _jsxs(DropdownMenuItem, { onClick: handleThemeToggle, className: "hover:bg-gray-50 cursor-pointer", children: [theme === "light" ? "Dark" : "Light", " mode"] }) })] }));
});
ThemeToggle.displayName = 'ThemeToggle';
