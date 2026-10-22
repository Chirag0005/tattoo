export interface Artist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  bio: string;
  philosophy: string;
  portrait: string;
  featuredWork: string[];
  tags: string[];
  availableDays: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Black & Grey' | 'Fine Line' | 'Japanese' | 'Traditional' | 'Ornamental';
  style: string;
  artistId: string;
  artistName: string;
  imageUrl: string;
  description: string;
  placement: string;
  timeHours?: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  artistName: string;
  tattooType: string;
  quote: string;
  date: string;
}

export const STUDIO_INFO = {
  name: "ATELIER NOIR",
  tagline: "Your Story. Etched in Ink.",
  subtext: "Independent Tattoo Studio · Toronto, Canada",
  address: "742 Queen Street West",
  neighborhood: "West Queen West Fashion & Arts District",
  city: "Toronto",
  province: "Ontario",
  postalCode: "M6J 1E9",
  country: "Canada",
  phone: "+1 (416) 555-0188",
  phoneRaw: "+14165550188",
  email: "inquiries@ateliernoir-tattoo.ca",
  instagram: "@ateliernoir.to",
  instagramUrl: "https://instagram.com",
  hours: [
    { days: "Tuesday – Saturday", hours: "11:00 AM – 8:00 PM EST" },
    { days: "Sunday", hours: "12:00 PM – 6:00 PM EST" },
    { days: "Monday", hours: "Private Consultations Only" }
  ],
  googleMapsUrl: "https://maps.google.com/?q=742+Queen+Street+West+Toronto+ON+Canada"
};

