import React from 'react';
import { ArrowUpRight, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

interface BookingProcessProps {
  onOpenBooking: () => void;
}

export const BookingProcess: React.FC<BookingProcessProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      number: '01',
      title: 'TELL US YOUR IDEA',
      icon: MessageSquare,
      description:
        'Share your concept, preferred placement, approximate size, and the style you have in mind through our secure 7-step booking request portal.',
      note: 'Reference photos & moodboards welcome',
    },
    {
      number: '02',
      title: 'CONNECT WITH YOUR ARTIST',
      icon: Sparkles,
      description:
        'We review your request, evaluate anatomical flow, and arrange an in-person or virtual consultation to refine the design blueprint.',
      note: 'Receive custom scale & timeline estimate',
    },
    {
      number: '03',
      title: 'MAKE IT OFFICIAL',
      icon: CheckCircle2,
      description:
        'Once design specifications are confirmed, secure your dedicated tattoo session date with an official studio deposit and pre-care instructions.',
      note: 'Appointment confirmed upon mutual agreement',
    },
  ];

  return (
    <section id="process" className="py-24 sm:py-32 bg-noir-900 border-b border-noir-600/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest-xl text-noir-blood mb-3">
            <span>THE JOURNEY</span>
            <span className="w-8 h-[1px] bg-noir-blood" />
          </div>
          <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold text-noir-100 uppercase tracking-tight">
            YOUR NEXT TATTOO <br />
            <span className="font-serif-italic font-normal text-noir-200 lowercase text-4xl sm:text-6xl">starts here.</span>
          </h2>
          <p className="text-noir-300 text-base sm:text-lg font-light mt-4">
            A transparent, thoughtful collaborative experience from initial concept to healed permanent artwork.
          </p>
        </div>

        {/* 3 Step Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Subtle Connecting Line on Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-noir-600 to-transparent -translate-y-12 z-0 pointer-events-none" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative z-10 bg-noir-850 border border-noir-600/80 p-8 flex flex-col justify-between hover:border-noir-400 transition-all duration-300 group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-noir-600/40">
                    <span className="font-mono text-3xl font-bold text-noir-blood group-hover:scale-110 transition-transform">
                      {step.number}
                    </span>
                    <div className="p-3 bg-noir-900 border border-noir-600 text-noir-300 group-hover:text-noir-100 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl text-noir-100 uppercase tracking-wide font-bold mb-3">
                    {step.title}
                  </h3>

                  <p className="text-noir-300 text-sm leading-relaxed mb-6 font-light">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-noir-600/40 flex items-center space-x-2 text-[11px] text-noir-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-noir-blood" />
                  <span>{step.note}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer & Start Booking Action */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <button
            onClick={onOpenBooking}
            id="process-start-booking-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-10 py-4 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 text-xs font-semibold uppercase tracking-widest-xl transition-all duration-300 shadow-xl shadow-noir-blood/25 border border-red-900/60 font-heading"
          >
            <span>START YOUR BOOKING</span>
            <ArrowUpRight className="w-4 h-4 text-noir-100" />
          </button>
          
          <p className="text-[11px] text-noir-400 mt-3 leading-normal">
            * Please note: Submitting a booking request initiates artist review. No appointment is finalized until consultation and mutual confirmation.
          </p>
        </div>

      </div>
    </section>
  );
};
