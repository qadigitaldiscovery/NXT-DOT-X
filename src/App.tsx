import "./styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { UserManagementProvider } from "@/context/UserManagementContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ModulesProvider } from "@/context/ModulesContext";
import { AppRoutes } from "@/routes";
import ErrorBoundary from "@/components/ErrorBoundary";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <UserManagementProvider>
              <ThemeProvider>
                <ModulesProvider>
                  <TooltipProvider>
                    <AppRoutes />
                    <Toaster />
                  </TooltipProvider>
                </ModulesProvider>
              </ThemeProvider>
            </UserManagementProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
