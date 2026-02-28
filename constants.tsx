import { Product, Customer, Currency, Language, SellerInfo, BlogPost } from './types';

export const ADMIN_WHATSAPP = "923187536795"; 

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1, name: 'United States Dollar' },
  { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro' },
  { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', rate: 3.67, name: 'UAE Dirham' },
  { code: 'PKR', symbol: 'Rs', rate: 278, name: 'Pakistani Rupee' },
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', flag: '🇦🇪', dir: 'rtl' },
  { code: 'fr', name: 'French', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', dir: 'ltr' },
  { code: 'de', name: 'German', flag: '🇩🇪', dir: 'ltr' },
];

export const CATEGORIES = [
  "Clothing", "Shoes", "Sportswear", "Bags", "Outdoor", "Accessories", "Electronics Accessories"
];

export const SHIPPING_COUNTRIES = [
  "United States", "United Kingdom", "United Arab Emirates", "Pakistan", "Germany", "France", "Spain", "Canada", "Australia"
];

export const SELLERS: SellerInfo[] = [
  {
    id: 'seller-1',
    fullName: 'Global Sportswear Mfg',
    whatsapp: '923187536795',
    email: 'mfg@worldmarket.com',
    country: 'Pakistan',
    city: 'Sialkot',
    contactNumber: '+92 318 7536795',
    paymentDetails: 'Bank Transfer / JazzCash',
    showName: 'globalsports',
    rank: 'Gold',
    rating: 4.9,
    totalSales: 1250,
    responseTime: '< 1 hour',
    isVerified: true,
    joinedDate: '2023-01-15',
    balance: 4500.50
  },
  {
    id: 'seller-2',
    fullName: 'Elite Apparel Co.',
    whatsapp: '923001234567',
    email: 'elite@worldmarket.com',
    country: 'United Arab Emirates',
    city: 'Dubai',
    contactNumber: '+971 50 123 4567',
    paymentDetails: 'Bank Transfer / IBAN',
    showName: 'eliteapparel',
    rank: 'Silver',
    rating: 4.2,
    totalSales: 450,
    responseTime: '< 4 hours',
    isVerified: true,
    joinedDate: '2023-06-20',
    balance: 1200.00
  }
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
  const category = CATEGORIES[idx % CATEGORIES.length];
  return {
    id: `wm-post-${idx}`,
    name: `${category} Premium Item #${idx + 100}`,
    category: category,
    price: 35.00,
    rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)),
    stock: 500,
    description: `High-performance professional uniform manufactured by World Market. Durable fabric, moisture-wicking technology, and custom export quality. Designed for elite athletes who demand the best in comfort and performance.`,
    image: img,
    images: [img, ...CLOUDINARY_IMAGES.slice((idx + 1) % CLOUDINARY_IMAGES.length, (idx + 4) % CLOUDINARY_IMAGES.length)],
    datePosted: new Date().toISOString(),
    fabric: "100% Breathable Polyester Mesh",
    quality: idx % 3 === 0 ? 'Export Quality' : (idx % 3 === 1 ? 'Premium' : 'Standard'),
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Blue', 'Black', 'White', 'Navy'],
    shippingCountry: SHIPPING_COUNTRIES[idx % SHIPPING_COUNTRIES.length],
    sellerId: idx % 2 === 0 ? 'seller-1' : 'seller-2',
    sales: 10 + Math.floor(Math.random() * 100),
    reviews: [
      { id: 'r1', user: 'Mike T.', rating: 5, comment: 'Excellent quality, fits perfectly!', date: '2025-02-15' },
      { id: 'r2', user: 'Sarah K.', rating: 4, comment: 'Good material, but shipping took a bit longer.', date: '2025-02-10' },
      { id: 'r3', user: 'David L.', rating: 5, comment: 'Best uniform we have ever had for our team.', date: '2025-01-28' }
    ]
  };
});

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why Factory Direct Pricing is Changing the Game',
    slug: 'factory-direct-pricing-benefits',
    excerpt: 'Discover how buying directly from manufacturers saves you up to 70% on premium sportswear.',
    content: 'Buying directly from the source eliminates middlemen, reducing costs significantly while maintaining high quality...',
    category: 'Industry News',
    image: 'https://picsum.photos/seed/industry/800/400',
    date: '2025-02-20',
    author: 'World Market Team',
    tags: ['Factory Direct', 'Savings', 'Ecommerce']
  },
  {
    id: 'blog-2',
    title: 'Top 5 Trends in Global Sportswear for 2025',
    slug: 'sportswear-trends-2025',
    excerpt: 'From sustainable fabrics to smart integration, here is what is trending in the world of sports apparel.',
    content: 'The sportswear industry is evolving rapidly. Sustainability is no longer an option but a requirement...',
    category: 'Trends',
    image: 'https://picsum.photos/seed/trends/800/400',
    date: '2025-02-25',
    author: 'Design Team',
    tags: ['Trends', 'Sportswear', '2025']
  }
];

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
