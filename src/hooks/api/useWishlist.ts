import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistService } from '@/services/wishlist.service';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useWishlist = () => {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: () => wishlistService.getWishlist(user!.id),
    enabled: isAuthenticated && !!user?.id,
  });

  const toggleMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.toggleWishlist(user!.id, productId),
    onSuccess: (isAdded) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id] });
      toast.success(isAdded ? 'Added to wishlist' : 'Removed from wishlist');
    },
    onError: () => {
      toast.error('Failed to update wishlist');
    }
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.removeFromWishlist(user!.id, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id] });
      toast.success('Removed from wishlist');
    },
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      // Supabase clear wishlist logic if needed, or just multiple deletes
      const items = await wishlistService.getWishlist(user!.id);
      await Promise.all(items.map(item => wishlistService.removeFromWishlist(user!.id, item.id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id] });
      toast.success('Wishlist cleared');
    }
  });

  return {
    ...query,
    toggleWishlist: toggleMutation.mutate,
    removeFromWishlist: removeMutation.mutate,
    clearWishlist: clearMutation.mutate,
  };
};
