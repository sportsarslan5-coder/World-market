
import { Product } from './types';

export const CATEGORIES = [
  "Soccer", "Football", "Basketball", "Baseball", "Softball", 
  "Volleyball", "Hockey", "Cycling", "Rugby", "American Football",
  "Gym Wear", "Polo Shirts", "T-shirts", "TrackSuits", "Hoodies",
  "Fitness Wear", "Leggings", "Shorts", "Socks", "Caps"
];

// Generate 200 items (simulating a large inventory system)
export const PRODUCTS: Product[] = Array.from({ length: 200 }).map((_, idx) => {
  const category = CATEGORIES[idx % CATEGORIES.length];
  return {
    id: `apex-${idx}`,
    name: `${category} Elite V${(idx % 5) + 1}`,
    category: category,
    price: 29.99 + (idx % 50),
    rating: (4 + Math.random()).toFixed(1),
    stock: 15 + (idx % 100),
    description: `Professional-grade ${category.toLowerCase()} performance gear. Features Apex-Tech moisture management and reinforced durability for high-intensity play.`,
    image: `https://picsum.photos/seed/apex-${idx}/800/800`
  };
});

export const MOCK_SALES = Array.from({ length: 12 }).map((_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  sales: 4000 + Math.floor(Math.random() * 8000),
  customers: 120 + Math.floor(Math.random() * 300)
}));

export const MOCK_CUSTOMERS = [
  { id: 'c1', name: 'John Doe', email: 'john@example.com', orders: 5, totalSpent: 1250 },
  { id: 'c2', name: 'Sarah Smith', email: 'sarah.s@sports.co', orders: 12, totalSpent: 4300 },
  { id: 'c3', name: 'Mike Johnson', email: 'mike@club.org', orders: 2, totalSpent: 450 },
  { id: 'c4', name: 'Elite Academy', email: 'procurement@elite.edu', orders: 45, totalSpent: 28900 },
];
