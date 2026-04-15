import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft, Image as ImageIcon, MoreVertical } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useConversations, useMessages, useSendMessage } from '@/hooks/api/useChat';
import { formatDistanceToNow } from 'date-fns';

const Messages = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: conversations = [], isLoading: isLoadingConv } = useConversations();
  const { data: msgs = [], isLoading: isLoadingMsgs } = useMessages(selected);
  const { mutate: sendMessage } = useSendMessage(selected);

  const activeConvo = conversations.find((c: any) => c.id === selected) || null;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage('');
  };

  return (
    <Layout>
      <div className="container mx-auto flex h-[calc(100vh-4rem)] px-0 sm:px-4 sm:py-6">
        <div className="flex w-full overflow-hidden rounded-none border-0 bg-card sm:rounded-xl sm:border sm:border-border">
          {/* Conversation list */}
          <div className={`w-full border-r border-border sm:w-80 ${selected ? 'hidden sm:block' : ''}`}>
            <div className="border-b border-border p-4">
              <h2 className="font-heading text-lg font-semibold text-foreground">Messages</h2>
            </div>
            <div className="divide-y divide-border overflow-y-auto">
              {isLoadingConv ? (
                <p className="p-4 text-center text-xs text-muted-foreground">Loading chats...</p>
              ) : conversations.length === 0 ? (
                <p className="p-4 text-center text-sm text-muted-foreground">No conversations yet</p>
              ) : conversations.map((c: any) => {
                const partner = user?.id === c.buyer_id ? c.seller : c.buyer;
                return (
                  <button key={c.id} onClick={() => setSelected(c.id)}
                    className={`flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted ${
                      selected === c.id ? 'bg-muted' : ''
                    }`}>
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {partner?.fullname?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground truncate">{partner?.fullname}</span>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {c.updated_at ? formatDistanceToNow(new Date(c.updated_at), { addSuffix: true }) : ''}
                        </span>
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{c.last_message || 'Start a conversation'}</p>
                      <p className="truncate text-[10px] text-primary">{c.product?.title}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat panel */}
          <div className={`flex flex-1 flex-col ${!selected ? 'hidden sm:flex' : ''}`}>
            {selected && activeConvo ? (
              <>
                <div className="flex items-center gap-3 border-b border-border p-4">
                  <button onClick={() => setSelected(null)} className="sm:hidden"><ArrowLeft className="h-5 w-5" /></button>
                  <div className="h-9 w-9 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {(user?.id === activeConvo.buyer_id ? activeConvo.seller?.fullname : activeConvo.buyer?.fullname)?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {user?.id === activeConvo.buyer_id ? activeConvo.seller?.fullname : activeConvo.buyer?.fullname}
                    </p>
                    <p className="text-[10px] text-primary">{activeConvo.product?.title}</p>
                  </div>
                  <button className="text-muted-foreground"><MoreVertical className="h-5 w-5" /></button>
                </div>
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                  {isLoadingMsgs ? (
                    <p className="text-center text-xs text-muted-foreground">Fetching messages...</p>
                  ) : msgs.map((m: any) => (
                    <div key={m.id} className={`flex ${m.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        m.sender_id === user?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                      }`}>
                        <p className="text-sm">{m.text}</p>
                        <p className={`mt-1 text-[10px] ${m.sender_id === user?.id ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                          {formatDistanceToNow(new Date(m.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border p-3">
                  <div className="flex items-center gap-2">
                    <button className="text-muted-foreground hover:text-primary"><ImageIcon className="h-5 w-5" /></button>
                    <Input value={message} onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type a message..." className="flex-1" />
                    <Button variant="hero" size="icon" onClick={handleSend}><Send className="h-4 w-4" /></Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-center text-muted-foreground">
                <p className="text-sm">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;