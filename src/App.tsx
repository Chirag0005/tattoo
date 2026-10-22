import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StudioIntro } from './components/StudioIntro';
import { TattooGallery } from './components/TattooGallery';
import { ArtistSection } from './components/ArtistSection';
import { StudioExperience } from './components/StudioExperience';
import { BookingProcess } from './components/BookingProcess';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { SessionCalculator } from './components/SessionCalculator';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingWizard } from './components/BookingWizard';
import { LegalModals } from './components/LegalModals';
import { StickyMobileBookBar } from './components/StickyMobileBookBar';
import { AmbientGlow } from './components/AmbientGlow';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedArtistId, setPreselectedArtistId] = useState<string | undefined>(undefined);
  const [preselectedStyle, setPreselectedStyle] = useState<string | undefined>(undefined);
  const [preselectedPlacement, setPreselectedPlacement] = useState<string | undefined>(undefined);
  const [preselectedSize, setPreselectedSize] = useState<string | undefined>(undefined);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleOpenBooking = (artistId?: string, style?: string) => {
    setPreselectedArtistId(artistId);
    setPreselectedStyle(style);
    setPreselectedPlacement(undefined);
    setPreselectedSize(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithSpecs = (
    artistId: string,
    style: string,
    placement: string,
    size: string
  ) => {
    setPreselectedArtistId(artistId);
    setPreselectedStyle(style);
    setPreselectedPlacement(placement);
    setPreselectedSize(size);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedArtistId(undefined);
    setPreselectedStyle(undefined);
    setPreselectedPlacement(undefined);
    setPreselectedSize(undefined);
  };

  return (
    <div className="min-h-screen bg-noir-900 text-noir-100 flex flex-col selection:bg-noir-blood selection:text-noir-100 relative">
      {/* Interactive Cursor Spotlight Glow */}
      <AmbientGlow />

      {/* Top Header & Sticky Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Page Landmark */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Artistic Introduction Section */}
        <StudioIntro />

        {/* Signature Tattoo Gallery with Filtering & Lightbox */}
        <TattooGallery onOpenBooking={handleOpenBooking} />

        {/* Resident Artist Profiles with Preselected Booking Triggers */}
        <ArtistSection onOpenBooking={(artistId) => handleOpenBooking(artistId)} />

        {/* Studio Space & Clinical Precision */}
        <StudioExperience />

        {/* How The Booking Process Works */}
        <BookingProcess onOpenBooking={() => handleOpenBooking()} />

        {/* Interactive Before & After Stencil-to-Ink Reveal Slider */}
        <BeforeAfterSlider />

        {/* Interactive Project Scale & Timeline Calculator */}
        <SessionCalculator onOpenBookingWithSpecs={handleOpenBookingWithSpecs} />

        {/* Verified Collector Testimonials */}
        <Testimonials />

        {/* Studio Location, Hours & Direct Message Form */}
        <ContactSection onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Luxury Brand Footer */}
      <Footer
        onOpenBooking={(artistId) => handleOpenBooking(artistId)}
        onOpenLegal={(modal) => setActiveLegalModal(modal)}
      />

      {/* Mobile Sticky Booking Bar */}
      <StickyMobileBookBar onOpenBooking={() => handleOpenBooking()} />

      {/* Full 7-Step Interactive Booking Wizard */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedArtistId={preselectedArtistId}
        preselectedStyle={preselectedStyle}
        preselectedPlacement={preselectedPlacement}
        preselectedSize={preselectedSize}
      />

      {/* Legal & Privacy Policy Modal Dialogs */}
      <LegalModals
        activeModal={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />
    </div>
  );
}

export default App;
