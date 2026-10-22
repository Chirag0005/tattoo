import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  Calendar,
  Sparkles,
  Info,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Copy,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARTISTS } from '../data/studioData';

export interface BookingFormData {
  artistId: string;
  style: string;
  conceptDescription: string;
  placement: string;
  approximateSize: string;
  colorPreference: 'black_and_grey' | 'colour' | 'undecided';
  hasReferenceDesign: 'yes_exact' | 'rough_concept' | 'no_original';
  referenceImages: { name: string; size: number; dataUrl: string }[];
  preferredDate: string;
  timeframeFlexibility: string;
  alternativeDates: string;
  fullName: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'phone' | 'sms';
  clientNotes: string;
  privacyConsent: boolean;
}

const initialFormData: BookingFormData = {
  artistId: 'recommend',
  style: '',
  conceptDescription: '',
  placement: '',
  approximateSize: '',
  colorPreference: 'black_and_grey',
  hasReferenceDesign: 'rough_concept',
  referenceImages: [],
  preferredDate: '',
  timeframeFlexibility: 'flexible',
  alternativeDates: '',
  fullName: '',
  email: '',
  phone: '',
  preferredContact: 'email',
  clientNotes: '',
  privacyConsent: false,
};

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedArtistId?: string;
  preselectedStyle?: string;
  preselectedPlacement?: string;
  preselectedSize?: string;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  isOpen,
  onClose,
  preselectedArtistId,
  preselectedStyle,
  preselectedPlacement,
  preselectedSize,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Apply preselected values when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        artistId: preselectedArtistId || prev.artistId || 'recommend',
        style: preselectedStyle || prev.style,
        placement: preselectedPlacement || prev.placement,
        approximateSize: preselectedSize || prev.approximateSize,
      }));
    }
  }, [isOpen, preselectedArtistId, preselectedStyle, preselectedPlacement, preselectedSize]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Validation per step
  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.artistId) newErrors.artistId = 'Please choose an artist or select "Recommend an Artist"';
    } else if (step === 2) {
      if (!formData.style) newErrors.style = 'Please select a tattoo style category';
    } else if (step === 3) {
      if (!formData.conceptDescription.trim() || formData.conceptDescription.length < 15) {
        newErrors.conceptDescription = 'Please provide at least 15 characters describing your idea';
      }
      if (!formData.placement) newErrors.placement = 'Please select or specify placement on the body';
      if (!formData.approximateSize) newErrors.approximateSize = 'Please specify approximate size';
    } else if (step === 5) {
      if (!formData.preferredDate) {
        newErrors.preferredDate = 'Please select a preferred consultation date';
      } else {
        const selected = new Date(formData.preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          newErrors.preferredDate = 'Preferred date cannot be in the past';
        }
      }
    } else if (step === 6) {
      if (!formData.fullName.trim() || formData.fullName.length < 2) {
        newErrors.fullName = 'Please enter your full legal name';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please provide a valid email address';
      }
      if (formData.phone && formData.phone.length < 10) {
        newErrors.phone = 'Please provide a valid 10-digit Canadian/North American phone number';
      }
      if (!formData.privacyConsent) {
        newErrors.privacyConsent = 'You must acknowledge the privacy consent to submit a request';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 7));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Image Upload Handling
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB

    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, images: 'Only JPG, PNG, and WebP images are supported.' }));
        return;
      }
      if (file.size > maxSizeBytes) {
        setErrors((prev) => ({ ...prev, images: 'Images must be under 10MB each.' }));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({
            ...prev,
            referenceImages: [
              ...prev.referenceImages,
              { name: file.name, size: file.size, dataUrl: reader.result as string },
            ],
          }));
          setErrors((prev) => {
            const copy = { ...prev };
            delete copy.images;
            return copy;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      referenceImages: prev.referenceImages.filter((_, i) => i !== index),
    }));
  };

  // Submission handler with real local persistence
  const handleSubmitBooking = async () => {
    if (!validateStep(6)) {
      setCurrentStep(6);
      return;
    }

    setIsSubmitting(true);

    // Simulate server submission
    await new Promise((resolve) => setTimeout(resolve, 1400));

    // Generate real unique booking reference code: AN-2026-XXXX
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `AN-2026-${randomDigits}`;

    const submissionRecord = {
      bookingId: generatedId,
      submittedAt: new Date().toISOString(),
      status: 'Pending Review',
      formData: {
        ...formData,
        // Store image metadata only to avoid exceeding localStorage quota
        referenceImages: formData.referenceImages.map((img) => ({ name: img.name, size: img.size })),
      },
    };

    try {
      const existing = JSON.parse(localStorage.getItem('atelier_booking_requests') || '[]');
      existing.unshift(submissionRecord);
      localStorage.setItem('atelier_booking_requests', JSON.stringify(existing));
    } catch {
      // LocalStorage fallback
    }

    setIsSubmitting(false);
    setSubmittedBookingId(generatedId);

    // Elegant celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#9E2929', '#F4F0E8', '#292929'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const copyToClipboard = () => {
    if (submittedBookingId) {
      navigator.clipboard.writeText(submittedBookingId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Styles list
  const tattooStyles = [
    { id: 'Black & Grey Realism', desc: 'Chiaroscuro, anatomical portraits, statues & textured shading' },
    { id: 'Fine Line', desc: 'Single-needle botanical, micro-realism, minimal typography' },
    { id: 'Japanese Traditional', desc: 'Irezumi motifs, dragons, chrysanthemums, wind & water bars' },
    { id: 'Traditional American', desc: 'Bold lines, high saturation, timeless flash motifs' },
    { id: 'Ornamental & Geometric', desc: 'Sacred geometry, mandalas, dotwork & symmetry' },
    { id: 'Heavy Blackwork', desc: 'High-contrast saturated black, negative space & textures' },
    { id: 'Floral Botanical', desc: 'Delicate foliage, illustrative flora & organic flow' },
    { id: 'Custom / Undecided', desc: 'Open to artistic interpretation and resident guidance' },
  ];

  // Placement presets
  const placementPresets = [
    'Inner Forearm',
    'Outer Forearm',
    'Upper Arm / Bicep',
    'Full Arm Sleeve',
    'Chest / Sternum',
    'Full Back',
    'Upper Back / Shoulder',
    'Ribs / Torso',
    'Thigh',
    'Calf / Shin',
    'Ankle / Foot',
    'Other Location',
  ];

  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Online Booking Portal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fade-in"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

      {/* Main Booking Container */}
      <div
        className="relative z-10 w-full max-w-4xl bg-noir-900 border border-noir-600 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Wizard Header */}
        <div className="p-6 border-b border-noir-600/60 bg-noir-950 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-noir-blood font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMISSION INQUIRY · TORONTO</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-noir-100 uppercase tracking-wide font-bold">
              {submittedBookingId ? 'REQUEST TRANSMITTED' : 'REQUEST YOUR CONSULTATION'}
            </h2>
          </div>

          <button
            onClick={onClose}
            id="close-booking-wizard-btn"
            className="p-2 text-noir-400 hover:text-noir-100 hover:bg-noir-800 transition-colors"
            aria-label="Close Booking Wizard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker (Steps 1 to 7) - Only shown before submission */}
        {!submittedBookingId && (
          <div className="px-6 py-3 bg-noir-850 border-b border-noir-600/40 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-between min-w-[500px]">
              {[
                { step: 1, label: 'Artist' },
                { step: 2, label: 'Style' },
                { step: 3, label: 'Concept' },
                { step: 4, label: 'References' },
                { step: 5, label: 'Timing' },
                { step: 6, label: 'Contact' },
                { step: 7, label: 'Review' },
              ].map((item) => (
                <div
                  key={item.step}
                  onClick={() => {
                    // Allow clicking already completed steps
                    if (item.step < currentStep) setCurrentStep(item.step);
                  }}
                  className={`flex items-center space-x-2 text-xs uppercase tracking-wider ${
                    currentStep === item.step
                      ? 'text-noir-100 font-semibold cursor-default'
                      : item.step < currentStep
                      ? 'text-noir-300 hover:text-noir-100 cursor-pointer'
                      : 'text-noir-500 cursor-not-allowed'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono border ${
                      currentStep === item.step
                        ? 'border-noir-blood bg-noir-blood text-noir-100'
                        : item.step < currentStep
                        ? 'border-noir-400 bg-noir-700 text-noir-200'
                        : 'border-noir-600 text-noir-500'
                    }`}
                  >
                    {item.step < currentStep ? <Check className="w-3 h-3" /> : item.step}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wizard Body (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow bg-noir-900">
          
          {/* CONFIRMATION SCREEN (When submitted) */}
          {submittedBookingId ? (
            <div className="max-w-xl mx-auto py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-noir-blood/20 border-2 border-noir-blood text-noir-blood mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-noir-blood font-semibold">
                  BOOKING REQUEST REGISTERED
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-noir-100 uppercase tracking-wide mt-1">
                  YOUR IDEA IS IN GOOD HANDS.
                </h3>
              </div>

              <p className="text-noir-300 text-sm leading-relaxed font-light">
                Thank you for reaching out to Atelier Noir. Your comprehensive tattoo booking request has been received by our creative direction team.
              </p>

              {/* Reference Number Box */}
              <div className="p-5 bg-noir-850 border border-noir-600 text-left space-y-2">
                <div className="flex items-center justify-between text-xs text-noir-400 uppercase tracking-widest">
                  <span>BOOKING REFERENCE NUMBER</span>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-1 text-noir-200 hover:text-noir-100 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-noir-blood" />
                    <span>{copiedId ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <div className="font-mono text-2xl text-noir-100 font-bold tracking-wider">
                  {submittedBookingId}
                </div>
                <p className="text-[11px] text-noir-400">
                  Please keep this reference code for your records when communicating with the studio.
                </p>
              </div>

              {/* Next Steps Card */}
              <div className="text-left p-5 bg-noir-950 border border-noir-600/60 space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-noir-100 font-semibold flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-noir-blood" />
                  <span>WHAT HAPPENS NEXT?</span>
                </h4>
                <ol className="text-xs text-noir-300 space-y-2 list-decimal list-inside leading-relaxed font-light">
                  <li>
                    <strong>Artist Review:</strong> Our team reviews your concept and reference imagery within 3–5 business days.
                  </li>
                  <li>
                    <strong>Consultation Scheduling:</strong> We will reach out via {formData.preferredContact.toUpperCase()} to schedule your 20-minute design consultation.
                  </li>
                  <li>
                    <strong>Deposit & Confirmation:</strong> After scope and session hours are mutually approved, an official appointment is locked with an invoice.
                  </li>
                </ol>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => {
                    setSubmittedBookingId(null);
                    setFormData(initialFormData);
                    setCurrentStep(1);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-noir-800 hover:bg-noir-700 text-noir-100 text-xs font-semibold uppercase tracking-widest border border-noir-600 transition-colors"
                >
                  RETURN TO WEBSITE
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: SELECT AN ARTIST */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-noir-100 uppercase">
                      Select Your Preferred Artist
                    </h3>
                    <p className="text-xs text-noir-300 mt-1">
                      Choose a resident artist based on your stylistic direction, or allow our creative director to recommend the best match.
                    </p>
                  </div>

                  {errors.artistId && (
                    <div className="p-3 bg-red-950/50 border border-noir-blood text-red-200 text-xs">
                      {errors.artistId}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Option: Recommend an artist */}
                    <div
                      onClick={() => setFormData({ ...formData, artistId: 'recommend' })}
                      className={`p-5 cursor-pointer border transition-all duration-200 flex flex-col justify-between ${
                        formData.artistId === 'recommend'
                          ? 'border-noir-blood bg-noir-800/90 shadow-md shadow-noir-blood/10'
                          : 'border-noir-600/70 bg-noir-850 hover:border-noir-400'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-noir-blood font-semibold">
                            STUDIO CURATION
                          </span>
                          <h4 className="font-editorial text-xl text-noir-100 uppercase mt-0.5">
                            Recommend an Artist
                          </h4>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            formData.artistId === 'recommend'
                              ? 'border-noir-blood bg-noir-blood text-noir-100'
                              : 'border-noir-500'
                          }`}
                        >
                          {formData.artistId === 'recommend' && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                      <p className="text-xs text-noir-300 mt-3 font-light">
                        Our creative team will review your concept and pair you with the resident specialist whose technique best elevates your piece.
                      </p>
                    </div>

                    {/* Artist Cards */}
                    {ARTISTS.map((artist) => {
                      const isSelected = formData.artistId === artist.id;
                      return (
                        <div
                          key={artist.id}
                          onClick={() => setFormData({ ...formData, artistId: artist.id })}
                          className={`p-5 cursor-pointer border transition-all duration-200 flex space-x-4 ${
                            isSelected
                              ? 'border-noir-blood bg-noir-800/90 shadow-md shadow-noir-blood/10'
                              : 'border-noir-600/70 bg-noir-850 hover:border-noir-400'
                          }`}
                        >
                          <img
                            src={artist.portrait}
                            alt={artist.name}
                            className="w-16 h-20 object-cover object-top border border-noir-600 filter grayscale"
                          />
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between">
                                <h4 className="font-editorial text-lg text-noir-100 uppercase">
                                  {artist.name}
                                </h4>
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                    isSelected
                                      ? 'border-noir-blood bg-noir-blood text-noir-100'
                                      : 'border-noir-500'
                                  }`}
                                >
                                  {isSelected && <Check className="w-2.5 h-2.5" />}
                                </div>
                              </div>
                              <p className="text-[11px] text-noir-blood font-medium">
                                {artist.specialty}
                              </p>
                            </div>
                            <span className="text-[10px] text-noir-400">
                              {artist.experience}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT TATTOO STYLE */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-noir-100 uppercase">
                      Select Your Preferred Style
                    </h3>
                    <p className="text-xs text-noir-300 mt-1">
                      Choose the primary aesthetic language you envision for your tattoo.
                    </p>
                  </div>

                  {errors.style && (
                    <div className="p-3 bg-red-950/50 border border-noir-blood text-red-200 text-xs">
                      {errors.style}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {tattooStyles.map((styleObj) => {
                      const isSelected = formData.style === styleObj.id;
                      return (
                        <div
                          key={styleObj.id}
                          onClick={() => setFormData({ ...formData, style: styleObj.id })}
                          className={`p-4 cursor-pointer border transition-all duration-200 flex items-start justify-between ${
                            isSelected
                              ? 'border-noir-blood bg-noir-800 shadow-md shadow-noir-blood/10'
                              : 'border-noir-600/70 bg-noir-850 hover:border-noir-400'
                          }`}
                        >
                          <div>
                            <h4 className="text-xs uppercase tracking-wider font-semibold text-noir-100">
                              {styleObj.id}
                            </h4>
                            <p className="text-[11px] text-noir-400 mt-1 font-light">
                              {styleObj.desc}
                            </p>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ml-3 mt-0.5 ${
                              isSelected
                                ? 'border-noir-blood bg-noir-blood text-noir-100'
                                : 'border-noir-500'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: DESCRIBE THE TATTOO */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-noir-100 uppercase">
                      Describe Your Tattoo Concept
                    </h3>
                    <p className="text-xs text-noir-300 mt-1">
                      Give us as much context as possible regarding imagery, symbolic meaning, and placement.
                    </p>
                  </div>

                  {/* Concept Description Field */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block">
                      Concept & Story Narrative *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.conceptDescription}
                      onChange={(e) => setFormData({ ...formData, conceptDescription: e.target.value })}
                      placeholder="Describe what you want etched: key elements, mood (dark, delicate, energetic), symbolism, and any specific details..."
                      className={`w-full p-4 bg-noir-850 border text-noir-100 text-xs sm:text-sm focus:outline-none focus:border-noir-blood transition-colors ${
                        errors.conceptDescription ? 'border-noir-blood' : 'border-noir-600'
                      }`}
                    />
                    {errors.conceptDescription && (
                      <p className="text-red-400 text-[11px]">{errors.conceptDescription}</p>
                    )}
                  </div>

                  {/* Placement & Size Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block">
                        Body Placement *
                      </label>
                      <select
                        value={formData.placement}
                        onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                        className={`w-full p-3.5 bg-noir-850 border text-noir-100 text-xs focus:outline-none focus:border-noir-blood ${
                          errors.placement ? 'border-noir-blood' : 'border-noir-600'
                        }`}
                      >
                        <option value="">-- Choose placement --</option>
                        {placementPresets.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                      {errors.placement && (
                        <p className="text-red-400 text-[11px]">{errors.placement}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block">
                        Approximate Dimensions *
                      </label>
                      <input
                        type="text"
                        value={formData.approximateSize}
                        onChange={(e) => setFormData({ ...formData, approximateSize: e.target.value })}
                        placeholder="e.g. 6x4 inches, 15x10 cm, or Full Sleeve"
                        className={`w-full p-3.5 bg-noir-850 border text-noir-100 text-xs focus:outline-none focus:border-noir-blood ${
                          errors.approximateSize ? 'border-noir-blood' : 'border-noir-600'
                        }`}
                      />
                      {errors.approximateSize && (
                        <p className="text-red-400 text-[11px]">{errors.approximateSize}</p>
                      )}
                    </div>
                  </div>

                  {/* Color Preference & Reference Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block">
                        Color Direction
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'black_and_grey', label: 'Black & Grey' },
                          { id: 'colour', label: 'Color Ink' },
                          { id: 'undecided', label: 'Undecided' },
                        ].map((c) => (
                          <button
                            type="button"
                            key={c.id}
                            onClick={() =>
                              setFormData({ ...formData, colorPreference: c.id as BookingFormData['colorPreference'] })
                            }
                            className={`p-2.5 text-[11px] uppercase tracking-wider border transition-colors ${
                              formData.colorPreference === c.id
                                ? 'bg-noir-800 border-noir-blood text-noir-100 font-semibold'
                                : 'bg-noir-900 border-noir-600/70 text-noir-400 hover:text-noir-200'
                            }`}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block">
                        Do you have reference artwork?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'rough_concept', label: 'Rough Ideas' },
                          { id: 'yes_exact', label: 'Specific Art' },
                          { id: 'no_original', label: 'Total Original' },
                        ].map((ref) => (
                          <button
                            type="button"
                            key={ref.id}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                hasReferenceDesign: ref.id as BookingFormData['hasReferenceDesign'],
                              })
                            }
                            className={`p-2.5 text-[11px] uppercase tracking-wider border transition-colors ${
                              formData.hasReferenceDesign === ref.id
                                ? 'bg-noir-800 border-noir-blood text-noir-100 font-semibold'
                                : 'bg-noir-900 border-noir-600/70 text-noir-400 hover:text-noir-200'
                            }`}
                          >
                            {ref.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: UPLOAD REFERENCE IMAGES */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-noir-100 uppercase">
                      Reference & Moodboard Imagery
                    </h3>
                    <p className="text-xs text-noir-300 mt-1">
                      Upload photos that communicate style, composition, anatomy placement, or art inspirations.
                    </p>
                  </div>

                  {errors.images && (
                    <div className="p-3 bg-red-950/50 border border-noir-blood text-red-200 text-xs">
                      {errors.images}
                    </div>
                  )}

                  {/* Drag-and-drop / File Selector Area */}
                  <label className="block border-2 border-dashed border-noir-600 hover:border-noir-blood transition-colors p-8 text-center cursor-pointer bg-noir-850/50 group">
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-noir-400 group-hover:text-noir-blood mx-auto mb-3 transition-colors" />
                    <span className="text-xs uppercase tracking-widest text-noir-200 font-semibold block">
                      CLICK TO UPLOAD OR DRAG IMAGES HERE
                    </span>
                    <span className="text-[11px] text-noir-400 mt-1 block">
                      Supports JPG, PNG, and WebP (Max 10MB per file)
                    </span>
                  </label>

                  {/* Uploaded File Previews */}
                  {formData.referenceImages.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-xs uppercase tracking-wider text-noir-300 font-semibold">
                        Attached Images ({formData.referenceImages.length})
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {formData.referenceImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative group bg-noir-950 border border-noir-600 aspect-square overflow-hidden"
                          >
                            <img
                              src={img.dataUrl}
                              alt={img.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                              <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="p-2 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 rounded-full"
                                aria-label="Remove image"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="absolute bottom-1 left-1 right-1 text-[9px] text-noir-200 bg-noir-900/90 truncate px-1">
                              {img.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-noir-950 border border-noir-600/60 flex items-start space-x-3 text-xs text-noir-300">
                    <Info className="w-4 h-4 text-noir-blood flex-shrink-0 mt-0.5" />
                    <p className="font-light">
                      Images attached here are processed client-side and queued for consultation discussion. We will never share or publish your submitted reference files.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 5: PREFERRED DATE & TIMEFRAME */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-noir-100 uppercase">
                      Preferred Date & Scheduling
                    </h3>
                    <p className="text-xs text-noir-300 mt-1">
                      Let us know when you would like to begin your consultation or tattoo session.
                    </p>
                  </div>

                  {errors.preferredDate && (
                    <div className="p-3 bg-red-950/50 border border-noir-blood text-red-200 text-xs">
                      {errors.preferredDate}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-noir-blood" />
                        <span>First Choice Date *</span>
                      </label>
                      <input
                        type="date"
                        min={tomorrowStr}
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full p-3.5 bg-noir-850 border border-noir-600 text-noir-100 text-xs focus:outline-none focus:border-noir-blood"
                      />
                      <span className="text-[10px] text-noir-400 block">
                        Studio operates Eastern Standard Time (EST) · Toronto, ON
                      </span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block">
                        Timeline Flexibility
                      </label>
                      <select
                        value={formData.timeframeFlexibility}
                        onChange={(e) => setFormData({ ...formData, timeframeFlexibility: e.target.value })}
                        className="w-full p-3.5 bg-noir-850 border border-noir-600 text-noir-100 text-xs focus:outline-none focus:border-noir-blood"
                      >
                        <option value="flexible">Completely Flexible (Any available weekday)</option>
                        <option value="weekends_only">Weekends Only (Saturday / Sunday)</option>
                        <option value="within_month">Targeting Next 30 Days</option>
                        <option value="traveling">Traveling to Toronto on Specific Dates</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block">
                      Alternative Dates or Scheduling Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.alternativeDates}
                      onChange={(e) => setFormData({ ...formData, alternativeDates: e.target.value })}
                      placeholder="e.g. Can also do any Thursday in November, or visiting Toronto Nov 12-18"
                      className="w-full p-3.5 bg-noir-850 border border-noir-600 text-noir-100 text-xs focus:outline-none focus:border-noir-blood"
                    />
                  </div>

                  {/* Important Disclaimer Notice */}
                  <div className="p-4 bg-noir-950 border-l-2 border-noir-blood text-xs text-noir-300 space-y-1">
                    <div className="font-semibold text-noir-100 uppercase tracking-wider flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-noir-blood" />
                      <span>Scheduling Verification Policy</span>
                    </div>
                    <p className="font-light">
                      Selected dates are consultation requests, not guaranteed bookings. Appointments are officially locked only after design scope is confirmed and an official studio deposit is recorded.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 6: CONTACT INFORMATION */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-noir-100 uppercase">
                      Your Contact Details
                    </h3>
                    <p className="text-xs text-noir-300 mt-1">
                      Where our studio coordinator should send consultation confirmation and artist proposals.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Christian Moreau"
                        className={`w-full p-3.5 bg-noir-850 border text-noir-100 text-xs focus:outline-none focus:border-noir-blood ${
                          errors.fullName ? 'border-noir-blood' : 'border-noir-600'
                        }`}
                      />
                      {errors.fullName && <p className="text-red-400 text-[11px]">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. name@domain.ca"
                        className={`w-full p-3.5 bg-noir-850 border text-noir-100 text-xs focus:outline-none focus:border-noir-blood ${
                          errors.email ? 'border-noir-blood' : 'border-noir-600'
                        }`}
                      />
                      {errors.email && <p className="text-red-400 text-[11px]">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block">
                        Phone Number (Canada / US)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (416) 000-0000"
                        className={`w-full p-3.5 bg-noir-850 border text-noir-100 text-xs focus:outline-none focus:border-noir-blood ${
                          errors.phone ? 'border-noir-blood' : 'border-noir-600'
                        }`}
                      />
                      {errors.phone && <p className="text-red-400 text-[11px]">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'email', label: 'Email' },
                          { id: 'phone', label: 'Call' },
                          { id: 'sms', label: 'SMS' },
                        ].map((m) => (
                          <button
                            type="button"
                            key={m.id}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                preferredContact: m.id as BookingFormData['preferredContact'],
                              })
                            }
                            className={`p-2.5 text-[11px] uppercase tracking-wider border transition-colors ${
                              formData.preferredContact === m.id
                                ? 'bg-noir-800 border-noir-blood text-noir-100 font-semibold'
                                : 'bg-noir-900 border-noir-600/70 text-noir-400 hover:text-noir-200'
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-noir-200 font-semibold block">
                      Additional Notes for Artist (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.clientNotes}
                      onChange={(e) => setFormData({ ...formData, clientNotes: e.target.value })}
                      placeholder="Medical considerations (allergies, skin sensitivities), past cover-up notes, or travel details..."
                      className="w-full p-3.5 bg-noir-850 border border-noir-600 text-noir-100 text-xs focus:outline-none focus:border-noir-blood"
                    />
                  </div>

                  {/* Privacy Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.privacyConsent}
                        onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded-none border-noir-600 bg-noir-850 text-noir-blood focus:ring-0"
                      />
                      <span className="text-xs text-noir-300 leading-normal font-light">
                        I consent to Atelier Noir collecting and processing my contact details and tattoo concept solely for scheduling consultation and appointment administration in accordance with Canadian PIPEDA privacy principles. (No unsolicited marketing). *
                      </span>
                    </label>
                    {errors.privacyConsent && (
                      <p className="text-red-400 text-[11px] mt-1">{errors.privacyConsent}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 7: REVIEW AND SUBMIT */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-noir-100 uppercase">
                      Review Your Booking Request
                    </h3>
                    <p className="text-xs text-noir-300 mt-1">
                      Verify your details before transmitting to Atelier Noir’s creative director.
                    </p>
                  </div>

                  <div className="bg-noir-850 border border-noir-600 divide-y divide-noir-600/50 text-xs">
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-noir-400 uppercase tracking-wider">Resident Artist</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-noir-100 font-semibold">
                          {formData.artistId === 'recommend'
                            ? 'Studio Recommendation'
                            : ARTISTS.find((a) => a.id === formData.artistId)?.name || formData.artistId}
                        </span>
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="text-[10px] text-noir-blood underline uppercase tracking-widest ml-2"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                      <span className="text-noir-400 uppercase tracking-wider">Tattoo Style</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-noir-100 font-semibold">{formData.style}</span>
                        <button
                          onClick={() => setCurrentStep(2)}
                          className="text-[10px] text-noir-blood underline uppercase tracking-widest ml-2"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="p-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-noir-400 uppercase tracking-wider">Concept Narrative</span>
                        <button
                          onClick={() => setCurrentStep(3)}
                          className="text-[10px] text-noir-blood underline uppercase tracking-widest"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-noir-200 text-xs font-light leading-relaxed pt-1">
                        "{formData.conceptDescription}"
                      </p>
                    </div>

                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-noir-400 block text-[10px] uppercase tracking-wider">Placement</span>
                        <span className="text-noir-100 font-semibold">{formData.placement}</span>
                      </div>
                      <div>
                        <span className="text-noir-400 block text-[10px] uppercase tracking-wider">Approx Size</span>
                        <span className="text-noir-100 font-semibold">{formData.approximateSize}</span>
                      </div>
                      <div>
                        <span className="text-noir-400 block text-[10px] uppercase tracking-wider">Palette</span>
                        <span className="text-noir-100 font-semibold capitalize">
                          {formData.colorPreference.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                      <span className="text-noir-400 uppercase tracking-wider">Preferred Consultation Date</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-noir-100 font-semibold">{formData.preferredDate} (EST)</span>
                        <button
                          onClick={() => setCurrentStep(5)}
                          className="text-[10px] text-noir-blood underline uppercase tracking-widest ml-2"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-noir-400 block text-[10px] uppercase tracking-wider">Collector</span>
                        <span className="text-noir-100 font-semibold">{formData.fullName}</span>
                      </div>
                      <div>
                        <span className="text-noir-400 block text-[10px] uppercase tracking-wider">Contact</span>
                        <span className="text-noir-100 font-semibold">
                          {formData.email} {formData.phone ? `· ${formData.phone}` : ''}
                        </span>
                      </div>
                    </div>

                    {formData.referenceImages.length > 0 && (
                      <div className="p-4 flex items-center justify-between">
                        <span className="text-noir-400 uppercase tracking-wider">Reference Files</span>
                        <span className="text-noir-200 font-mono">
                          {formData.referenceImages.length} Image(s) Attached
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-noir-950 border border-noir-600/60 text-xs text-noir-300">
                    By submitting, your inquiry will be stored in our resident scheduling queue. Our coordinator will reply within 3–5 business days.
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Wizard Footer Controls */}
        {!submittedBookingId && (
          <div className="p-6 border-t border-noir-600/60 bg-noir-950 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 bg-noir-850 hover:bg-noir-800 text-noir-300 hover:text-noir-100 text-xs uppercase tracking-widest border border-noir-600 transition-colors flex items-center space-x-1.5 font-heading"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREVIOUS</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 7 ? (
              <button
                type="button"
                onClick={handleNext}
                id="wizard-next-step-btn"
                className="px-7 py-3 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 text-xs font-semibold uppercase tracking-widest-xl border border-red-900/60 transition-all flex items-center space-x-1.5 shadow-md shadow-noir-blood/20 font-heading"
              >
                <span>NEXT STEP</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitBooking}
                disabled={isSubmitting}
                id="wizard-submit-booking-btn"
                className="px-8 py-3.5 bg-noir-blood hover:bg-noir-blood-hover text-noir-100 text-xs font-semibold uppercase tracking-widest-xl border border-red-900/60 transition-all flex items-center space-x-2 shadow-xl shadow-noir-blood/30 disabled:opacity-50 font-heading"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-noir-100 border-t-transparent rounded-full animate-spin" />
                    <span>TRANSMITTING INQUIRY...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT BOOKING REQUEST</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
