import React from 'react';
import { useParams } from 'react-router-dom';

const VendorTrackTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="module-container">
      <h2>Tracking for Vendor ID: {id}</h2>
      <p>Track and monitor activities and performance related to the vendor.</p>
    </div>
  );
};

export default VendorTrackTab;