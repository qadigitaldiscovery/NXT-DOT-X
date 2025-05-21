import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "sonner";
import AppRoutes from "@/routes/AppRoutes";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <Suspense fallback={<p className="p-4">Loading…</p>}>
              <Toaster position="top-right" richColors />
              <AppRoutes />
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}