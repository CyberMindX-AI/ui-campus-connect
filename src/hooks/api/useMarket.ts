import { useQuery } from '@tanstack/react-query';
import { marketService } from '@/services/market.service';

export const useMarketStats = () => {
  return useQuery({
    queryKey: ['market', 'stats'],
    queryFn: marketService.getStats,
  });
};

export const useMarketFaqs = () => {
  return useQuery({
    queryKey: ['market', 'faqs'],
    queryFn: marketService.getFaqs,
  });
};

export const useMarketTestimonials = () => {
  return useQuery({
    queryKey: ['market', 'testimonials'],
    queryFn: marketService.getTestimonials,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['market', 'categories'],
    queryFn: marketService.getCategories,
  });
};
