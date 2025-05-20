
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SuppliersPage from '../pages/SuppliersPage';
import NewSupplierPage from '../pages/NewSupplierPage';
import EditSupplierPage from '../pages/EditSupplierPage';
import SupplierCostsPage from '../pages/SupplierCostsPage';
import UploadsPage from '../pages/UploadsPage';
import NewUploadPage from '../pages/NewUploadPage';

export const SupplierRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SuppliersPage />} />
      <Route path="/new" element={<NewSupplierPage />} />
      <Route path="/:id" element={<EditSupplierPage />} />
      <Route path="/costs" element={<SupplierCostsPage />} />
      <Route path="/uploads" element={<UploadsPage />} />
      <Route path="/uploads/new" element={<NewUploadPage />} />
    </Routes>
  );
};
