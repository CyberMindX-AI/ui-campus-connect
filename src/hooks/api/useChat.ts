import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatService } from '@/services/chat.service';
import { useAuth } from '@/contexts/AuthContext';

export const useConversations = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: () => chatService.getConversations(user!.id),
    enabled: !!user?.id,
  });
};

export const useMessages = (conversationId: string | null) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => chatService.getMessages(conversationId!),
    enabled: !!conversationId,
  });
};

export const useSendMessage = (conversationId: string | null) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => chatService.sendMessage(conversationId!, user!.id, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations', user?.id] });
    },
  });
};
