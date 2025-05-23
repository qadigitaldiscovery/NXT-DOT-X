import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

interface MainLayoutProps {
  children?: ReactNode;
}

/**
 * Main application layout
 * Provides consistent structure with navigation sidebar and content area
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <Navigation />
      
      <div className="content-container">
        <div className="content-header">
          <div className="breadcrumb">
            {/* Breadcrumb component could be added here */}
          </div>
          
          <div className="header-actions">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button className="search-button">🔍</button>
            </div>
            
            <div className="notifications">
              <button className="notification-button">🔔</button>
            </div>
          </div>
        </div>
        
        <main className="content-main">
          {children || <Outlet />}
        </main>
        
        <footer className="content-footer">
          <div className="copyright">
            © 2025 NXT-DOT-X. All rights reserved.
          </div>
          <div className="version">
            Version 2.0.0
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;