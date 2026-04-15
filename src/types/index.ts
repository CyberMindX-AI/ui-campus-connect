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
