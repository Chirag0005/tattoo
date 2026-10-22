import React from 'react';
import { Compass, PenTool, CheckCircle2 } from 'lucide-react';

export const StudioIntro: React.FC = () => {
  return (
    <section id="intro" className="relative py-24 sm:py-32 bg-noir-900 border-b border-noir-600/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Photography Feature with Asymmetrical Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative group">
              {/* Subtle Decorative Underlayer */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-noir-blood/20 to-transparent border border-noir-600/40 pointer-events-none -rotate-1 transition-transform group-hover:rotate-0 duration-500" />
              
              <div className="relative overflow-hidden bg-noir-800 border border-noir-600 aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="/images/needle_shading_detail.jpg"
                  alt="Tattoo Artist Working with Meticulous Precision Directly on Human Skin"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-transform duration-700 ease-luxury"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Micro-Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-dark border border-noir-600/60 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-noir-100 font-semibold font-heading">
                        Hospital-Grade Clean Environment
                      </p>
                      <p className="text-[11px] text-noir-300">
                        Autoclaved & 100% Single-Use Disposables
                      </p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-noir-blood flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest-xl text-noir-blood mb-4">
              <span>MORE THAN SKIN DEEP</span>
              <span className="w-8 h-[1px] bg-noir-blood" />
            </div>

            {/* Editorial Heading with bold Oswald font */}
            <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-noir-100 uppercase tracking-tight leading-[0.95] mb-6">
              ART WITH MEANING.
              <br />
              <span className="font-serif-italic font-normal text-noir-200 lowercase text-4xl sm:text-5xl lg:text-6xl">
                made to last.
              </span>
            </h2>

            {/* Narrative Body Copy */}
            <p className="text-noir-300 text-base sm:text-lg leading-relaxed mb-6 font-light">
              Every tattoo begins with an idea. Through thoughtful consultation, technical precision, and a deep respect for the craft, we turn personal stories into original works of art.
            </p>

            <p className="text-noir-300 text-sm sm:text-base leading-relaxed mb-8 font-light">
              Founded in Toronto’s West Queen West district, Atelier Noir was built on the belief that tattoo studios should feel like contemporary fine art galleries: quiet, clean, private, and artistically uncompromising.
            </p>

            {/* Pillar Grid */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-noir-600/60 mb-8">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-noir-800 border border-noir-600 text-noir-blood mt-1">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-noir-100 font-heading">
                    Bespoke Anatomy
                  </h4>
                  <p className="text-[11px] text-noir-400 mt-1">
                    Every piece drawn directly to complement your body’s unique movement.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-noir-800 border border-noir-600 text-noir-blood mt-1">
                  <PenTool className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-noir-100 font-heading">
                    Fine Art Pedigree
                  </h4>
                  <p className="text-[11px] text-noir-400 mt-1">
                    Resident specialists with formal gallery, classical art, and international lineages.
                  </p>
                </div>
              </div>
            </div>

            {/* Link CTA */}
            <div>
              <a
                href="#studio"
                className="inline-flex items-center space-x-3 text-xs uppercase tracking-widest text-noir-100 hover:text-noir-blood transition-colors font-semibold group"
              >
                <span>DISCOVER OUR STUDIO</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
