import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DashboardHeader } from '@/components/beta2/dashboard/DashboardHeader';
import { LoyaltyStatusCard } from '@/components/beta2/dashboard/LoyaltyStatusCard';
import { QuickNavSection } from '@/components/beta2/dashboard/QuickNavSection';
import { GettingStartedGuide } from '@/components/beta2/dashboard/GettingStartedGuide';
const LoyaltyDashboard = () => {
    return (_jsxs("div", { className: "space-y-8", children: [_jsx(DashboardHeader, { title: "Loyalty Rewards Module", description: "Welcome to the loyalty program management platform." }), _jsx(LoyaltyStatusCard, {}), _jsx(QuickNavSection, {}), _jsx(GettingStartedGuide, {})] }));
};
export default LoyaltyDashboard;
