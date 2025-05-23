# Architectural Blueprint: Business Governance & RAG Operations Module

## 1. High-Level Overview & Strategic Goals:

The primary objective is to establish a robust, scalable, and centralized `business_governance` module. This module will serve as the single source of truth for all business rules, their application, tracking, and notification. Critically, it will incorporate `rag_operations` as a key submodule, reflecting the strategic importance of governing AI-driven information retrieval. The "Systems Admin" section will provide internal technical oversight and auditing.

**Goals:**

*   **Centralized Rule Management:** Define, store, and manage business rules in a structured, auditable manner.
*   **Ubiquitous Rule Application:** Enable seamless integration and application of rules across all platform modules (module-specific, cross-module, and RAG-specific).
*   **Comprehensive Tracking & Auditing:** Capture detailed logs of rule applications and RAG operations, supporting both business-level tracking and technical system administration.
*   **Operational Visibility:** Provide dashboards and reporting for rule performance, RAG performance, and system health.
*   **Maintainability & Extensibility:** Design for easy evolution of rules, rule types, and new integrations without requiring core code changes.
*   **Security & Compliance:** Ensure strict access control for rule management and sensitive audit data, supporting compliance requirements.

## 2. Architectural Principles:

*   **Modularity:** Clearly defined components with strong encapsulation and loose coupling.
*   **Single Responsibility Principle (SRP):** Each component/service focuses on a single aspect of the business governance or RAG domain.
*   **Extensibility:** Design for future rule types, notification channels, and RAG model integrations without architectural overhaul.
*   **Data Integrity & Auditability:** Prioritize reliable data storage and comprehensive logging for all critical operations.
*   **Performance:** Optimize rule evaluation and data retrieval for real-time application where necessary.
*   **Security-First:** Embed security (authentication, authorization, data protection) at every layer.
*   **Observability:** Built-in logging, monitoring, and alerting capabilities.

## 3. Technology Stack:

Leveraging the existing project context, the primary technologies will be:

*   **Backend & Database:** Supabase (PostgreSQL for relational data, Edge Functions for serverless logic).
*   **Frontend:** React/TypeScript.
*   **Language:** TypeScript for all application logic.
*   **API Communication:** RESTful APIs, potentially with WebSockets for real-time rule updates/notifications if required.
*   **Rule Engine (Internal/External):** A custom, lightweight rule interpreter or a dedicated library if complexity demands (e.g., `json-logic-js` for simple JSON-based rules).

## 4. Phased Development Plan:

The development will be structured iteratively to deliver core capabilities incrementally.

### Development Tracking Checklist

This checklist provides a granular view of the development and implementation tasks, categorized by Phase and Milestone for easy tracking.

#### Status Legend:
*   `[ ]` - Not Started
*   `[x]` - Completed
*   `[o]` - In Progress
*   `[>]` - Blocked

---

**Phase 1: Core Business Governance Module (MVP)**

*   **Milestone 1.1: Core Data Models & Schema (Target: [Date])**
    *   `[x]` Task 1.1.1: Define `BusinessRule` interface (`src/types/business-governance.ts`)
    *   `[x]` Task 1.1.2: Define `RuleContext` interface (`src/types/business-governance.ts`)
    *   `[x]` Task 1.1.3: Define `RuleEvaluationResult` interface (`src/types/business-governance.ts`)
    *   `[x]` Task 1.1.4: Define `RuleApplicationLogData` interface (`src/types/business-governance.ts`)
    *   `[x]` Task 1.1.5: Design `public.business_rules` table schema
    *   `[x]` Task 1.1.6: Create `public.business_rules` Supabase migration
    *   `[x]` Task 1.1.7: Design `public.rule_application_logs` table schema
    *   `[x]` Task 1.1.8: Create `public.rule_application_logs` Supabase migration

