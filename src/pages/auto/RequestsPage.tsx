
import React from 'react';
import MissingPageTemplate from './MissingPageTemplate';
import { FileInput, Plus, ClipboardList, Clock, Settings } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

const RequestsPage: React.FC = () => {
  const requestsNavCategories: NavCategory[] = [
    {
      name: "Requests",
      label: "Submit Requests",
      items: [
        { label: "Dashboard", path: "/requests", icon: FileInput },
        { label: "New Request", path: "/requests/new", icon: Plus },
        { label: "My Requests", path: "/requests/my-requests", icon: ClipboardList },
        { label: "Pending Requests", path: "/requests/pending", icon: Clock },
        { label: "Settings", path: "/requests/settings", icon: Settings }
      ]
    }
  ];

  return (
    <MissingPageTemplate
      moduleName="Submit Requests"
      moduleDescription="Create and manage service requests, feature requests, and support tickets."
      navCategories={requestsNavCategories}
      docsLink="/admin/documentation?section=requests"
    />
  );
};

export default RequestsPage;
