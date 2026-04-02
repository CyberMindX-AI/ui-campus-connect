export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  seller: string;
  sellerAvatar: string;
  rating: number;
  reviews: number;
  condition: 'New' | 'Like New' | 'Used';
  category: string;
  location: string;
  description: string;
  images: string[];
  negotiable: boolean;
  delivery: string[];
}

export const categories = [
  { name: 'Textbooks', icon: '📚', slug: 'textbooks', count: 234 },
  { name: 'Electronics', icon: '📱', slug: 'electronics', count: 189 },
  { name: 'Fashion', icon: '👕', slug: 'fashion', count: 312 },
  { name: 'Food & Drinks', icon: '🍔', slug: 'food', count: 156 },
  { name: 'Furniture', icon: '🪑', slug: 'furniture', count: 87 },
  { name: 'Digital Products', icon: '💻', slug: 'digital', count: 95 },
  { name: 'Services', icon: '✂️', slug: 'services', count: 143 },
  { name: 'Handmade', icon: '🎨', slug: 'handmade', count: 67 },
  { name: 'Tickets', icon: '🎟️', slug: 'tickets', count: 42 },
  { name: 'Misc', icon: '📦', slug: 'misc', count: 78 },
];

export const products: Product[] = [
  {
    id: '1',
    title: 'Organic Chemistry Textbook (Morrison & Boyd)',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    seller: 'Adebayo O.',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    rating: 4.8,
    reviews: 23,
    condition: 'Like New',
    category: 'Textbooks',
    location: 'Kuti Hall',
    description: 'Morrison & Boyd Organic Chemistry, 6th Edition. Used for one semester, no highlights or marks. Perfect for CHM 101/201 students.',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=600&fit=crop',
    ],
    negotiable: true,
    delivery: ['Campus Pickup', 'Hall Delivery'],
  },
  {
    id: '2',
    title: 'iPhone 13 Pro - 128GB (Mint Condition)',
    price: 285000,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be0860e88?w=400&h=400&fit=crop',
    seller: 'Chioma N.',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop',
    rating: 4.9,
    reviews: 45,
    condition: 'Like New',
    category: 'Electronics',
    location: 'Idia Hall',
    description: 'Selling my iPhone 13 Pro. Battery health 94%, comes with original box and charger. No cracks or scratches.',
    images: [
      'https://images.unsplash.com/photo-1632661674596-df8be0860e88?w=600&h=600&fit=crop',
    ],
    negotiable: false,
    delivery: ['Campus Pickup'],
  },
  {
    id: '3',
    title: 'Handmade Ankara Laptop Bag',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    seller: 'Folake A.',
    sellerAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop',
    rating: 4.7,
    reviews: 31,
    condition: 'New',
    category: 'Handmade',
    location: 'Awolowo Hall',
    description: 'Beautiful handmade Ankara laptop sleeve/bag. Fits up to 15" laptops. Padded interior. Custom orders available!',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    ],
    negotiable: true,
    delivery: ['Campus Pickup', 'Hall Delivery'],
  },
  {
    id: '4',
    title: 'Standing Fan - OX Industrial',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1617375407633-acd67aba7864?w=400&h=400&fit=crop',
    seller: 'Emeka C.',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
    rating: 4.5,
    reviews: 12,
    condition: 'Used',
    category: 'Furniture',
    location: 'Tedder Hall',
    description: 'OX Industrial standing fan. Used for 2 semesters, still very strong. Selling because I\'m graduating.',
    images: [
      'https://images.unsplash.com/photo-1617375407633-acd67aba7864?w=600&h=600&fit=crop',
    ],
    negotiable: true,
    delivery: ['Campus Pickup'],
  },
  {
    id: '5',
    title: 'Homemade Jollof Rice & Chicken',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=400&fit=crop',
    seller: 'Bukola F.',
    sellerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop',
    rating: 4.9,
    reviews: 87,
    condition: 'New',
    category: 'Food & Drinks',
    location: 'Alexander Brown Hall',
    description: 'Delicious homemade Jollof rice with grilled chicken. Made fresh daily. Order by 10am for lunch delivery!',
    images: [
      'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=600&fit=crop',
    ],
    negotiable: false,
    delivery: ['Hall Delivery'],
  },
  {
    id: '6',
    title: 'Figma UI Kit - Dashboard Templates',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop',
    seller: 'Tunde M.',
    sellerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop',
    rating: 4.6,
    reviews: 19,
    condition: 'New',
    category: 'Digital Products',
    location: 'Online',
    description: '50+ dashboard UI components in Figma. Auto-layout, dark/light mode, fully customizable. Perfect for CSC students.',
    images: [
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=600&fit=crop',
    ],
    negotiable: false,
    delivery: ['Digital Delivery'],
  },
  {
    id: '7',
    title: 'Nike Air Force 1 - Size 43',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    seller: 'Ibrahim K.',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    rating: 4.4,
    reviews: 8,
    condition: 'New',
    category: 'Fashion',
    location: 'Nnamdi Azikiwe Hall',
    description: 'Brand new Nike Air Force 1, white. Size 43 (EU). Comes with original box. Bought from Lagos but too small for me.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
    ],
    negotiable: true,
    delivery: ['Campus Pickup'],
  },
  {
    id: '8',
    title: 'HP Laptop Charger - Universal',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop',
    seller: 'Grace O.',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
    rating: 4.3,
    reviews: 15,
    condition: 'New',
    category: 'Electronics',
    location: 'Queen Elizabeth II Hall',
    description: 'Universal HP laptop charger. Compatible with most HP models. Brand new, sealed. 6-month warranty.',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=600&fit=crop',
    ],
    negotiable: false,
    delivery: ['Campus Pickup', 'Hall Delivery'],
  },
];

export const stats = {
  totalListings: 1247,
  totalSellers: 389,
  totalTransactions: 3456,
};

export const testimonials = [
  {
    name: 'Adewale T.',
    role: 'Medicine, 400L',
    text: "I sold all my old textbooks in one week! UI Marketplace is a game-changer for students.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
  },
  {
    name: 'Ngozi E.',
    role: 'Law, 300L',
    text: "Finally a safe place to buy things on campus. No more risky WhatsApp deals!",
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop',
  },
  {
    name: 'Femi A.',
    role: 'Engineering, 500L',
    text: "Started my laptop accessories business here. Made ₦200k in my first month!",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
  },
];

export const faqs = [
  {
    q: 'Who can use UI Marketplace?',
    a: 'Only verified University of Ibadan students, staff, and faculty with a valid @ui.edu.ng email address can register and use the platform.',
  },
  {
    q: 'How do payments work?',
    a: 'All payments are processed securely through Paystack. Funds are held in escrow until the buyer confirms receipt of the item, protecting both parties.',
  },
  {
    q: 'Is it free to list products?',
    a: 'Yes! Listing products is completely free. We only charge a small commission (5% for physical goods, 8% for digital products) when a sale is completed.',
  },
  {
    q: 'What if I have a problem with my order?',
    a: 'You can raise a dispute through the platform within 48 hours of purchase. Our team reviews all disputes and resolves them within 3-5 business days.',
  },
  {
    q: 'Can I sell food on the platform?',
    a: 'Yes! Food and beverages are a popular category. Just ensure your offerings comply with campus health and safety guidelines.',
  },
];
