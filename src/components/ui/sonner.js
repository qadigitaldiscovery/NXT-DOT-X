import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Toaster as Sonner } from "sonner";
const Toaster = ({ ...props }) => {
    const { theme } = useContext(ThemeContext);
    const themeValue = theme === "dark" ? "dark" : "light";
    return (_jsx(Sonner, { theme: themeValue, className: "toaster group", toastOptions: {
            classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            },
        }, ...props }));
};
export { Toaster };
