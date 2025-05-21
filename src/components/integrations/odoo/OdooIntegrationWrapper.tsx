
import React from 'react';
import OdooIntegration from '@/components/tech-hub/integrations/odoo/OdooIntegration';

const OdooIntegrationWrapper: React.FC = () => {
  const handleSaveConfig = (config: any) => {
    console.log("Config saved:", config);
    return Promise.resolve();
  };
  
  return (
    <OdooIntegration onSaveConfig={handleSaveConfig} />
  );
};

export default OdooIntegrationWrapper;
