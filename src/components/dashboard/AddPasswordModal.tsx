
import { useState } from "react";
import { Plus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/theme/ThemeProvider";
import { PasswordEntry } from "@/lib/encryption";

interface AddPasswordModalProps {
  onClose: () => void;
  onAdd: (entry: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const AddPasswordModal = ({ onClose, onAdd }: AddPasswordModalProps) => {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!website || !username || !password) return;

    onAdd({
      website,
      username,
      password,
      notes,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-md rounded-2xl p-6 ${
        theme === 'dark' 
          ? 'bg-slate-900 border border-slate-700' 
          : 'bg-white border border-slate-200'
      }`}>
        <h2 className={`text-xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Add New Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Website
            </label>
            <Input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="example.com"
              className={`${
                theme === 'dark' 
                  ? 'bg-slate-800 border-slate-700 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Username/Email
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your@email.com"
              className={`${
                theme === 'dark' 
                  ? 'bg-slate-800 border-slate-700 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pr-10 ${
                  theme === 'dark' 
                    ? 'bg-slate-800 border-slate-700 text-white' 
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
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

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Tags (comma-separated)
            </label>
            <Input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="work, personal, important"
              className={`${
                theme === 'dark' 
                  ? 'bg-slate-800 border-slate-700 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Notes (optional)
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes..."
              className={`${
                theme === 'dark' 
                  ? 'bg-slate-800 border-slate-700 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className={`flex-1 ${
                theme === 'dark' 
                  ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700' 
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
