import "./styles/globals.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserManagementProvider } from "./context/UserManagementContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ModulesProvider } from "./context/ModulesContext";
import { AppRoutes } from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";


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

// Initialize app
const AppWithProviders = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <UserManagementProvider>
              <ThemeProvider>
                <ModulesProvider>
                  <AppRoutes />
                  <Toaster />
                </ModulesProvider>
              </ThemeProvider>
            </UserManagementProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

// Export the application
const App = AppWithProviders;
export default App;
