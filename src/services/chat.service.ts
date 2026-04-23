import { supabase } from '@/lib/supabase';

export const chatService = {
  getConversations: async (userId: string) => {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        participant1:profiles!conversations_participant_1_fkey(id, fullname, avatar_url),
        participant2:profiles!conversations_participant_2_fkey(id, fullname, avatar_url)
      `)
      .or(`participant_1.eq.${userId},participant_2.eq.${userId}`)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  getMessages: async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:profiles!messages_sender_id_fkey(id, fullname, avatar_url)')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
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
  },

  startConversation: async (userId1: string, userId2: string): Promise<string> => {
    // Check if conversation already exists
    const { data: existing } = await supabase
      .from('conversations')
      .select('id')
      .or(
        `and(participant_1.eq.${userId1},participant_2.eq.${userId2}),and(participant_1.eq.${userId2},participant_2.eq.${userId1})`
      )
      .single();

    if (existing) return existing.id;

    // Create new conversation
    const { data, error } = await supabase
      .from('conversations')
      .insert({ participant_1: userId1, participant_2: userId2 })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  },
};
