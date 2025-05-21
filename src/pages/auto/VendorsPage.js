import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { forceHardRefresh } from '@/utils/cacheUtils';
// Complete replacement of the vendors page with a redirect to suppliers
const VendorsPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    useEffect(() => {
        // Attempt to clear cache and redirect
        console.log('Forcing redirect from old page to appropriate module');
        // If we have an ID parameter, redirect to the vendor detail page
        if (id) {
            setTimeout(() => {
                navigate(`/vendors/${id}`, { replace: true });
            }, 100);
        }
        else {
            // Otherwise, redirect to the suppliers list
            setTimeout(() => {
                navigate('/data-management/suppliers', { replace: true });
            }, 100);
        }
    }, [navigate, id]);
    return (_jsxs("div", { className: "container mx-auto p-8 text-center", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Redirecting..." }), _jsx("p", { className: "mb-6", children: "You are being redirected to the appropriate page." }), _jsx("button", { onClick: () => forceHardRefresh(), className: "px-4 py-2 bg-red-600 text-white rounded", children: "Click here if not redirected automatically" })] }));
};
export default VendorsPage;
