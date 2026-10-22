import React, { useState, useMemo } from 'react';
import { Eye, ArrowUpRight, Filter } from 'lucide-react';
import { GALLERY_ITEMS, type GalleryItem } from '../data/studioData';
import { GalleryLightbox } from './GalleryLightbox';

interface TattooGalleryProps {
  onOpenBooking: (artistId?: string, style?: string) => void;
}

type CategoryFilter = 'ALL WORK' | 'BLACK & GREY' | 'FINE LINE' | 'JAPANESE' | 'TRADITIONAL' | 'ORNAMENTAL';

export const TattooGallery: React.FC<TattooGalleryProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('ALL WORK');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filterCategories: CategoryFilter[] = [
    'ALL WORK',
    'BLACK & GREY',
    'FINE LINE',
    'JAPANESE',
    'TRADITIONAL',
    'ORNAMENTAL',
  ];

  const filteredItems = useMemo(() => {
    if (activeFilter === 'ALL WORK') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category.toUpperCase() === activeFilter);
  }, [activeFilter]);

  const handleBookPiece = (artistId: string, style: string) => {
    onOpenBooking(artistId, style);
  };

  const getCountForFilter = (category: CategoryFilter) => {
    if (category === 'ALL WORK') return GALLERY_ITEMS.length;
    return GALLERY_ITEMS.filter((i) => i.category.toUpperCase() === category).length;
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-noir-950 border-b border-noir-600/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest-xl text-noir-blood mb-3">
              <span>SIGNATURE PORTFOLIO</span>
              <span className="w-6 h-[1px] bg-noir-blood" />
            </div>
            <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold text-noir-100 uppercase tracking-tight">
              INK THAT <span className="font-serif-italic font-normal text-noir-200 lowercase">speaks.</span>
            </h2>
          </div>
          <p className="text-noir-300 text-sm sm:text-base max-w-md mt-4 md:mt-0 font-light">
            Every piece below is an authentic, custom tattoo executed directly on human skin by our resident artists.
          </p>
        </div>

        {/* Filter Bar with Live Item Counters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-noir-600/40">
          <div className="flex items-center text-xs uppercase tracking-widest text-noir-400 mr-2 flex-shrink-0 font-semibold font-heading">
            <Filter className="w-3.5 h-3.5 mr-1.5 text-noir-blood" />
            <span>FILTER:</span>
          </div>

          <div className="flex items-center space-x-2">
            {filterCategories.map((filter) => {
              const count = getCountForFilter(filter);
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  id={`filter-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 whitespace-nowrap border flex items-center space-x-1.5 font-heading ${
                    activeFilter === filter
                      ? 'bg-noir-blood text-noir-100 border-noir-blood font-semibold shadow-md shadow-noir-blood/20'
                      : 'bg-noir-900 text-noir-300 border-noir-600/60 hover:text-noir-100 hover:border-noir-400'
                  }`}
                >
                  <span>{filter}</span>
                  <span className={`text-[10px] font-mono px-1 rounded ${activeFilter === filter ? 'bg-black/30 text-noir-100' : 'text-noir-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical / Masonry Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => {
            const isTall = index % 3 === 0;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative cursor-pointer overflow-hidden bg-noir-900 border border-noir-600/80 transition-all duration-500 hover:border-noir-400 ${
                  isTall ? 'sm:row-span-2' : ''
                }`}
              >
                {/* Image Container with Luxury Zoom and Genuine Tattoo View */}
                <div className={`relative w-full overflow-hidden ${isTall ? 'h-[460px] sm:h-[640px]' : 'h-[360px]'}`}>
                  <img
                    src={item.imageUrl}
                    alt={`${item.title} - ${item.style} by ${item.artistName}`}
                    className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 ease-luxury"
                    loading="lazy"
                  />
                  
                  {/* Subtle Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/25 to-transparent opacity-85 group-hover:opacity-60 transition-opacity duration-300" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-noir-950/85 backdrop-blur-md text-[10px] uppercase font-semibold tracking-widest text-noir-200 border border-noir-600">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-noir-900/90 text-noir-100 border border-noir-600">
                    <Eye className="w-4 h-4 text-noir-blood" />
                  </div>

                  {/* Artwork Detail Card Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 transition-transform duration-300">
                    <p className="text-[11px] uppercase tracking-widest text-noir-blood font-semibold mb-1">
                      {item.artistName}
                    </p>
                    <h3 className="font-heading text-2xl sm:text-3xl text-noir-100 uppercase tracking-wide group-hover:text-noir-blood transition-colors font-bold">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-noir-400 mt-2 pt-2 border-t border-noir-600/40">
                      <span>{item.placement}</span>
                      <span className="flex items-center text-noir-300 group-hover:text-noir-100 font-sans text-[11px] tracking-wider uppercase font-semibold">
                        View Artwork <ArrowUpRight className="w-3 h-3 ml-1 text-noir-blood" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Footer Note & Consultation CTA */}
        <div className="mt-16 pt-8 border-t border-noir-600/50 flex flex-col sm:flex-row items-center justify-between text-xs text-noir-400 space-y-4 sm:space-y-0">
          <p>
            Showing {filteredItems.length} curated masterworks. Every design is customized exclusively for the collector.
          </p>
          <button
            onClick={() => onOpenBooking(undefined, activeFilter !== 'ALL WORK' ? activeFilter : undefined)}
            className="inline-flex items-center space-x-2 text-noir-100 hover:text-noir-blood uppercase tracking-widest-xl font-semibold transition-colors font-heading text-xs"
          >
            <span>REQUEST A BESPOKE COMMISSION</span>
            <ArrowUpRight className="w-4 h-4 text-noir-blood" />
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onNavigate={(newItem) => setSelectedItem(newItem)}
        onBookPiece={handleBookPiece}
      />
    </section>
  );
};
