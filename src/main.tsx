
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { runMigrations } from './integrations/supabase/migrate';

// Run database migrations
runMigrations().catch(console.error);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
