import React from 'react';
import { ArrowUpRight, Award, Sparkles } from 'lucide-react';
import { ARTISTS, type Artist } from '../data/studioData';

interface ArtistSectionProps {
  onOpenBooking: (artistId?: string) => void;
}

export const ArtistSection: React.FC<ArtistSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="artists" className="py-24 sm:py-32 bg-noir-900 border-b border-noir-600/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest-xl text-noir-blood mb-3">
            <span>RESIDENT ARTISTS</span>
            <span className="w-8 h-[1px] bg-noir-blood" />
          </div>
          <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold text-noir-100 uppercase tracking-tight mb-4">
            THE HANDS <span className="font-serif-italic font-normal text-noir-200 lowercase">behind</span> THE INK.
          </h2>
          <p className="text-noir-300 text-base sm:text-lg font-light leading-relaxed">
            Different perspectives. Distinct styles. One commitment to exceptional work. Every resident artist at Atelier Noir brings years of discipline, heavily tattooed pedigree, and an uncompromising artistic voice.
          </p>
        </div>

        {/* 3 Artist Editorial Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {ARTISTS.map((artist: Artist, index: number) => (
            <div
              key={artist.id}
              className="group bg-noir-850 border border-noir-600/80 hover:border-noir-400 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Artist Portrait Header — Real Tattoo Artists at Work */}
                <div className="relative overflow-hidden aspect-[4/5] bg-noir-950">
                  <img
                    src={artist.portrait}
                    alt={`${artist.name} - ${artist.specialty}`}
                    className="w-full h-full object-cover object-top filter grayscale contrast-120 brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 ease-luxury"
                    loading="lazy"
                  />
                  
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-900 via-transparent to-transparent opacity-90" />
                  
                  {/* Artist Number & Experience Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-noir-300 px-2 py-1 bg-noir-900/85 backdrop-blur-md border border-noir-600">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-noir-200 px-2.5 py-1 bg-noir-900/85 backdrop-blur-md border border-noir-600 flex items-center space-x-1 font-heading">
                      <Award className="w-3 h-3 text-noir-blood" />
                      <span>{artist.experience}</span>
                    </span>
                  </div>

                  {/* Name & Specialty Banner Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[11px] uppercase tracking-widest text-noir-blood font-semibold font-heading">
                      {artist.role}
                    </p>
                    <h3 className="font-heading text-3xl sm:text-4xl text-noir-100 uppercase tracking-wide font-bold">
                      {artist.name}
                    </h3>
                  </div>
                </div>

                {/* Artist Bio & Philosophy */}
                <div className="p-6 sm:p-7">
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-widest font-semibold text-noir-200 block mb-1.5 font-heading">
                      Specialty:
                    </span>
                    <p className="text-sm font-semibold text-noir-100 font-heading tracking-wide uppercase">
                      {artist.specialty}
                    </p>
                  </div>

                  <p className="text-noir-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    {artist.bio}
                  </p>

                  {/* Philosophy Quote */}
                  <blockquote className="border-l-2 border-noir-blood pl-3.5 py-1 mb-6 text-xs italic text-noir-300 font-serif-italic">
                    "{artist.philosophy}"
                  </blockquote>

                  {/* Sample Portfolio Preview Mini-Strip */}
                  <div className="mb-6 pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-noir-400 font-semibold block mb-2 font-heading">
                      Featured Permanent Artwork:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {artist.featuredWork.map((workImg, wIdx) => (
                        <div key={wIdx} className="aspect-square bg-noir-950 border border-noir-600/70 overflow-hidden">
                          <img
                            src={workImg}
                            alt={`${artist.name} portfolio artwork`}
                            className="w-full h-full object-cover filter grayscale contrast-110 hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Style Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {artist.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-noir-900 text-noir-300 border border-noir-600/60 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button: Book Directly with this Artist */}
              <div className="p-6 sm:p-7 pt-0">
                <button
                  onClick={() => onOpenBooking(artist.id)}
                  id={`book-with-${artist.id}`}
                  className="w-full py-3.5 px-4 bg-noir-800 hover:bg-noir-blood text-noir-100 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 border border-noir-600 hover:border-noir-blood shadow-sm group-hover:shadow-lg font-heading"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>BOOK WITH {artist.name.split(' ')[0].toUpperCase()}</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Studio Consultation Note */}
        <div className="mt-12 text-center text-xs text-noir-400">
          Unsure which artist best matches your vision? Select{' '}
          <span className="text-noir-200 underline cursor-pointer" onClick={() => onOpenBooking()}>
            "Recommend an Artist"
          </span>{' '}
          in the booking wizard and our creative director will pair you.
        </div>

      </div>
    </section>
  );
};