*   **Milestone 1.2: Core Service & Integration Placeholder (Target: [Date])**
    *   `[x]` Task 1.2.1: Implement CRUD operations for `BusinessRule` entities (`src/services/business-governance/businessGovernanceService.ts`)
    *   `[x]` Task 1.2.2: Implement `getApplicableRules(moduleId, triggerEvent)` method (`src/services/business-governance/businessGovernanceService.ts`)
    *   `[x]` Task 1.2.3: Implement `evaluateRule(ruleId, context)` method (initial logic) (`src/services/business-governance/businessGovernanceService.ts`)
    *   `[x]` Task 1.2.4: Implement `logRuleApplication(logData)` for recording rule evaluations (`src/services/business-governance/businessGovernanceService.ts`)
    *   `[ ]` Task 1.2.5: Create `applyBusinessRules(context)` utility function (`src/utils/business-governance-integrations.ts`)
    *   `[ ]` Task 1.2.6: Integrate `applyBusinessRules` into `src/pages/vendors/VendorFormsTab.tsx` (PoC)
    *   `[ ]` Task 1.2.7: Integrate `applyBusinessRules` into a `src/services/loyalty/` method (PoC)

*   **Milestone 1.3: Basic Rule UI (Optional MVP) (Target: [Date])**
    *   `[ ]` Task 1.3.1: Develop basic UI form for creating/editing `BusinessRule` entries (if required for MVP)

---

**Phase 2: RAG Operations Submodule Integration**

*   **Milestone 2.1: RAG Data Models & Schema (Target: [Date])**
    *   `[ ]` Task 2.1.1: Define `RagQueryLogData` interface (`src/types/rag-operations.ts`)
    *   `[ ]` Task 2.1.2: Design `public.rag_query_logs` table schema
    *   `[ ]` Task 2.1.3: Create `public.rag_query_logs` Supabase migration

*   **Milestone 2.2: RAG Operations Service & Logging (Target: [Date])**
    *   `[ ]` Task 2.2.1: Implement `logRagQuery(logData)` method (`src/services/rag-operations/ragOperationsService.ts`)
    *   `[ ]` Task 2.2.2: Implement RAG performance metrics aggregation methods (`src/services/rag-operations/ragOperationsService.ts`)
    *   `[ ]` Task 2.2.3: Implement basic RAG audit query methods (`src/services/rag-operations/ragOperationsService.ts`)
    *   `[ ]` Task 2.2.4: Integrate RAG logging into existing RAG pipeline (e.g., `supabase/functions/rag-dashboard/index.ts`)

*   **Milestone 2.3: Cross-Pollination (Target: [Date])**
    *   `[ ]` Task 2.3.1: Enhance `BusinessGovernanceService.evaluateRule` for `rag_operations` scope
    *   `[ ]` Task 2.3.2: Integrate `applyBusinessRules` into RAG query pipeline (pre-retrieval/post-generation)

---

**Phase 3: Systems Admin Section & Shared Capabilities**

*   **Milestone 3.1: Admin Permissions & API (Target: [Date])**
    *   `[ ]` Task 3.1.1: Define new admin permissions (`src/types/rbac.ts`, `src/utils/rbac/permissions.ts`)
    *   `[ ]` Task 3.1.2: Create new API endpoints for `rule_application_logs` (filtered)
    *   `[ ]` Task 3.1.3: Create new API endpoints for `rag_query_logs` (filtered)
    *   `[ ]` Task 3.1.4: Create new API endpoints for system configuration
    *   `[ ]` Task 3.1.5: Extend `BusinessGovernanceService` with admin query methods (`getFilteredRuleApplicationLogs()`)
    *   `[ ]` Task 3.1.6: Extend `BusinessGovernanceService` with system-wide configuration methods (if applicable)

*   **Milestone 3.2: Systems Admin UI (Target: [Date])**
    *   `[ ]` Task 3.2.1: Create `BusinessGovernanceAdminPage.tsx`
    *   `[ ]` Task 3.2.2: Develop `RuleAuditLogViewer.tsx` component
    *   `[ ]` Task 3.2.3: Develop `RagOperationsDashboard.tsx` component
    *   `[ ]` Task 3.2.4: Implement `SystemConfigEditor.tsx` (if applicable)

*   **Milestone 3.3: Refined Shared Capabilities (Target: [Date])**
    *   `[ ]` Task 3.3.1: Standardize unified logging formats
    *   `[ ]` Task 3.3.2: Define `CaptureCriteria` for rule and RAG anomalies
    *   `[ ]` Task 3.3.3: Integrate with generic `NotificationService`
    *   `[ ]` Task 3.3.4: Implement shared `metricsUtils.ts`
    *   `[ ]` Task 3.3.5: Formalize shared configuration management approach

---

**Phase 4: Advanced Features & Refinements**

