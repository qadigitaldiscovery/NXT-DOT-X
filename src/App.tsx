
import { BrowserRouter as Router, Routes } from "react-router-dom";
import AppRoutes from "@/routes/appRoutes_vFinal";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}
