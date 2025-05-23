
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OdooIntegration: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Odoo Integration Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Configure Odoo integration settings (Security restrictions removed)
        </p>
      </CardContent>
    </Card>
  );
};

export default OdooIntegration;