*   **Milestone 4.1: Advanced Rule Engine & Versioning (Target: [Date])**
    *   `[ ]` Task 4.1.1: Implement/Integrate advanced rule engine (if needed)
    *   `[ ]` Task 4.1.2: Enhance `business_rules` schema for versioning
    *   `[ ]` Task 4.1.3: Implement versioning logic in `BusinessGovernanceService`

*   **Milestone 4.2: Performance & Testing (Target: [Date])**
    *   `[ ]` Task 4.2.1: Implement caching for frequently accessed rules
    *   `[ ]` Task 4.2.2: Optimize database queries for logs and rule evaluation
    *   `[ ]` Task 4.2.3: Implement asynchronous rule evaluation (if needed)
    *   `[ ]` Task 4.2.4: Conduct comprehensive unit tests
    *   `[ ]` Task 4.2.5: Conduct comprehensive integration tests
    *   `[ ]` Task 4.2.6: Conduct performance tests
    *   `[ ]` Task 4.2.7: Conduct security tests

*   **Milestone 4.3: Enhanced Reporting (Target: [Date])**
    *   `[ ]` Task 4.3.1: Allow custom notification rule definitions
    *   `[ ]` Task 4.3.2: Develop advanced business user reporting dashboards

---

### **Phase 1: Core Business Governance Module (MVP)**

**Objective:** Establish the foundation for business rule definition, storage, and application.

*   **Task 1.1: Define Core Data Models (`src/types/business-governance.ts`)**
    *   [x] Create `BusinessRule` interface: `id`, `name`, `description`, `rule_definition` (JSONB), `type`, `scope`, `applicable_modules[]`, `application_method`, `frequency`, `is_active`, `created_at`, `updated_at`.
*   **Task 1.2: Database Schema & Migrations (`supabase/migrations/`)**
    *   [x] Design and create `public.business_rules` table.
    *   [x] Design and create `public.rule_application_logs` table.
    *   [x] Create corresponding Supabase migration files.
*   **Task 1.3: Develop Core Business Governance Service (`src/services/business-governance/businessGovernanceService.ts`)**
    *   [x] Implement CRUD operations for `BusinessRule` entities.
    *   [x] Implement `getApplicableRules(moduleId: string, triggerEvent: string)` method.
    *   [x] Implement `evaluateRule(ruleId: string, context: RuleContext)` method (initial simple logic, e.g., direct JS evaluation or basic JSON path matching).
    *   [x] Implement `logRuleApplication(logData: RuleApplicationLogData)` for recording rule evaluations.
*   **Task 1.4: Universal Integration Placeholder (`src/utils/business-governance-integrations.ts`)**
    *   [ ] Create the `applyBusinessRules(context: RuleContext)` utility function as outlined in previous discussions.
    *   [ ] Ensure it orchestrates fetching, evaluating, and logging rules.
*   **Task 1.5: Basic UI for Rule Definition (Optional for MVP)**
    *   [ ] If user input for rules is critical for MVP, a basic form for creating/editing `BusinessRule` entries directly into the `business_rules` table. Otherwise, initial rules can be seeded directly.
*   **Task 1.6: Initial Integration Points (Proof-of-Concept)**
    *   [ ] Integrate `applyBusinessRules` into one or two existing modules (e.g., `src/pages/vendors/VendorFormsTab.tsx` and a `src/services/loyalty/` method) to demonstrate basic rule application.
*   **Task 1.5: Basic UI for Rule Definition (Optional for MVP)**
    *   If user input for rules is critical for MVP, a basic form for creating/editing `BusinessRule` entries directly into the `business_rules` table. Otherwise, initial rules can be seeded directly.
*   **Task 1.6: Initial Integration Points (Proof-of-Concept)**
    *   Integrate `applyBusinessRules` into one or two existing modules (e.g., `src/pages/vendors/VendorFormsTab.tsx` and a `src/services/loyalty/` method) to demonstrate basic rule application.

---

### **Phase 2: RAG Operations Submodule Integration**

**Objective:** Integrate RAG-specific monitoring and governance within the `business_governance` framework.

*   **Task 2.1: Define RAG-specific Data Models (`src/types/rag-operations.ts`)**
    *   Create `RagQueryLogData` interface: `query_id`, `user_id`, `query_text`, `retrieval_parameters`, `retrieved_documents`, `generated_response`, `latency_ms`, `tokens_used_input`, `tokens_used_output`, `evaluation_score`, `feedback`, `errors`, `business_rule_id` (optional FK), `applied_business_rules` (JSONB), `created_at`.
