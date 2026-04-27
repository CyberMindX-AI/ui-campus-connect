import { supabase } from '@/lib/supabase';

export const adminService = {
  getPendingProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        seller_profile:profiles!seller_id(fullname, email, faculty)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Map data to match UI expectations
    return (data || []).map(p => ({
      ...p,
      seller: p.seller_profile?.fullname || 'Unknown',
      sellerEmail: p.seller_profile?.email,
      submittedAt: new Date(p.created_at).toLocaleDateString()
    }));
  },

  getPendingSellers: async () => {
    const { data, error } = await supabase
      .from('seller_applications')
      .select(`
        *,
        profile:profiles!user_id(fullname, email, faculty)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return (data || []).map(s => ({
      ...s,
      name: s.profile?.fullname || 'Unknown',
      email: s.profile?.email,
      faculty: s.profile?.faculty
    }));
  },

  approveProduct: async (id: string) => {
    const { error } = await supabase
      .from('products')
      .update({ status: 'active' })
      .eq('id', id);
    if (error) throw error;
  },

  rejectProduct: async (id: string, reason: string) => {
    const { error } = await supabase
      .from('products')
      .update({ 
        status: 'rejected',
        rejection_reason: reason
      })
      .eq('id', id);
    if (error) throw error;
  },

  approveSeller: async (applicationId: string, userId: string) => {
    // 1. Update application status
    const { error: appError } = await supabase
      .from('seller_applications')
      .update({ status: 'approved' })
      .eq('id', applicationId);
    if (appError) throw appError;

    // 2. Update user profile role
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: 'seller' })
      .eq('id', userId);
    if (profileError) throw profileError;
  },

  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  getTransactions: async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        product:products(title),
        buyer:profiles!transactions_buyer_id_fkey(fullname),
        seller:profiles!transactions_seller_id_fkey(fullname)
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  getReports: async () => {
    const { data, error } = await supabase
      .from('reports')
      .select(`
        *,
        reporter:profiles!reporter_id(fullname)
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  
  verifyEmail: async (userId: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ email_verified: true })
      .eq('id', userId);
    if (error) throw error;
  },

  verifyStudentId: async (userId: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ student_id_verified: true })
      .eq('id', userId);
    if (error) throw error;
  },

  assignBadge: async (userId: string, badgeType: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ badge_type: badgeType })
      .eq('id', userId);
    if (error) throw error;
  }
};
