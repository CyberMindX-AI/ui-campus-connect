export interface AuthUser {
  id?: string;
  fullname: string;
  email: string;
  role: 'buyer' | 'seller' | 'both';
  faculty: string;
  avatar?: string;
  isVerified?: boolean;
}

export interface Product {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  // DB column name is 'negotiable', not 'is_negotiable'
  negotiable: boolean;
  // DB column name is 'delivery' (array), not 'delivery_options'
  delivery: string[];
  // DB column name is 'location', not 'pickup_location'
  location: string;
  quantity: number;
  tags: string[];
  rating: number;
  reviews: number;
  status: 'pending' | 'active' | 'rejected' | 'inactive' | 'available';
  created_at?: string;
  // Derived fields for UI (joined from profiles)
  seller?: string;
  sellerAvatar?: string;
}

export interface Category {
  name: string;
  icon: string;
  slug: string;
  count: number;
}

export interface MarketStats {
  totalListings: number;
  totalSellers: number;
  totalTransactions: number;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface FAQ {
  q: string;
  a: string;
}
