import React, { useState, useEffect } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface StickyMobileBookBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBookBar: React.FC<StickyMobileBookBarProps> = ({ onOpenBooking }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user has scrolled past hero section (~450px)
      setVisible(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden p-3 bg-noir-950/95 border-t border-noir-600/80 backdrop-blur-lg animate-fade-in">
      <div className="flex items-center justify-between space-x-3">
        <div className="text-[11px] text-noir-300 pl-2">
          <span className="text-noir-100 font-semibold block uppercase">Atelier Noir</span>
          <span className="text-[10px] text-noir-400">Toronto Custom Sessions</span>
        </div>
        <button
          onClick={onOpenBooking}
          id="mobile-sticky-book-btn"
          className="flex-grow py-3 px-4 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 text-xs font-semibold uppercase tracking-widest-xl flex items-center justify-center space-x-2 border border-red-900/60 shadow-lg shadow-noir-blood/20 font-heading"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>BOOK A SESSION</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
