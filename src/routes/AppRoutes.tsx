
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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
      <Route path="/master" element={<MasterDash />} />
      <Route path="/rag-dashboard" element={<RAGDashboard />} />
      <Route path="/settings" element={<Settings />} />
      
      {/* Module Routes - Simple pages for now */}
      <Route path="/data-management/*" element={<div className="p-8"><h1 className="text-2xl">Data Management Module</h1></div>} />
      <Route path="/dot-x/*" element={<div className="p-8"><h1 className="text-2xl">DOT-X Operations Module</h1></div>} />
      <Route path="/tech-hub/*" element={<div className="p-8"><h1 className="text-2xl">Tech Hub Module</h1></div>} />
      <Route path="/brand-marketing/*" element={<div className="p-8"><h1 className="text-2xl">Brand Marketing Module</h1></div>} />
      <Route path="/projects/*" element={<div className="p-8"><h1 className="text-2xl">Project Management Module</h1></div>} />
      <Route path="/loyalty-rewards/*" element={<div className="p-8"><h1 className="text-2xl">Loyalty & Rewards Module</h1></div>} />
      <Route path="/trading-system/*" element={<div className="p-8"><h1 className="text-2xl">Trading System Module</h1></div>} />
      <Route path="/social-media/*" element={<div className="p-8"><h1 className="text-2xl">Social Media Marketing Module</h1></div>} />
      
      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
