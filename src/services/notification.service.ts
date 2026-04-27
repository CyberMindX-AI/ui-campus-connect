import { supabase } from '@/lib/supabase';
import { Notification } from '@/types';

export const notificationService = {
  getNotifications: async (userId: string): Promise<Notification[]> => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  sendNotification: async (notification: Partial<Notification>): Promise<void> => {
    const { error } = await supabase
      .from('notifications')
      .insert([notification]);
    
    if (error) throw error;
  },

  markAsRead: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);
    
    if (error) throw error;
  },

  deleteNotification: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
