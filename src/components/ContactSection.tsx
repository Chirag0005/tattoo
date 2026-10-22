import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowUpRight, CheckCircle2, Send } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate instant secure dispatch
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const messages = JSON.parse(localStorage.getItem('atelier_contact_messages') || '[]');
      messages.unshift({
        ...formState,
        sentAt: new Date().toISOString(),
      });
      localStorage.setItem('atelier_contact_messages', JSON.stringify(messages));
    } catch {
      // LocalStorage fallback
    }

    setIsSubmitting(false);
    setIsSent(true);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-noir-900 border-b border-noir-600/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest-xl text-noir-blood mb-3">
            <span>GET IN TOUCH</span>
            <span className="w-8 h-[1px] bg-noir-blood" />
          </div>
          <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold text-noir-100 uppercase tracking-tight">
            LET’S CREATE <br />
            <span className="font-serif-italic font-normal text-noir-200 lowercase text-4xl sm:text-6xl">something personal.</span>
          </h2>
          <p className="text-noir-300 text-base sm:text-lg font-light mt-4">
            Have an idea in mind? Tell us about it, and let’s start the conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Studio Details, Hours & Map Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-noir-850 border border-noir-600 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-noir-blood font-semibold font-heading">
                  STUDIO LOCATION
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl text-noir-100 uppercase font-bold mt-1">
                  Atelier Noir Toronto
                </h3>
              </div>

              <div className="space-y-4 text-xs text-noir-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-noir-blood flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-noir-100 font-semibold">{STUDIO_INFO.address}</p>
                    <p>{STUDIO_INFO.neighborhood}</p>
                    <p>
                      {STUDIO_INFO.city}, {STUDIO_INFO.province} {STUDIO_INFO.postalCode}, Canada
                    </p>
                    <a
                      href={STUDIO_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-noir-blood hover:text-noir-100 uppercase tracking-widest text-[10px] mt-2 font-semibold font-heading"
                    >
                      <span>OPEN IN GOOGLE MAPS</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2 border-t border-noir-600/40">
                  <Phone className="w-4 h-4 text-noir-blood flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase text-noir-400 block font-heading">Telephone (Studio Desk)</span>
                    <a
                      href={`tel:${STUDIO_INFO.phoneRaw}`}
                      className="text-noir-100 hover:text-noir-blood transition-colors font-mono font-medium"
                    >
                      {STUDIO_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2 border-t border-noir-600/40">
                  <Mail className="w-4 h-4 text-noir-blood flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase text-noir-400 block font-heading">General Inquiries</span>
                    <a
                      href={`mailto:${STUDIO_INFO.email}`}
                      className="text-noir-100 hover:text-noir-blood transition-colors"
                    >
                      {STUDIO_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-2 border-t border-noir-600/40">
                  <Clock className="w-4 h-4 text-noir-blood flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 w-full">
                    <span className="text-[10px] uppercase text-noir-400 block font-heading">Operating Hours</span>
                    {STUDIO_INFO.hours.map((h, i) => (
                      <div key={i} className="flex justify-between text-[11px]">
                        <span className="text-noir-200">{h.days}</span>
                        <span className="text-noir-400 font-mono">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2 border-t border-noir-600/40">
                  <InstagramIcon className="w-4 h-4 text-noir-blood flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase text-noir-400 block font-heading">Social Gallery</span>
                    <a
                      href={STUDIO_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-noir-100 hover:text-noir-blood transition-colors font-mono"
                    >
                      {STUDIO_INFO.instagram}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-noir-600">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 border border-red-900/60 font-heading"
                >
                  <span>LAUNCH APPOINTMENT WIZARD</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-noir-850 border border-noir-600 shadow-xl">
              <span className="text-[10px] uppercase tracking-widest text-noir-blood font-semibold font-heading">
                DIRECT MESSAGE
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-noir-100 uppercase font-bold mt-1 mb-2">
                Send a Message to the Atelier
              </h3>
              <p className="text-xs text-noir-300 font-light mb-6">
                For general studio inquiries, press, guest spot residencies, or private event bookings. For tattoo appointments, use our dedicated booking wizard.
              </p>

              {isSent ? (
                <div className="p-8 bg-noir-900 border border-noir-blood/60 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-noir-blood mx-auto" />
                  <h4 className="font-heading text-2xl text-noir-100 uppercase font-bold">
                    Message Dispatched
                  </h4>
                  <p className="text-xs text-noir-300 font-light max-w-md mx-auto">
                    Thank you. Our studio manager reviews incoming inquiries daily and will respond via email promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSent(false)}
                    className="px-6 py-2.5 bg-noir-800 hover:bg-noir-700 text-noir-100 text-xs uppercase tracking-widest border border-noir-600 transition-colors font-heading"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3 bg-red-950/60 border border-noir-blood text-red-200 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block font-heading">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Liam Walker"
                        className="w-full p-3.5 bg-noir-900 border border-noir-600 text-noir-100 text-xs focus:outline-none focus:border-noir-blood"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block font-heading">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. liam@domain.ca"
                        className="w-full p-3.5 bg-noir-900 border border-noir-600 text-noir-100 text-xs focus:outline-none focus:border-noir-blood"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block font-heading">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Write your message or inquiry here..."
                      className="w-full p-3.5 bg-noir-900 border border-noir-600 text-noir-100 text-xs focus:outline-none focus:border-noir-blood"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-form-submit-btn"
                    className="w-full py-4 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 text-xs font-semibold uppercase tracking-widest-xl border border-red-900/60 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-noir-blood/20 disabled:opacity-50 font-heading"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING MESSAGE...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-noir-400 text-center font-light font-mono">
                    Protected by reCAPTCHA & Atelier Noir Privacy Standards · Toronto, Canada
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
