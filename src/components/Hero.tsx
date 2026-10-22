import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, ShieldCheck, Clock } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Subtle parallax depth calculation relative to hero center
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-noir-900 border-b border-noir-600/40 select-none"
    >
      {/* Background Cinematic Tattoo Photograph — High Contrast Real Tattoo on Skin with Interactive Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/chiaroscuro_sleeve_tattoo.jpg"
          alt="Masterful Black and Grey Sleeve Tattoo Craftsmanship with Baroque Sculptures"
          style={{
            transform: `scale(1.08) translate3d(${mouseOffset.x * -14}px, ${mouseOffset.y * -10}px, 0)`,
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="w-full h-full object-cover object-right md:object-center filter grayscale contrast-125 brightness-90 will-change-transform"
          loading="eager"
        />
        {/* Layered Gradient Overlays to keep typography sharp while revealing tattoo artwork */}
        <div className="absolute inset-0 bg-gradient-to-r from-noir-950 via-noir-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-transparent to-noir-950/80 pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-25 pointer-events-none" />
      </div>

      {/* Top Editorial Eyebrow Tag with Live Studio Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="inline-flex items-center space-x-3 border-l-2 border-noir-blood pl-3 py-1 bg-noir-950/40 backdrop-blur-sm pr-3">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest-xl text-noir-300 font-heading">
            INDEPENDENT TATTOO STUDIO · CANADA
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-noir-blood animate-pulse" />
          <span className="hidden sm:inline-flex items-center space-x-1.5 text-[10px] text-noir-300 uppercase tracking-widest font-mono">
            <Clock className="w-3 h-3 text-noir-blood" />
            <span>TORONTO · 11AM - 8PM EST</span>
          </span>
        </div>
      </div>

      {/* Main Hero Typography & Call-To-Action */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-8">
        <div className="max-w-4xl">
          {/* Main Bold Editorial Heading */}
          <h1 className="font-heading text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-noir-100 tracking-tight leading-[0.88] uppercase mb-6 sm:mb-8">
            YOUR STORY.
            <br />
            <span className="font-serif-italic font-normal text-noir-200 lowercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
              etched
            </span>{' '}
            IN{' '}
            <span className="text-noir-blood relative inline-block">
              INK.
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-noir-blood to-transparent" />
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-noir-300 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10">
            Thoughtfully crafted custom tattoos. Exceptional resident artists. Art that stays with you for a lifetime.
            Based in Toronto’s historic West Queen West arts district.
          </p>

          {/* Primary Action Buttons with Unified Bold Heading Typography */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3.5 sm:space-y-0 sm:space-x-5">
            <button
              onClick={onOpenBooking}
              id="hero-book-session-btn"
              className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 text-xs font-semibold uppercase tracking-widest-xl transition-all duration-300 shadow-xl shadow-noir-blood/25 hover:shadow-noir-blood/40 hover:-translate-y-0.5 active:translate-y-0 border border-red-900/60 font-heading"
            >
              <span>BOOK YOUR SESSION</span>
              <ArrowUpRight className="w-4 h-4 text-noir-100" />
            </button>

            <a
              href="#artists"
              id="hero-explore-artists-btn"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-noir-800/80 hover:bg-noir-700/80 text-noir-200 hover:text-noir-100 text-xs font-semibold uppercase tracking-widest-xl transition-all duration-300 border border-noir-600 hover:border-noir-400 backdrop-blur-sm font-heading"
            >
              <span>EXPLORE THE ARTISTS</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-noir-600/50 flex flex-wrap items-center gap-6 text-xs text-noir-400">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-noir-blood" />
              <span>Hospital-Grade Sterilization</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-noir-600" />
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-noir-blood" />
              <span>100% Custom Original Designs</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-noir-600" />
            <span className="font-mono text-[11px]">Toronto Public Health Inspected</span>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Bar with Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-noir-600/40 pt-4 text-xs tracking-widest text-noir-400 uppercase space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="font-heading font-semibold text-sm tracking-wider text-noir-200">
              CRAFTED WITH INTENTION
            </span>
            <span className="text-noir-600">/</span>
            <span>WEST QUEEN WEST · TORONTO</span>
          </div>

          <a
            href="#intro"
            className="group flex items-center space-x-2 text-noir-300 hover:text-noir-100 transition-colors"
            aria-label="Scroll to introduction"
          >
            <span className="text-[10px] tracking-widest font-heading font-semibold">SCROLL TO DISCOVER</span>
            <span className="p-1 border border-noir-600 group-hover:border-noir-blood transition-colors rounded-full">
              <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform text-noir-blood" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
