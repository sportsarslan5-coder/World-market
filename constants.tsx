
import { Product, Customer } from './types';

export const ADMIN_WHATSAPP = "923187536795"; 

export const CATEGORIES = [
  "Basketball", "Soccer", "Football", "Baseball", "Gym Wear", "TrackSuits", "Hoodies"
];

const CLOUDINARY_IMAGES = [
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048123/FD-163_FD-5060_u9c4nk.png",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048123/FD-BASE-VN2-3444-nLxSniE19uaW_alt_3_x1e3hs.png",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048122/iw4bvdxfzz7ak15hcgrm_cqn51z.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048125/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dhbWVjb2Nrc29ubGluZS1jb20vMjAyNi8wMS9hMDQ5ZmIxNS1ic2JfMDEyM19wcmFjdGljZV9kYXZpc18yNl81OS5qcGc_iy4soz.png",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054975/250px-Uniforme_local_ialcqx.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054977/2024_Major_League_Baseball_uniform_controversy__28cropped_29_vbgtfr.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054977/new-index-bat-bags-grid-fall-2025-3_igkuhe.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054977/Cam_Cannarella_JohnByrumGetty_efpobp.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770055149/2026_BASE_LeggettNo7Legacy_FRONT_rkrgpu.webp",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054613/2_811d056b-a34e-49ea-b42f-6595878871c4_800x_kj2kke.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054614/American-Football-700-9_vpggpv.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054612/16AMERICANFOOTBALLMODEL_swj02j.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056439/image.coreimg_szfvyx.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056399/Hawaii_AirForce_Web_Captians_f52wrm.webp",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056398/240917-american-sports-story-al-0928-5de7fc_xhcoqy.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056397/01_08_34_15_gla_103_rec709_g24_20_3840x2160_20240726_0098751-copy-4-copy_lksoe4.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056364/jerseys_j0kxki.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056366/american-football-player-uniform-training-field_23-2150034543_w6cmwh.jpg"
];

export const PRODUCTS: Product[] = CLOUDINARY_IMAGES.map((img, idx) => {
  const isBasketball = idx < 5; // First few as primary basketball
  return {
    id: `apex-post-${idx}`,
    name: isBasketball ? `Elite Basketball Uniform V${idx + 1}` : `Pro Sportswear Series #${idx + 100}`,
    category: isBasketball ? "Basketball" : CATEGORIES[idx % CATEGORIES.length],
    price: 35.00, // Updated price to 35$ as requested
    rating: (4.5 + Math.random() * 0.5).toFixed(1),
    stock: 500,
    description: `High-performance professional uniform manufactured by Apex. Durable fabric, moisture-wicking technology, and custom export quality.`,
    image: img,
    datePosted: new Date().toISOString()
  };
});

export const MOCK_SALES = Array.from({ length: 12 }).map((_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  sales: 4000 + Math.floor(Math.random() * 8000),
  customers: 120 + Math.floor(Math.random() * 300)
}));

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'John Doe', email: 'john@example.com', orderCount: 5, totalSpent: 1250, location: 'New York, USA', lastOrderDate: '2024-12-01' },
  { id: 'c2', name: 'Sarah Smith', email: 'sarah.s@sports.co', orderCount: 12, totalSpent: 4300, location: 'London, UK', lastOrderDate: '2025-01-15' },
  { id: 'c3', name: 'Mike Johnson', email: 'mike@club.org', orderCount: 2, totalSpent: 450, location: 'Berlin, DE', lastOrderDate: '2024-11-20' },
  { id: 'c4', name: 'Elite Academy', email: 'procurement@elite.edu', orderCount: 45, totalSpent: 28900, location: 'Dubai, UAE', lastOrderDate: '2025-02-10' },
];
