
import React from 'react';
import MissingPageTemplate from './MissingPageTemplate';
import { LineChart, PieChart, BarChart3, Settings, Plus } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

const ScorecardsPage: React.FC = () => {
  const scorecardsNavCategories: NavCategory[] = [
    {
      name: "Scorecards",
      label: "Scorecards",
      items: [
        { label: "Dashboard", path: "/scorecards", icon: BarChart3 },
        { label: "Performance", path: "/scorecards/performance", icon: LineChart },
        { label: "Create Scorecard", path: "/scorecards/new", icon: Plus },
        { label: "Categories", path: "/scorecards/categories", icon: PieChart },
        { label: "Settings", path: "/scorecards/settings", icon: Settings }
      ]
    }
  ];

  return (
    <MissingPageTemplate
      moduleName="Scorecards"
      moduleDescription="Manage and visualize performance scorecards for business metrics and KPIs."
      navCategories={scorecardsNavCategories}
      docsLink="/admin/documentation?section=scorecards"
    />
  );
};

export default ScorecardsPage;
