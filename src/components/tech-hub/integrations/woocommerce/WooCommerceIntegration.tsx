
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WooCommerceIntegration: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>WooCommerce Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          WooCommerce integration functionality (Security disabled)
        </p>
      </CardContent>
    </Card>
  );
};

export default WooCommerceIntegration;