*   **Task 2.2: Database Schema & Migrations (`supabase/migrations/`)**
    *   Design and create `public.rag_query_logs` table.
    *   Create corresponding Supabase migration file.
*   **Task 2.3: Develop RAG Operations Service (`src/services/rag-operations/ragOperationsService.ts`)**
    *   Implement `logRagQuery(logData: RagQueryLogData)` method to capture RAG interactions.
    *   Implement methods for aggregating RAG performance metrics (e.g., `getRagLatencyMetrics()`, `getRagErrorRates()`).
    *   Implement methods for basic RAG audit queries (e.g., `getRagQueryLogsByUserId()`).
*   **Task 2.4: Integrate RAG Logging into Existing RAG Pipeline**
    *   Identify the appropriate location within the existing RAG query flow (likely within `supabase/functions/rag-dashboard/index.ts` or related functions) to call `ragOperationsService.logRagQuery()` after each RAG interaction.
*   **Task 2.5: Cross-Pollination: Business Rules applied to RAG**
    *   Enhance `BusinessGovernanceService.evaluateRule` or create a specialized helper to interpret `rule_definition` specifically for `rag_operations` scope (e.g., modifying query parameters, filtering results).
    *   Integrate `applyBusinessRules` (or a RAG-specific variant) into the RAG query pipeline (pre-retrieval, post-generation) to apply governance rules.

---

### **Phase 3: Systems Admin Section & Shared Capabilities**

**Objective:** Provide internal technical users with comprehensive audit, monitoring, and configuration capabilities for both business rules and RAG operations.

*   **Task 3.1: Define Admin-specific Permissions (`src/types/rbac.ts`, `src/utils/rbac/permissions.ts`)**
    *   Create new permissions: `can_access_business_governance_admin`, `can_view_rule_audit_logs`, `can_view_rag_metrics`, `can_configure_governance_system`.
*   **Task 3.2: Develop Admin API Endpoints (`src/routes/adminRoutes.tsx` - for routing, actual API logic in services)**
    *   Create new API endpoints for fetching `rule_application_logs` (with filters), `rag_query_logs` (with filters), and system configuration.
    *   Ensure strict RBAC enforcement on these endpoints.
*   **Task 3.3: Extend Business Governance Service for Admin Queries**
    *   Add methods to `businessGovernanceService.ts` for advanced queries on `rule_application_logs` (e.g., `getFilteredRuleApplicationLogs()`).
    *   Add methods for system-wide configuration management if needed.
*   **Task 3.4: Implement Systems Admin UI Components (`src/pages/admin/business-governance/`)**
    *   Create `BusinessGovernanceAdminPage.tsx` as the main entry point.
    *   Develop `RuleAuditLogViewer.tsx` component (filter by rule, module, outcome, date range).
    *   Develop `RagOperationsDashboard.tsx` component (display key RAG metrics, recent queries, error rates).
    *   Implement `SystemConfigEditor.tsx` (for managing system-level governance configurations, if applicable).
*   **Task 3.5: Refine Shared Capabilities Implementation**
    *   **Unified Logging**: Standardize log formats and enhance `logRuleApplication` and `logRagQuery` to capture maximum detail for auditing.
    *   **Centralized Notification**: Define `CaptureCriteria` for both rule failures/successes and RAG anomalies. Integrate with a generic `NotificationService`.
    *   **Consolidated Metrics**: Implement shared `metricsUtils.ts` for consistent data points.
    *   **Shared Configuration**: Formalize a configuration management approach (e.g., `src/services/configService.ts` backed by a database table or environment variables).

---

### **Phase 4: Advanced Features & Refinements**

**Objective:** Enhance the module with capabilities for complex rule management, versioning, and robust non-functional requirements.

*   **Task 4.1: Implement Advanced Rule Engine (if needed)**
    *   If simple JSON rules are insufficient, integrate a more sophisticated rule engine library that supports complex logical expressions, decision tables, or flowcharts.
    *   Consider dedicated Supabase Edge Functions for complex rule evaluations to offload heavy processing.
*   **Task 4.2: Rule Versioning & Rollback**
    *   Enhance `business_rules` schema to include `version` and `status` (e.g., `draft`, `active`, `deprecated`).
    *   Implement versioning logic in `BusinessGovernanceService` to allow for rule history and rollback.
