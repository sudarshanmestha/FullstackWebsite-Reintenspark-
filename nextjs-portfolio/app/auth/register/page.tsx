'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/courses');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password1 !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password1.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      router.push('/courses');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-lg" style={{ backgroundColor: '#2f3136' }}>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #627eff 0%, #8b5cf6 100%)' }}>
            <span className="text-white font-bold text-2xl">JP</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold" style={{ color: '#e1e1e1' }}>
          Create Account
        </h1>
        <p className="mt-2" style={{ color: '#c3c3c3' }}>
          Start your learning journey today
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#ff635f1f', color: '#ff5b5b' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#c3c3c3' }}>
            Username *
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-4 py-3 rounded border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: '#202225',
              borderColor: '#3a3a3a',
              color: '#e1e1e1',
            }}
            placeholder="Choose a username"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#c3c3c3' }}>
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: '#202225',
              borderColor: '#3a3a3a',
              color: '#e1e1e1',
            }}
            placeholder="your.email@example.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#c3c3c3' }}>
              First Name
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="w-full px-4 py-3 rounded border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: '#202225',
                borderColor: '#3a3a3a',
                color: '#e1e1e1',
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#c3c3c3' }}>
              Last Name
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="w-full px-4 py-3 rounded border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: '#202225',
                borderColor: '#3a3a3a',
                color: '#e1e1e1',
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#c3c3c3' }}>
            Password *
          </label>
          <input
            type="password"
            value={formData.password1}
            onChange={(e) => setFormData({ ...formData, password1: e.target.value })}
            className="w-full px-4 py-3 rounded border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: '#202225',
              borderColor: '#3a3a3a',
              color: '#e1e1e1',
            }}
            placeholder="At least 8 characters"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#c3c3c3' }}>
            Confirm Password *
          </label>
          <input
            type="password"
            value={formData.password2}
            onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
            className="w-full px-4 py-3 rounded border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: '#202225',
              borderColor: '#3a3a3a',
              color: '#e1e1e1',
            }}
            placeholder="Repeat your password"
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
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center" style={{ color: '#c3c3c3' }}>
        Already have an account?{' '}
        <Link href="/auth/login" className="font-semibold" style={{ color: '#627eff' }}>
          Login
        </Link>
      </p>
    </div>
  );
}