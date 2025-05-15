
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MissingPageTemplate from './MissingPageTemplate';
import { Building2, FileText, ListFilter, Users, Plus } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

const VendorsPage: React.FC = () => {
  const navigate = useNavigate();

  const vendorsNavCategories: NavCategory[] = [
    {
      name: "Vendors",
      label: "Vendors",
      items: [
        { label: "Dashboard", path: "/vendors", icon: Building2 },
        { label: "Directory", path: "/vendors/directory", icon: ListFilter },
        { label: "Add New Vendor", path: "/vendors/new", icon: Plus },
        { label: "Reports", path: "/vendors/reports", icon: FileText },
        { label: "Vendor Contacts", path: "/vendors/contacts", icon: Users }
      ]
    }
  ];

  return (
    <MissingPageTemplate
      moduleName="Vendors"
      moduleDescription="Manage vendors, suppliers, and their associated data within the platform."
      navCategories={vendorsNavCategories}
      docsLink="/admin/documentation?section=vendors"
    />
  );
};

export default VendorsPage;
