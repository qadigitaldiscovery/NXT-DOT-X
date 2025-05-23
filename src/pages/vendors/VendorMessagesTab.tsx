import React from 'react';
import { useParams } from 'react-router-dom';

const VendorMessagesTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="module-container">
      <h2>Messages for Vendor ID: {id}</h2>
      <p>View and manage communications with the vendor.</p>
    </div>
  );
};

export default VendorMessagesTab;