export interface AuthUser {
  id?: string;
  fullname: string;
  email: string;
  role: 'buyer' | 'seller' | 'both' | 'admin';
  faculty: string;
  avatar?: string;
  nickname?: string;
  accepted_terms?: boolean;
  badge_type?: string;
  student_id_verified?: boolean;
  email_verified?: boolean;
  student_id_url?: string;
  isVerified?: boolean;
  bio?: string;
  store_name?: string;
  store_description?: string;
  return_policy?: string;
  pickup_location?: string;
  notification_prefs?: any;
  privacy_settings?: any;
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
  rejection_reason?: string;
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

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
}
