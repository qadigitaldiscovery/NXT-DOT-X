import React from 'react';
import { useParams } from 'react-router-dom';

const VendorRiskTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="module-container">
      <h2>Risk Management for Vendor ID: {id}</h2>
      <p>Assess and manage risks associated with the vendor.</p>
    </div>
  );
};

export default VendorRiskTab;