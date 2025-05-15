
import React from 'react';
import MissingPageTemplate from './MissingPageTemplate';
import { Building, Users, FileText, Map, Settings } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

const EntitiesPage: React.FC = () => {
  const entitiesNavCategories: NavCategory[] = [
    {
      name: "Entities",
      label: "Entities",
      items: [
        { label: "Dashboard", path: "/entities", icon: Building },
        { label: "Directory", path: "/entities/list", icon: List },
        { label: "Personnel", path: "/entities/personnel", icon: Users },
        { label: "Documents", path: "/entities/documents", icon: FileText },
        { label: "Locations", path: "/entities/locations", icon: Map },
        { label: "Settings", path: "/entities/settings", icon: Settings }
      ]
    }
  ];

  return (
    <MissingPageTemplate
      moduleName="Entities"
      moduleDescription="Manage organizational entities, their structure, personnel, and related information."
      navCategories={entitiesNavCategories}
      docsLink="/admin/documentation?section=entities"
    />
  );
};

export default EntitiesPage;
