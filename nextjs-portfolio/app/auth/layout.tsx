'use client'; // Context requires a Client Boundary

import { AuthProvider } from "@/lib/AuthContext";

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <AuthProvider>
        <div 
          className="min-h-screen flex items-center justify-center" 
          style={{ backgroundColor: '#202225' }}
        >
          {children}
        </div>
      </AuthProvider>
    );
  }