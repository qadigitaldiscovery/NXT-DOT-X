import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteGuard } from '../utils/rbac/RouteGuard';
import { Permission } from '../utils/rbac/permissions';

// Placeholder components - to be replaced with actual implementations
const CommunicationsHome = () => (
  <div className="module-container">
    <h1>Communications Hub</h1>
    <p>Manage all your communication channels from one place.</p>
  </div>
);

const EmailCommunications = () => (
  <div className="module-container">
    <h1>Email Campaigns</h1>
    <p>Create and manage email marketing campaigns.</p>
  </div>
);

const SMSCommunications = () => (
  <div className="module-container">
    <h1>SMS Messaging</h1>
    <p>Send and track SMS campaigns and notifications.</p>
  </div>
);

const NotificationManagement = () => (
  <div className="module-container">
    <h1>Notifications</h1>
    <p>Configure system and user notifications.</p>
  </div>
);

const CommunicationTemplates = () => (
  <div className="module-container">
    <h1>Templates</h1>
    <p>Create and manage reusable communication templates.</p>
  </div>
);

/**
 * Communications Hub routes
 */
export const CommunicationsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <RouteGuard requiredPermissions={Permission.COMMUNICATION_ACCESS}>
          <CommunicationsHome />
        </RouteGuard>
      } />
      
      <Route path="/email" element={
        <RouteGuard requiredPermissions={Permission.COMMUNICATION_ACCESS}>
          <EmailCommunications />
        </RouteGuard>
      } />
      
      <Route path="/sms" element={
        <RouteGuard requiredPermissions={Permission.COMMUNICATION_ACCESS}>
          <SMSCommunications />
        </RouteGuard>
      } />
      
      <Route path="/notifications" element={
        <RouteGuard requiredPermissions={Permission.COMMUNICATION_ACCESS}>
          <NotificationManagement />
        </RouteGuard>
      } />
      
      <Route path="/templates" element={
        <RouteGuard requiredPermissions={Permission.COMMUNICATION_EDIT}>
          <CommunicationTemplates />
        </RouteGuard>
      } />
    </Routes>
  );
};

export default CommunicationsRoutes;