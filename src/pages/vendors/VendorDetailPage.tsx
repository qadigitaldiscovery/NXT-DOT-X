import React from 'react';
import { useParams, Outlet, Link } from 'react-router-dom';

const VendorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="module-container">
      <h1>Vendor Detail: {id}</h1>
      <p>This page displays detailed information for Vendor ID: {id}.</p>

      <nav>
        <ul className="vendor-tabs">
          <li><Link to=".">Data</Link></li>
          <li><Link to="marketiq">Market IQ</Link></li>
          <li><Link to="contracts">Contracts</Link></li>
          <li><Link to="events">Events</Link></li>
          <li><Link to="messages">Messages</Link></li>
          <li><Link to="files">Files</Link></li>
          <li><Link to="forms">Forms</Link></li>
          <li><Link to="users">Users</Link></li>
          <li><Link to="track">Track</Link></li>
          <li><Link to="risk">Risk</Link></li>
          <li><Link to="spend">Spend</Link></li>
        </ul>
      </nav>

      <div className="vendor-tab-content">
        <Outlet />
      </div>
    </div>
  );
};

export default VendorDetailPage;
