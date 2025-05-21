import { jsx as _jsx } from "react/jsx-runtime";
import OdooIntegration from '@/components/tech-hub/integrations/odoo/OdooIntegration';
const OdooIntegrationWrapper = () => {
    const handleSaveConfig = (config) => {
        console.log("Config saved:", config);
        return Promise.resolve();
    };
    return (_jsx(OdooIntegration, { onSaveConfig: handleSaveConfig }));
};
export default OdooIntegrationWrapper;
