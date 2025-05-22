import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/routes/appRoutes_vFinal";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  );
}
