import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { AuthProvider }   from "@/context/AuthContext";
import { ThemeProvider }  from "@/context/ThemeContext";
import { Toaster }        from "sonner";
import { appRoutes }      from "@/routes";          // ← new (see next file)

/* wrapper for useRoutes() */
function AppRoutes() {
  return useRoutes(appRoutes);
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter basename="/">
          <Suspense fallback={<p className="p-4">Loading…</p>}>
            <Toaster position="top-right" richColors />
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
