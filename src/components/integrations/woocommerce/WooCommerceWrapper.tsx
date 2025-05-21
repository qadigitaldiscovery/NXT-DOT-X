
import React from 'react';
import { Suspense } from 'react';
import WooCommerceIntegration from '@/components/tech-hub/integrations/woocommerce/WooCommerceIntegration';

const WooCommerceWrapper: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading WooCommerce integration...</div>}>
      <WooCommerceIntegration />
    </Suspense>
  );
};

export default WooCommerceWrapper;
