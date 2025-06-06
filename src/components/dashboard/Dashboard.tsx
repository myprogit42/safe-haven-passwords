
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { PasswordList } from "./PasswordList";
import { AddPasswordModal } from "./AddPasswordModal";
import { PasswordGenerator } from "./PasswordGenerator";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/ThemeProvider";
import { PasswordEntry, encryptPassword, decryptPassword } from "@/lib/encryption";

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    loadPasswords();
  }, []);

  const loadPasswords = () => {
    const stored = localStorage.getItem('passwordManager_vault');
    if (stored) {
      try {
        const decrypted = decryptPassword(stored);
        setPasswords(JSON.parse(decrypted));
      } catch (error) {
        console.error('Failed to decrypt passwords:', error);
        setPasswords([]);
      }
    }
  };

  const savePasswords = (newPasswords: PasswordEntry[]) => {
    const encrypted = encryptPassword(JSON.stringify(newPasswords));
    localStorage.setItem('passwordManager_vault', encrypted);
    setPasswords(newPasswords);
  };

  const addPassword = (entry: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEntry: PasswordEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    savePasswords([...passwords, newEntry]);
  };

  const updatePassword = (id: string, updates: Partial<PasswordEntry>) => {
    const updatedPasswords = passwords.map(p => 
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    savePasswords(updatedPasswords);
  };

  const deletePassword = (id: string) => {
    const filteredPasswords = passwords.filter(p => p.id !== id);
    savePasswords(filteredPasswords);
  };

  const filteredPasswords = passwords.filter(password => {
    const matchesSearch = !searchTerm || 
      password.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || password.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(passwords.flatMap(p => p.tags)));

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      <Header 
        onLogout={onLogout}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        passwords={passwords}
      />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Your Passwords
                </h2>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {filteredPasswords.length} of {passwords.length} passwords
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowGenerator(true)}
                  variant="outline"
                  className={`${
                    theme === 'dark' 
                      ? 'border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700' 
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Generate Password
                </Button>
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Password
                </Button>
              </div>
            </div>

            {allTags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag("")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    !selectedTag
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-blue-600 text-white'
                        : theme === 'dark'
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            <PasswordList
              passwords={filteredPasswords}
              onUpdate={updatePassword}
              onDelete={deletePassword}
            />
          </div>
        </div>
      </main>

      {showAddModal && (
        <AddPasswordModal
          onClose={() => setShowAddModal(false)}
          onAdd={addPassword}
        />
      )}

      {showGenerator && (
        <PasswordGenerator
          onClose={() => setShowGenerator(false)}
        />
      )}
    </div>
  );
};
