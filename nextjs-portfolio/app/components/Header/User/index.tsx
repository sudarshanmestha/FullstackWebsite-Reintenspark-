"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick'; // Import your new hook

const User = ({ className, user }: { className?: string; user?: any }) => {
  const [visible, setVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Use the hook to close the menu when clicking outside
  useOutsideClick(menuRef, () => setVisible(false));

  return (
    <div className={`relative ${className || ''}`} ref={menuRef}>
      <div 
        className="flex items-center gap-3 p-1 pr-4 rounded-full border border-white/10 bg-white/5 cursor-pointer hover:border-[#39FF14]/50 transition-all"
        onClick={() => setVisible(!visible)}
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#39FF14]/30 shadow-neon">
          <Image
            src={user?.avatar_url || '/images/content/avatar.png'}
            alt="Avatar"
            fill
            className="object-cover"
          />
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-white hidden sm:block">
          {user?.first_name || 'User'}
        </div>
      </div>

      {visible && (
        <div className="absolute top-full right-0 mt-4 w-56 glass-panel rounded-2xl p-4 shadow-neon-strong z-[100] animate-in fade-in zoom-in-95">
          <button 
            onClick={() => router.push('/')}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#39FF14] hover:text-black text-xs font-bold uppercase tracking-widest transition-all"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default User;