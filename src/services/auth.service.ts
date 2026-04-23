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
  login: async (credentials: LoginCredentials): Promise<AuthUser> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password || '',
    });
    if (error) throw error;
    
    // Fetch profile to ensure we have the role and other metadata
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
    
    if (profileError) {
      console.warn('Profile not found, creating a default one...');
      // Fallback: This shouldn't happen if the trigger is working, but just in case
      const newUser = {
        id: data.user.id,
        email: data.user.email!,
        fullname: data.user.user_metadata?.fullname || 'Student',
        role: data.user.user_metadata?.role || 'buyer',
        faculty: data.user.user_metadata?.faculty || 'Unknown',
        isVerified: false
      };
      return newUser;
    }
    
    return {
      id: profile.id,
      email: profile.email,
      fullname: profile.fullname,
      role: profile.role,
      faculty: profile.faculty,
      isVerified: profile.is_verified,
      avatar: profile.avatar_url,
    };
  },

  register: async (userData: any): Promise<AuthUser> => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: { 
        data: {
          fullname: userData.fullname,
          role: userData.role,
          faculty: userData.faculty
        } 
      }
    });
    if (error) throw error;
    if (!data.user) throw new Error('Registration failed');

    // We wait a brief moment for the DB trigger to create the profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    return {
      id: data.user.id,
      email: data.user.email!,
      fullname: userData.fullname || 'Student',
      role: userData.role || 'buyer',
      faculty: userData.faculty || 'Unknown',
      isVerified: false,
    };
  },

  logout: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getCurrentUser: async (): Promise<AuthUser | null> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (!profile) return null;

    return {
      id: profile.id,
      email: profile.email,
      fullname: profile.fullname,
      role: profile.role,
      faculty: profile.faculty,
      avatar: profile.avatar_url,
      isVerified: profile.is_verified,
    };
  },
};
