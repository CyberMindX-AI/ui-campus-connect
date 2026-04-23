import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { getImageUrl } from './products.service';

export const wishlistService = {
  getWishlist: async (userId: string): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('wishlist')
      .select('product:products(*, seller_profile:profiles!seller_id(fullname, avatar_url))')
      .eq('user_id', userId);

    if (error) throw error;
    return (data as any[] || [])
      .map((item) => item.product)
      .filter(Boolean)
      .map((p: any) => ({
        ...p,
        images: Array.isArray(p.images) ? p.images.map(getImageUrl) : [],
        seller: p.seller_profile?.fullname || 'Unknown Seller',
        sellerAvatar: p.seller_profile?.avatar_url ? getImageUrl(p.seller_profile.avatar_url) : '/placeholder.svg',
      }));
  },

  addToWishlist: async (userId: string, productId: string): Promise<void> => {
    const { error } = await supabase
      .from('wishlist')
      .upsert({ user_id: userId, product_id: productId }, { onConflict: 'user_id,product_id' });

    if (error) throw error;
  },

  removeFromWishlist: async (userId: string, productId: string): Promise<void> => {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;
  },

  toggleWishlist: async (userId: string, productId: string): Promise<boolean> => {
    const { data } = await supabase
      .from('wishlist')
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
  },
};
