import React from 'react';
import { ArrowUp, ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';
import { STUDIO_INFO, ARTISTS } from '../data/studioData';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface FooterProps {
  onOpenBooking: (artistId?: string) => void;
  onOpenLegal: (modal: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-noir-950 text-noir-300 border-t border-noir-600/80 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Wordmark & Direct Booking CTA */}
        <div className="pb-16 border-b border-noir-600/50 flex flex-col lg:flex-row lg:items-end justify-between space-y-8 lg:space-y-0">
          <div className="max-w-xl">
            <span className="font-heading text-5xl sm:text-6xl lg:text-7xl text-noir-100 font-bold uppercase tracking-wider block leading-none">
              {STUDIO_INFO.name}
            </span>
            <p className="text-xs uppercase tracking-widest-xl text-noir-blood font-semibold mt-2 font-heading">
              INDEPENDENT TATTOO STUDIO · TORONTO, CANADA
            </p>
            <p className="text-xs sm:text-sm text-noir-400 font-light mt-4 leading-relaxed">
              Elevating tattoo culture through museum-grade craftsmanship, anatomical precision, and private, unhurried consultations in West Queen West.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => onOpenBooking()}
              id="footer-book-session-btn"
              className="px-8 py-4 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 text-xs font-semibold uppercase tracking-widest-xl transition-all duration-300 flex items-center space-x-2 border border-red-900/60 shadow-lg shadow-noir-blood/20 font-heading"
            >
              <span>REQUEST YOUR SESSION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToTop}
              className="p-4 bg-noir-900 hover:bg-noir-850 text-noir-300 hover:text-noir-100 border border-noir-600 transition-colors"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Column Directory Links */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-xs">
          {/* Col 1: Studio Navigation */}
          <div>
            <h4 className="text-noir-100 uppercase tracking-widest font-semibold mb-4 text-[11px] font-heading">
              EXPLORE ATELIER
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#intro" className="hover:text-noir-100 transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#artists" className="hover:text-noir-100 transition-colors">
                  Resident Artists
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-noir-100 transition-colors">
                  Tattoo Gallery
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-noir-100 transition-colors">
                  The Studio Space
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-noir-100 transition-colors">
                  Booking Journey
                </a>
              </li>
              <li>
                <a href="#reveal" className="hover:text-noir-100 transition-colors">
                  Before & After Reveal
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-noir-100 transition-colors">
                  Studio Location
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Resident Artists */}
          <div>
            <h4 className="text-noir-100 uppercase tracking-widest font-semibold mb-4 text-[11px] font-heading">
              RESIDENT ARTISTS
            </h4>
            <ul className="space-y-2.5">
              {ARTISTS.map((artist) => (
                <li key={artist.id}>
                  <button
                    onClick={() => onOpenBooking(artist.id)}
                    className="hover:text-noir-100 transition-colors text-left flex items-center space-x-1 group"
                  >
                    <span className="font-heading uppercase font-semibold">{artist.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-noir-blood opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <span className="text-[10px] text-noir-500 block">{artist.specialty}</span>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="text-noir-blood hover:text-red-400 font-semibold uppercase tracking-wider text-[11px] font-heading"
                >
                  Recommend an Artist →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio Location */}
          <div>
            <h4 className="text-noir-100 uppercase tracking-widest font-semibold mb-4 text-[11px] font-heading">
              TORONTO ATELIER
            </h4>
            <div className="space-y-2.5 text-noir-400">
              <p className="text-noir-200 flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-noir-blood flex-shrink-0 mt-0.5" />
                <span>
                  {STUDIO_INFO.address}
                  <br />
                  {STUDIO_INFO.neighborhood}
                  <br />
                  {STUDIO_INFO.city}, {STUDIO_INFO.province} {STUDIO_INFO.postalCode}
                </span>
              </p>
              <p className="flex items-center space-x-2 pt-2">
                <Phone className="w-3.5 h-3.5 text-noir-blood flex-shrink-0" />
                <a href={`tel:${STUDIO_INFO.phoneRaw}`} className="hover:text-noir-100 font-mono">
                  {STUDIO_INFO.phone}
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-noir-blood flex-shrink-0" />
                <a href={`mailto:${STUDIO_INFO.email}`} className="hover:text-noir-100">
                  {STUDIO_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Col 4: Studio Ethics & Legal */}
          <div>
            <h4 className="text-noir-100 uppercase tracking-widest font-semibold mb-4 text-[11px] font-heading">
              ETHICS & POLICY
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-noir-100 transition-colors text-left"
                >
                  Privacy Policy (PIPEDA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-noir-100 transition-colors text-left"
                >
                  Booking Terms & Etiquette
                </button>
              </li>
              <li>
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-noir-200 hover:text-noir-100 transition-colors pt-2"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-noir-blood" />
                  <span>Follow {STUDIO_INFO.instagram}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & City Stamp */}
        <div className="pt-8 border-t border-noir-600/40 flex flex-col sm:flex-row items-center justify-between text-[11px] text-noir-500 space-y-4 sm:space-y-0 font-mono">
          <div>
            © {new Date().getFullYear()} {STUDIO_INFO.name}. All Rights Reserved. Toronto, Ontario, Canada.
          </div>
          <div className="flex items-center space-x-6">
            <span>Bespoke Fine Art Tattoos</span>
            <span>·</span>
            <span>Hospital-Grade Sterilization</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="text-noir-400 hover:text-noir-100 flex items-center space-x-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
