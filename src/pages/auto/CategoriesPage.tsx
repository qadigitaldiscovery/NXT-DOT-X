
import React from 'react';
import MissingPageTemplate from './MissingPageTemplate';
import { FolderKanban, List, PieChart, Settings, Plus } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

const CategoriesPage: React.FC = () => {
  const categoriesNavCategories: NavCategory[] = [
    {
      name: "Categories",
      label: "Categories",
      items: [
        { label: "Overview", path: "/categories", icon: FolderKanban },
        { label: "All Categories", path: "/categories/list", icon: List },
        { label: "Create Category", path: "/categories/new", icon: Plus },
        { label: "Analytics", path: "/categories/analytics", icon: PieChart },
        { label: "Settings", path: "/categories/settings", icon: Settings }
      ]
    }
  ];

  return (
    <MissingPageTemplate
      moduleName="Categories"
      moduleDescription="Manage system categorization for data organization and reporting."
      navCategories={categoriesNavCategories}
      docsLink="/admin/documentation?section=categories"
    />
  );
};

export default CategoriesPage;
