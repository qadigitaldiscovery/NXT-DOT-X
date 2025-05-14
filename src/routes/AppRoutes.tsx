import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewMasterDashboard from '@/pages/NewMasterDashboard';
import Dashboard from '@/pages/Dashboard';
import RAGDashboardPage from '@/pages/rag-dashboard/RAGDashboardPage';

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
