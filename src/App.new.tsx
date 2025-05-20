
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ModulesProvider } from "./context/ModulesContext";
import { Toaster } from "sonner";
import DashboardLayout from "./components/layout/DashboardLayout";
import MasterDash from "./pages/MasterDash";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ModulesProvider>
          <Suspense fallback={<p className="p-4" aria-label="Loading application">Loading…</p>}>
            <Toaster 
              position="top-right" 
              richColors 
              closeButton
              toastOptions={{
                role: "status",
                ariaLive: "polite",
              }}
            />
            <Routes>
              <Route path="/" element={<Navigate to="/master" />} />
              <Route path="/master" element={<DashboardLayout />}>
                <Route index element={<MasterDash />} />
              </Route>
            </Routes>
          </Suspense>
        </ModulesProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
