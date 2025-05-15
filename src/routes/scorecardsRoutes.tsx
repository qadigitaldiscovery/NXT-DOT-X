
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import ScorecardsPage from "@/pages/auto/ScorecardsPage";
import { LineChart, PieChart, BarChart3, Settings, Plus } from 'lucide-react';
import { NavCategory } from '@/components/layout/sidebar/types';

export const ScorecardsNavCategories: NavCategory[] = [
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

export const ScorecardsRoutes = () => {
  return (
    <Route path="/scorecards">
      <Route index element={
        <PlatformLayout
          moduleTitle="Scorecards"
          navCategories={ScorecardsNavCategories}
        >
          <ScorecardsPage />
        </PlatformLayout>
      } />
      <Route path="performance" element={
        <PlatformLayout
          moduleTitle="Performance Scorecards"
          navCategories={ScorecardsNavCategories}
        >
          <ScorecardsPage />
        </PlatformLayout>
      } />
      <Route path="new" element={
        <PlatformLayout
          moduleTitle="Create Scorecard"
          navCategories={ScorecardsNavCategories}
        >
          <ScorecardsPage />
        </PlatformLayout>
      } />
      <Route path="categories" element={
        <PlatformLayout
          moduleTitle="Scorecard Categories"
          navCategories={ScorecardsNavCategories}
        >
          <ScorecardsPage />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="Scorecard Settings"
          navCategories={ScorecardsNavCategories}
        >
          <ScorecardsPage />
        </PlatformLayout>
      } />
    </Route>
  );
};
