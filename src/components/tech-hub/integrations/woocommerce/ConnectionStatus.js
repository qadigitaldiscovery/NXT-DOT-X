import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
const ConnectionStatus = ({ status }) => {
    if (status === 'idle') {
        return null;
    }
    if (status === 'success') {
        return (_jsxs(Alert, { className: "mt-4 bg-green-50 border-green-200", children: [_jsx(CheckCircle, { className: "h-5 w-5 text-green-600" }), _jsx(AlertTitle, { className: "text-green-800", children: "Connection Successful" }), _jsx(AlertDescription, { className: "text-green-700", children: "Your WooCommerce store is properly configured and connected." })] }));
    }
    return (_jsxs(Alert, { className: "mt-4 bg-red-50 border-red-200", children: [_jsx(XCircle, { className: "h-5 w-5 text-red-600" }), _jsx(AlertTitle, { className: "text-red-800", children: "Connection Failed" }), _jsx(AlertDescription, { className: "text-red-700", children: "Unable to connect to your WooCommerce store. Please check your API credentials." })] }));
};
export default ConnectionStatus;
