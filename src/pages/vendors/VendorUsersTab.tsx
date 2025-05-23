import React from 'react';
import { useParams } from 'react-router-dom';

const VendorUsersTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="module-container">
      <h2>Users for Vendor ID: {id}</h2>
      <p>Manage user accounts associated with the vendor.</p>
    </div>
  );
};

export default VendorUsersTab;