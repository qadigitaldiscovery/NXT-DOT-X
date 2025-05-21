import { jsx as _jsx } from "react/jsx-runtime";
import { Route } from "react-router-dom";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import TradingSystemDashboard from "@/pages/TradingSystemDashboard";
import TradingSystemSettings from "@/pages/TradingSystemSettings";
import TradingSystemTrades from "@/pages/TradingSystemTrades";
import TradingSystemAnalytics from "@/pages/TradingSystemAnalytics";
import TradingSystemHistory from "@/pages/TradingSystemHistory";
import { BarChart3, Settings, LineChart, ArrowLeftRight, History } from 'lucide-react';
const tradingSystemNavCategories = [
    {
        name: "Trading System",
        label: "TRADING SYSTEM",
        items: [
            { label: 'Dashboard', icon: BarChart3, path: '/trading-system' },
            { label: 'Trades', icon: ArrowLeftRight, path: '/trading-system/trades' },
            { label: 'Analytics', icon: LineChart, path: '/trading-system/analytics' },
            { label: 'History', icon: History, path: '/trading-system/history' },
            { label: 'Settings', icon: Settings, path: '/trading-system/settings' }
        ]
    }
];
export const TradingSystemRoutes = () => {
    return [
        _jsx(Route, { path: "/trading-system", element: _jsx(PlatformLayout, { moduleTitle: "Trading System", navCategories: tradingSystemNavCategories, children: _jsx(TradingSystemDashboard, {}) }) }, "trading-system-index"),
        _jsx(Route, { path: "/trading-system/trades", element: _jsx(PlatformLayout, { moduleTitle: "Trading System - Trades", navCategories: tradingSystemNavCategories, children: _jsx(TradingSystemTrades, {}) }) }, "trading-system-trades"),
        _jsx(Route, { path: "/trading-system/analytics", element: _jsx(PlatformLayout, { moduleTitle: "Trading System - Analytics", navCategories: tradingSystemNavCategories, children: _jsx(TradingSystemAnalytics, {}) }) }, "trading-system-analytics"),
        _jsx(Route, { path: "/trading-system/history", element: _jsx(PlatformLayout, { moduleTitle: "Trading System - History", navCategories: tradingSystemNavCategories, children: _jsx(TradingSystemHistory, {}) }) }, "trading-system-history"),
        _jsx(Route, { path: "/trading-system/settings", element: _jsx(PlatformLayout, { moduleTitle: "Trading System - Settings", navCategories: tradingSystemNavCategories, children: _jsx(TradingSystemSettings, {}) }) }, "trading-system-settings")
    ];
};
