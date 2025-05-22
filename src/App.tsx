
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AppRoutes from "@/routes/appRoutes_vFinal";
import ErrorBoundary from "@/components/ErrorBoundary";

// Redirect component to navigate to /test-master
function RedirectHandler() {
  const location = useLocation();
  
  // If we're on the root or want to navigate to TestMasterDash
  if (location.pathname === "/go-to-test-master") {
    return <Navigate to="/test-master" replace />;
  }
  
  return null;
}

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <RedirectHandler />
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  );
}
