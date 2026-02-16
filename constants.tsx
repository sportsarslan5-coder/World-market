
import { Product, Customer } from './types';

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
    image: `https://picsum.photos/seed/apex-${idx}/800/800`,
    // Fix: Added datePosted property required by the Product interface
    datePosted: new Date(Date.now() - Math.random() * 1000000000).toISOString()
  };
});

export const MOCK_SALES = Array.from({ length: 12 }).map((_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  sales: 4000 + Math.floor(Math.random() * 8000),
  customers: 120 + Math.floor(Math.random() * 300)
}));

// Fix: Updated MOCK_CUSTOMERS to include missing properties and corrected 'orders' to 'orderCount' to match the Customer interface
export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'John Doe', email: 'john@example.com', orderCount: 5, totalSpent: 1250, location: 'New York, USA', lastOrderDate: '2024-12-01' },
  { id: 'c2', name: 'Sarah Smith', email: 'sarah.s@sports.co', orderCount: 12, totalSpent: 4300, location: 'London, UK', lastOrderDate: '2025-01-15' },
  { id: 'c3', name: 'Mike Johnson', email: 'mike@club.org', orderCount: 2, totalSpent: 450, location: 'Berlin, DE', lastOrderDate: '2024-11-20' },
  { id: 'c4', name: 'Elite Academy', email: 'procurement@elite.edu', orderCount: 45, totalSpent: 28900, location: 'Dubai, UAE', lastOrderDate: '2025-02-10' },
];
