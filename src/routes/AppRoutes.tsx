// AppRoutes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardV2Page from '@/pages/DashboardV2Page';

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/dashboard-v2" element={<DashboardV2Page />} />
    </Routes>
  </Router>
);
