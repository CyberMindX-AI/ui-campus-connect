import { supabase } from '@/lib/supabase';

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface AuthUser {
  id?: string;
  fullname: string;
  email: string;
  role: 'buyer' | 'seller' | 'both' | 'admin';
  faculty: string;
  avatar?: string;
  nickname?: string;
  accepted_terms?: boolean;
  badge_type?: string;
  student_id_verified?: boolean;
  email_verified?: boolean;
  student_id_url?: string;
  isVerified?: boolean;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

// Get a public URL for an avatar stored in Supabase Storage
export const getAvatarUrl = (path: string | null | undefined): string => {
  if (!path) return '/placeholder.svg';
  if (path.startsWith('http')) return path;
  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  return data.publicUrl;
};

// Upload an avatar to Supabase Storage and update the profile
export const uploadAvatar = async (userId: string, file: File): Promise<string> => {
  const ext = file.name.split('.').pop();
  const fileName = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, { upsert: true, contentType: file.type });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
  const publicUrl = data.publicUrl;

  // Update profile avatar_url
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: fileName })
    .eq('id', userId);

  if (updateError) throw updateError;

  return publicUrl;
};

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
      console.warn('Profile not found, using auth metadata...');
      return {
        id: data.user.id,
        email: data.user.email!,
        fullname: data.user.user_metadata?.fullname || 'Student',
        role: data.user.user_metadata?.role || 'buyer',
        faculty: data.user.user_metadata?.faculty || 'Unknown',
        isVerified: false,
      };
    }

    return {
      id: profile.id,
      email: profile.email,
      fullname: profile.fullname,
      role: profile.role,
      faculty: profile.faculty,
      isVerified: profile.is_verified,
      avatar: getAvatarUrl(profile.avatar_url),
      nickname: profile.nickname,
      accepted_terms: profile.accepted_terms,
      badge_type: profile.badge_type,
      student_id_verified: profile.student_id_verified,
      email_verified: profile.email_verified,
      student_id_url: profile.student_id_url,
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
          faculty: userData.faculty,
          accepted_terms: userData.accepted_terms || false,
        },
      },
    });
    if (error) throw error;
    if (!data.user) throw new Error('Registration failed');

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
    const {
      data: { session },
    } = await supabase.auth.getSession();
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
      avatar: getAvatarUrl(profile.avatar_url),
      isVerified: profile.is_verified,
      nickname: profile.nickname,
      accepted_terms: profile.accepted_terms,
      badge_type: profile.badge_type,
      student_id_verified: profile.student_id_verified,
      email_verified: profile.email_verified,
      student_id_url: profile.student_id_url,
    };
  },

  updateProfile: async (
    userId: string,
    updates: { fullname?: string; bio?: string; nickname?: string; student_id_url?: string }
  ): Promise<void> => {
    const { error } = await supabase.from('profiles').update(updates).eq('id', userId);
    if (error) throw error;
  },

  uploadStudentId: async (userId: string, file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `id-${Math.random()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('student-ids')
      .upload(filePath, file);

    if (uploadError) {
      if (uploadError.message.includes('row-level security policy')) {
        throw new Error('You do not have permission to upload documents. Please ensure you are logged in correctly.');
      }
      throw uploadError;
    }

    return filePath;
  },

  getStudentIdUrl: async (path: string): Promise<string> => {
    if (!path) return '';
    
    // If it's a full Supabase URL, extract the path after 'student-ids/'
    let filePath = path;
    if (path.startsWith('http')) {
      const parts = path.split('student-ids/');
      if (parts.length > 1) {
        filePath = parts[1];
      } else {
        // Not a student-id URL we recognize, return as is
        return path;
      }
    }
    
    // For student IDs, we use signed URLs since the bucket is private
    const { data, error } = await supabase.storage
      .from('student-ids')
      .createSignedUrl(filePath, 3600); // 1 hour expiry

    if (error) {
      console.error('Error generating signed URL for:', filePath, error);
      return '';
    }
    return data.signedUrl;
  },
};
