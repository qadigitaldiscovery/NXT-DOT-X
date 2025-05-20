
import { AppRoutes } from './routes';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Toaster position="top-right" richColors />
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
