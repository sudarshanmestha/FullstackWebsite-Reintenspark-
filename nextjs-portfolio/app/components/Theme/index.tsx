"use client";

import React, { useEffect, useState } from 'react';
import useDarkMode from 'use-dark-mode';

const Theme = ({ className }: { className?: string }) => {
  const darkMode = useDarkMode(false);
  const [mounted, setMounted] = useState(false);

  // Only render the toggle after the component has mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return <div className="w-12 h-6" />; 
  }

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={darkMode.value}
        onChange={darkMode.toggle}
      />
      {/* ... rest of your Tailwind toggle UI ... */}
      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
    </label>
  );
};

export default Theme;