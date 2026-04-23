import { supabase } from '@/lib/supabase';

import { Product } from '@/types';

export const productsService = {
  getProducts: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        seller_profile:profiles!seller_id(fullname, avatar_url)
      `)
      .eq('status', 'active');
    
    if (error) throw error;
    
    return (data || []).map(p => ({
      ...p,
      seller: p.seller_profile?.fullname || 'Unknown Seller',
      sellerAvatar: p.seller_profile?.avatar_url || ''
    }));
  },
  
  getSellerProducts: async (sellerId: string): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        seller_profile:profiles!seller_id(fullname, avatar_url)
      `)
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return (data || []).map(p => ({
      ...p,
      seller: p.seller_profile?.fullname || 'Unknown Seller',
      sellerAvatar: p.seller_profile?.avatar_url || ''
    }));
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        seller_profile:profiles!seller_id(fullname, avatar_url)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return {
      ...data,
      seller: data.seller_profile?.fullname || 'Unknown Seller',
      sellerAvatar: data.seller_profile?.avatar_url || ''
    };
  },

  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    const { data, error } = await supabase.from('products').insert([productData]).select().single();
    if (error) throw error;
    return data;
  },
  
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const { data, error } = await supabase.from('products').update(productData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  }
};
