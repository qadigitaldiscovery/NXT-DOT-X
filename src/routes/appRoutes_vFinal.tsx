import React from "react";
import { Routes, Route } from "react-router-dom";
import APIsPage from "./pages/APIsPage";
import Beta1Dashboard from "./pages/Beta1Dashboard";
import Beta1Settings from "./pages/Beta1Settings";
import Beta2Analytics from "./pages/Beta2Analytics";
import Beta2Dashboard from "./pages/Beta2Dashboard";
import Beta2Members from "./pages/Beta2Members";
import Beta2Rewards from "./pages/Beta2Rewards";
import Beta2Settings from "./pages/Beta2Settings";
import CompetitorPricing from "./pages/CompetitorPricing";
import CostAnalysis from "./pages/CostAnalysis";
import Dashboard from "./pages/Dashboard";
import DashboardV2 from "./pages/DashboardV2";
import DashboardV2Page from "./pages/DashboardV2Page";
import DataManagementDashboard from "./pages/DataManagementDashboard";
import DataManagementSettings from "./pages/DataManagementSettings";
import EditSupplierPage from "./pages/EditSupplierPage";
import ExportData from "./pages/ExportData";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import LoyaltyAnalytics from "./pages/LoyaltyAnalytics";
import LoyaltyDashboard from "./pages/LoyaltyDashboard";
import LoyaltyMembers from "./pages/LoyaltyMembers";
import LoyaltyRewards from "./pages/LoyaltyRewards";
import LoyaltySettings from "./pages/LoyaltySettings";
import MasterDash from "./pages/MasterDash";
import NewSupplierPage from "./pages/NewSupplierPage";
import NewUploadPage from "./pages/NewUploadPage";
import NotFound from "./pages/NotFound";
import PriceManagement from "./pages/PriceManagement";
import PrototypeSelector from "./pages/PrototypeSelector";
import RAGAnalytics from "./pages/RAGAnalytics";
import RAGDashboard from "./pages/RAGDashboard";
import RequestyPage from "./pages/RequestyPage";
import Settings from "./pages/Settings";
import SharedDocumentPage from "./pages/SharedDocumentPage";
import SupplierCosting from "./pages/SupplierCosting";
import SupplierCostsPage from "./pages/SupplierCostsPage";
import SuppliersPage from "./pages/SuppliersPage";
import TechHubPersonas from "./pages/TechHubPersonas";
import TechHubTechnicalConfig from "./pages/TechHubTechnicalConfig";
import TradingSystemAnalytics from "./pages/TradingSystemAnalytics";
import TradingSystemDashboard from "./pages/TradingSystemDashboard";
import TradingSystemHistory from "./pages/TradingSystemHistory";
import TradingSystemSettings from "./pages/TradingSystemSettings";
import TradingSystemTrades from "./pages/TradingSystemTrades";
import Unauthorized from "./pages/Unauthorized";
import UploadsPage from "./pages/UploadsPage";
import UserManagement from "./pages/UserManagement";
import AdminModuleAccess from "./pages/admin/AdminModuleAccess";
import DatabaseAdminPage from "./pages/admin/DatabaseAdminPage";
import DocumentationPage from "./pages/admin/DocumentationPage";
import UserManagement from "./pages/admin/UserManagement";
import AIExtractPage from "./pages/auto/AIExtractPage";
import CategoriesPage from "./pages/auto/CategoriesPage";
import ContractsPage from "./pages/auto/ContractsPage";
import EntitiesPage from "./pages/auto/EntitiesPage";
import EventsPage from "./pages/auto/EventsPage";
import FilesPage from "./pages/auto/FilesPage";
import MissingPageTemplate from "./pages/auto/MissingPageTemplate";
import ModuleAutoPage from "./pages/auto/ModuleAutoPage";
import RAGAlerts from "./pages/auto/RAGAlerts";
import RAGSettings from "./pages/auto/RAGSettings";
import RequestsPage from "./pages/auto/RequestsPage";
import RiskRegisterPage from "./pages/auto/RiskRegisterPage";
import ScorecardsPage from "./pages/auto/ScorecardsPage";
import VendorsPage from "./pages/auto/VendorsPage";
import WorkflowsPage from "./pages/auto/WorkflowsPage";
import BrandAnalytics from "./pages/brand-marketing/BrandAnalytics";
import BrandDashboard from "./pages/brand-marketing/BrandDashboard";
import BrandSettings from "./pages/brand-marketing/BrandSettings";
import BrandTrust from "./pages/brand-marketing/BrandTrust";
import MarketPerception from "./pages/brand-marketing/MarketPerception";
import RequestyPage from "./pages/brand-marketing/RequestyPage";
import SEOKeywords from "./pages/brand-marketing/SEOKeywords";
import CustomerDashboard from "./pages/customer-management/CustomerDashboard";
import CustomerDirectoryPage from "./pages/customer-management/CustomerDirectoryPage";
import CustomerSettings from "./pages/customer-management/CustomerSettings";
import EditCustomerPage from "./pages/customer-management/EditCustomerPage";
import NewCustomerPage from "./pages/customer-management/NewCustomerPage";
import DashboardHome from "./pages/data-management/DashboardHome";
import DeploymentTest from "./pages/data-management/DeploymentTest";
import enhanced-suppliers from "./pages/data-management/enhanced-suppliers";
import supplier-vendors-new from "./pages/data-management/supplier-vendors-new";
import supplier-vendors from "./pages/data-management/supplier-vendors";
import suppliers-new from "./pages/data-management/suppliers-new";
import suppliers from "./pages/data-management/suppliers";
import vendor-supplier-comparison from "./pages/data-management/vendor-supplier-comparison";
import AdminConsole from "./pages/data-management/admin/AdminConsole";
import BusinessRules from "./pages/data-management/business-rules/BusinessRules";
import Strategy from "./pages/data-management/business-rules/Strategy";
import DataConnections from "./pages/data-management/connections/DataConnections";
import CostAnalysis from "./pages/data-management/cost-management/CostAnalysis";
import CostDashboard from "./pages/data-management/cost-management/CostDashboard";
import SupplierCosting from "./pages/data-management/cost-management/SupplierCosting";
import CustomersPage from "./pages/data-management/customers/CustomersPage";
import ExportData from "./pages/data-management/data/ExportData";
import DocumentsPage from "./pages/data-management/documents/DocumentsPage";
import DataInsights from "./pages/data-management/insights/DataInsights";
import CompetitorPricing from "./pages/data-management/pricing/CompetitorPricing";
import PriceHistory from "./pages/data-management/pricing/PriceHistory";
import PriceManagement from "./pages/data-management/pricing/PriceManagement";
import PriceOptimization from "./pages/data-management/pricing/PriceOptimization";
import Pricing from "./pages/data-management/pricing/Pricing";
import Api from "./pages/dot-x/Api";
import Dashboard from "./pages/dot-x/Dashboard";
import Dashboard2 from "./pages/dot-x/Dashboard2";
import DataServices from "./pages/dot-x/DataServices";
import Plugins from "./pages/dot-x/Plugins";
import Settings from "./pages/dot-x/Settings";
import PartnerDetailPage from "./pages/partners/PartnerDetailPage";
import GanttChartPage from "./pages/project-management/GanttChartPage";
import KanbanBoardPage from "./pages/project-management/KanbanBoardPage";
import ProjectDetailsPage from "./pages/project-management/ProjectDetailsPage";
import ProjectsDashboardPage from "./pages/project-management/ProjectsDashboardPage";
import ProjectsPage from "./pages/project-management/ProjectsPage";
import RAGDashboardPage from "./pages/rag-dashboard/RAGDashboardPage";
import Accounts from "./pages/social-media/Accounts";
import Calendar from "./pages/social-media/Calendar";
import Dashboard from "./pages/social-media/Dashboard";
import Engagement from "./pages/social-media/Engagement";
import Settings from "./pages/social-media/Settings";
import SupplierDashboard from "./pages/supplier-management/SupplierDashboard";
import SupplierDirectoryPage from "./pages/supplier-management/SupplierDirectoryPage";
import SupplierSettings from "./pages/supplier-management/SupplierSettings";
import NewSupplierPage from "./pages/suppliers/NewSupplierPage";
import SupplierDetailPage from "./pages/suppliers/SupplierDetailPage";
import SupplierPage from "./pages/suppliers/SupplierPage";
import VendorDetailPage from "./pages/vendors/VendorDetailPage";

