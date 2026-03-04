"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Hardware', path: '/hardware' },
  { name: 'Ai-Tools', path: '/Ai-Tools' },
  { name: 'More', path: '/more' },
  { name: 'R&D', path: '/rd' },
  { name: 'Careers', path: '/careers' },
];

// Function for standard navigation link styles
// Function for standard navigation link styles
function NavLink({ item, pathname }) {
  const isActive = pathname === item.path;
  
  return (
    <Link
      href={item.path}
      className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-full border
        /* Default State: Gray text, subtle border */
        ${isActive 
          ? 'text-[#39FF14] border-[#39FF14]/50 bg-[#39FF14]/5' 
          : 'text-[#39FF14] border-gray-700 bg-transparent-shadow-[0_0_25px_rgba(57,255,20,0.8)'}
        
        /* HOVER STATE: This is where the block turns green and text turns black */
        hover:bg-[#39FF14] 
        hover:text-black 
        hover:border-[#39FF14] 
        hover:shadow-[0_0_25px_rgba(57,255,20,0.8)]
        hover:scale-105
      `}
    >
      {item.name}
    </Link>
  );
}

// Function for the 'Contact' button style
function ContactButton({ path }) {
  return (
    <Link
      href={path}
      className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#0c2a2a] bg-[#39FF14] rounded-full shadow-[0_0_20px_rgba(57,255,20,0.7)] transition-all hover:shadow-[0_0_25px_rgba(57,255,20,0.9)]"
    >
      CONTACT
    </Link>
  );
}


export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] transform-gpu transition-all duration-300">
      <div className={`mx-auto transition-all duration-300 ease-in-out max-w-8xl px-4 ${isScrolled ? 'mt-2' : 'mt-4'} sm:px-6 lg:px-8`}>
        <div className={`
                  flex w-full items-center transform-gpu relative transition-all duration-500 flex-row justify-between
                  border-b backdrop-blur-2xl
                  ${isScrolled 
                    ? 'bg-white/60 border-emerald-200/50 px-6 py-2 rounded-[111px] shadow-[0_10px_40px_rgba(255,255,255,0.8)]' 
                    : 'bg-transparent border-white/10 px-6 py-3 rounded-none shadow-none'}
                `}>
          
          {/* Logo Area */}
          <Link href="/" className="flex-shrink-0 z-10 relative">
            <img 
              alt="Reintenspark logo" 
              src="/icons/reinternspark-logo.svg" 
              width="140"
              height="180"
              className={`transition-all duration-300 object-contain
                ${isScrolled ? 'max-w-[85px] lg:scale-100' : 'max-w-[100px] lg:max-w-none lg:scale-110 lg:origin-left'}`} 
              style={{ width: '140px', height: 'auto' }}
            />
          </Link>

          {/* Navigation Links and Contact Button */}
          <nav className="hidden lg:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <NavLink key={item.path} item={item} pathname={pathname} />
            ))}
            <ContactButton path="/contact" />
          </nav>

          {/* Spacer for layout balance */}
          <div className="hidden lg:block w-[140px]"></div>
        </div>
      </div>
    </header>
  );
}