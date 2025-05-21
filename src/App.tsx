
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "sonner";
import { appRoutes } from "@/routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Suspense fallback={<p className="p-4">Loading…</p>}>
          <Toaster position="top-right" richColors />
          {useRoutes(appRoutes)}
        </Suspense>
      </ThemeProvider>
    </AuthProvider>
  );
}
