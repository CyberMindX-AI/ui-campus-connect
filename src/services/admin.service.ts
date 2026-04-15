import { supabase } from '@/lib/supabase';

export const adminService = {
  getPendingProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*, seller:profiles(*)')
      .eq('status', 'pending');
    if (error) throw error;
    return data;
  },

  approveProduct: async (id: string) => {
    const { error } = await supabase
      .from('products')
      .update({ status: 'active' })
      .eq('id', id);
    if (error) throw error;
  },

  rejectProduct: async (id: string) => {
    const { error } = await supabase
      .from('products')
      .update({ status: 'rejected' })
      .eq('id', id);
    if (error) throw error;
  },

  getPendingSellers: async () => {
    const { data, error } = await supabase
      .from('seller_applications')
      .select('*, user:profiles(*)')
      .eq('status', 'pending');
    if (error) throw error;
    return data;
  },

  approveSeller: async (applicationId: string, userId: string) => {
    await supabase.from('seller_applications').update({ status: 'approved' }).eq('id', applicationId);
    await supabase.from('profiles').update({ role: 'seller', is_verified: true }).eq('id', userId);
  },

  getReports: async () => {
    const { data, error } = await supabase
      .from('reports')
      .select('*, reporter:profiles(*)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  getTransactions: async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, buyer:profiles!transactions_buyer_id_fkey(*), seller:profiles!transactions_seller_id_fkey(*), product:products(*)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
};
