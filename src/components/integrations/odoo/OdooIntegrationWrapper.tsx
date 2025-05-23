
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OdooIntegrationWrapper: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Odoo Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Odoo integration functionality (Security disabled - all access granted)
        </p>
      </CardContent>
    </Card>
  );
};

export default OdooIntegrationWrapper;
