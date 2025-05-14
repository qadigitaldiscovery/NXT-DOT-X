import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewMasterDashboard from '@/pages/NewMasterDashboard';

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/dashboard-v2" element={<NewMasterDashboard />} />
    </Routes>
  </Router>
);
