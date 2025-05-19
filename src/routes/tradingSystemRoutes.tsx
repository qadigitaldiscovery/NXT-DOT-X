
import React from "react";
import { Route } from "react-router-dom";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import TradingSystemDashboard from "@/pages/TradingSystemDashboard";
import TradingSystemSettings from "@/pages/TradingSystemSettings";
import TradingSystemTrades from "@/pages/TradingSystemTrades";
import TradingSystemAnalytics from "@/pages/TradingSystemAnalytics";
import TradingSystemHistory from "@/pages/TradingSystemHistory";
import { NavCategory } from '@/components/layout/sidebar/types';
import { BarChart3, Settings, LineChart, ArrowLeftRight, History } from 'lucide-react';

const tradingSystemNavCategories: NavCategory[] = [
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
    <Route key="trading-system-index" path="/trading-system" element={
      <PlatformLayout
        moduleTitle="Trading System"
        navCategories={tradingSystemNavCategories}
      >
        <TradingSystemDashboard />
      </PlatformLayout>
    } />,
    <Route key="trading-system-trades" path="/trading-system/trades" element={
      <PlatformLayout
        moduleTitle="Trading System - Trades"
        navCategories={tradingSystemNavCategories}
      >
        <TradingSystemTrades />
      </PlatformLayout>
    } />,
    <Route key="trading-system-analytics" path="/trading-system/analytics" element={
      <PlatformLayout
        moduleTitle="Trading System - Analytics"
        navCategories={tradingSystemNavCategories}
      >
        <TradingSystemAnalytics />
      </PlatformLayout>
    } />,
    <Route key="trading-system-history" path="/trading-system/history" element={
      <PlatformLayout
        moduleTitle="Trading System - History"
        navCategories={tradingSystemNavCategories}
      >
        <TradingSystemHistory />
      </PlatformLayout>
    } />,
    <Route key="trading-system-settings" path="/trading-system/settings" element={
      <PlatformLayout
        moduleTitle="Trading System - Settings"
        navCategories={tradingSystemNavCategories}
      >
        <TradingSystemSettings />
      </PlatformLayout>
    } />
  ];
};