export const ARTISTS: Artist[] = [
  {
    id: "alex-morgan",
    name: "Alex Morgan",
    role: "Resident Artist & Master Realist",
    specialty: "Black & Grey Realism & Dark Art",
    experience: "12+ Years Experience",
    bio: "Alex specializes in high-contrast black-and-grey realism, Renaissance-inspired drapery, anatomical studies, and emotive portraits. Drawing from classical oil painting training in Florence and over a decade of tattooing across Montreal and Toronto, Alex crafts pieces with enduring structural depth.",
    philosophy: "A tattoo is not just ink under the dermis; it is an organic sculpture that shifts with human muscle and time. Light and shadow must be treated with absolute reverence.",
    portrait: "/images/artist_alex_morgan.jpg",
    featuredWork: [
      "/images/chiaroscuro_sleeve_tattoo.jpg",
      "/images/skull_realism_tattoo.jpg"
    ],
    tags: ["Portraits", "Anatomical Realism", "Dark Surrealism", "Sculpture Studies"],
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  {
    id: "jordan-blake",
    name: "Jordan Blake",
    role: "Resident Artist & Precision Lineworker",
    specialty: "Fine Line, Micro-Realism & Botanical",
    experience: "8+ Years Experience",
    bio: "Recognized for razor-sharp single-needle technique and delicate botanical arrangements, Jordan merges delicate floral silhouettes with complex sacred geometry and minimalist script. Jordan creates intimate works with surgical precision.",
    philosophy: "Restraint is the highest form of mastery. In fine-line work, every single fraction of a millimeter carries intention, breath, and permanence.",
    portrait: "/images/artist_jordan_blake.jpg",
    featuredWork: [
      "/images/botanical_wildflower_tattoo.jpg",
      "/images/vertebral_spine_tattoo.jpg"
    ],
    tags: ["Single Needle", "Botanical", "Sacred Geometry", "Minimalist Script"],
    availableDays: ["Wednesday", "Thursday", "Friday", "Saturday"]
  },
  {
    id: "taylor-reed",
    name: "Taylor Reed",
    role: "Resident Artist & Tradition Specialist",
    specialty: "Japanese Traditional & Bold Linework",
    experience: "10+ Years Experience",
    bio: "Taylor apprenticed under Irezumi masters in Osaka and brings a modern Canadian perspective to traditional motifs. Taylor's large-scale dragons, koi, chrysanthemums, and dynamic folkloric scenes are designed to flow seamlessly with the contours of the body.",
    philosophy: "Traditional Japanese iconography is built on centuries of narrative and discipline. The composition must honor the anatomy, breathing as the client moves.",
    portrait: "/images/artist_taylor_reed.jpg",
    featuredWork: [
      "/images/japanese_wave_tattoo.jpg",
      "/images/dagger_rose_tattoo.jpg"
    ],
    tags: ["Irezumi", "Mythological", "Neo-Traditional", "Large Scale Sleeves"],
    availableDays: ["Tuesday", "Thursday", "Friday", "Saturday"]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-01",
    title: "Chiaroscuro Sleeves",
    category: "Black & Grey",
    style: "Black & Grey Realism",
    artistId: "alex-morgan",
    artistName: "Alex Morgan",
    imageUrl: "/images/chiaroscuro_sleeve_tattoo.jpg",
    description: "Multi-session full sleeve depicting baroque marble sculpture textures, deep contrast gradients, and anatomical shading directly on human arm skin.",
    placement: "Full Arm Sleeve",
    timeHours: 24
  },
  {
    id: "gal-02",
    title: "Botanical Wildflowers & Fern",
    category: "Fine Line",
    style: "Fine Line & Micro-Realism",
    artistId: "jordan-blake",
    artistName: "Jordan Blake",
    imageUrl: "/images/botanical_wildflower_tattoo.jpg",
    description: "Single-needle Canadian native botanical tattoo study on forearm with delicate stippling and micro-vascular leaf textures.",
    placement: "Inner Forearm",
    timeHours: 4
  },
  {
    id: "gal-03",
    title: "Sacred Mandala Geometry",
    category: "Ornamental",
    style: "Ornamental & Dotwork",
    artistId: "jordan-blake",
    artistName: "Jordan Blake",
    imageUrl: "/images/mandala_geometry_tattoo.jpg",
    description: "Symmetrical ornamental chest and sternum mandala tattoo composed with calculated golden ratio geometry and graduated dot density.",
    placement: "Chest & Sternum",
    timeHours: 8
  },
  {
    id: "gal-04",
    title: "Neo-Traditional Dagger & Rose",
    category: "Traditional",
    style: "Traditional & Bold Lines",
    artistId: "taylor-reed",
    artistName: "Taylor Reed",
    imageUrl: "/images/dagger_rose_tattoo.jpg",
    description: "Bold line weight tattoo with saturated blood red shading and antique steel finish on skin, celebrating classic American and Japanese tattoo heritage.",
    placement: "Outer Thigh",
    timeHours: 6
  },
  {
    id: "gal-05",
    title: "Renaissance Skull Realism",
    category: "Black & Grey",
    style: "Portrait & Skull Realism",
    artistId: "alex-morgan",
    artistName: "Alex Morgan",
    imageUrl: "/images/skull_realism_tattoo.jpg",
    description: "Detailed skin texture rendering and anatomical bone texture tattoo with velvety charcoal shading on forearm.",
    placement: "Upper Arm",
    timeHours: 12
  },
  {
    id: "gal-06",
    title: "Vertebral Minimalist Script",
    category: "Fine Line",
    style: "Fine Line Typography",
    artistId: "jordan-blake",
    artistName: "Jordan Blake",
    imageUrl: "/images/vertebral_spine_tattoo.jpg",
    description: "Subtle calligraphic custom phrase tattoo descending along the thoracic spine with needle tapering.",
    placement: "Full Spine",
    timeHours: 3
  },
  {
    id: "gal-07",
    title: "Folkloric Wave & Traditional Lines",
    category: "Japanese",
    style: "Japanese Traditional",
    artistId: "taylor-reed",
    artistName: "Taylor Reed",
    imageUrl: "/images/japanese_wave_tattoo.jpg",
    description: "Traditional wind bar composition with crashing tidal foam tattoo and rhythmic scale placement flowing around the shoulder cap.",
    placement: "Shoulder & Chest Plate",
    timeHours: 16
  },
  {
    id: "gal-08",
    title: "Textured Heavy Blackwork",
    category: "Ornamental",
    style: "Blackwork & Texture",
    artistId: "alex-morgan",
    artistName: "Alex Morgan",
    imageUrl: "/images/heavy_blackwork_tattoo.jpg",
    description: "Solid saturated negative space tattoo interplay with organic tribal hatching and heavy architectural blocking on skin.",
    placement: "Lower Leg & Calf",
    timeHours: 10
  },
  {
    id: "gal-09",
    title: "Large Scale Kinetic Back Piece",
    category: "Black & Grey",
    style: "Dynamic Black & Grey",
    artistId: "alex-morgan",
    artistName: "Alex Morgan",
    imageUrl: "/images/large_back_tattoo.jpg",
    description: "Anatomically mapped masterwork back tattoo utilizing the shoulder blades to create motion in the artwork as the client walks.",
    placement: "Full Back",
    timeHours: 32
  },
  {
    id: "gal-10",
    title: "Needle Precision Shading Detail",
    category: "Fine Line",
    style: "Process Shading & Fine Linework",
    artistId: "jordan-blake",
    artistName: "Jordan Blake",
    imageUrl: "/images/needle_shading_detail.jpg",
    description: "Close-up macro shot of single-needle machine tattoo technique laying down intricate gradients on tattooed skin.",
    placement: "Forearm",
    timeHours: 5
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    clientName: "Marcus Vance",
    location: "Toronto, Ontario",
    artistName: "Alex Morgan",
    tattooType: "Full Black & Grey Arm Sleeve",
    quote: "The level of artistry at Atelier Noir is beyond anything I have encountered in North America. Alex took my abstract story and transformed it into a cohesive, timeless Renaissance sleeve. The studio is pristine, peaceful, and profoundly professional.",
    date: "October 2026"
  },
  {
    id: "t-2",
    clientName: "Elena Rostova",
    location: "Montreal, Quebec",
    artistName: "Jordan Blake",
    tattooType: "Botanical Spine & Rib Piece",
    quote: "I traveled from Montreal specifically for Jordan's single-needle botanical work. The precision is astonishing—it looks like a delicate copperplate etching on my skin. Healing was flawless due to their meticulous aftercare protocol.",
    date: "September 2026"
  },
  {
    id: "t-3",
    clientName: "David Chen",
    location: "Vancouver, British Columbia",
    artistName: "Taylor Reed",
    tattooType: "Traditional Japanese Half-Sleeve",
    quote: "Taylor's understanding of Japanese Irezumi composition is legendary. The rhythm of the wind bars and water flow fits my shoulder naturally. Atelier Noir sets the gold standard for luxury tattoo culture.",
    date: "August 2026"
  },
  {
    id: "t-4",
    clientName: "Sarah Campbell",
    location: "Ottawa, Ontario",
    artistName: "Jordan Blake",
    tattooType: "Micro-Ornamental Sternum Piece",
    quote: "From the initial consultation to the final pass of white ink, the entire experience felt elevated and deeply respectful. No ego, zero pretension—just masters of their craft in a museum-worthy studio.",
    date: "July 2026"
  }
];

export const STUDIO_EXPERIENCE_IMAGES = [
  {
    url: "/images/artist_alex_morgan.jpg",
    title: "Sterile Tattoo Station & Art Studio",
    caption: "Professional rotary tattoo machines, medical barrier films, calibrated power supplies, and fine art references."
  },
  {
    url: "/images/needle_shading_detail.jpg",
    title: "Precision Rotary Hardware",
    caption: "Calibrated rotary tattoo machines equipped with single-use membrane cartridge needles and ergonomic grips."
  },
  {
    url: "/images/tattoo_session_live.jpg",
    title: "Artist Precision Inking",
    caption: "Every needle pass executed with surgical control on skin under shadow-free medical illumination."
  },
  {
    url: "/images/artist_jordan_blake.jpg",
    title: "Private Atelier Environment",
    caption: "An unhurried, private creative environment designed for long, immersive tattoo sessions."
  }
];
