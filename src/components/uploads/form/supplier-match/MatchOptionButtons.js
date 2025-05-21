import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function MatchOptionButtons({ matchOption, setMatchOption }) {
    return (_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("a", { href: "#", className: `flex-1 inline-flex items-center justify-center text-sm font-medium py-2 px-4 ${matchOption === 'existing'
                    ? "text-primary-foreground bg-primary hover:text-primary-foreground/90 hover:underline"
                    : "text-foreground hover:text-primary hover:underline"}`, onClick: (e) => {
                    e.preventDefault();
                    setMatchOption('existing');
                }, "aria-label": "Use existing supplier", children: "Use Existing Supplier" }), _jsx("a", { href: "#", className: `flex-1 inline-flex items-center justify-center text-sm font-medium py-2 px-4 ${matchOption === 'new'
                    ? "text-primary-foreground bg-primary hover:text-primary-foreground/90 hover:underline"
                    : "text-foreground hover:text-primary hover:underline"}`, onClick: (e) => {
                    e.preventDefault();
                    setMatchOption('new');
                }, "aria-label": "Create new supplier", children: "Create New Supplier" })] }));
}
