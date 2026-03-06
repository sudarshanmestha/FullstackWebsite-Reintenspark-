'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function ProfilePage() {
  const { user, updateUser, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password1: '',
    new_password2: '',
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, router]);

  // Sync form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setUpdating(true);

    try {
      await updateUser(formData);
      setMessage('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (passwordData.new_password1 !== passwordData.new_password2) {
      setError('New passwords do not match');
      return;
    }

    setUpdating(true);

    try {
      await api.changePassword(passwordData);
      setMessage('Password changed successfully!');
      setPasswordData({ old_password: '', new_password1: '', new_password2: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#202225' }}>
        <div style={{ color: '#e1e1e1' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#202225', padding: '2rem' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold" style={{ color: '#e1e1e1' }}>Profile</h1>

        {message && (
          <div className="p-4 rounded" style={{ backgroundColor: '#10b9811f', color: '#10b981' }}>
            {message}
          </div>
        )}

        {error && (
          <div className="p-4 rounded" style={{ backgroundColor: '#ff635f1f', color: '#ff5b5b' }}>
            {error}
          </div>
        )}

        {/* Profile Information */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: '#2f3136' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#e1e1e1' }}>
            Profile Information
          </h2>
          
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#c3c3c3' }}>
                Username
              </label>
              <input
                type="text"
                value={user?.username || ''}
                disabled
                className="w-full px-4 py-2 rounded border"
                style={{
                  backgroundColor: '#3a3a3a',
                  borderColor: '#3a3a3a',
                  color: '#888888',
                }}
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
                  className="w-full px-4 py-2 rounded border focus:outline-none"
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
                  className="w-full px-4 py-2 rounded border focus:outline-none"
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
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded border focus:outline-none"
                style={{
                  backgroundColor: '#202225',
                  borderColor: '#3a3a3a',
                  color: '#e1e1e1',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="px-6 py-2 rounded font-semibold transition-all"
              style={{
                background: updating ? '#3a3a3a' : 'linear-gradient(135deg, #627eff 0%, #8b5cf6 100%)',
                color: '#ffffff',
              }}
            >
              {updating ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: '#2f3136' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#e1e1e1' }}>
            Change Password
          </h2>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#c3c3c3' }}>
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.old_password}
                onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                className="w-full px-4 py-2 rounded border focus:outline-none"
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
                New Password
              </label>
              <input
                type="password"
                value={passwordData.new_password1}
                onChange={(e) => setPasswordData({ ...passwordData, new_password1: e.target.value })}
                className="w-full px-4 py-2 rounded border focus:outline-none"
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
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.new_password2}
                onChange={(e) => setPasswordData({ ...passwordData, new_password2: e.target.value })}
                className="w-full px-4 py-2 rounded border focus:outline-none"
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
              disabled={updating}
              className="px-6 py-2 rounded font-semibold transition-all"
              style={{
                background: updating ? '#3a3a3a' : 'linear-gradient(135deg, #627eff 0%, #8b5cf6 100%)',
                color: '#ffffff',
              }}
            >
              {updating ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}