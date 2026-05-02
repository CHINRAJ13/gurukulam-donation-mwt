"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Button from './Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">ॐ</div>
          <span className="font-display text-xl font-bold tracking-tight hidden sm:block">Gurukulam Guru</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#mission" className="text-sm font-semibold hover:text-primary transition-colors">Our Mission</Link>
          <Link href="#causes" className="text-sm font-semibold hover:text-primary transition-colors">Causes</Link>
          <Link href="#construction" className="text-sm font-semibold hover:text-primary transition-colors">Sponsorship</Link>
          <Link href="#events" className="text-sm font-semibold hover:text-primary transition-colors">Events</Link>
          <Link href="#impact" className="text-sm font-semibold hover:text-primary transition-colors">Impact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button label="Donate Now" variant="primary" size="sm" href="#donate" />
        </div>
      </div>
    </nav>
  );
}
