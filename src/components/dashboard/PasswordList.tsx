
import { useState } from "react";
import { Eye, EyeOff, Settings, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/ThemeProvider";
import { PasswordEntry } from "@/lib/encryption";
import { EditPasswordModal } from "./EditPasswordModal";

interface PasswordListProps {
  passwords: PasswordEntry[];
  onUpdate: (id: string, updates: Partial<PasswordEntry>) => void;
  onDelete: (id: string) => void;
}

export const PasswordList = ({ passwords, onUpdate, onDelete }: PasswordListProps) => {
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());
  const [editingPassword, setEditingPassword] = useState<PasswordEntry | null>(null);
  const { theme } = useTheme();

  const togglePasswordVisibility = (id: string) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisiblePasswords(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (passwords.length === 0) {
    return (
      <div className={`text-center py-12 ${
        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
      }`}>
        <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium mb-2">No passwords saved yet</p>
        <p className="text-sm">Click "Add Password" to get started with your secure vault</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {passwords.map((password) => (
          <div
            key={password.id}
            className={`backdrop-blur-xl rounded-xl p-4 border transition-all duration-200 hover:shadow-lg ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-white/80 border-white/20 hover:bg-white/90'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {password.website}
                  </h3>
                  <div className="flex space-x-1">
                    {password.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Username:
                    </span>
                    <button
                      onClick={() => copyToClipboard(password.username)}
                      className={`text-sm font-mono hover:underline ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      {password.username}
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Password:
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyToClipboard(password.password)}
                        className={`text-sm font-mono hover:underline ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        {visiblePasswords.has(password.id) 
                          ? password.password 
                          : '•'.repeat(password.password.length)
                        }
                      </button>
                      <button
                        onClick={() => togglePasswordVisibility(password.id)}
                        className={`${
                          theme === 'dark' ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-600'
                        }`}
                      >
                        {visiblePasswords.has(password.id) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {password.notes && (
                    <div className="flex items-start space-x-4">
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        Notes:
                      </span>
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {password.notes}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingPassword(password)}
                  className={`${
                    theme === 'dark' 
                      ? 'border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700' 
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(password.id)}
                  className="border-red-600 bg-red-600/10 text-red-400 hover:bg-red-600/20"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingPassword && (
        <EditPasswordModal
          password={editingPassword}
          onClose={() => setEditingPassword(null)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};
