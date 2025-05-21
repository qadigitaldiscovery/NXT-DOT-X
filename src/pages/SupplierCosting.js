import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
const SupplierCosting = () => {
    // Redirect to the actual supplier costing page in the data management module
    return _jsx(Navigate, { to: "/data-management/supplier-costing", replace: true });
};
export default SupplierCosting;
