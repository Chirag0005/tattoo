import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';
import { AudioToggle } from './AudioToggle';

interface NavbarProps {
  onOpenBooking: (artistId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Artists', href: '#artists' },
    { label: 'Tattoo Gallery', href: '#gallery' },
    { label: 'Our Studio', href: '#studio' },
    { label: 'Timeline', href: '#process' },
    { label: 'Comparison', href: '#reveal' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-noir-900/95 backdrop-blur-md border-b border-noir-600/70 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-noir-950/95 via-noir-900/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Wordmark with Bold Oswald/Bebas Heading */}
            <a
              href="#"
              className="group flex flex-col items-start focus:outline-none"
              aria-label="Atelier Noir Home"
            >
              <span className="font-heading text-2xl sm:text-3xl font-bold tracking-widest text-noir-100 group-hover:text-noir-blood transition-colors duration-300 uppercase leading-none">
                {STUDIO_INFO.name}
              </span>
              <span className="text-[10px] tracking-[0.3em] text-noir-400 uppercase font-sans mt-0.5 group-hover:text-noir-200 transition-colors">
                TORONTO · ATELIER
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-heading text-xs uppercase tracking-widest-xl text-noir-300 hover:text-noir-100 font-semibold transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-noir-blood hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions: Soundscape Ambient Toggle + Direct Booking CTA + Mobile Toggle */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Interactive Audio Toggle */}
              <AudioToggle />

              <button
                onClick={() => onOpenBooking()}
                id="nav-book-session-btn"
                className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 text-xs font-semibold uppercase tracking-widest-xl transition-all duration-300 rounded-none border border-red-900/60 shadow-lg shadow-noir-blood/20 hover:shadow-noir-blood/40 hover:-translate-y-0.5 active:translate-y-0 font-heading"
              >
                <span>BOOK A SESSION</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle-btn"
                className="p-2 text-noir-300 hover:text-noir-100 md:hidden focus:outline-none focus:ring-1 focus:ring-noir-blood"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-noir-900 border-l border-noir-600 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-luxury ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-noir-600/50">
              <span className="font-heading text-2xl tracking-widest text-noir-100 font-bold uppercase">
                {STUDIO_INFO.name}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-noir-300 hover:text-noir-100"
                aria-label="Close Mobile Navigation"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-8 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-2xl tracking-wider text-noir-200 hover:text-noir-blood font-bold transition-colors py-1 flex items-center justify-between group uppercase"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-sans tracking-widest text-noir-400 group-hover:text-noir-blood">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-noir-600/50 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>BOOK YOUR SESSION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="text-center text-[11px] text-noir-400 tracking-wider">
              {STUDIO_INFO.city}, {STUDIO_INFO.province} · {STUDIO_INFO.phone}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
