import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteGuard } from '../utils/rbac/RouteGuard';
import { Permission } from '../utils/rbac/permissions';

// Placeholder components - to be replaced with actual implementations
const AutomationHome = () => (
  <div className="module-container">
    <h1>Automation & Workflows</h1>
    <p>Create and manage automated workflows and processes.</p>
  </div>
);

const WorkflowBuilder = () => (
  <div className="module-container">
    <h1>Workflow Builder</h1>
    <p>Design and configure automated workflows.</p>
  </div>
);

const TaskAutomation = () => (
  <div className="module-container">
    <h1>Task Automation</h1>
    <p>Configure automatic task creation and assignment.</p>
  </div>
);

const TriggerManagement = () => (
  <div className="module-container">
    <h1>Triggers</h1>
    <p>Set up event triggers for workflows and automations.</p>
  </div>
);

const AutomationAnalytics = () => (
  <div className="module-container">
    <h1>Analytics</h1>
    <p>Monitor and analyze automation performance and metrics.</p>
  </div>
);

/**
 * Automation & Workflow routes
 */
export const AutomationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <RouteGuard requiredPermissions={Permission.AUTOMATION_ACCESS}>
          <AutomationHome />
        </RouteGuard>
      } />
      
      <Route path="/workflows" element={
        <RouteGuard requiredPermissions={Permission.WORKFLOW_EDIT}>
          <WorkflowBuilder />
        </RouteGuard>
      } />
      
      <Route path="/tasks" element={
        <RouteGuard requiredPermissions={Permission.AUTOMATION_ACCESS}>
          <TaskAutomation />
        </RouteGuard>
      } />
      
      <Route path="/triggers" element={
        <RouteGuard requiredPermissions={Permission.WORKFLOW_EDIT}>
          <TriggerManagement />
        </RouteGuard>
      } />
      
      <Route path="/analytics" element={
        <RouteGuard requiredPermissions={Permission.AUTOMATION_ACCESS}>
          <AutomationAnalytics />
        </RouteGuard>
      } />
    </Routes>
  );
};

export default AutomationRoutes;