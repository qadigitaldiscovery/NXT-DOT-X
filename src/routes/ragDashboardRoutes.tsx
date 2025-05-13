
import { Route } from "react-router-dom";
import RAGDashboard from "@/pages/RAGDashboard";
import RAGAnalytics from "@/pages/RAGAnalytics";

export const RAGDashboardRoutes = () => {
  return (
    <>
      <Route path="/dashboard/rag" element={<RAGDashboard />} />
      <Route path="/dashboard/rag/analytics" element={<RAGAnalytics />} />
    </>
  );
};
