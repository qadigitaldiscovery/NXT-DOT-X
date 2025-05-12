
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';

export default function ProjectManagement() {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate('/projects')}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Project Management</h3>
        <div className="p-2 bg-blue-100 rounded-md">
          <ClipboardList className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-4">Manage projects, tasks, and team collaboration</p>
      <div className="flex justify-between text-xs">
        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">Projects</span>
        <span className="bg-green-50 text-green-700 px-2 py-1 rounded">Tasks</span>
        <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded">Teams</span>
      </div>
    </div>
  );
}
