
import React from 'react';
import { Navigate } from 'react-router-dom';

const SupplierCosting = () => {
  // Redirect to the actual supplier costing page
  return <Navigate to="/supplier-costing" replace />;
};

export default SupplierCosting;
