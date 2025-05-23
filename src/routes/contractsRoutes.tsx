
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import ContractsPage from "@/pages/auto/ContractsPage";
import { FileText, ClipboardCheck, Calendar, AlertCircle, Plus, Upload } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

export const ContractsNavCategories: NavCategory[] = [
  {
    name: "Contracts",
    label: "Contracts",
    items: [
      { label: "Dashboard", path: "/contracts", icon: FileText },
      { label: "All Contracts", path: "/contracts/list", icon: ClipboardCheck },
      { label: "Create Contract", path: "/contracts/new", icon: Plus },
      { label: "Bulk Upload", path: "/contracts/bulk-upload", icon: Upload },
      { label: "Calendar View", path: "/contracts/calendar", icon: Calendar },
      { label: "Expiring Soon", path: "/contracts/expiring", icon: AlertCircle }
    ]
  }
];

export const ContractsRoutes = () => {
  return (
    <Route path="/contracts">
      <Route index element={
        <PlatformLayout
          moduleTitle="Contracts Dashboard"
          navCategories={ContractsNavCategories}
        >
          <ContractsPage />
        </PlatformLayout>
      } />
      <Route path="list" element={
        <PlatformLayout
          moduleTitle="All Contracts"
          navCategories={ContractsNavCategories}
        >
          <ContractsPage />
        </PlatformLayout>
      } />
      <Route path="new" element={
        <PlatformLayout
          moduleTitle="Create New Contract"
          navCategories={ContractsNavCategories}
        >
          <ContractsPage />
        </PlatformLayout>
      } />
      <Route path="bulk-upload" element={
        <PlatformLayout
          moduleTitle="Bulk Upload Contracts"
          navCategories={ContractsNavCategories}
        >
          <ContractsPage />
        </PlatformLayout>
      } />
      <Route path="calendar" element={
        <PlatformLayout
          moduleTitle="Contracts Calendar"
          navCategories={ContractsNavCategories}
        >
          <ContractsPage />
        </PlatformLayout>
      } />
      <Route path="expiring" element={
        <PlatformLayout
          moduleTitle="Expiring Contracts"
          navCategories={ContractsNavCategories}
        >
          <ContractsPage />
        </PlatformLayout>
      } />
    </Route>
  );
};
