import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SuppliersTable } from '../components/suppliers/SuppliersTable';
import { SupplierDetail } from '../components/suppliers/SupplierDetail';

// Wrapper component to get URL params and pass to SupplierDetail
const SupplierDetailWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <SupplierDetail supplierId={id || ''} />;
};

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/beta1/suppliers" replace />} />
      <Route path="/beta1/suppliers" element={<SuppliersTable />} />
      <Route 
        path="/beta1/suppliers/:id" 
        element={
          <SupplierDetailWrapper />
        } 
      />
      {/* Add more routes as needed */}
    </Routes>
  );
};
