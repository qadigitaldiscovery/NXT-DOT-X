import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardV2 from '@/pages/DashboardV2';
import NotFound from '@/pages/NotFound';

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<DashboardV2 />} />
      <Route path="/dashboard-v2" element={<DashboardV2 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);
