import React from 'react';
import { useParams } from 'react-router-dom';

const VendorMarketIQTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="module-container">
      <h2>Market IQ for Vendor ID: {id}</h2>
      <p>Market intelligence and insights related to the vendor.</p>
    </div>
  );
};

export default VendorMarketIQTab;