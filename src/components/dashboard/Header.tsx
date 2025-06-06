
import { useState } from "react";
import { Search, Settings, Download, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme/ThemeProvider";
import { PasswordEntry } from "@/lib/encryption";

interface HeaderProps {
  onLogout: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  passwords: PasswordEntry[];
}

export const Header = ({ onLogout, searchTerm, onSearchChange, passwords }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleExport = () => {
    const csvContent = [
      ['Website', 'Username', 'Password', 'Tags', 'Notes'],
      ...passwords.map(p => [p.website, p.username, p.password, p.tags.join(';'), p.notes || ''])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'password-vault-export.csv';
    a.click();
    URL.revokeObjectURL(url);
    setShowDropdown(false);
  };

  return (
    <header className={`border-b ${
      theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/50'
    } backdrop-blur-xl`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <Shield className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold">Password Vault</h1>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`} />
              <Input
                type="text"
                placeholder="Search passwords..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`pl-10 ${
                  theme === 'dark' 
                    ? 'bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400' 
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDropdown(!showDropdown)}
                className={`${
                  theme === 'dark' 
                    ? 'border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700' 
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              {showDropdown && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${
                  theme === 'dark' 
                    ? 'bg-slate-800 border-slate-700' 
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="py-1">
                    <button
                      onClick={toggleTheme}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        theme === 'dark' 
                          ? 'text-slate-300 hover:bg-slate-700' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Switch to {theme === 'dark' ? 'light' : 'dark'} mode
                    </button>
                    <button
                      onClick={handleExport}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${
                        theme === 'dark' 
                          ? 'text-slate-300 hover:bg-slate-700' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className={`${
                theme === 'dark' 
                  ? 'border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700' 
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
