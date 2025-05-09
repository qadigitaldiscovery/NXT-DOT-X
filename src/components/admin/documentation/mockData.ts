
import { DocumentCategory } from './types';

export const documentCategories: DocumentCategory[] = [
  {
    id: 'sys-projects',
    name: 'SYSTEMS PROJECTS',
    documents: [
      {
        id: 'sysplan-01',
        title: 'SYSPLAN-01: System Architecture & Module Design',
        content: `
# SYSPLAN-01: System Architecture & Module Design

## Overview
This document outlines the comprehensive architecture design for the NXT-DOT-X system, detailing module relationships, component interactions, and implementation guidelines.

## System Architecture

### Core Components
- **Frontend Layer**: React-based UI components using Tailwind CSS and ShadCN/UI
- **State Management**: Context API and React Query for data fetching/caching
- **Backend Services**: RESTful API endpoints with Supabase integration
- **Data Storage**: PostgreSQL database with normalized schema design

### Architecture Diagram

\`\`\`
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Presentation   │────▶│    Business     │────▶│     Data        │
│     Layer       │     │     Layer       │     │     Layer       │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ UI Components   │     │ Service Modules │     │  Data Access    │
│ - Dashboard     │     │ - Cost Analysis │     │  - Repositories │
│ - Documents     │     │ - Documents     │     │  - API Clients  │
│ - Cost Analysis │     │ - Suppliers     │     │  - Query Hooks  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
\`\`\`

## Module Design Details

### Document Management Module
- Document explorer component for hierarchical browsing
- Document viewer with support for multiple formats
- Advanced search functionality with filtering options
- Version control and document history tracking

### Cost Analysis Module
- Real-time cost metrics visualization 
- Trend analysis with historical comparison
- Supplier cost comparison and evaluation
- Category-based cost breakdown and variation analysis
- Cost optimization recommendation engine

### Supplier Management Module
- Supplier directory with detailed profiles
- Performance metrics and evaluation system
- Onboarding workflow and documentation
- Cost comparison and negotiation tools

## Component Relationships

### Inter-module Dependencies
- Cost Analysis depends on Supplier data for comparison features
- Document Management provides storage for Supplier contracts
- User permissions system governs access across all modules

### Data Flow Diagram

\`\`\`
                        ┌─────────────────┐
                        │                 │
                 ┌─────▶│  Cost Analysis  │◀─────┐
                 │      │                 │      │
                 │      └─────────────────┘      │
                 │                               │
┌─────────────────┐                     ┌─────────────────┐
│                 │                     │                 │
│    Document     │◀───────────────────▶│    Supplier     │
│   Management    │                     │   Management    │
│                 │                     │                 │
└─────────────────┘                     └─────────────────┘
\`\`\`

## Implementation Guidelines

### Coding Standards
- TypeScript with strict type checking
- Component-based architecture with clear separation of concerns
- Comprehensive test coverage (unit and integration)
- Documentation for all public APIs and components

### Performance Considerations
- Lazy loading of large components
- Optimized rendering with React.memo and useMemo
- Efficient data fetching with React Query caching
- Pagination for large data sets

### Security Guidelines
- Input validation and sanitization
- Role-based access control
- Secure API communication
- Data encryption for sensitive information

## Roadmap and Future Enhancements

### Phase 1: Q2 2023
- Complete Document Management system
- Enhance Cost Analysis with optimization features

### Phase 2: Q3 2023
- Implement Supplier Management system
- Develop integration between modules

### Phase 3: Q4 2023
- Add advanced reporting features
- Implement predictive analytics capabilities
`,
        created: '2023-05-09T10:00:00',
        updated: '2023-05-09T10:00:00',
        author: 'System Architecture Team'
      }
    ]
  },
  {
    id: 'core-docs',
    name: 'Core Documentation',
    documents: [
      {
        id: 'getting-started',
        title: 'Getting Started Guide',
        content: '# Getting Started\n\nWelcome to our documentation. This guide will help you get started with our system.',
        created: '2023-01-15T09:30:00',
        updated: '2023-02-01T14:20:00',
        author: 'Admin Team'
      },
      {
        id: 'api-docs',
        title: 'API Documentation',
        content: '# API Documentation\n\nThis document provides details about our API endpoints and how to use them.',
        created: '2023-01-20T11:45:00',
        updated: '2023-03-15T16:30:00',
        author: 'API Team'
      }
    ]
  },
  {
    id: 'user-guides',
    name: 'User Guides',
    documents: [
      {
        id: 'dashboard-guide',
        title: 'Dashboard User Guide',
        content: '# Dashboard Guide\n\nLearn how to use the dashboard effectively with this comprehensive guide.',
        created: '2023-02-10T13:15:00',
        updated: '2023-02-10T13:15:00',
        author: 'User Experience Team'
      },
      {
        id: 'report-guide',
        title: 'Reporting System Guide',
        content: '# Reporting System\n\nThis guide explains how to generate and customize reports in the system.',
        created: '2023-02-12T10:00:00',
        updated: '2023-04-05T09:20:00',
        author: 'Reporting Team'
      }
    ]
  }
];
