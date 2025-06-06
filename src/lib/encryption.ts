
// Simple encryption for demo purposes - in production, use proper crypto libraries
export interface PasswordEntry {
  id: string;
  website: string;
  username: string;
  password: string;
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Basic encryption/decryption using base64 encoding
// In production, use proper encryption libraries like crypto-js
export const encryptPassword = (data: string): string => {
  try {
    const masterKey = localStorage.getItem('passwordManager_masterKey') || 'default';
    // Simple XOR encryption with master key
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(
        data.charCodeAt(i) ^ masterKey.charCodeAt(i % masterKey.length)
      );
    }
    return btoa(encrypted);
  } catch (error) {
    console.error('Encryption failed:', error);
    return data;
  }
};

export const decryptPassword = (encryptedData: string): string => {
  try {
    const masterKey = localStorage.getItem('passwordManager_masterKey') || 'default';
    const decoded = atob(encryptedData);
    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
      decrypted += String.fromCharCode(
        decoded.charCodeAt(i) ^ masterKey.charCodeAt(i % masterKey.length)
      );
    }
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    return '';
  }
};
