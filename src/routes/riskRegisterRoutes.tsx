
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import RiskRegisterPage from "@/pages/auto/RiskRegisterPage";
import { AlertCircle, Shield, BarChart3, FileText, Settings } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

export const RiskRegisterNavCategories: NavCategory[] = [
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

export const RiskRegisterRoutes = () => {
  return (
    <Route path="/risk-register">
      <Route index element={
        <PlatformLayout
          moduleTitle="Risk Register"
          navCategories={RiskRegisterNavCategories}
        >
          <RiskRegisterPage />
        </PlatformLayout>
      } />
      <Route path="matrix" element={
        <PlatformLayout
          moduleTitle="Risk Matrix"
          navCategories={RiskRegisterNavCategories}
        >
          <RiskRegisterPage />
        </PlatformLayout>
      } />
      <Route path="analytics" element={
        <PlatformLayout
          moduleTitle="Risk Analytics"
          navCategories={RiskRegisterNavCategories}
        >
          <RiskRegisterPage />
        </PlatformLayout>
      } />
      <Route path="reports" element={
        <PlatformLayout
          moduleTitle="Risk Reports"
          navCategories={RiskRegisterNavCategories}
        >
          <RiskRegisterPage />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="Risk Register Settings"
          navCategories={RiskRegisterNavCategories}
        >
          <RiskRegisterPage />
        </PlatformLayout>
      } />
    </Route>
  );
};
