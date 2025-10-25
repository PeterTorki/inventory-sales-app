import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CREDENTIALS_KEY = "user_credentials";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const stored = await SecureStore.getItemAsync(CREDENTIALS_KEY);
      if (stored) {
        const { email } = JSON.parse(stored);
        setUser({ email });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const storedCredentials = await SecureStore.getItemAsync(CREDENTIALS_KEY);

      if (storedCredentials) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(storedCredentials);

        if (email === storedEmail && password === storedPassword) {
          setUser({ email });
          setIsAuthenticated(true);
          return true;
        } else {
          throw new Error("Invalid credentials");
        }
      } else {
        await SecureStore.setItemAsync(CREDENTIALS_KEY, JSON.stringify({ email, password }));
        setUser({ email });
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
