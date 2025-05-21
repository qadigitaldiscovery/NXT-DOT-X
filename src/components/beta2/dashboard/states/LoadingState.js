import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@/components/ui/skeleton';
export const LoadingState = () => {
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-6 w-48 bg-white/20" }), _jsx(Skeleton, { className: "h-4 w-72 bg-white/20" }), _jsx(Skeleton, { className: "h-10 w-32 bg-white/20 mt-4" })] }));
};
