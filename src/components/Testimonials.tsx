import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/studioData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 sm:py-32 bg-noir-900 border-b border-noir-600/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest-xl text-noir-blood mb-3">
              <span>COLLECTOR VOICES</span>
              <span className="w-8 h-[1px] bg-noir-blood" />
            </div>
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold text-noir-100 uppercase tracking-tight">
              THE ART SPEAKS <br />
              <span className="font-serif-italic font-normal text-noir-200 lowercase text-4xl sm:text-6xl">for itself.</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-3 mt-6 sm:mt-0">
            <button
              onClick={prevTestimonial}
              id="testimonial-prev-btn"
              className="p-3 bg-noir-850 hover:bg-noir-800 text-noir-300 hover:text-noir-100 border border-noir-600 transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-noir-400 px-2 font-bold">
              0{currentIndex + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              onClick={nextTestimonial}
              id="testimonial-next-btn"
              className="p-3 bg-noir-850 hover:bg-noir-800 text-noir-300 hover:text-noir-100 border border-noir-600 transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Quote Feature */}
        <div className="relative bg-noir-850 border border-noir-600 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle Background Watermark Quote */}
          <Quote className="absolute right-6 -bottom-6 w-48 h-48 text-noir-800/40 pointer-events-none transform -rotate-12" />

          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-noir-blood font-semibold mb-6 font-heading">
              <span>{current.tattooType}</span>
              <span className="text-noir-600">·</span>
              <span className="text-noir-300">Artist: {current.artistName}</span>
            </div>

            <blockquote className="font-serif-italic text-2xl sm:text-3xl md:text-4xl text-noir-100 font-normal leading-relaxed mb-8">
              "{current.quote}"
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-noir-600/50 text-xs">
              <div>
                <h4 className="font-heading font-bold text-noir-100 text-lg uppercase tracking-wider">
                  {current.clientName}
                </h4>
                <div className="flex items-center space-x-1.5 text-noir-400 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-noir-blood" />
                  <span>{current.location}</span>
                </div>
              </div>

              <div className="text-noir-500 font-mono text-[11px] mt-2 sm:mt-0">
                Collector Session: {current.date}
              </div>
            </div>
          </div>
        </div>

        {/* Small Demonstration Notice */}
        <div className="mt-6 text-center text-[11px] text-noir-500 font-mono">
          * Demonstrative collector reviews reflecting verified studio consultations and aftercare feedback.
        </div>

      </div>
    </section>
  );
};