export default function AppRoutes() {
  return (
    <Routes>
  <Route path="/apispage" element={<APIsPage />} />
  <Route path="/beta1dashboard" element={<Beta1Dashboard />} />
  <Route path="/beta1settings" element={<Beta1Settings />} />
  <Route path="/beta2analytics" element={<Beta2Analytics />} />
  <Route path="/beta2dashboard" element={<Beta2Dashboard />} />
  <Route path="/beta2members" element={<Beta2Members />} />
  <Route path="/beta2rewards" element={<Beta2Rewards />} />
  <Route path="/beta2settings" element={<Beta2Settings />} />
  <Route path="/competitorpricing" element={<CompetitorPricing />} />
  <Route path="/costanalysis" element={<CostAnalysis />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/dashboardv2" element={<DashboardV2 />} />
  <Route path="/dashboardv2page" element={<DashboardV2Page />} />
  <Route path="/datamanagementdashboard" element={<DataManagementDashboard />} />
  <Route path="/datamanagementsettings" element={<DataManagementSettings />} />
  <Route path="/editsupplierpage" element={<EditSupplierPage />} />
  <Route path="/exportdata" element={<ExportData />} />
  <Route path="/index" element={<Index />} />
  <Route path="/landing" element={<Landing />} />
  <Route path="/loyaltyanalytics" element={<LoyaltyAnalytics />} />
  <Route path="/loyaltydashboard" element={<LoyaltyDashboard />} />
  <Route path="/loyaltymembers" element={<LoyaltyMembers />} />
  <Route path="/loyaltyrewards" element={<LoyaltyRewards />} />
  <Route path="/loyaltysettings" element={<LoyaltySettings />} />
  <Route path="/masterdash" element={<MasterDash />} />
  <Route path="/newsupplierpage" element={<NewSupplierPage />} />
  <Route path="/newuploadpage" element={<NewUploadPage />} />
  <Route path="/notfound" element={<NotFound />} />
  <Route path="/pricemanagement" element={<PriceManagement />} />
  <Route path="/prototypeselector" element={<PrototypeSelector />} />
  <Route path="/raganalytics" element={<RAGAnalytics />} />
  <Route path="/ragdashboard" element={<RAGDashboard />} />
  <Route path="/requestypage" element={<RequestyPage />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/shareddocumentpage" element={<SharedDocumentPage />} />
  <Route path="/suppliercosting" element={<SupplierCosting />} />
  <Route path="/suppliercostspage" element={<SupplierCostsPage />} />
  <Route path="/supplierspage" element={<SuppliersPage />} />
  <Route path="/techhubpersonas" element={<TechHubPersonas />} />
  <Route path="/techhubtechnicalconfig" element={<TechHubTechnicalConfig />} />
  <Route path="/tradingsystemanalytics" element={<TradingSystemAnalytics />} />
  <Route path="/tradingsystemdashboard" element={<TradingSystemDashboard />} />
  <Route path="/tradingsystemhistory" element={<TradingSystemHistory />} />
  <Route path="/tradingsystemsettings" element={<TradingSystemSettings />} />
  <Route path="/tradingsystemtrades" element={<TradingSystemTrades />} />
  <Route path="/unauthorized" element={<Unauthorized />} />
  <Route path="/uploadspage" element={<UploadsPage />} />
  <Route path="/usermanagement" element={<UserManagement />} />
  <Route path="/admin/adminmoduleaccess" element={<AdminModuleAccess />} />
  <Route path="/admin/databaseadminpage" element={<DatabaseAdminPage />} />
  <Route path="/admin/documentationpage" element={<DocumentationPage />} />
  <Route path="/admin/usermanagement" element={<UserManagement />} />
  <Route path="/auto/aiextractpage" element={<AIExtractPage />} />
  <Route path="/auto/categoriespage" element={<CategoriesPage />} />
  <Route path="/auto/contractspage" element={<ContractsPage />} />
  <Route path="/auto/entitiespage" element={<EntitiesPage />} />
  <Route path="/auto/eventspage" element={<EventsPage />} />
  <Route path="/auto/filespage" element={<FilesPage />} />
  <Route path="/auto/missingpagetemplate" element={<MissingPageTemplate />} />
  <Route path="/auto/moduleautopage" element={<ModuleAutoPage />} />
  <Route path="/auto/ragalerts" element={<RAGAlerts />} />
  <Route path="/auto/ragsettings" element={<RAGSettings />} />
  <Route path="/auto/requestspage" element={<RequestsPage />} />
  <Route path="/auto/riskregisterpage" element={<RiskRegisterPage />} />
  <Route path="/auto/scorecardspage" element={<ScorecardsPage />} />
  <Route path="/auto/vendorspage" element={<VendorsPage />} />
  <Route path="/auto/workflowspage" element={<WorkflowsPage />} />
  <Route path="/brand-marketing/brandanalytics" element={<BrandAnalytics />} />
  <Route path="/brand-marketing/branddashboard" element={<BrandDashboard />} />
  <Route path="/brand-marketing/brandsettings" element={<BrandSettings />} />
  <Route path="/brand-marketing/brandtrust" element={<BrandTrust />} />
  <Route path="/brand-marketing/marketperception" element={<MarketPerception />} />
  <Route path="/brand-marketing/requestypage" element={<RequestyPage />} />
  <Route path="/brand-marketing/seokeywords" element={<SEOKeywords />} />
  <Route path="/customer-management/customerdashboard" element={<CustomerDashboard />} />
  <Route path="/customer-management/customerdirectorypage" element={<CustomerDirectoryPage />} />
  <Route path="/customer-management/customersettings" element={<CustomerSettings />} />
  <Route path="/customer-management/editcustomerpage" element={<EditCustomerPage />} />
  <Route path="/customer-management/newcustomerpage" element={<NewCustomerPage />} />
  <Route path="/data-management/dashboardhome" element={<DashboardHome />} />
  <Route path="/data-management/deploymenttest" element={<DeploymentTest />} />
  <Route path="/data-management/enhanced-suppliers" element={<enhanced-suppliers />} />
  <Route path="/data-management/supplier-vendors-new" element={<supplier-vendors-new />} />
  <Route path="/data-management/supplier-vendors" element={<supplier-vendors />} />
  <Route path="/data-management/suppliers-new" element={<suppliers-new />} />
  <Route path="/data-management/suppliers" element={<suppliers />} />
  <Route path="/data-management/vendor-supplier-comparison" element={<vendor-supplier-comparison />} />
  <Route path="/data-management/admin/adminconsole" element={<AdminConsole />} />
  <Route path="/data-management/business-rules/businessrules" element={<BusinessRules />} />
  <Route path="/data-management/business-rules/strategy" element={<Strategy />} />
  <Route path="/data-management/connections/dataconnections" element={<DataConnections />} />
  <Route path="/data-management/cost-management/costanalysis" element={<CostAnalysis />} />
  <Route path="/data-management/cost-management/costdashboard" element={<CostDashboard />} />
  <Route path="/data-management/cost-management/suppliercosting" element={<SupplierCosting />} />
  <Route path="/data-management/customers/customerspage" element={<CustomersPage />} />
  <Route path="/data-management/data/exportdata" element={<ExportData />} />
  <Route path="/data-management/documents/documentspage" element={<DocumentsPage />} />
  <Route path="/data-management/insights/datainsights" element={<DataInsights />} />
  <Route path="/data-management/pricing/competitorpricing" element={<CompetitorPricing />} />
  <Route path="/data-management/pricing/pricehistory" element={<PriceHistory />} />
  <Route path="/data-management/pricing/pricemanagement" element={<PriceManagement />} />
  <Route path="/data-management/pricing/priceoptimization" element={<PriceOptimization />} />
  <Route path="/data-management/pricing/pricing" element={<Pricing />} />
  <Route path="/dot-x/api" element={<Api />} />
  <Route path="/dot-x/dashboard" element={<Dashboard />} />
  <Route path="/dot-x/dashboard2" element={<Dashboard2 />} />
  <Route path="/dot-x/dataservices" element={<DataServices />} />
  <Route path="/dot-x/plugins" element={<Plugins />} />
  <Route path="/dot-x/settings" element={<Settings />} />
  <Route path="/partners/partnerdetailpage" element={<PartnerDetailPage />} />
  <Route path="/project-management/ganttchartpage" element={<GanttChartPage />} />
  <Route path="/project-management/kanbanboardpage" element={<KanbanBoardPage />} />
  <Route path="/project-management/projectdetailspage" element={<ProjectDetailsPage />} />
  <Route path="/project-management/projectsdashboardpage" element={<ProjectsDashboardPage />} />
  <Route path="/project-management/projectspage" element={<ProjectsPage />} />
  <Route path="/rag-dashboard/ragdashboardpage" element={<RAGDashboardPage />} />
  <Route path="/social-media/accounts" element={<Accounts />} />
  <Route path="/social-media/calendar" element={<Calendar />} />
  <Route path="/social-media/dashboard" element={<Dashboard />} />
  <Route path="/social-media/engagement" element={<Engagement />} />
  <Route path="/social-media/settings" element={<Settings />} />
  <Route path="/supplier-management/supplierdashboard" element={<SupplierDashboard />} />
  <Route path="/supplier-management/supplierdirectorypage" element={<SupplierDirectoryPage />} />
  <Route path="/supplier-management/suppliersettings" element={<SupplierSettings />} />
  <Route path="/suppliers/newsupplierpage" element={<NewSupplierPage />} />
  <Route path="/suppliers/supplierdetailpage" element={<SupplierDetailPage />} />
  <Route path="/suppliers/supplierpage" element={<SupplierPage />} />
  <Route path="/vendors/vendordetailpage" element={<VendorDetailPage />} />
    <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}
