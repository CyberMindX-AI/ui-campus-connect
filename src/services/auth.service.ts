import { supabase } from '@/lib/supabase';

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface AuthUser {
  id?: string;
  fullname: string;
  email: string;
  role: 'buyer' | 'seller' | 'both';
  faculty: string;
  avatar?: string;
  isVerified?: boolean;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password || '',
    });
    if (error) throw error;
    
    const { data: profile } = await supabase.from('profiles').select('is_verified').eq('id', data.user.id).single();
    
    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        fullname: data.user.user_metadata?.fullname || 'Student',
        role: data.user.user_metadata?.role || 'buyer',
        faculty: data.user.user_metadata?.faculty || 'Unknown',
        avatar: data.user.user_metadata?.avatar,
        isVerified: profile?.is_verified || false,
      },
      token: data.session.access_token,
    };
  },

  register: async (userData: any): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: { data: userData }
    });
    if (error) throw error;
    if (data.user) {
      await supabase.from('profiles').insert([{
        id: data.user.id,
        fullname: userData.fullname || 'Student',
        email: data.user.email!,
        role: userData.role || 'buyer',
        faculty: userData.faculty || 'Unknown',
        status: 'active'
      }]);
    }

    return {
      user: {
        id: data.user!.id,
        email: data.user!.email!,
        fullname: userData.fullname || 'Student',
        role: userData.role || 'buyer',
        faculty: userData.faculty || 'Unknown',
        isVerified: false,
      },
      token: data.session!.access_token,
    };
  },

  logout: async (): Promise<void> => {
    await supabase.auth.signOut();
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) throw new Error('Not logged in');
    
    const { data: profile } = await supabase.from('profiles').select('is_verified').eq('id', user.id).single();

    return {
      id: user.id,
      email: user.email!,
      fullname: user.user_metadata?.fullname || 'Student',
      role: user.user_metadata?.role || 'buyer',
      faculty: user.user_metadata?.faculty || 'Unknown',
      avatar: user.user_metadata?.avatar,
      isVerified: profile?.is_verified || false,
    };
  },
};
