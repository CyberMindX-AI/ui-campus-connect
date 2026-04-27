import { supabase } from '@/lib/supabase';
import { MarketStats, FAQ, Testimonial, Category } from '@/types';

export const marketService = {
  getStats: async (): Promise<MarketStats> => {
    const { data, error } = await supabase.from('market_stats').select('*').maybeSingle();
    if (error) throw error;
    if (!data) return { totalListings: 0, totalSellers: 0, totalTransactions: 0 };
    return {
      totalListings: data.total_listings || 0,
      totalSellers: data.total_sellers || 0,
      totalTransactions: data.total_transactions || 0,
    };
  },
  
  getFaqs: async (): Promise<FAQ[]> => {
    const { data, error } = await supabase.from('faqs').select('*');
    if (error) throw error;
    return data || [];
  },
  
  getTestimonials: async (): Promise<Testimonial[]> => {
    const { data, error } = await supabase.from('testimonials').select('*');
    if (error) throw error;
    return data || [];
  },

  getCategories: async (): Promise<Category[]> => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    return data || [];
  }
};
