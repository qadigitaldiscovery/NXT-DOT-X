import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ConfigurationForm from './ConfigurationForm';
import SyncOptionsCard from './SyncOptionsCard';
const WooCommerceIntegration = () => {
    return (_jsxs("div", { className: "container max-w-4xl mx-auto py-6 space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold", children: "WooCommerce Integration" }), _jsx("p", { className: "text-muted-foreground", children: "Connect your WooCommerce store to synchronize products, orders, and customers." }), _jsx(ConfigurationForm, {}), _jsx(SyncOptionsCard, {})] }));
};
export default WooCommerceIntegration;
