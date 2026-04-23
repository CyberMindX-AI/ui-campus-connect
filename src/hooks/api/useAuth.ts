import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, LoginCredentials } from '@/services/auth.service';

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: authService.getCurrentUser,
    retry: false, // Do not retry if the token is invalid/missing
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: () => {
      // Invalidate and refetch the authUser query to trigger a re-render
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear the cache for the current user
      queryClient.setQueryData(['authUser'], null);
      queryClient.invalidateQueries();
    },
  });
};
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: any) => authService.register(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });
};
