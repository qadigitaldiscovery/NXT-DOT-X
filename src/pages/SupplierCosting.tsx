
import React from 'react';
import { Navigate } from 'react-router-dom';

const SupplierCosting = () => {
  // Redirect to the actual supplier costing page in the data management module
  return <Navigate to="/data-management/supplier-costing" replace />;
};

export default SupplierCosting;
