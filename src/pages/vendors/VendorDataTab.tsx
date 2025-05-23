import React from 'react';
import { useParams } from 'react-router-dom';

const VendorDataTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="module-container">
      <h2>Vendor Data for ID: {id}</h2>
      <p>Details about the vendor's core data.</p>
    </div>
  );
};

export default VendorDataTab;