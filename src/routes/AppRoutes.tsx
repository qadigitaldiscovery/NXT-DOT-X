
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import NewMasterDashboard from '@/pages/NewMasterDashboard';
import DashboardV2Page from '@/pages/DashboardV2Page';
import RAGDashboardPage from '@/pages/RAGDashboard';
import TechHubPersonas from '@/pages/TechHubPersonas';

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<NewMasterDashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard-v2" element={<DashboardV2Page />} />
      <Route path="/rag-dashboard" element={<RAGDashboardPage />} />
      <Route path="/tech-hub/personas" element={<TechHubPersonas />} />
    </Routes>
  </Router>
);
