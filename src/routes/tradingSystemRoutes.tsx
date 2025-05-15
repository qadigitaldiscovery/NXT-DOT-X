
import { Route } from "react-router-dom";
import { PlatformLayout } from "@/components/layouts/PlatformLayout";
import TradingSystemDashboard from "@/pages/TradingSystemDashboard";
import TradingSystemSettings from "@/pages/TradingSystemSettings";
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
  return (
    <Route path="/trading-system">
      <Route index element={
        <PlatformLayout
          moduleTitle="Trading System"
          navCategories={tradingSystemNavCategories}
        >
          <TradingSystemDashboard />
        </PlatformLayout>
      } />
      <Route path="trades" element={
        <PlatformLayout
          moduleTitle="Trading System - Trades"
          navCategories={tradingSystemNavCategories}
        >
          <TradingSystemDashboard />
        </PlatformLayout>
      } />
      <Route path="analytics" element={
        <PlatformLayout
          moduleTitle="Trading System - Analytics"
          navCategories={tradingSystemNavCategories}
        >
          <TradingSystemDashboard />
        </PlatformLayout>
      } />
      <Route path="history" element={
        <PlatformLayout
          moduleTitle="Trading System - History"
          navCategories={tradingSystemNavCategories}
        >
          <TradingSystemDashboard />
        </PlatformLayout>
      } />
      <Route path="settings" element={
        <PlatformLayout
          moduleTitle="Trading System - Settings"
          navCategories={tradingSystemNavCategories}
        >
          <TradingSystemSettings />
        </PlatformLayout>
      } />
    </Route>
  );
};
