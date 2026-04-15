import { supabase } from '@/lib/supabase';

import { Product } from '@/types';

export const productsService = {
  getProducts: async (): Promise<Product[]> => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return data || [];
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
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
