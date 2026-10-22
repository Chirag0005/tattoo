import React from 'react';
import { ArrowUpRight, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';
import { STUDIO_EXPERIENCE_IMAGES } from '../data/studioData';

export const StudioExperience: React.FC = () => {
  return (
    <section id="studio" className="py-24 sm:py-32 bg-noir-950 border-b border-noir-600/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest-xl text-noir-blood mb-3">
              <span>THE ENVIRONMENT</span>
              <span className="w-8 h-[1px] bg-noir-blood" />
            </div>
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold text-noir-100 uppercase tracking-tight leading-[0.92]">
              WHERE THE ART <br />
              <span className="font-serif-italic font-normal text-noir-200 lowercase text-4xl sm:text-6xl">comes to life.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-noir-300 text-sm sm:text-base font-light leading-relaxed">
              We designed Atelier Noir to dismantle the clichés of traditional street shops. A quiet, contemplative sanctuary where comfort, pristine hygiene, calibrated rotary hardware, and elevated design coalesce.
            </p>
          </div>
        </div>

        {/* Editorial Multi-Image Gallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mb-16">
          {/* Main Large Cinematic Photo — Authentic Tattoo Station */}
          <div className="md:col-span-7 relative group overflow-hidden bg-noir-900 border border-noir-600">
            <div className="aspect-[16/10] sm:aspect-[16/11] overflow-hidden">
              <img
                src={STUDIO_EXPERIENCE_IMAGES[0].url}
                alt={STUDIO_EXPERIENCE_IMAGES[0].title}
                className="w-full h-full object-cover object-center filter grayscale contrast-120 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-luxury"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-widest text-noir-blood font-semibold font-heading">
                  WEST QUEEN WEST · TORONTO
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl text-noir-100 uppercase font-bold mt-1">
                  {STUDIO_EXPERIENCE_IMAGES[0].title}
                </h3>
                <p className="text-xs text-noir-300 mt-1 max-w-lg font-light">
                  {STUDIO_EXPERIENCE_IMAGES[0].caption}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Stacked Supporting Images */}
          <div className="md:col-span-5 flex flex-col space-y-6 sm:space-y-8">
            <div className="relative group overflow-hidden bg-noir-900 border border-noir-600 aspect-[16/9]">
              <img
                src={STUDIO_EXPERIENCE_IMAGES[1].url}
                alt={STUDIO_EXPERIENCE_IMAGES[1].title}
                className="w-full h-full object-cover object-center filter grayscale contrast-120 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-luxury"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="font-heading text-xl text-noir-100 uppercase font-bold">
                  {STUDIO_EXPERIENCE_IMAGES[1].title}
                </h4>
                <p className="text-[11px] text-noir-300 mt-0.5">
                  {STUDIO_EXPERIENCE_IMAGES[1].caption}
                </p>
              </div>
            </div>

            <div className="relative group overflow-hidden bg-noir-900 border border-noir-600 aspect-[16/9]">
              <img
                src={STUDIO_EXPERIENCE_IMAGES[2].url}
                alt={STUDIO_EXPERIENCE_IMAGES[2].title}
                className="w-full h-full object-cover object-center filter grayscale contrast-120 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-luxury"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="font-heading text-xl text-noir-100 uppercase font-bold">
                  {STUDIO_EXPERIENCE_IMAGES[2].title}
                </h4>
                <p className="text-[11px] text-noir-300 mt-0.5">
                  {STUDIO_EXPERIENCE_IMAGES[2].caption}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Experience Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-noir-600/50">
          <div className="p-6 bg-noir-900/60 border border-noir-600/60">
            <ShieldCheck className="w-6 h-6 text-noir-blood mb-3" />
            <h4 className="text-xs uppercase tracking-widest font-semibold text-noir-100 mb-2 font-heading">
              Sterile Clinical Precision
            </h4>
            <p className="text-xs text-noir-300 leading-relaxed font-light">
              Single-use EO gas sterilized cartridges, hospital-grade environmental barriers, and routine autoclave monitoring surpass Canadian health directives.
            </p>
          </div>

          <div className="p-6 bg-noir-900/60 border border-noir-600/60">
            <HeartHandshake className="w-6 h-6 text-noir-blood mb-3" />
            <h4 className="text-xs uppercase tracking-widest font-semibold text-noir-100 mb-2 font-heading">
              Private & Respectful Space
            </h4>
            <p className="text-xs text-noir-300 leading-relaxed font-light">
              We provide individual private booths, ergonomic client loungers, soothing acoustic ambient soundscapes, and full modesty screens upon request.
            </p>
          </div>

          <div className="p-6 bg-noir-900/60 border border-noir-600/60">
            <Eye className="w-6 h-6 text-noir-blood mb-3" />
            <h4 className="text-xs uppercase tracking-widest font-semibold text-noir-100 mb-2 font-heading">
              Unrushed Creative Dialogue
            </h4>
            <p className="text-xs text-noir-300 leading-relaxed font-light">
              We never double-book or rush appointments. Every session has ample buffer time for stencil alignment, size testing, and organic client breaks.
            </p>
          </div>
        </div>

        {/* Studio Visit Call to Action */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 bg-noir-900 border border-noir-600">
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl text-noir-100 uppercase font-bold">
              Schedule an in-person studio visit
            </h3>
            <p className="text-xs text-noir-300 mt-1">
              Prefer to see the space and review physical artist flash books in Toronto?
            </p>
          </div>
          <a
            href="#contact"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 px-6 py-3 bg-noir-800 hover:bg-noir-700 text-noir-100 text-xs font-semibold uppercase tracking-widest border border-noir-600 transition-colors font-heading"
          >
            <span>COME MEET THE ARTISTS</span>
            <ArrowUpRight className="w-4 h-4 text-noir-blood" />
          </a>
        </div>

      </div>
    </section>
  );
};
