import { createContext, useContext, ReactNode, useEffect } from 'react';
import { AuthUser } from '@/services/auth.service';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthUser, useLogout as useApiLogout } from '@/hooks/api/useAuth';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isLoading: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user = null, isLoading } = useAuthUser();
  const queryClient = useQueryClient();
  const { mutate: apiLogout } = useApiLogout();

  // The login function now just manually seeds the cache until a refresh, usually useLogin handles this directly.
  const login = (u: AuthUser) => {
    queryClient.setQueryData(['authUser'], u);
  };

  const logout = () => {
    apiLogout();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};