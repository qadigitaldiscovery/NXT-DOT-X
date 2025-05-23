
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SimpleLayout from '@/components/layout/SimpleLayout';

// Pages
import Landing from '@/pages/Landing';
import MasterDash from '@/pages/MasterDash';
import RAGDashboard from '@/pages/RAGDashboard';
import Settings from '@/pages/Settings';
import Unauthorized from '@/pages/Unauthorized';
import NotFound from '@/pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/master" replace />} />
      
      {/* Authentication Pages */}
      <Route path="/landing" element={<Landing />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Main Application Routes */}
      <Route path="/" element={<SimpleLayout />}>
        <Route path="master" element={<MasterDash />} />
        <Route path="rag-dashboard" element={<RAGDashboard />} />
        <Route path="settings" element={<Settings />} />
        
        {/* Module Routes - Simple pages for now */}
        <Route path="data-management" element={<div className="text-center py-8"><h1 className="text-2xl font-bold">Data Management Module</h1><p className="mt-4">Coming Soon</p></div>} />
        <Route path="loyalty-rewards" element={<div className="text-center py-8"><h1 className="text-2xl font-bold">Loyalty & Rewards Module</h1><p className="mt-4">Coming Soon</p></div>} />
        <Route path="trading-system" element={<div className="text-center py-8"><h1 className="text-2xl font-bold">Trading System Module</h1><p className="mt-4">Coming Soon</p></div>} />
        <Route path="social-media" element={<div className="text-center py-8"><h1 className="text-2xl font-bold">Social Media Module</h1><p className="mt-4">Coming Soon</p></div>} />
        <Route path="tech-hub" element={<div className="text-center py-8"><h1 className="text-2xl font-bold">Tech Hub Module</h1><p className="mt-4">Coming Soon</p></div>} />
        <Route path="dot-x" element={<div className="text-center py-8"><h1 className="text-2xl font-bold">DOT-X Module</h1><p className="mt-4">Coming Soon</p></div>} />
        <Route path="brand-marketing" element={<div className="text-center py-8"><h1 className="text-2xl font-bold">Brand Marketing Module</h1><p className="mt-4">Coming Soon</p></div>} />
        <Route path="projects" element={<div className="text-center py-8"><h1 className="text-2xl font-bold">Project Management Module</h1><p className="mt-4">Coming Soon</p></div>} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
