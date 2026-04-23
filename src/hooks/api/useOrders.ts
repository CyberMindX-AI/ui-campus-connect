import { useQuery } from '@tanstack/react-query';
import { ordersService } from '@/services/orders.service';
import { useAuth } from '@/contexts/AuthContext';

export const useBuyerOrders = () => {
  const { user, isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ['orders', 'buyer', user?.id],
    queryFn: () => ordersService.getBuyerOrders(user!.id),
    enabled: isAuthenticated && !!user?.id,
  });
};

export const useSellerOrders = () => {
  const { user, isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ['orders', 'seller', user?.id],
    queryFn: () => ordersService.getSellerOrders(user!.id),
    enabled: isAuthenticated && !!user?.id,
  });
};
