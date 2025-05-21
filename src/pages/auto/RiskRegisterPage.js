import { jsx as _jsx } from "react/jsx-runtime";
import MissingPageTemplate from './MissingPageTemplate';
import { AlertCircle, Shield, BarChart3, FileText, Settings } from 'lucide-react';
const RiskRegisterPage = () => {
    const riskRegisterNavCategories = [
        {
            name: "Risk Register",
            label: "Risk Register",
            items: [
                { label: "Dashboard", path: "/risk-register", icon: AlertCircle },
                { label: "Risk Matrix", path: "/risk-register/matrix", icon: Shield },
                { label: "Analytics", path: "/risk-register/analytics", icon: BarChart3 },
                { label: "Reports", path: "/risk-register/reports", icon: FileText },
                { label: "Settings", path: "/risk-register/settings", icon: Settings }
            ]
        }
    ];
    return (_jsx(MissingPageTemplate, { moduleName: "Risk Register", moduleDescription: "Track, manage, and mitigate business and operational risks across the organization.", navCategories: riskRegisterNavCategories, docsLink: "/admin/documentation?section=risk-register" }));
};
export default RiskRegisterPage;
