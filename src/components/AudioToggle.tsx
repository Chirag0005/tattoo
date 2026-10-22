import React, { useState, useRef, useEffect } from 'react';
import { VolumeX } from 'lucide-react';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const toggleAudio = async () => {
    if (!isPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2); // Soft subtle volume
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Ambient lowpass filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, ctx.currentTime);
        filter.connect(masterGain);

        // Sub harmonic drone oscillators (F & C chords for meditative dark aesthetic)
        const frequencies = [65.41, 98.0, 130.81]; // C2, G2, C3
        const oscs: OscillatorNode[] = [];

        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle LFO modulation
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.15 + idx * 0.05, ctx.currentTime);
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          osc.connect(filter);
          osc.start();
          oscs.push(osc);
        });

        oscillatorsRef.current = oscs;
        setIsPlaying(true);
      } catch {
        // Fallback if audio autoplay is restricted
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          oscillatorsRef.current.forEach((o) => {
            try {
              o.stop();
            } catch {
              // ignore
            }
          });
          oscillatorsRef.current = [];
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
          }
          audioCtxRef.current = null;
          setIsPlaying(false);
        }, 800);
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      id="ambient-sound-toggle-btn"
      className={`inline-flex items-center space-x-2 px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 border ${
        isPlaying
          ? 'bg-noir-850 text-noir-100 border-noir-blood shadow-md shadow-noir-blood/20'
          : 'bg-noir-900/80 text-noir-400 hover:text-noir-200 border-noir-600/70 hover:border-noir-400'
      }`}
      title={isPlaying ? 'Mute Studio Ambient Soundscape' : 'Play Studio Ambient Soundscape'}
      aria-label="Toggle Studio Ambient Soundscape"
    >
      {isPlaying ? (
        <>
          <div className="flex items-end space-x-0.5 h-3 w-3 text-noir-blood">
            <span className="w-0.5 bg-noir-blood animate-wave-1" />
            <span className="w-0.5 bg-noir-blood animate-wave-2" />
            <span className="w-0.5 bg-noir-blood animate-wave-3" />
            <span className="w-0.5 bg-noir-blood animate-wave-4" />
          </div>
          <span className="hidden lg:inline text-noir-blood">AMBIENCE ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">AMBIENCE</span>
        </>
      )}
    </button>
  );
};
