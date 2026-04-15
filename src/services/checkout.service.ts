import { supabase } from '@/lib/supabase';

export const checkoutService = {
  createOrder: async (userId: string, items: any[]) => {
    // In a real app, we'd create one order and multiple line items
    // For this schema, we'll create a transaction per product
    const transactions = items.map(item => ({
      buyer_id: userId,
      seller_id: item.product.seller_id,
      product_id: item.product.id,
      amount: item.product.price * item.qty,
      status: 'pending'
    }));
    
    const { data, error } = await supabase
      .from('transactions')
      .insert(transactions)
      .select();
      
    if (error) throw error;
    return data;
  }
};
