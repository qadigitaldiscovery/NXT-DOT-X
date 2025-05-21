import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import WooCommerceIntegration from '@/components/tech-hub/integrations/woocommerce/WooCommerceIntegration';
const WooCommerceWrapper = () => {
    return (_jsx(Suspense, { fallback: _jsx("div", { children: "Loading WooCommerce integration..." }), children: _jsx(WooCommerceIntegration, {}) }));
};
export default WooCommerceWrapper;
