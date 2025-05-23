import React from 'react';
import { useParams } from 'react-router-dom';

const VendorFormsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="module-container">
      <h2>Forms for Vendor ID: {id}</h2>
      <p>Manage forms and surveys related to the vendor.</p>
    </div>
  );
};

export default VendorFormsTab;