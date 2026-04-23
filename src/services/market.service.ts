import { supabase } from '@/lib/supabase';
import { MarketStats, FAQ, Testimonial, Category } from '@/types';

export const marketService = {
  getStats: async (): Promise<MarketStats> => {
    const { data, error } = await supabase.from('market_stats').select('*').single();
    if (error) throw error;
    return {
      totalListings: data.total_listings,
      totalSellers: data.total_sellers,
      totalTransactions: data.total_transactions,
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
