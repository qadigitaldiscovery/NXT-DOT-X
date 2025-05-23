import React from 'react';
import { useParams } from 'react-router-dom';

const VendorSpendTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="module-container">
      <h2>Spend Analysis for Vendor ID: {id}</h2>
      <p>Analyze and manage spending related to the vendor.</p>
    </div>
  );
};

export default VendorSpendTab;