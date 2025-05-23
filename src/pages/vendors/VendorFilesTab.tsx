import React from 'react';
import { useParams } from 'react-router-dom';

const VendorFilesTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="module-container">
      <h2>Files for Vendor ID: {id}</h2>
      <p>Manage documents and files related to the vendor.</p>
    </div>
  );
};

export default VendorFilesTab;