*   **Task 4.3: Performance Optimizations**
    *   Implement caching strategies for frequently accessed rules.
    *   Optimize database queries for log retrieval and rule evaluation.
    *   Consider asynchronous rule evaluation for non-critical paths.
*   **Task 4.4: Comprehensive Testing**
    *   **Unit Tests**: For all service methods, data models, and utility functions.
    *   **Integration Tests**: For API endpoints, database interactions, and inter-service communication.
    *   **Performance Tests**: Stress testing rule evaluation and logging under load.
    *   **Security Tests**: Penetration testing for admin APIs and sensitive data access.
*   **Task 4.5: Enhanced Notifications & Reporting**
    *   Allow users to define custom notification rules for business events.
    *   Develop advanced reporting dashboards for business users on rule impact and RAG performance.

## 5. Implementation Details & Best Practices:

*   **Folder Structure:**
    *   `src/modules/business-governance/` (or `src/features/`)
        *   `api/` (API endpoint handlers)
        *   `services/` (core business logic: `businessGovernanceService.ts`, `ragOperationsService.ts`)
        *   `types/` (interfaces, enums: `business-governance.ts`, `rag-operations.ts`)
        *   `components/` (React components for UI, both standard and admin)
        *   `utils/` (shared helper functions: `ruleEvaluator.ts`, `metricsUtils.ts`)
        *   `admin/` (admin-specific UI components and logic)
*   **Coding Standards:** Adhere to existing TypeScript and React best practices (e.g., ESLint, Prettier).
*   **Error Handling:** Implement robust error handling with consistent error types and centralized logging. Differentiate between business rule failures (expected) and system errors (unexpected).
*   **Security:**
    *   **Authentication & Authorization:** All API endpoints (especially admin) secured with JWTs and RBAC checks.
    *   **Data Protection:** Sensitive rule definitions or log data encrypted at rest/in transit.
    *   **Input Validation:** Strict validation of all inputs to rule definitions and evaluation contexts.
*   **Testing Strategy:** Test-Driven Development (TDD) where feasible, with comprehensive unit, integration, and end-to-end tests.
*   **CI/CD Integration:** Automate testing, code quality checks, and deployment for all changes to the module. Ensure Supabase migrations are part of the automated deployment pipeline.

## 6. Delivery & Deployment Strategy:

*   **Git Strategy:** Feature branches for each phase/major task, merging into `develop`, then `main`.
*   **Supabase Migrations:** Apply database schema changes incrementally using Supabase migrations. Coordinate deployment to ensure database is updated before application code.
*   **Edge Functions:** Deploy new or updated Supabase Edge Functions (`supabase/functions/`) that interact with business governance or RAG logic.
*   **Frontend Deployment:** Deploy React application updates that include the new UI components and integration points.
*   **Rollback Plan:** Have a clear rollback strategy for each deployment, especially for database changes.

## 7. Risks and Mitigation:

*   **Risk: Complexity of Rule Evaluation:**
    *   **Mitigation:** Start with a simple rule definition mechanism (e.g., JSON-based conditions). Introduce a more complex rule engine incrementally if actual business rule complexity demands it. Focus on clarity of `rule_definition` within the database.
*   **Risk: Performance Impact of Real-time Rule Application:**
    *   **Mitigation:** Implement caching for frequently accessed rules. Optimize database queries. For high-volume real-time scenarios, offload rule evaluation to dedicated, performant Edge Functions. Monitor `latency_ms` in RAG logs and `rule_application_logs`.
*   **Risk: Data Volume of Audit Logs:**
    *   **Mitigation:** Implement log retention policies. Consider archiving older logs to cheaper storage. Optimize database indexing on log tables for efficient querying.
*   **Risk: Security Vulnerabilities in Admin Section:**
    *   **Mitigation:** Strict RBAC. Regular security audits. Implement rate limiting on admin APIs. Log all admin actions.
*   **Risk: Integration Challenges with Existing Modules:**
    *   **Mitigation:** Start with a few well-defined integration points (POC). Provide clear documentation and code examples for developers. Conduct integration workshops. The `applyBusinessRules` utility will be key to standardized integration.
*   **Risk: Scope Creep for Rule Definition:**
    *   **Mitigation:** Clearly define what constitutes a "business rule" vs. hardcoded logic. Enforce this via architectural reviews.

## 8. Questions

We have paused here.