import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft, Image as ImageIcon, MoreVertical } from 'lucide-react';
import Layout from '@/components/Layout';

const conversations = [
  { id: '1', name: 'Adebayo O.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', lastMsg: 'Is the textbook still available?', time: '2m ago', unread: 2, product: 'Organic Chemistry Textbook' },
  { id: '2', name: 'Bukola F.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop', lastMsg: 'Your order is ready for pickup!', time: '1h ago', unread: 0, product: 'Homemade Jollof Rice' },
  { id: '3', name: 'Chioma N.', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop', lastMsg: 'Can you do ₦250,000?', time: '3h ago', unread: 1, product: 'iPhone 13 Pro' },
];

const mockMessages = [
  { id: 1, sender: 'them', text: 'Hi! Is the Organic Chemistry textbook still available?', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Yes it is! Still in great condition.', time: '10:32 AM' },
  { id: 3, sender: 'them', text: 'Great! Can I pick it up at Kuti Hall today?', time: '10:33 AM' },
  { id: 4, sender: 'me', text: "Sure, I'll be around from 4-6pm. Room 205.", time: '10:35 AM' },
  { id: 5, sender: 'them', text: 'Perfect! See you then. Can you do ₦4,000?', time: '10:36 AM' },
];

const Messages = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [msgs, setMsgs] = useState(mockMessages);

  const activeConvo = conversations.find((c) => c.id === selected);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMsgs((p) => [...p, { id: p.length + 1, sender: 'me', text: message, time: 'Just now' }]);
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
              {conversations.map((c) => (
                <button key={c.id} onClick={() => setSelected(c.id)}
                  className={`flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted ${
                    selected === c.id ? 'bg-muted' : ''
                  }`}>
                  <img src={c.avatar} alt={c.name} className="h-10 w-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{c.name}</span>
                      <span className="text-[10px] text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{c.lastMsg}</p>
                    <p className="truncate text-[10px] text-primary">{c.product}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{c.unread}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat panel */}
          <div className={`flex flex-1 flex-col ${!selected ? 'hidden sm:flex' : ''}`}>
            {activeConvo ? (
              <>
                <div className="flex items-center gap-3 border-b border-border p-4">
                  <button onClick={() => setSelected(null)} className="sm:hidden"><ArrowLeft className="h-5 w-5" /></button>
                  <img src={activeConvo.avatar} alt={activeConvo.name} className="h-9 w-9 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activeConvo.name}</p>
                    <p className="text-[10px] text-primary">{activeConvo.product}</p>
                  </div>
                  <button className="text-muted-foreground"><MoreVertical className="h-5 w-5" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {msgs.map((m) => (
                    <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        m.sender === 'me' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                      }`}>
                        <p className="text-sm">{m.text}</p>
                        <p className={`mt-1 text-[10px] ${m.sender === 'me' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{m.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border p-3">
                  <div className="flex items-center gap-2">
                    <button className="text-muted-foreground hover:text-primary"><ImageIcon className="h-5 w-5" /></button>
                    <Input value={message} onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..." className="flex-1" />
                    <Button variant="hero" size="icon" onClick={sendMessage}><Send className="h-4 w-4" /></Button>
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