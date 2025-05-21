import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const SocialMediaMarketing = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "SOCIAL MEDIA MARKETING", path: "/social-media", variant: "default", features: [
                { name: 'Social Dashboard', path: '/social-media' },
                { name: 'Account Management', path: '/social-media/accounts' },
                { name: 'Content Calendar', path: '/social-media/calendar' },
                { name: 'Engagement Analytics', path: '/social-media/engagement' },
                { name: 'Social Settings', path: '/social-media/settings' }
            ] }) }));
};
export default SocialMediaMarketing;
