"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface User {
  email: string;
  name: string;
  type: "demo" | "real";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_CREDENTIALS = {
  email: "demo@hlpfl.org",
  password: "demo123",
  user: {
    email: "demo@hlpfl.org",
    name: "Demo Creator",
    type: "demo" as const,
  },
};

const AUTH_STORAGE_KEY = "hlpfl_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const parsedUser = JSON.parse(stored);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check demo credentials
      if (
        email.toLowerCase() === DEMO_CREDENTIALS.email &&
        password === DEMO_CREDENTIALS.password
      ) {
        const demoUser = DEMO_CREDENTIALS.user;
        setUser(demoUser);
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser));
        return { success: true };
      }

      // Invalid credentials
      return { success: false, error: "Invalid email or password" };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
