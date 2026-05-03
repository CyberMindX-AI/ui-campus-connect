import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

// Helper: get a Supabase Storage public URL for a given path
export const getImageUrl = (path: string): string => {
  if (!path) return '/placeholder.svg';
  // Already a full URL (e.g. external or previously generated)
  if (path.startsWith('http')) return path;
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
};

// Upload one image to Supabase Storage and return the public URL
export const uploadProductImage = async (
  sellerId: string,
  file: File
): Promise<string> => {
  const ext = file.name.split('.').pop();
  const fileName = `${sellerId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, { upsert: false, contentType: file.type });

  if (error) throw error;
  return getImageUrl(fileName);
};

const mapProduct = (p: any): Product => ({
  ...p,
  images: Array.isArray(p.images) ? p.images.map(getImageUrl) : [],
  seller: p.seller_profile?.nickname || p.seller_profile?.fullname || 'Unknown Seller',
  sellerAvatar: p.seller_profile?.avatar_url
    ? getImageUrl(p.seller_profile.avatar_url)
    : '/placeholder.svg',
});

export const productsService = {
  getProducts: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*, seller_profile:profiles(fullname, nickname, avatar_url)')
      .in('status', ['active', 'available'])
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getProducts] Error:', error.message, error.details);
      throw error;
    }
    return (data || []).map(mapProduct);
  },

  getSellerProducts: async (sellerId: string): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        seller_profile:profiles!seller_id(fullname, nickname, avatar_url)
      `)
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(mapProduct);
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        seller_profile:profiles!seller_id(fullname, nickname, avatar_url)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return mapProduct(data);
  },

  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  },
};
