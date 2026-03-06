"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Tokens, AuthState } from "./types";
import { getTokens, getUser, removeTokens, saveTokens, saveUser } from "./auth-utils";

interface AuthContextType extends AuthState {
  login: (tokens: Tokens, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8001";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (accessToken: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/user/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        saveUser(userData);
      }
    } catch (err) {
      console.error("Failed to fetch user");
    }
  };

useEffect(() => {
  const loadAuth = async () => {
    // Ensure we only run this in the browser
    if (typeof window === "undefined") return;

    const storedTokens = getTokens();
    const storedUser = getUser();

    if (storedTokens?.access) {
      setTokens(storedTokens);
      if (storedUser) setUser(storedUser);
      await fetchUser(storedTokens.access);
    }
    setIsLoading(false);
  };
  loadAuth();
}, []);

  const login = (newTokens: Tokens, userData: User) => {
    saveTokens(newTokens);
    saveUser(userData);
    setTokens(newTokens);
    setUser(userData);
  };

  const logout = () => {
    removeTokens();
    setUser(null);
    setTokens(null);
  };

  const updateUser = (updatedUser: User) => {
    saveUser(updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, tokens, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // This is the line throwing your build error
  if (context === undefined) {
    // If we are currently building/prerendering, return a null state instead of crashing
    return { user: null, tokens: null, isLoading: true, isAuthenticated: false };
  }
  
  return context;
};