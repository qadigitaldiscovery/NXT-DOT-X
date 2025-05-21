import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import ScorecardsPage from "@/pages/auto/ScorecardsPage";
import { LineChart, PieChart, BarChart3, Settings, Plus } from 'lucide-react';
export const ScorecardsNavCategories = [
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
    return [
        _jsxs(Route, { path: "/scorecards", children: [_jsx(Route, { index: true, element: _jsx(PlatformLayout, { moduleTitle: "Scorecards", navCategories: ScorecardsNavCategories, children: _jsx(ScorecardsPage, {}) }) }), _jsx(Route, { path: "performance", element: _jsx(PlatformLayout, { moduleTitle: "Performance Scorecards", navCategories: ScorecardsNavCategories, children: _jsx(ScorecardsPage, {}) }) }), _jsx(Route, { path: "new", element: _jsx(PlatformLayout, { moduleTitle: "Create Scorecard", navCategories: ScorecardsNavCategories, children: _jsx(ScorecardsPage, {}) }) }), _jsx(Route, { path: "categories", element: _jsx(PlatformLayout, { moduleTitle: "Scorecard Categories", navCategories: ScorecardsNavCategories, children: _jsx(ScorecardsPage, {}) }) }), _jsx(Route, { path: "settings", element: _jsx(PlatformLayout, { moduleTitle: "Scorecard Settings", navCategories: ScorecardsNavCategories, children: _jsx(ScorecardsPage, {}) }) })] }, "scorecards-index")
    ];
};
