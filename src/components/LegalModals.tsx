import React, { useEffect } from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

interface LegalModalsProps {
  activeModal: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  if (!activeModal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fade-in"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-3xl bg-noir-900 border border-noir-600 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-noir-600/60 bg-noir-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {activeModal === 'privacy' ? (
              <Shield className="w-5 h-5 text-noir-blood" />
            ) : (
              <FileText className="w-5 h-5 text-noir-blood" />
            )}
            <h3 className="font-editorial text-2xl text-noir-100 uppercase">
              {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service & Booking Conditions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-noir-400 hover:text-noir-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto text-xs sm:text-sm text-noir-300 font-light leading-relaxed space-y-4">
          {activeModal === 'privacy' ? (
            <>
              <p className="font-semibold text-noir-100">
                Atelier Noir Tattoo Studio · Toronto, Ontario, Canada
              </p>
              <p>
                This Privacy Policy describes how Atelier Noir ("we," "our," or "the Studio") collects, uses, and discloses your personal information in compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable Canadian provincial privacy laws.
              </p>

              <h4 className="font-semibold text-noir-100 uppercase tracking-wider text-xs pt-2">
                1. Information We Collect
              </h4>
              <p>
                When submitting a tattoo consultation or booking inquiry, we collect personal details including your name, email address, telephone number, anatomical placement preference, artistic concept descriptions, and reference imagery uploaded to our platform.
              </p>

              <h4 className="font-semibold text-noir-100 uppercase tracking-wider text-xs pt-2">
                2. Use of Information
              </h4>
              <p>
                Your data is utilized solely for reviewing artistic feasibility, scheduling consultations, coordinating appointment logistics, verifying medical/skin considerations, and fulfilling public health record-keeping obligations required by Ontario and Toronto Public Health directives.
              </p>

              <h4 className="font-semibold text-noir-100 uppercase tracking-wider text-xs pt-2">
                3. Consent & Data Security
              </h4>
              <p>
                We do not sell, rent, or trade your personal information. Reference images and personal information are stored securely with industry-standard encryption. You may request deletion or access to your stored records at any time by contacting{' '}
                <a href={`mailto:${STUDIO_INFO.email}`} className="text-noir-blood underline">
                  {STUDIO_INFO.email}
                </a>
                .
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-noir-100">
                Atelier Noir Tattoo Studio Booking Terms & Etiquette
              </p>

              <h4 className="font-semibold text-noir-100 uppercase tracking-wider text-xs pt-2">
                1. Booking Requests vs. Confirmed Appointments
              </h4>
              <p>
                Submitting an inquiry through our digital booking portal registers an artist consultation request. It does not constitute a guaranteed appointment slot until artistic review, consultation, and receipt of an official studio deposit.
              </p>

              <h4 className="font-semibold text-noir-100 uppercase tracking-wider text-xs pt-2">
                2. Deposits & Rescheduling
              </h4>
              <p>
                All tattoo deposits are strictly non-refundable and apply toward the final session cost of your project. A minimum of 72 hours’ written notice is required to transfer a deposit to an alternate date. Late cancellations or no-shows result in full deposit forfeiture.
              </p>

              <h4 className="font-semibold text-noir-100 uppercase tracking-wider text-xs pt-2">
                3. Age & Identification Policy
              </h4>
              <p>
                Clients must be 18 years of age or older at the date of the appointment. Government-issued photo identification (Driver's License, Canadian Passport, or Provincial ID) is mandatory before beginning any tattoo session.
              </p>

              <h4 className="font-semibold text-noir-100 uppercase tracking-wider text-xs pt-2">
                4. Copyright & Artistic Freedom
              </h4>
              <p>
                All original custom sketches, stencil drawings, and finished tattoo artworks remain the intellectual property of the respective resident artist and Atelier Noir.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-noir-600 bg-noir-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-noir-800 hover:bg-noir-700 text-noir-100 text-xs font-semibold uppercase tracking-widest border border-noir-600 transition-colors"
          >
            I UNDERSTAND
          </button>
        </div>
      </div>
    </div>
  );
};
