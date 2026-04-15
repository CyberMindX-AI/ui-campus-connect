import { supabase } from '@/lib/supabase';

export const chatService = {
  getConversations: async (userId: string) => {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        product:products(*),
        buyer:profiles!conversations_buyer_id_fkey(*),
        seller:profiles!conversations_seller_id_fkey(*)
      `)
      .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  getMessages: async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  sendMessage: async (conversationId: string, senderId: string, text: string) => {
    const { data, error } = await supabase
      .from('messages')
      .insert({ conversation_id: conversationId, sender_id: senderId, text })
      .select()
      .single();
    
    if (error) throw error;
    
    // Update conversation last_message and updated_at
    await supabase
      .from('conversations')
      .update({ last_message: text, updated_at: new Date().toISOString() })
      .eq('id', conversationId);
      
    return data;
  }
};
