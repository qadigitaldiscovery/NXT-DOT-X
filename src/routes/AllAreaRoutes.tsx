
import React from "react";
import { Route } from "react-router-dom";

/* ——— import EVERY existing factory ——— */
/*  ⚠️  Keep the list in alphabetical order so duplicates stand out.  */
import { AdminRoutes }                from "./adminRoutes";
import { AIExtractRoutes }            from "./aiExtractRoutes";
import { BetaRoutes }                 from "./betaRoutes";
import { BrandMarketingRoutes }       from "./brandMarketingRoutes";
import { CategoriesRoutes }           from "./categoriesRoutes";
import { ContractsRoutes }            from "./contractsRoutes";
import { CustomerManagementRoutes }   from "./customerManagementRoutes";
import { DataManagementRoutes }       from "./dataManagementRoutes";
import { DotXRoutes }                 from "./dotXRoutes";
import { EntitiesRoutes }             from "./entitiesRoutes";
import { EventsRoutes }               from "./eventsRoutes";
import { FilesRoutes }                from "./filesRoutes";
import { LoyaltyRoutes }              from "./loyaltyRoutes";
import { ProjectManagementRoutes }    from "./projectManagementRoutes";
import { RAGDashboardRoutes }         from "./ragDashboardRoutes";
import { RequestsRoutes }             from "./requestsRoutes";
import { RiskRegisterRoutes }         from "./riskRegisterRoutes";
import { ScorecardsRoutes }           from "./scorecardsRoutes";
import { SecureRoutes }               from "./secureRouteExample";
import { SocialMediaRoutes }          from "./socialMediaRoutes";
import { SupplierRoutes }             from "./supplierRoutes";
import { SupplierManagementRoutes }   from "./supplierManagementRoutes";
import { TechHubRoutes }              from "./techHubRoutes";
import { TradingSystemRoutes }        from "./tradingSystemRoutes";
import { VendorRoutes }               from "./vendorRoutes";
import { WorkflowsRoutes }            from "./workflowsRoutes";

/* ——— aggregate them ——— */
export const AllAreaRoutes = () => [
  ...(AdminRoutes || []),
  ...(AIExtractRoutes || []),
  ...(BetaRoutes || []),
  ...(BrandMarketingRoutes || []),
  ...(CategoriesRoutes || []),
  ...(ContractsRoutes || []),
  ...(CustomerManagementRoutes || []),
  ...(DataManagementRoutes || []),
  ...(DotXRoutes || []),
  ...(EntitiesRoutes || []),
  ...(EventsRoutes || []),
  ...(FilesRoutes || []),
  ...(LoyaltyRoutes || []),
  ...(ProjectManagementRoutes || []),
  ...(RAGDashboardRoutes || []),
  ...(RequestsRoutes || []),
  ...(RiskRegisterRoutes || []),
  ...(ScorecardsRoutes || []),
  ...(SecureRoutes || []),
  ...(SocialMediaRoutes || []),
  ...(SupplierRoutes || []),
  ...(SupplierManagementRoutes || []),
  ...(TechHubRoutes || []),
  ...(TradingSystemRoutes || []),
  ...(VendorRoutes || []),
  ...(WorkflowsRoutes || []),
];
