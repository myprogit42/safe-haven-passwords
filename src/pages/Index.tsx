
import { useState, useEffect } from "react";
import { LoginScreen } from "@/components/auth/LoginScreen";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has a stored session
    const session = localStorage.getItem('passwordManager_session');
    if (session) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (masterPassword: string) => {
    // In a real app, this would verify the master password
    localStorage.setItem('passwordManager_session', 'authenticated');
    localStorage.setItem('passwordManager_masterKey', masterPassword);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('passwordManager_session');
    localStorage.removeItem('passwordManager_masterKey');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {!isAuthenticated ? (
          <LoginScreen onLogin={handleLogin} />
        ) : (
          <Dashboard onLogout={handleLogout} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;
