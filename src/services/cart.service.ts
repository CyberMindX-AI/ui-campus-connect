import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export interface CartItem {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  product?: Product;
}

export const cartService = {
  getCartItems: async (userId: string): Promise<CartItem[]> => {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data || [];
  },

  addToCart: async (userId: string, productId: string, quantity: number = 1): Promise<void> => {
    const { error } = await supabase
      .from('cart_items')
      .upsert({ user_id: userId, product_id: productId, quantity }, { onConflict: 'user_id,product_id' });
    
    if (error) throw error;
  },

  removeFromCart: async (userId: string, productId: string): Promise<void> => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
  },

  updateQuantity: async (userId: string, productId: string, quantity: number): Promise<void> => {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) throw error;
  },

  clearCart: async (userId: string): Promise<void> => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
  }
};
