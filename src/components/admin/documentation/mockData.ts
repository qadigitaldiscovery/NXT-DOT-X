
import { DocumentCategory, DocumentType } from './types';

export const documentCategories: DocumentCategory[] = [
  {
    id: 'sys-docs',
    name: 'SYSTEM DOCUMENTATION',
    documents: [
      {
        id: 'sys-arch-basic',
        title: 'System Architecture & Design Documentation - Basic',
        type: 'markdown',
        content: `# 📘 NXT-DOT-X System Architecture & Design Documentation

## 1. Document Control

| Field | Details |
| ----- | ------- |
| Document Title | NXT-DOT-X – Architecture & Design Guide (Basic Version) |
| Version | 1.0 |
| Prepared By | System Builder |
| Date Created | 2025-05-11 |
| Last Updated | 2025-05-11 |
| Reviewed By | Pending Review |

## 2. Table of Contents

- [1. Document Control](#1-document-control)
- [2. Table of Contents](#2-table-of-contents)
- [3. Executive Summary](#3-executive-summary)
- [4. High-Level Architecture](#4-high-level-architecture)
- [5. Module-by-Module Breakdown](#5-module-by-module-breakdown)
- [6. Data Architecture](#6-data-architecture)
- [7. User Roles & Permissions](#7-user-roles--permissions)
- [8. Integrations Overview](#8-integrations-overview)
- [9. System Flow Diagrams](#9-system-flow-diagrams)
- [10. Deployment Architecture](#10-deployment-architecture)
- [11. Known Gaps & Roadmap](#11-known-gaps--roadmap)
- [12. Glossary of Terms](#12-glossary-of-terms)

## 3. Executive Summary

The NXT-DOT-X platform is a comprehensive business management solution designed to centralize operations, data analysis, and system administration. The platform provides a modular approach to business management, with specialized modules for different business functions.

### Business objectives addressed:
- Centralized business operations management
- Data-driven decision making through analytics
- Cost optimization and analysis
- Supplier and customer relationship management
- System configuration and technical management

### Target users and personas:
- Business administrators
- Financial analysts
- Operational managers
- Technical support staff
- System administrators

### Current development state: 
In Progress - Core modules functional with ongoing feature development`,
        createdAt: '2023-05-09T10:00:00',
        updatedAt: '2023-05-09T10:00:00',
        author: 'System Architecture Team'
      },
      {
        id: 'lead-dev-profile',
        title: 'Lead Developer Profile',
        type: 'markdown',
        content: `# Lead Developer Profile

## Role Overview

The Lead Developer is responsible for overseeing the technical implementation of the NXT-DOT-X project, ensuring code quality, architectural integrity, and alignment with business requirements.

## Responsibilities

- Technical leadership and decision making
- Code quality assurance
- Architecture design and maintenance
- Team mentoring and knowledge sharing
- Sprint planning and task prioritization
- Technical debt management
- Integration with external systems
- Performance optimization
- Documentation oversight and standards enforcement

## Technical Guidelines

### Code Quality Standards

- All code must be TypeScript with proper typing
- Components should be small, focused, and reusable
- Follow the project's naming conventions and file structure
- Write unit tests for critical functionality
- Use proper error handling and logging`,
        createdAt: '2023-01-15T09:30:00',
        updatedAt: '2023-02-01T14:20:00',
        author: 'Admin Team'
      },
      {
        id: 'sys-arch-comp',
        title: 'System Architecture & Design Documentation - Comprehensive',
        type: 'markdown',
        content: `# 📘 NXT-DOT-X System Architecture & Design Documentation (Comprehensive)

## 1. Document Control

| Field | Details |
| ----- | ------- |
| Document Title | NXT-DOT-X – Comprehensive Architecture & Design Guide |
| Version | 1.0 |
| Prepared By | System Builder |
| Date Created | 2025-05-11 |
| Last Updated | 2025-05-11 |
| Reviewed By | Pending Review |

## 2. Table of Contents

- [1. Document Control](#1-document-control)
- [2. Table of Contents](#2-table-of-contents)
- [3. Executive Summary](#3-executive-summary)
- [4. High-Level Architecture](#4-high-level-architecture)
- [5. Module-by-Module Breakdown](#5-module-by-module-breakdown)
- [6. Data Architecture](#6-data-architecture)
- [7. User Roles & Permissions](#7-user-roles--permissions)
- [8. Integrations Overview](#8-integrations-overview)
- [9. System Flow Diagrams](#9-system-flow-diagrams)
- [10. Deployment Architecture](#10-deployment-architecture)
- [11. Known Gaps & Roadmap](#11-known-gaps--roadmap)
- [12. Glossary of Terms](#12-glossary-of-terms)
- [13. Appendices](#13-appendices)

## 3. Executive Summary

The NXT-DOT-X platform represents a sophisticated, comprehensive business management solution designed to unify and streamline diverse operational aspects across an organization. This modular platform serves as a centralized command center, empowering stakeholders with actionable insights, process optimization tools, and integrated management capabilities.`,
        createdAt: '2023-03-20T11:45:00',
        updatedAt: '2023-05-15T16:30:00',
        author: 'Architecture Team'
      }
    ]
  },
  {
    id: 'sys-projects',
    name: 'SYSTEMS PROJECTS',
    documents: [
      {
        id: 'sysplan-01',
        title: 'SYSPLAN-01: System Architecture & Module Design',
        type: 'markdown',
        content: `# SYSPLAN-01: System Architecture & Module Design

## Overview
This document outlines the comprehensive architecture design for the NXT-DOT-X system, detailing module relationships, component interactions, and implementation guidelines.

## System Architecture

### Core Components
- **Frontend Layer**: React-based UI components using Tailwind CSS and ShadCN/UI
- **State Management**: Context API and React Query for data fetching/caching
- **Backend Services**: RESTful API endpoints with Supabase integration
- **Data Storage**: PostgreSQL database with normalized schema design`,
        createdAt: '2023-05-09T10:00:00',
        updatedAt: '2023-05-09T10:00:00',
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
        type: 'markdown',
        content: '# Getting Started\n\nWelcome to our documentation. This guide will help you get started with our system.',
        createdAt: '2023-01-15T09:30:00',
        updatedAt: '2023-02-01T14:20:00',
        author: 'Admin Team'
      },
      {
        id: 'api-docs',
        title: 'API Documentation',
        type: 'markdown',
        content: '# API Documentation\n\nThis document provides details about our API endpoints and how to use them.',
        createdAt: '2023-01-20T11:45:00',
        updatedAt: '2023-03-15T16:30:00',
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
        type: 'markdown',
        content: '# Dashboard Guide\n\nLearn how to use the dashboard effectively with this comprehensive guide.',
        createdAt: '2023-02-10T13:15:00',
        updatedAt: '2023-02-10T13:15:00',
        author: 'User Experience Team'
      },
      {
        id: 'report-guide',
        title: 'Reporting System Guide',
        type: 'markdown',
        content: '# Reporting System\n\nThis guide explains how to generate and customize reports in the system.',
        createdAt: '2023-02-12T10:00:00',
        updatedAt: '2023-04-05T09:20:00',
        author: 'Reporting Team'
      }
    ]
  }
];
