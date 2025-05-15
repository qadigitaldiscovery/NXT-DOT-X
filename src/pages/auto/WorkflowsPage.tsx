
import React from 'react';
import MissingPageTemplate from './MissingPageTemplate';
import { GitCompareArrows, List, Plus, History, Settings } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

const WorkflowsPage: React.FC = () => {
  const workflowsNavCategories: NavCategory[] = [
    {
      name: "Workflows",
      label: "Workflows",
      items: [
        { label: "Dashboard", path: "/workflows", icon: GitCompareArrows },
        { label: "All Workflows", path: "/workflows/list", icon: List },
        { label: "Create Workflow", path: "/workflows/new", icon: Plus },
        { label: "History", path: "/workflows/history", icon: History },
        { label: "Settings", path: "/workflows/settings", icon: Settings }
      ]
    }
  ];

  return (
    <MissingPageTemplate
      moduleName="Workflows"
      moduleDescription="Design, manage, and monitor business process workflows across the platform."
      navCategories={workflowsNavCategories}
      docsLink="/admin/documentation?section=workflows"
    />
  );
};

export default WorkflowsPage;
