import { supabase } from '@/lib/supabase';

export const ordersService = {
  getBuyerOrders: async (userId: string) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, product:products(*), seller:profiles!transactions_seller_id_fkey(*)')
      .eq('buyer_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  getSellerOrders: async (userId: string) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, product:products(*), buyer:profiles!transactions_buyer_id_fkey(*)')
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
};
