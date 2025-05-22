import { BrowserRouter as Router, Routes } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <AppRoutes />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}