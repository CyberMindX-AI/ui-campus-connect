import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import { toast } from 'sonner';

export const useAdminData = () => {
  const queryClient = useQueryClient();

  const products = useQuery({
    queryKey: ['admin', 'products'],
    queryFn: adminService.getPendingProducts,
  });

  const sellers = useQuery({
    queryKey: ['admin', 'sellers'],
    queryFn: adminService.getPendingSellers,
  });

  const reports = useQuery({
    queryKey: ['admin', 'reports'],
    queryFn: adminService.getReports,
  });

  const transactions = useQuery({
    queryKey: ['admin', 'transactions'],
    queryFn: adminService.getTransactions,
  });

  const users = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: adminService.getAllUsers,
  });

  const approveProductMutation = useMutation({
    mutationFn: adminService.approveProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product approved');
    }
  });

  const rejectProductMutation = useMutation({
    mutationFn: adminService.rejectProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product rejected');
    }
  });

  const approveSellerMutation = useMutation({
    mutationFn: ({ applicationId, userId }: { applicationId: string; userId: string }) => 
      adminService.approveSeller(applicationId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'sellers'] });
      toast.success('Seller approved & verified');
    }
  });

  return {
    products,
    sellers,
    reports,
    transactions,
    users,
    approveProductMutation,
    rejectProductMutation,
    approveSellerMutation,
  };
};
