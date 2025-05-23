import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import IndexRouter from './routes/IndexRouter';
import MainLayout from './layouts/MainLayout';
import './App.css'; // This should likely be relative to src, or configured via CSS imports

// Create a client
const queryClient = new QueryClient();

/**
 * Root application component
 * Provides routing and layout structure
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}> {/* Wrap with QueryClientProvider */}
        <Suspense fallback={<div className="loading-app">Loading application...</div>}>
          <MainLayout>
            <IndexRouter />
          </MainLayout>
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
