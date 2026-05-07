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
  },

  broadcastNotification: async (notification: { title: string; message: string; type: string }): Promise<void> => {
    // 1. Get all user IDs
    const { data: users, error: userError } = await supabase
      .from('profiles')
      .select('id');
    
    if (userError) throw userError;
    if (!users || users.length === 0) return;

    // 2. Prepare notifications for all users
    const notifications = users.map(user => ({
      user_id: user.id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      is_read: false
    }));

    // 3. Batch insert
    const { error } = await supabase
      .from('notifications')
      .insert(notifications);
    
    if (error) throw error;
  }
};
