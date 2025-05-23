import React from 'react';
import { useParams } from 'react-router-dom';

const EventsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="module-container">
      <h2>Events for Vendor ID: {id}</h2>
      <p>Manage events and activities related to the vendor.</p>
    </div>
  );
};

export default EventsTab;