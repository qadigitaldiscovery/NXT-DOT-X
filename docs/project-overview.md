# NXT-DOT-X Platform Documentation

## Overview

NXT-DOT-X is a comprehensive business management platform built with modern web technologies. It provides a modular system for managing various business operations including data management, supplier tracking, cost analysis, customer management, and more.

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Library**: Shadcn UI components (based on Radix UI)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Context API and React Query
- **Backend**: Supabase (PostgreSQL database with authentication)

## Project Structure

### Core Application Files
- **Entry Points**: 
  - `src/main.tsx` - Application entry point
  - `src/App.tsx` - Main App component with providers
  - `src/routes/index.tsx` - Route export and organization
  - `src/routes/AppRoutes.tsx` - Main routing configuration

### Configuration Files
- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - UI components configuration

### State Management
- `src/context/AuthContext.tsx` - Authentication context
- `src/context/ThemeContext.tsx` - Theme context
- `src/context/UserManagementContext.tsx` - User management state

### Backend Integration
- `src/integrations/supabase/client.ts` - Supabase client
- `src/integrations/supabase/migrate.ts` - Database migrations
- `src/integrations/supabase/types.ts` - Database types

### Core UI Components
- `src/components/layouts/PlatformLayout.tsx` - Main layout wrapper
- `src/components/layout/sidebar/Sidebar.tsx` - Sidebar navigation
- `src/components/layout/sidebar/NavigationConfig.tsx` - Navigation structure

## Key Feature Modules

### 1. Master Dashboard
The central hub for navigating between all modules.
- **Key Files**:
  - `src/pages/MasterDash.tsx` - Top-level dashboard

### 2. Data Management
Tools for handling data, suppliers, costs, and pricing.
- **Key Files**:
  - `src/pages/data-management/` - Data-related pages
  - `src/pages/SuppliersPage.tsx` - Supplier management
  - `src/pages/CostAnalysis.tsx` - Cost analysis tools
  - `src/pages/PriceManagement.tsx` - Price management

### 3. RAG Dashboard (Retrieval Augmented Generation)
AI-powered dashboard for knowledge retrieval and generation.
- **Key Files**:
  - `src/components/rag-dashboard/` - Dashboard components
  - `src/pages/rag-dashboard/` - RAG pages
  - `src/components/rag-dashboard/RAGDashboardGridContainer.tsx` - Main dashboard layout

### 4. Tech Hub
Management for technology integrations and AI tools.
- **Key Files**:
  - `src/components/tech-hub/` - Tech tools components
  - `src/pages/TechHubPersonas.tsx` - AI personas management
  - `src/components/tech-hub/api-management/` - API management tools

### 5. Admin Tools
Administrative interfaces for user and system management.
- **Key Files**:
  - `src/pages/admin/` - Admin panel pages
  - `src/pages/UserManagement.tsx` - User management interface
  - `src/components/admin/users/` - User admin components

### 6. Supplier Management
Tools for managing suppliers and vendor relationships.
- **Key Files**:
  - `src/pages/supplier-management/` - Supplier-related pages
  - `src/components/suppliers/` - Supplier components

### 7. Customer Management
Tools for managing customer relationships.
- **Key Files**:
  - `src/pages/customer-management/` - Customer-related pages
  - `src/components/customers/` - Customer components

## API Integrations

### OpenAI Integration
- **Key Files**:
  - `src/hooks/api-clients/openai/` - OpenAI API client hooks
  - `src/hooks/api-clients/openai/use-openai-client.ts` - OpenAI client hook
  - `src/utils/api-clients/openai/` - OpenAI utilities

### Requesty (Custom API Tool)
- **Key Files**:
  - `src/hooks/api-clients/requesty/` - Custom API client
  - `src/components/requesty/` - Requesty components

## Serverless Functions (Supabase Edge Functions)

The platform uses Supabase Edge Functions for server-side processing:

- `supabase/functions/api-proxy/` - API proxy function
- `supabase/functions/threshold-checker/` - Monitoring function
- `supabase/functions/extract-zip/` - File extraction service
- `supabase/functions/fetch-credit-report/` - Credit report service
- `supabase/functions/api-integrations/` - API integration functions

## Security and Access Control

- **Authentication**: Managed through AuthContext using Supabase Auth
- **Role-Based Access Control (RBAC)**: 
  - `src/utils/rbac/` - Role-based access control utilities
  - `src/components/rag-dashboard/PermissionGuard.tsx` - Permission-based component guard

## Key Utilities

- `src/lib/` - Common utilities
- `src/utils/` - Application utilities
- `src/utils/upload-service.ts` - File upload service
- `src/utils/vendorCalculations.ts` - Vendor pricing calculations

## Navigation Structure

The platform uses a hierarchical navigation system with categories and items:

```typescript
// Example from NavigationConfig.tsx
export const navCategories: NavCategory[] = [
  {
    label: "Data Management",
    items: [
      { label: 'Dashboard', icon: Database, href: '/data-management' },
      { label: 'Supplier Directory', icon: Truck, href: '/data-management/suppliers' },
      { label: 'Customer Directory', icon: Building, href: '/data-management/customers' },
      { label: 'Supplier Costing', icon: BarChart3, href: '/data-management/supplier-costing' },
      { label: 'Cost Analysis', icon: BarChart3, href: '/data-management/cost-analysis' },
      // ...more items
    ]
  },
  // ...more categories
];
```

## Development Workflow

1. Local development: `npm run dev`
2. Building for production: `npm run build`
3. Adding new pages: Create in `src/pages/` and add routes in `src/routes/`
4. Adding new components: Create in `src/components/` following existing patterns
5. Supabase migrations: Handled through `src/integrations/supabase/migrate.ts`

## Authentication System

The platform uses a simple authentication system with role-based permissions:

```typescript
// From AuthContext.tsx
interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  permissions: string[];
}
```

The system includes built-in roles (admin, manager, user) with different permission sets.

## Styling System

The platform uses Tailwind CSS with a custom theme configuration. The `className` pattern is heavily used for styling components, with helper utilities like `cn()` for conditional class names.

## Future Development Areas

Based on the codebase exploration, potential areas for future development include:

1. Enhanced AI integration with the RAG dashboard
2. Expanded supplier and customer management tools
3. Improved data visualization and reporting
4. More advanced user role management
5. Integration with additional external APIs and services

---

This document serves as a high-level overview of the NXT-DOT-X platform architecture and can be used as a reference guide for future development and maintenance work. 