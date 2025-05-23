import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div className="unauthorized-container">
      <h1>403 - Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
};

export default Unauthorized;
