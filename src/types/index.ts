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
  status: 'pending' | 'active' | 'rejected' | 'inactive';
  created_at?: string;
  quantity: number;
  delivery_options: string[];
  pickup_location: string;
  tags: string[];
  is_negotiable: boolean;
  // Derived fields for UI
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
