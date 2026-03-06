'use client';

import React, { useState } from 'react';
import { useAuth } from "@/lib/AuthContext";
import { api } from '@/lib/api';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await api.requestPasswordReset(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Outer container restores the centering and #202225 background lost from auth/layout.tsx */
    <div className="min-h-screen w-full flex items-center justify-center bg-[#202225] py-12 px-4">
      
      <div className="w-full max-w-md p-8 rounded-2xl border border-[#39FF14]/10 bg-black/60 backdrop-blur-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Forgot <span className="text-[#39FF14]">Password</span>
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-sm">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center space-y-6">
            <div className="p-4 rounded-lg border border-[#39FF14]/20 bg-[#39FF14]/10 text-[#39FF14] text-sm">
              Password reset email sent! Please check your inbox.
            </div>
            <Link 
              href="/auth/login" 
              className="inline-block text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-[#39FF14] transition-colors"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-sm text-neutral-400 leading-relaxed">
              Enter your registered email address and we'll send you a secure link to reset your password.
            </p>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pilot@reintenspark.com"
                className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-[#202225] text-white focus:border-[#39FF14] outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all ${
                loading 
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                  : 'bg-[#39FF14] text-black hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] active:scale-95'
              }`}
            >
              {loading ? 'Sending Request...' : 'Send Reset Link'}
            </button>

            <div className="text-center">
              <Link 
                href="/auth/login" 
                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-[#39FF14] transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}