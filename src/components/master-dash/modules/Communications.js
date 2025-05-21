import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const Communications = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "COMMUNICATIONS", path: "/communications", variant: "default", features: [
                { name: 'Email Campaigns', path: '/communications/email' },
                { name: 'SMS Messaging', path: '/communications/sms' },
                { name: 'Notifications', path: '/communications/notifications' },
                { name: 'Templates', path: '/communications/templates' }
            ] }) }));
};
export default Communications;
