
import { useState } from "react";
import { Settings, Eye, EyeOff, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useTheme } from "@/components/theme/ThemeProvider";

interface PasswordGeneratorProps {
  onClose: () => void;
}

export const PasswordGenerator = ({ onClose }: PasswordGeneratorProps) => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const { theme } = useTheme();

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) return;

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "text-red-500", bg: "bg-red-500" };
    if (score <= 4) return { label: "Medium", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { label: "Strong", color: "text-green-500", bg: "bg-green-500" };
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const strength = password ? getPasswordStrength(password) : null;

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
          Password Generator
        </h2>

        <div className="space-y-6">
          {/* Generated Password */}
          {password && (
            <div className="space-y-2">
              <div className={`p-3 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-slate-800 border-slate-700' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center space-x-2">
                  <span className={`font-mono text-sm flex-1 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {showPassword ? password : '•'.repeat(password.length)}
                  </span>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className={`${
                      theme === 'dark' ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-600'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              {strength && (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1 flex-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded ${
                          i <= (strength.label === 'Weak' ? 1 : strength.label === 'Medium' ? 3 : 5)
                            ? strength.bg
                            : theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${strength.color}`}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Length Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className={`text-sm font-medium ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Length
              </label>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {length[0]}
              </span>
            </div>
            <Slider
              value={length}
              onValueChange={setLength}
              min={8}
              max={32}
              step={1}
              className="w-full"
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
              <label
                htmlFor="uppercase"
                className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Uppercase letters (A-Z)
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
              />
              <label
                htmlFor="lowercase"
                className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Lowercase letters (a-z)
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
              <label
                htmlFor="numbers"
                className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Numbers (0-9)
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
              <label
                htmlFor="symbols"
                className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Symbols (!@#$%^&*)
              </label>
            </div>
          </div>

          {/* Actions */}
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
              Close
            </Button>
            <Button
              onClick={generatePassword}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Generate
            </Button>
            {password && (
              <Button
                onClick={copyToClipboard}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Copy
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
