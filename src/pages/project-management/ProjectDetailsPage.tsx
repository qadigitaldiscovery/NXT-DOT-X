import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="module-container">
      <h1>Project Details for ID: {id}</h1>
      <p>Detailed information about a specific project.</p>
    </div>
  );
};

export default ProjectDetailsPage;
