
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "sonner";
import AppRoutes from "@/routes/AppRoutes";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Suspense fallback={<p className="p-4">Loading…</p>}>
            <Toaster position="top-right" richColors />
            <AppRoutes />
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}
