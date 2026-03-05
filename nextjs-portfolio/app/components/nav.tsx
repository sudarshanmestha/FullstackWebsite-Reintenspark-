"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Theme from './Theme';
import User from './Header/User';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Hardware', path: '/hardware' },
  { name: 'Ai-Tools', path: '/Ai-Tools' },
  { name: 'R&D', path: '/rd' },
  { name: 'Careers', path: '/careers' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleNav, setVisibleNav] = useState(false);
  
  const user = null; 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-[#021b1b]/90 backdrop-blur-2xl border-b border-neutral-200 dark:border-[#39FF14]/10 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
          
          {/* LOGO AREA WITH REFINED BLUR SLOPE */}
          <div className="relative flex-shrink-0 pr-10 flex items-center justify-center min-w-[240px]">
            {/* THE BLUR SLOPE TOUCH */}
            <div className={`absolute -inset-x-6 -inset-y-4 -z-10 
              bg-white/60 dark:bg-white/5 
              blur-2xl transition-all duration-500
              rounded-[30%_70%_70%_30%/50%_30%_70%_50%]
              ${isScrolled ? 'opacity-30 scale-90' : 'opacity-80 scale-100'}
            `} />

            <Link href="/" className="relative z-10 block">
              <Image 
                alt="Reintenspark logo" 
                src="/icons/reinternspark-logo.svg" 
                // INCREASED SIZES (approx 30% larger)
                width={isScrolled ? 240 : 300}
                height={75}
                className="object-contain transition-all duration-500 dark:brightness-100 brightness-90 active:scale-95"
                priority
              />
            </Link>
          </div>

          {/* NAVIGATION */}
          <div className={`
            fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-transform lg:static lg:flex lg:flex-row lg:bg-transparent lg:inset-auto lg:translate-x-0
            ${visibleNav ? 'translate-x-0 bg-white dark:bg-black' : 'translate-x-full lg:translate-x-0'}
          `}>
            <nav className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    px-5 py-2.5 text-sm font-bold uppercase tracking-[0.15em] transition-all rounded-full
                    ${pathname === item.path 
                      ? 'text-black bg-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.5)]' 
                      : 'text-neutral-600 dark:text-white/80 hover:text-[#39FF14] hover:bg-neutral-100 dark:hover:bg-white/5'}
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4 lg:pl-8">
            <div className="hidden sm:block border-r border-neutral-200 dark:border-white/10 pr-4">
              <Theme className="theme-big" />
            </div>

            <Link 
              href="/search"
              className="hidden xl:flex items-center gap-2 px-5 py-2.5 border border-neutral-200 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-white hover:border-[#39FF14]/50 transition-all"
            >
              <span className="text-[#39FF14]">Search</span>
            </Link>

            {user ? (
              <User user={user} />
            ) : (
              <Link
                href="/contact"
                className="px-7 py-3 bg-[#39FF14] text-black text-xs font-black uppercase tracking-widest rounded-full shadow-lg hover:shadow-[#39FF14]/40 hover:scale-105 transition-all"
              >
                Contact
              </Link>
            )}

            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setVisibleNav(!visibleNav)}
            >
              <div className={`w-7 h-0.5 transition-all ${visibleNav ? 'rotate-45 translate-y-2 bg-black dark:bg-white' : 'bg-neutral-800 dark:bg-white'}`} />
              <div className={`w-7 h-0.5 transition-all ${visibleNav ? 'opacity-0' : 'bg-neutral-800 dark:bg-white'}`} />
              <div className={`w-7 h-0.5 transition-all ${visibleNav ? '-rotate-45 -translate-y-2 bg-black dark:bg-white' : 'bg-neutral-800 dark:bg-white'}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}