import { jsx as _jsx } from "react/jsx-runtime";
import { ModuleCard } from '../ModuleCard';
const BrandMarketing = () => {
    return (_jsx("div", { className: "col-span-1", children: _jsx(ModuleCard, { title: "BRAND MARKETING", path: "/brand-marketing", variant: "default", features: [
                { name: 'Campaign Analytics', path: '/brand-marketing/campaigns' },
                { name: 'Brand Awareness', path: '/brand-marketing/awareness' },
                { name: 'Market Perception', path: '/brand-marketing/perception' },
                { name: 'SEO Keywords', path: '/brand-marketing/seo' }
            ] }) }));
};
export default BrandMarketing;
