import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { SuppliersTable } from '../components/suppliers/SuppliersTable';
import { SupplierDetail } from '../components/suppliers/SupplierDetail';
import { SupplierForm } from '../components/suppliers/SupplierForm';

// Wrapper component to pass URL params to SupplierDetail
const SupplierDetailWrapper = () => {
  const { id } = useParams();
  return <SupplierDetail supplierId={id!} />;
};

// Wrapper component to pass URL params to SupplierForm
const SupplierFormWrapper = () => {
  const { id } = useParams();
  return <SupplierForm isEditing={!!id} initialData={undefined} />;
};

export const SupplierRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SuppliersTable />} />
      <Route path="/new" element={<SupplierForm />} />
      <Route path="/:id" element={<SupplierDetailWrapper />} />
      <Route path="/:id/edit" element={<SupplierFormWrapper />} />
    </Routes>
  );
};

// Export the routes configuration for the main router
export const supplierRoutes = [
  {
    path: '/beta1/suppliers/*',
    element: <SupplierRoutes />
  }
];
