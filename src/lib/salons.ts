export type Salon = {
  id: string;
  name: string;
  area: string;
  tagline: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  tags: string[];
  image: string;
  signature: string;
  stylists: { name: string; role: string; years: number }[];
  services: { name: string; price: number; duration: string }[];
};

export const salons: Salon[] = [
  {
    id: "maison-aura-bandra",
    name: "Maison Aura",
    area: "Bandra West",
    tagline: "Parisian-trained colorists. Mumbai at heart.",
    rating: 4.9,
    reviews: 1284,
    priceFrom: 4500,
    tags: ["Balayage", "Keratin", "Bridal"],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
    signature: "Signature Aura Glow Balayage",
    stylists: [
      { name: "Aanya Mehra", role: "Master Colorist", years: 12 },
      { name: "Rohan Sethi", role: "Creative Director", years: 15 },
    ],
    services: [
      { name: "Aura Glow Balayage", price: 9800, duration: "3h" },
      { name: "Keratin Couture", price: 12500, duration: "4h" },
      { name: "Bridal Trial", price: 18000, duration: "2h" },
    ],
  },
  {
    id: "the-gilded-room-worli",
    name: "The Gilded Room",
    area: "Worli",
    tagline: "A members-only atelier overlooking the Sea Link.",
    rating: 4.95,
    reviews: 642,
    priceFrom: 7800,
    tags: ["Members Only", "Couture", "Spa"],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80",
    signature: "Gold Leaf Hair Ritual",
    stylists: [
      { name: "Isabel D'Souza", role: "Atelier Director", years: 18 },
      { name: "Kunal Rao", role: "Senior Stylist", years: 9 },
    ],
    services: [
      { name: "Gold Leaf Ritual", price: 22000, duration: "2.5h" },
      { name: "Couture Cut", price: 8500, duration: "1.5h" },
      { name: "24k Facial", price: 14500, duration: "1.5h" },
    ],
  },
  {
    id: "noir-juhu",
    name: "NOIR",
    area: "Juhu",
    tagline: "Editorial cuts, runway color, Bollywood DNA.",
    rating: 4.88,
    reviews: 2103,
    priceFrom: 3800,
    tags: ["Editorial", "Color", "Celebrity"],
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1200&q=80",
    signature: "Runway Color Story",
    stylists: [
      { name: "Maya Kapoor", role: "Editorial Lead", years: 11 },
      { name: "Vivaan Shah", role: "Color Artist", years: 7 },
    ],
    services: [
      { name: "Runway Color Story", price: 13500, duration: "3.5h" },
      { name: "Precision Cut", price: 4200, duration: "1h" },
      { name: "Hollywood Waves", price: 3800, duration: "1h" },
    ],
  },
  {
    id: "kaya-atelier-lower-parel",
    name: "Kaya Atelier",
    area: "Lower Parel",
    tagline: "Clinical luxury skin, powered by AI diagnostics.",
    rating: 4.92,
    reviews: 1567,
    priceFrom: 5200,
    tags: ["Skin", "AI Diagnostics", "Med-Spa"],
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    signature: "AI Skin Map & Glow Protocol",
    stylists: [
      { name: "Dr. Naina Iyer", role: "Dermal Specialist", years: 14 },
      { name: "Tara Bhatt", role: "Facialist", years: 6 },
    ],
    services: [
      { name: "AI Skin Map", price: 5200, duration: "45m" },
      { name: "Glow Protocol", price: 9800, duration: "1.5h" },
      { name: "HydraLuxe Facial", price: 11500, duration: "1.25h" },
    ],
  },
  {
    id: "studio-saaya-powai",
    name: "Studio Saaya",
    area: "Powai",
    tagline: "Calm, curated, conscious beauty.",
    rating: 4.85,
    reviews: 894,
    priceFrom: 2900,
    tags: ["Clean Beauty", "Vegan", "Spa"],
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&q=80",
    signature: "Saaya Slow Beauty Ritual",
    stylists: [
      { name: "Priya Nair", role: "Holistic Therapist", years: 10 },
      { name: "Aarav Patel", role: "Stylist", years: 5 },
    ],
    services: [
      { name: "Slow Beauty Ritual", price: 6800, duration: "2h" },
      { name: "Botanical Color", price: 5400, duration: "2h" },
      { name: "Scalp Reset", price: 2900, duration: "45m" },
    ],
  },
  {
    id: "the-mews-colaba",
    name: "The Mews",
    area: "Colaba",
    tagline: "An Art Deco salon in a 1930s heritage bungalow.",
    rating: 4.9,
    reviews: 1102,
    priceFrom: 4200,
    tags: ["Heritage", "Bridal", "Makeup"],
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80",
    signature: "Mews Bridal Suite",
    stylists: [
      { name: "Zara Khan", role: "Bridal Artist", years: 13 },
      { name: "Devika Rao", role: "Makeup Director", years: 9 },
    ],
    services: [
      { name: "Bridal Suite Full Day", price: 48000, duration: "8h" },
      { name: "Sangeet Glam", price: 14500, duration: "2.5h" },
      { name: "Heritage Cut", price: 4200, duration: "1h" },
    ],
  },
];

export const getSalon = (id: string) => salons.find((s) => s.id === id);
