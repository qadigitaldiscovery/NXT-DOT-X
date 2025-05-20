import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EnhancedSuppliersPage from '../pages/data-management/enhanced-suppliers';

export const SupplierRoutes = () => {
  return (
    <Routes>
      <Route path="/suppliers" element={<EnhancedSuppliersPage />} />
      <Route path="/suppliers/:supplierId" element={<EnhancedSuppliersPage />} />
    </Routes>
  );
};

// Update App.tsx to include these routes:
// <Router>
//   <Routes>
//     <Route path="/*" element={<SupplierRoutes />} />
//   </Routes>
// </Router>
