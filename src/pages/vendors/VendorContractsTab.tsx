import React from 'react';
import { useParams } from 'react-router-dom';

const VendorContractsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="module-container">
      <h2>Contracts for Vendor ID: {id}</h2>
      <p>Manage contracts and agreements with the vendor.</p>
    </div>
  );
};

export default VendorContractsTab;