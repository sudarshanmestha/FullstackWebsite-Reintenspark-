'use client';

import React, { useState } from 'react';
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
    <div className="w-full max-w-md p-8 rounded-lg" style={{ backgroundColor: '#2f3136' }}>
      <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#e1e1e1' }}>
        Forgot Password
      </h1>

      {error && (
        <div className="mb-4 p-3 rounded text-sm" style={{ backgroundColor: '#ff635f1f', color: '#ff5b5b' }}>
          {error}
        </div>
      )}

      {success ? (
        <div className="text-center">
          <div className="mb-4 p-4 rounded" style={{ backgroundColor: '#10b9811f', color: '#10b981' }}>
            Password reset email sent! Check your inbox.
          </div>
          <Link href="/auth/login" className="text-sm" style={{ color: '#627eff' }}>
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm mb-4" style={{ color: '#c3c3c3' }}>
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#c3c3c3' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: '#202225',
                borderColor: '#3a3a3a',
                color: '#e1e1e1',
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded font-semibold transition-all"
            style={{
              background: loading ? '#3a3a3a' : 'linear-gradient(135deg, #627eff 0%, #8b5cf6 100%)',
              color: '#ffffff',
            }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <div className="text-center">
            <Link href="/auth/login" className="text-sm" style={{ color: '#627eff' }}>
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}