import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, User, ArrowUpRight, ZoomIn, ZoomOut } from 'lucide-react';
import type { GalleryItem } from '../data/studioData';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
  onBookPiece: (artistId: string, style: string) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  items,
  onClose,
  onNavigate,
  onBookPiece,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset zoom when navigating
  useEffect(() => {
    setIsZoomed(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;

    // Prevent background scrolling while open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = items.findIndex((i) => i.id === item.id);
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        onNavigate(items[prevIndex]);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = items.findIndex((i) => i.id === item.id);
        const nextIndex = (currentIndex + 1) % items.length;
        onNavigate(items[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, items, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const prevItem = items[(currentIndex - 1 + items.length) % items.length];
  const nextItem = items[(currentIndex + 1) % items.length];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fade-in"
    >
      {/* Dark backdrop blur */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        id="lightbox-close-btn"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 rounded-full bg-noir-800/80 text-noir-200 hover:text-noir-100 hover:bg-noir-700 border border-noir-600 transition-colors"
        aria-label="Close Lightbox (Escape)"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Prev Navigation Button */}
      <button
        onClick={() => onNavigate(prevItem)}
        id="lightbox-prev-btn"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-noir-800/80 text-noir-200 hover:text-noir-100 hover:bg-noir-700 border border-noir-600 transition-colors"
        aria-label="Previous artwork (Left arrow)"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Navigation Button */}
      <button
        onClick={() => onNavigate(nextItem)}
        id="lightbox-next-btn"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-noir-800/80 text-noir-200 hover:text-noir-100 hover:bg-noir-700 border border-noir-600 transition-colors"
        aria-label="Next artwork (Right arrow)"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Lightbox Modal Window */}
      <div
        className="relative z-10 w-full max-w-5xl bg-noir-900 border border-noir-600 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Complete Image View with Interactive Zoom Lens */}
        <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[450px] group select-none">
          <img
            src={item.imageUrl}
            alt={item.title}
            onClick={() => setIsZoomed(!isZoomed)}
            style={{
              transform: isZoomed ? 'scale(1.85)' : 'scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className={`w-full h-full object-contain max-h-[75vh] cursor-zoom-in ${
              isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-noir-900/85 backdrop-blur-md text-[10px] uppercase font-semibold tracking-widest text-noir-200 border border-noir-600 font-heading">
              {item.category}
            </span>
          </div>

          {/* Interactive Zoom Control Button */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="absolute bottom-4 right-4 p-2 bg-noir-900/80 hover:bg-noir-800 text-noir-200 hover:text-noir-100 border border-noir-600 transition-colors flex items-center space-x-1.5 text-[10px] uppercase tracking-wider font-mono backdrop-blur-sm"
            title={isZoomed ? 'Reset zoom (1x)' : 'Zoom detail (2x)'}
          >
            {isZoomed ? (
              <>
                <ZoomOut className="w-3.5 h-3.5 text-noir-blood" />
                <span>1X RESET</span>
              </>
            ) : (
              <>
                <ZoomIn className="w-3.5 h-3.5 text-noir-blood" />
                <span>2X INSPECT</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Artwork Metadata & Conversion Action */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-noir-900 border-t md:border-t-0 md:border-l border-noir-600">
          <div>
            <div className="flex items-center justify-between text-xs text-noir-400 uppercase tracking-widest mb-2 font-mono">
              <span>{item.style}</span>
              <span>{currentIndex + 1} / {items.length}</span>
            </div>

            <h3 className="font-heading text-3xl sm:text-4xl text-noir-100 uppercase tracking-wide mb-4 font-bold">
              {item.title}
            </h3>

            <p className="text-noir-300 text-sm leading-relaxed mb-6 font-light">
              {item.description}
            </p>

            <div className="space-y-3 py-4 border-y border-noir-600/60 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-noir-400 uppercase tracking-wider flex items-center space-x-2 font-heading">
                  <User className="w-3.5 h-3.5 text-noir-blood" />
                  <span>Resident Artist</span>
                </span>
                <span className="text-noir-100 font-semibold font-heading uppercase">{item.artistName}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-noir-400 uppercase tracking-wider font-heading">Placement</span>
                <span className="text-noir-200">{item.placement}</span>
              </div>

              {item.timeHours && (
                <div className="flex items-center justify-between">
                  <span className="text-noir-400 uppercase tracking-wider flex items-center space-x-2 font-heading">
                    <Calendar className="w-3.5 h-3.5 text-noir-blood" />
                    <span>Session Time</span>
                  </span>
                  <span className="text-noir-200 font-mono">{item.timeHours} Hours Total</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                onClose();
                onBookPiece(item.artistId, item.category);
              }}
              id="lightbox-book-similar-btn"
              className="w-full py-4 px-6 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 text-xs font-semibold uppercase tracking-widest-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-red-900/60 shadow-lg shadow-noir-blood/20 font-heading"
            >
              <span>REQUEST PIECE IN THIS STYLE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-noir-400 text-center mt-2.5 font-light">
              Opens our bespoke booking form with {item.artistName} pre-selected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
