'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';

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
      <div className="min-h-screen flex items-center justify-center bg-[#202225]">
        <div className="text-[#39FF14] animate-pulse font-bold tracking-widest">LOADING REINTENSPARK PROFILE...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 px-4 bg-[#202225]">
      <div className="max-w-4xl w-full space-y-8">
        
        <div className="flex items-center justify-between border-b border-[#39FF14]/20 pb-4">
          <h1 className="text-4xl font-bold text-white">
            User <span className="text-[#39FF14]">Profile</span>
          </h1>
          <Link href="/" className="text-xs font-bold text-neutral-400 hover:text-[#39FF14] transition-colors uppercase tracking-widest">
            Back to Home
          </Link>
        </div>

        {message && (
          <div className="p-4 rounded-lg bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20 animate-in fade-in duration-500">
            {message}
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          {/* Profile Information Card */}
          <div className="p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">Account Information</h2>
            
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500">Username (Permanent)</label>
                  <input
                    type="text"
                    value={user?.username || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-lg bg-[#1a1c1e] text-neutral-500 border border-white/5 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">First Name</label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#202225] text-white border border-neutral-700 focus:border-[#39FF14] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">Last Name</label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#202225] text-white border border-neutral-700 focus:border-[#39FF14] outline-none transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#202225] text-white border border-neutral-700 focus:border-[#39FF14] outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={updating}
                className="px-8 py-3 rounded-full font-bold uppercase tracking-widest bg-[#39FF14] text-black hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all active:scale-95 disabled:opacity-50"
              >
                {updating ? 'Processing...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Password Section */}
          <div className="p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">Security</h2>
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.old_password}
                    onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#202225] text-white border border-neutral-700 focus:border-[#39FF14] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">New Password</label>
                  <input
                    type="password"
                    value={passwordData.new_password1}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password1: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#202225] text-white border border-neutral-700 focus:border-[#39FF14] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">Confirm New</label>
                  <input
                    type="password"
                    value={passwordData.new_password2}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password2: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#202225] text-white border border-neutral-700 focus:border-[#39FF14] outline-none"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={updating}
                className="px-8 py-3 rounded-full font-bold uppercase tracking-widest bg-white text-black hover:bg-neutral-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}