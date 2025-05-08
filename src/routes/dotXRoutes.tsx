
import { Route } from "react-router-dom";
import { DotXLayout } from "@/components/layout/DotXLayout";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

export const DotXRoutes = () => {
  return (
    <>
      {/* DOT-X Module Routes */}
      <Route
        path="/dot-x"
        element={
          <ProtectedRoute>
            <DotXLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        
        {/* Catch-all for invalid DOT-X routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  );
};
