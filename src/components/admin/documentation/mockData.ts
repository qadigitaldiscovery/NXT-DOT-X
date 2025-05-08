
import { DocumentCategory } from './types';

export const mockDocumentationData: DocumentCategory[] = [
  {
    id: 'system-docs',
    name: 'System Documentation',
    documents: [
      {
        id: 'system-overview',
        title: 'System Overview',
        type: 'text',
        content: `<h1>System Overview</h1>
        <p>This document provides a comprehensive overview of the Trading System application architecture and key components.</p>
        <h2>Key Components</h2>
        <ul>
          <li>Data Management Module</li>
          <li>Cost Analysis Engine</li>
          <li>Pricing Optimization</li>
          <li>Supplier Management</li>
        </ul>`,
        createdAt: '2025-01-15T10:30:00Z',
        updatedAt: '2025-04-02T14:22:00Z'
      },
      {
        id: 'architecture',
        title: 'System Architecture',
        type: 'markdown',
        content: `# System Architecture
        
        ## Frontend Architecture
        - React 18 with TypeScript
        - Tailwind CSS for styling
        - ShadCN UI component library
        - React Router for navigation
        
        ## Backend Services
        - Supabase for authentication and data storage
        - Edge Functions for server-side logic
        - Real-time subscriptions for live updates`,
        createdAt: '2025-01-20T09:15:00Z',
        updatedAt: '2025-04-10T11:30:00Z'
      },
      {
        id: 'security-protocols',
        title: 'Security Protocols',
        type: 'text',
        content: `<h1>Security Protocols</h1>
        <p>This document outlines the security measures implemented in the trading system.</p>
        <h2>Authentication</h2>
        <p>We use JWT-based authentication with role-based access control.</p>
        <h2>Data Protection</h2>
        <p>All sensitive data is encrypted at rest and in transit.</p>`,
        createdAt: '2025-02-05T14:20:00Z',
        updatedAt: '2025-04-15T16:45:00Z'
      }
    ]
  },
  {
    id: 'user-guides',
    name: 'User Guides',
    documents: [
      {
        id: 'getting-started',
        title: 'Getting Started Guide',
        type: 'markdown',
        content: `# Getting Started with the Trading System
        
        Welcome to the Trading System platform! This guide will help you get started with the basic features.
        
        ## First Steps
        
        1. Log in to your account
        2. Complete your profile
        3. Configure your notification preferences
        
        ## Key Features
        
        * **Data Management** - Upload and manage your trading data
        * **Cost Analysis** - Analyze supplier costs and identify savings opportunities
        * **Price Management** - Set and optimize pricing strategies
        * **Reporting** - Generate comprehensive reports`,
        createdAt: '2025-02-10T10:00:00Z',
        updatedAt: '2025-04-05T09:30:00Z'
      },
      {
        id: 'data-management-guide',
        title: 'Data Management Guide',
        type: 'text',
        content: `<h1>Data Management User Guide</h1>
        <p>Learn how to effectively manage your data in the Trading System.</p>
        <h2>Uploading Files</h2>
        <p>The system supports CSV, Excel, and PDF file formats. To upload a file:</p>
        <ol>
          <li>Navigate to the Uploads page</li>
          <li>Click "New Upload" button</li>
          <li>Select your file or drag and drop it into the upload area</li>
          <li>Select the appropriate supplier if applicable</li>
          <li>Submit the form</li>
        </ol>
        <h2>Managing Documents</h2>
        <p>All uploaded documents can be viewed and managed from the Document Repository.</p>`,
        createdAt: '2025-02-15T11:20:00Z',
        updatedAt: '2025-04-12T14:15:00Z'
      }
    ]
  },
  {
    id: 'api-docs',
    name: 'API Documentation',
    documents: [
      {
        id: 'api-overview',
        title: 'API Overview',
        type: 'markdown',
        content: `# API Documentation
        
        This document provides comprehensive information about the Trading System API endpoints.
        
        ## Base URL
        
        All API endpoints are relative to: \`https://api.tradingsystem.com/v1\`
        
        ## Authentication
        
        All API requests require a valid JWT token in the Authorization header:
        
        \`\`\`
        Authorization: Bearer YOUR_TOKEN
        \`\`\`
        
        ## Rate Limiting
        
        API requests are limited to 100 requests per minute per user.`,
        createdAt: '2025-03-01T09:00:00Z',
        updatedAt: '2025-04-18T10:30:00Z'
      },
      {
        id: 'api-endpoints',
        title: 'API Endpoints Reference',
        type: 'text',
        content: `<h1>API Endpoints Reference</h1>
        <h2>Suppliers</h2>
        <pre>GET /suppliers - List all suppliers
POST /suppliers - Create a new supplier
GET /suppliers/:id - Get a specific supplier
PUT /suppliers/:id - Update a supplier
DELETE /suppliers/:id - Delete a supplier</pre>
        <h2>Cost Data</h2>
        <pre>GET /costs - List all cost entries
POST /costs - Create a new cost entry
GET /costs/:id - Get a specific cost entry
PUT /costs/:id - Update a cost entry
DELETE /costs/:id - Delete a cost entry</pre>
        <h2>Price Data</h2>
        <pre>GET /prices - List all prices
POST /prices - Create a new price
GET /prices/:id - Get a specific price
PUT /prices/:id - Update a price
DELETE /prices/:id - Delete a price</pre>`,
        createdAt: '2025-03-05T14:30:00Z',
        updatedAt: '2025-04-20T16:45:00Z'
      }
    ]
  },
  {
    id: 'release-notes',
    name: 'Release Notes',
    documents: [
      {
        id: 'v2-release',
        title: 'Version 2.0 Release Notes',
        type: 'markdown',
        content: `# Version 2.0 Release Notes
        
        **Release Date: April 15, 2025**
        
        ## New Features
        
        * **Advanced Price Optimization** - AI-powered price optimization engine
        * **Improved Document Repository** - Better organization and search functionality
        * **Competitor Price Tracking** - Monitor competitor prices in real-time
        
        ## Improvements
        
        * 50% faster data processing
        * Enhanced mobile experience
        * Streamlined supplier onboarding workflow
        
        ## Bug Fixes
        
        * Fixed issue with PDF document preview
        * Resolved data synchronization issues
        * Fixed chart rendering on Safari browsers`,
        createdAt: '2025-04-15T12:00:00Z',
        updatedAt: '2025-04-15T12:00:00Z'
      },
      {
        id: 'v1-5-release',
        title: 'Version 1.5 Release Notes',
        type: 'text',
        content: `<h1>Version 1.5 Release Notes</h1>
        <p><strong>Release Date: February 1, 2025</strong></p>
        <h2>New Features</h2>
        <ul>
          <li>Bulk supplier data import</li>
          <li>Enhanced reporting dashboard</li>
          <li>Data export to multiple formats</li>
        </ul>
        <h2>Improvements</h2>
        <ul>
          <li>Updated UI design for better usability</li>
          <li>Improved search functionality</li>
          <li>Optimized database performance</li>
        </ul>
        <h2>Bug Fixes</h2>
        <ul>
          <li>Fixed calculation errors in cost analysis</li>
          <li>Resolved user permission issues</li>
          <li>Fixed file upload errors with large files</li>
        </ul>`,
        createdAt: '2025-02-01T10:00:00Z',
        updatedAt: '2025-02-01T10:00:00Z'
      }
    ]
  }
];
