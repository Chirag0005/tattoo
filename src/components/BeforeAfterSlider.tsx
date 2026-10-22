import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SlidersHorizontal, Sparkles, Layers, Play, Pause } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Auto-sweep oscillation
  useEffect(() => {
    if (!isAutoPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }
    let direction = 1;
    const speed = 0.35;
    const step = () => {
      setSliderPosition((prev) => {
        let next = prev + direction * speed;
        if (next >= 85) {
          direction = -1;
          next = 85;
        } else if (next <= 15) {
          direction = 1;
          next = 15;
        }
        return next;
      });
      animFrameRef.current = requestAnimationFrame(step);
    };
    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoPlaying]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    setIsAutoPlaying(false);
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleStopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleStopDragging);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleStopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleStopDragging);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleStopDragging);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleStopDragging]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setIsAutoPlaying(false);
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section id="reveal" className="py-24 sm:py-32 bg-noir-950 border-b border-noir-600/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest-xl text-noir-blood mb-3">
            <span>PRECISION CRAFT</span>
            <span className="w-8 h-[1px] bg-noir-blood" />
          </div>
          <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold text-noir-100 uppercase tracking-tight">
            THE ANATOMY OF <br />
            <span className="font-serif-italic font-normal text-noir-200 lowercase text-4xl sm:text-6xl">a masterpiece.</span>
          </h2>
          <p className="text-noir-300 text-sm sm:text-base font-light mt-4">
            Drag the slider to reveal the precise transition from carbon stencil transfer to fully rendered chiaroscuro ink on identical skin coordinates.
          </p>

          {/* Interactive Preset Buttons & Auto-Glide Toggle */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6">
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                setSliderPosition(100);
              }}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider border font-heading transition-colors ${
                sliderPosition > 85
                  ? 'bg-noir-800 border-noir-blood text-noir-100 font-semibold'
                  : 'bg-noir-900 border-noir-600 text-noir-400 hover:text-noir-200'
              }`}
            >
              Stencil Only (0%)
            </button>
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                setSliderPosition(50);
              }}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider border font-heading transition-colors ${
                sliderPosition >= 40 && sliderPosition <= 60
                  ? 'bg-noir-800 border-noir-blood text-noir-100 font-semibold'
                  : 'bg-noir-900 border-noir-600 text-noir-400 hover:text-noir-200'
              }`}
            >
              50 / 50 Split
            </button>
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                setSliderPosition(0);
              }}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider border font-heading transition-colors ${
                sliderPosition < 15
                  ? 'bg-noir-800 border-noir-blood text-noir-100 font-semibold'
                  : 'bg-noir-900 border-noir-600 text-noir-400 hover:text-noir-200'
              }`}
            >
              Finished Ink (100%)
            </button>

            {/* Auto Glide Toggle Button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              id="slider-auto-sweep-btn"
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider border font-heading transition-colors flex items-center space-x-1.5 ${
                isAutoPlaying
                  ? 'bg-noir-blood text-noir-100 border-noir-blood font-semibold shadow-md shadow-noir-blood/20'
                  : 'bg-noir-900 border-noir-600 text-noir-300 hover:text-noir-100 hover:border-noir-400'
              }`}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-noir-100" />
                  <span>PAUSE SWEEP</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-noir-blood" />
                  <span>AUTO SWEEP DEMO</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Draggable Comparison Viewer Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-label="Before and after tattoo comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            className="relative select-none overflow-hidden border border-noir-600 shadow-2xl bg-noir-900 aspect-[16/10] sm:aspect-[16/9] cursor-ew-resize focus:outline-none focus:ring-1 focus:ring-noir-blood"
          >
            {/* UNDERLYING LAYER: Healed Finished Tattoo (AFTER) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="/images/chiaroscuro_sleeve_tattoo.jpg"
                alt="Healed Black and Grey Tattoo Realism on Arm"
                className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-95"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/70 via-transparent to-transparent pointer-events-none" />
              
              {/* After Badge */}
              <div className="absolute bottom-6 right-6 px-4 py-1.5 bg-noir-950/90 backdrop-blur-md border border-noir-600 text-noir-100 text-xs font-semibold uppercase tracking-widest pointer-events-none flex items-center space-x-1.5 font-heading">
                <Sparkles className="w-3.5 h-3.5 text-noir-blood" />
                <span>AFTER: HEALED INK</span>
              </div>
            </div>

            {/* OVERLYING LAYER: Stencil Line Blueprint (BEFORE) - Clipped via Slider Position */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img
                src="/images/chiaroscuro_sleeve_tattoo.jpg"
                alt="Original Tattoo Stencil Linework Blueprint"
                className="w-full h-full object-cover object-center filter invert brightness-125 contrast-200 hue-rotate-180 opacity-90"
                draggable={false}
              />
              {/* Stencil Blueprint Matrix Grid Overlay */}
              <div className="absolute inset-0 bg-noise opacity-35 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/70 via-transparent to-transparent pointer-events-none" />
              
              {/* Before Badge */}
              <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-noir-950/90 backdrop-blur-md border border-noir-600 text-noir-200 text-xs font-semibold uppercase tracking-widest pointer-events-none flex items-center space-x-1.5 font-heading">
                <Layers className="w-3.5 h-3.5 text-noir-blood" />
                <span>BEFORE: STENCIL BLUEPRINT</span>
              </div>
            </div>

            {/* Vertical Divider Line with Luxury Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Divider Line */}
              <div className="w-[2px] h-full bg-noir-100 shadow-[0_0_10px_rgba(255,255,255,0.4)] -ml-[1px]" />
              
              {/* Central Drag Handle Pill */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-noir-900 border-2 border-noir-100 shadow-2xl flex items-center justify-center text-noir-blood">
                <SlidersHorizontal className="w-4 h-4 transform rotate-90" />
              </div>
            </div>

          </div>

          {/* Slider Instructions and Legend */}
          <div className="mt-6 flex items-center justify-between text-xs text-noir-400 px-2 font-mono">
            <span className="flex items-center space-x-1">
              <span>← Drag handle or click presets above →</span>
            </span>
            <span className="hidden sm:inline text-noir-300">
              Baroque Sleeve Realism · Alex Morgan
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
