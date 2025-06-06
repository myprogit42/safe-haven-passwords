
import { useState } from "react";
import { Eye, EyeOff, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme/ThemeProvider";

interface LoginScreenProps {
  onLogin: (masterPassword: string) => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [masterPassword, setMasterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!masterPassword) return;

    setIsLoading(true);
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    onLogin(masterPassword);
    setIsLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
            theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
          }`}>
            <Shield className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Password Vault
          </h1>
          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Enter your master password to access your vault
          </p>
        </div>

        {/* Login Form */}
        <div className={`backdrop-blur-xl rounded-2xl p-6 shadow-2xl border ${
          theme === 'dark' 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/80 border-white/20'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className={`text-sm font-medium ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Master Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`} />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={masterPassword}
                  onChange={(e) => setMasterPassword(e.target.value)}
                  className={`pl-10 pr-10 h-12 ${
                    theme === 'dark' 
                      ? 'bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                  placeholder="Enter your master password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    theme === 'dark' ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-600'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!masterPassword || isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Unlocking...</span>
                </div>
              ) : (
                "Unlock Vault"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200/20">
            <div className={`text-xs text-center space-y-2 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <p>🔒 Zero-knowledge encryption</p>
              <p>Your passwords are encrypted locally before storage</p>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="text-center mt-6">
          <button
            onClick={toggleTheme}
            className={`text-sm ${
              theme === 'dark' ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-700'
            }`}
          >
            Switch to {theme === 'dark' ? 'light' : 'dark'} mode
          </button>
        </div>
      </div>
    </div>
  );
};
