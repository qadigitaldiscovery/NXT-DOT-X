import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem, getNavigationForUserRole } from '../utils/rbac/sidebarUtils';
import { IconMap } from '../utils/icons'; // Import the IconMap

/**
 * Main navigation sidebar component
 * Renders navigation based on user permissions
 */
const Navigation: React.FC = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  // Mock user role - replace with actual user context
  const userRole = 'ADMIN';
  
  // Get navigation items filtered by user permissions
  const navItems = getNavigationForUserRole(userRole);
  
  // Toggle expanded state for menu items with children
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Check if a nav item or any of its children is active
  const isActive = (item: NavItem): boolean => {
    if (location.pathname === item.path) return true;
    
    if (item.children) {
      return item.children.some(child => 
        location.pathname === child.path || 
        (child.path && location.pathname.startsWith(child.path))
      );
    }
    
    return item.path !== '' && location.pathname.startsWith(item.path);
  };
  
  // Render a navigation item
  const renderNavItem = (item: NavItem) => {
    const active = isActive(item);
    const hasChildren = item.children && item.children.length > 0;
    const expanded = expandedItems[item.id];
    
    const IconComponent = item.icon ? IconMap[item.icon] : null; // Get the icon component

    return (
      <li key={item.id} className={`nav-item ${active ? 'active' : ''}`}>
        {item.path ? (
          <Link to={item.path} className="nav-link">
            {IconComponent && <span className="nav-icon"><IconComponent size={20} /></span>} {/* Render icon */}
            <span className="nav-label">{item.label}</span>
          </Link>
        ) : (
          <div 
            className={`nav-group-header ${hasChildren ? 'has-children' : ''}`}
            onClick={() => hasChildren && toggleExpand(item.id)}
          >
            {IconComponent && <span className="nav-icon"><IconComponent size={20} /></span>} {/* Render icon */}
            <span className="nav-label">{item.label}</span>
            {hasChildren && (
              <span className={`expand-icon ${expanded ? 'expanded' : ''}`}>
                ▼
              </span>
            )}
          </div>
        )}
        
        {hasChildren && expanded && (
          <ul className="nav-children">
            {item.children!.map(child => renderNavItem(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className="main-navigation">
      <div className="navigation-header">
        <div className="app-logo">
          <img src="/logo.svg" alt="Logo" />
          <span>NXT-DOT-X</span>
        </div>
      </div>
      
      <ul className="nav-list">
        {navItems.map(item => renderNavItem(item))}
      </ul>
      
      <div className="navigation-footer">
        <div className="user-info">
          <div className="user-avatar">
            <img src="/placeholder.svg" alt="User" />
          </div>
          <div className="user-details">
            <div className="user-name">Admin User</div>
            <div className="user-role">{userRole}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;