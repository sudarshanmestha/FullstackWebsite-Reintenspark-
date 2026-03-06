'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/lib/AuthContext"; // Use the @ alias
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      router.push('/courses');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-lg" style={{ backgroundColor: '#2f3136' }}>
      <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#e1e1e1' }}>
        Login to JustPython
      </h1>

      {error && (
        <div className="mb-4 p-3 rounded text-sm" style={{ backgroundColor: '#ff635f1f', color: '#ff5b5b' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#c3c3c3' }}>
            Username
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: '#202225',
              borderColor: '#3a3a3a',
              color: '#e1e1e1',
            }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#c3c3c3' }}>
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: '#202225',
              borderColor: '#3a3a3a',
              color: '#e1e1e1',
            }}
            required
          />
        </div>

        <div className="text-right">
          <Link href="/auth/forgot-password" style={{ color: '#627eff', fontSize: '14px' }}>
            Forgot Password?
          </Link>
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm" style={{ color: '#c3c3c3' }}>
        Don't have an account?{' '}
        <Link href="/auth/register" className="font-semibold" style={{ color: '#627eff' }}>
          Register
        </Link>
      </p>
    </div>
  );
}