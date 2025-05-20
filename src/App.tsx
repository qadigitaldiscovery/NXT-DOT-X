<<<<<<< Updated upstream

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
=======

import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
>>>>>>> Stashed changes

  useEffect(() => {
    // Redirect to main dashboard
    navigate("/master");
  }, [navigate]);

  return null; // No need to render anything as we're redirecting
}

export default App;
