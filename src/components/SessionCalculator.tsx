import React, { useState } from 'react';
import { Sliders, Clock, Sparkles, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { ARTISTS } from '../data/studioData';

interface SessionCalculatorProps {
  onOpenBookingWithSpecs: (artistId: string, style: string, placement: string, size: string) => void;
}

export const SessionCalculator: React.FC<SessionCalculatorProps> = ({ onOpenBookingWithSpecs }) => {
  const [placement, setPlacement] = useState('Inner Forearm');
  const [sizeInches, setSizeInches] = useState(6);
  const [complexity, setComplexity] = useState<'minimal' | 'detailed' | 'masterpiece'>('detailed');

  // Interactive estimates calculation
  const getEstimates = () => {
    let baseHours = sizeInches * 0.8;
    if (placement.includes('Sleeve') || placement.includes('Back')) {
      baseHours = Math.max(16, sizeInches * 1.6);
    }
    if (complexity === 'minimal') baseHours *= 0.65;
    if (complexity === 'masterpiece') baseHours *= 1.4;

    const roundedHours = Math.max(2, Math.round(baseHours));
    const isMultiSession = roundedHours > 7;

    // Recommended artist
    let recArtist = ARTISTS[0];
    let recStyle = 'Black & Grey Realism';
    if (complexity === 'minimal' || placement.includes('Spine') || placement.includes('Sternum')) {
      recArtist = ARTISTS[1]; // Jordan Blake
      recStyle = 'Fine Line';
    } else if (placement.includes('Back') || placement.includes('Sleeve')) {
      recArtist = sizeInches > 12 ? ARTISTS[2] : ARTISTS[0]; // Taylor or Alex
      recStyle = sizeInches > 12 ? 'Japanese Traditional' : 'Black & Grey Realism';
    }

    return {
      hours: roundedHours,
      sessions: isMultiSession ? Math.ceil(roundedHours / 6) : 1,
      artist: recArtist,
      style: recStyle,
    };
  };

  const currentEst = getEstimates();

  const placements = [
    'Inner Forearm',
    'Outer Forearm',
    'Upper Arm / Bicep',
    'Full Arm Sleeve',
    'Chest / Sternum',
    'Full Back',
    'Spine',
    'Thigh / Leg',
  ];

  return (
    <section className="py-20 sm:py-28 bg-noir-950 border-b border-noir-600/40 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest-xl text-noir-blood mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>INTERACTIVE ESTIMATOR</span>
            <span className="w-6 h-[1px] bg-noir-blood" />
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl text-noir-100 uppercase tracking-tight font-bold">
            PROJECT SCALE & TIMELINE CALCULATOR
          </h2>
          <p className="text-noir-300 text-sm sm:text-base font-light mt-3 max-w-2xl mx-auto">
            Interact with placement, dimensions, and detail density to view approximate session commitments and resident artist match.
          </p>
        </div>

        {/* Interactive Calculator Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-noir-900 border border-noir-600 p-6 sm:p-10 shadow-2xl">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Placement Selection */}
            <div>
              <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block mb-3">
                1. Select Body Placement
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {placements.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlacement(p)}
                    className={`p-2.5 text-[11px] uppercase tracking-wider text-left border transition-all ${
                      placement === p
                        ? 'border-noir-blood bg-noir-800 text-noir-100 font-semibold shadow-sm'
                        : 'border-noir-600/60 bg-noir-850 text-noir-400 hover:text-noir-200 hover:border-noir-500'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Approximate Size Slider */}
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-noir-200 font-semibold mb-2">
                <span>2. Approximate Height / Length</span>
                <span className="text-noir-blood font-mono text-sm font-bold">
                  {sizeInches} Inches ({Math.round(sizeInches * 2.54)} cm)
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="24"
                step="1"
                value={sizeInches}
                onChange={(e) => setSizeInches(parseInt(e.target.value))}
                className="w-full accent-noir-blood h-1.5 bg-noir-700 rounded-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-noir-500 mt-1 uppercase font-mono">
                <span>2" (Small / Micro)</span>
                <span>12" (Half Sleeve)</span>
                <span>24" (Full Sleeve / Back)</span>
              </div>
            </div>

            {/* Complexity & Shading Density */}
            <div>
              <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block mb-2.5">
                3. Detail & Shading Density
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'minimal', title: 'Minimalist Line', sub: 'Fine single-needle' },
                  { id: 'detailed', title: 'Standard Chiaroscuro', sub: 'Smooth shading gradients' },
                  { id: 'masterpiece', title: 'Heavy Hyper-Realism', sub: 'Multi-layer texture depth' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setComplexity(c.id as typeof complexity)}
                    className={`p-3 text-left border transition-all ${
                      complexity === c.id
                        ? 'border-noir-blood bg-noir-800 text-noir-100 font-semibold'
                        : 'border-noir-600/60 bg-noir-850 text-noir-400 hover:text-noir-200'
                    }`}
                  >
                    <span className="text-[11px] block uppercase font-semibold">{c.title}</span>
                    <span className="text-[10px] text-noir-400 block mt-0.5">{c.sub}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-noir-850 border border-noir-600 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-noir-600/60">
                <span className="text-[10px] uppercase tracking-widest text-noir-blood font-semibold">
                  ESTIMATED COMMITMENT
                </span>
                <span className="text-[10px] text-noir-400 font-mono">TORONTO ATELIER</span>
              </div>

              {/* Hours / Sessions Display */}
              <div className="py-6 space-y-4">
                <div className="flex items-baseline space-x-3">
                  <Clock className="w-6 h-6 text-noir-blood" />
                  <span className="font-heading text-4xl sm:text-5xl font-bold text-noir-100">
                    ~{currentEst.hours} HOURS
                  </span>
                </div>

                <div className="p-3 bg-noir-900 border border-noir-600/60 flex items-center justify-between text-xs">
                  <span className="text-noir-400 uppercase tracking-wider">Session Format</span>
                  <span className="text-noir-100 font-semibold">
                    {currentEst.sessions === 1 ? 'Single Dedicated Sitting' : `${currentEst.sessions} Staged Sessions`}
                  </span>
                </div>

                {/* Recommended Specialist Match */}
                <div className="p-4 bg-noir-900 border border-noir-600 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-noir-blood font-semibold flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>RECOMMENDED SPECIALIST</span>
                  </span>
                  <div className="flex items-center space-x-3 pt-1">
                    <img
                      src={currentEst.artist.portrait}
                      alt={currentEst.artist.name}
                      className="w-12 h-14 object-cover object-top border border-noir-600 filter grayscale"
                    />
                    <div>
                      <h4 className="font-heading text-lg text-noir-100 font-bold uppercase">
                        {currentEst.artist.name}
                      </h4>
                      <p className="text-[11px] text-noir-300">
                        {currentEst.artist.specialty}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-noir-600/60">
              <button
                onClick={() =>
                  onOpenBookingWithSpecs(
                    currentEst.artist.id,
                    currentEst.style,
                    placement,
                    `${sizeInches} Inches (${Math.round(sizeInches * 2.54)} cm)`
                  )
                }
                id="apply-estimator-to-booking-btn"
                className="w-full py-4 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 text-xs font-semibold uppercase tracking-widest-xl border border-red-900/60 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-noir-blood/25 font-heading"
              >
                <span>COMMENCE BOOKING WITH THESE SPECS</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              
              <div className="flex items-start space-x-2 text-[10px] text-noir-400 font-light">
                <ShieldAlert className="w-3.5 h-3.5 text-noir-blood flex-shrink-0 mt-0.5" />
                <span>
                  Estimates are directional guidelines. Final session scale, exact placement, and deposit are confirmed during private consultation.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
