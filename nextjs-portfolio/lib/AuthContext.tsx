'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, User, LoginData, RegisterData } from './api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // SSR Safety: Check for window before touching localStorage
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (token) {
          try {
            // Validating token with your Django backend
            const userData = await api.getCurrentUser();
            setUser(userData);
          } catch (error) {
            console.error("Session expired or invalid token");
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
          }
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (data: LoginData) => {
    const response = await api.login(data);
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
    }
    setUser(response.user);
  };

  const register = async (data: RegisterData) => {
    const response = await api.register(data);
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
    }
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
      setUser(null);
    }
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const updatedUser = await api.updateProfile(data);
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Vercel Build-Safe Fallback: Prevents prerender crash if Provider isn't found during static generation
  if (context === undefined) {
    return {
      user: null,
      loading: true,
      isAuthenticated: false,
      login: async () => {},
      register: async () => {},
      logout: async () => {},
      updateUser: async () => {},
    };
  }
  return context;
};