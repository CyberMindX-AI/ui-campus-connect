import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export const wishlistService = {
  getWishlist: async (userId: string): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('product:products(*)')
      .eq('user_id', userId);
    
    if (error) throw error;
    return (data as any[] || []).map(item => item.product as Product);
  },

  addToWishlist: async (userId: string, productId: string): Promise<void> => {
    const { error } = await supabase
      .from('wishlist_items')
      .upsert({ user_id: userId, product_id: productId }, { onConflict: 'user_id,product_id' });
    
    if (error) throw error;
  },

  removeFromWishlist: async (userId: string, productId: string): Promise<void> => {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
  },

  toggleWishlist: async (userId: string, productId: string): Promise<boolean> => {
    const { data } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (data) {
      await wishlistService.removeFromWishlist(userId, productId);
      return false;
    } else {
      await wishlistService.addToWishlist(userId, productId);
      return true;
    }
  }
};
