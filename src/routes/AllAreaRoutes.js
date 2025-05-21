/* ——— import EVERY existing factory ——— */
/*  ⚠️  Keep the list in alphabetical order so duplicates stand out.  */
import { AdminRoutes } from "./adminRoutes";
import { AIExtractRoutes } from "./aiExtractRoutes";
import { BetaRoutes } from "./betaRoutes";
import { BrandMarketingRoutes } from "./brandMarketingRoutes";
import { CategoriesRoutes } from "./categoriesRoutes";
import { ContractsRoutes } from "./contractsRoutes";
import { CustomerManagementRoutes } from "./customerManagementRoutes";
import { DataManagementRoutes } from "./dataManagementRoutes";
import { DotXRoutes } from "./dotXRoutes";
import { EntitiesRoutes } from "./entitiesRoutes";
import { EventsRoutes } from "./eventsRoutes";
import { FilesRoutes } from "./filesRoutes";
import { LoyaltyRoutes } from "./loyaltyRoutes";
import { ProjectManagementRoutes } from "./projectManagementRoutes";
import { RAGDashboardRoutes } from "./ragDashboardRoutes";
import { RequestsRoutes } from "./requestsRoutes";
import { RiskRegisterRoutes } from "./riskRegisterRoutes";
import { ScorecardsRoutes } from "./scorecardsRoutes";
import { SecureRoute } from "./secureRouteExample";
import { SocialMediaRoutes } from "./socialMediaRoutes";
import { SupplierRoutes } from "./supplierRoutes";
import { SupplierManagementRoutes } from "./supplierManagementRoutes";
import { TechHubRoutes } from "./techHubRoutes";
import { TradingSystemRoutes } from "./tradingSystemRoutes";
import { VendorRoutes } from "./vendorRoutes";
import { WorkflowsRoutes } from "./workflowsRoutes";
/* ——— aggregate them ——— */
export const AllAreaRoutes = () => {
    return [
        ...(typeof AdminRoutes === 'function' ? AdminRoutes() : []),
        ...(typeof AIExtractRoutes === 'function' ? AIExtractRoutes() : []),
        ...(typeof BetaRoutes === 'function' ? BetaRoutes() : []),
        ...(typeof BrandMarketingRoutes === 'function' ? BrandMarketingRoutes() : []),
        ...(typeof CategoriesRoutes === 'function' ? CategoriesRoutes() : []),
        ...(typeof ContractsRoutes === 'function' ? ContractsRoutes() : []),
        ...(typeof CustomerManagementRoutes === 'function' ? CustomerManagementRoutes() : []),
        ...(typeof DataManagementRoutes === 'function' ? DataManagementRoutes() : []),
        ...(typeof DotXRoutes === 'function' ? DotXRoutes() : []),
        ...(typeof EntitiesRoutes === 'function' ? EntitiesRoutes() : []),
        ...(typeof EventsRoutes === 'function' ? EventsRoutes() : []),
        ...(typeof FilesRoutes === 'function' ? FilesRoutes() : []),
        ...(typeof LoyaltyRoutes === 'function' ? LoyaltyRoutes() : []),
        ...(typeof ProjectManagementRoutes === 'function' ? ProjectManagementRoutes() : []),
        ...(typeof RAGDashboardRoutes === 'function' ? RAGDashboardRoutes() : []),
        ...(typeof RequestsRoutes === 'function' ? RequestsRoutes() : []),
        ...(typeof RiskRegisterRoutes === 'function' ? RiskRegisterRoutes() : []),
        ...(typeof ScorecardsRoutes === 'function' ? ScorecardsRoutes() : []),
        ...(typeof SecureRoute === 'function' ? SecureRoute() : []),
        ...(typeof SocialMediaRoutes === 'function' ? SocialMediaRoutes() : []),
        ...(typeof SupplierRoutes === 'function' ? SupplierRoutes() : []),
        ...(typeof SupplierManagementRoutes === 'function' ? SupplierManagementRoutes() : []),
        ...(typeof TechHubRoutes === 'function' ? TechHubRoutes() : []),
        ...(typeof TradingSystemRoutes === 'function' ? TradingSystemRoutes() : []),
        ...(typeof VendorRoutes === 'function' ? VendorRoutes() : []),
        ...(typeof WorkflowsRoutes === 'function' ? WorkflowsRoutes() : []),
    ];
};
