
import { Route } from "react-router-dom";
import RAGDashboard from "@/pages/RAGDashboard";

export const RAGDashboardRoutes = () => {
  return (
    <>
      <Route path="/dashboard/rag" element={<RAGDashboard />} />
    </>
  );
};
