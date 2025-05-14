
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardV2Page from '@/pages/DashboardV2Page';
import RAGDashboardPage from '@/pages/RAGDashboard';
import Dashboard from '@/pages/Dashboard';
import NewMasterDashboard from '@/pages/NewMasterDashboard';

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<NewMasterDashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard-v2" element={<NewMasterDashboard />} />
      <Route path="/rag-dashboard" element={<RAGDashboardPage />} />
    </Routes>
  </Router>
);
