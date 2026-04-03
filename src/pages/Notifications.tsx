import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Package, MessageCircle, Star, CreditCard, Heart, Megaphone, Check } from 'lucide-react';
import Layout from '@/components/Layout';

const notifications = [
  { id: 1, type: 'order', icon: Package, title: 'Order Shipped', desc: 'Your order ORD-2025-003 is ready for pickup at Kuti Hall.', time: '5 min ago', read: false },
  { id: 2, type: 'message', icon: MessageCircle, title: 'New Message', desc: 'Adebayo O. sent you a message about Organic Chemistry Textbook.', time: '1 hour ago', read: false },
  { id: 3, type: 'review', icon: Star, title: 'New Review', desc: 'You received a 5-star review from Tunde M.', time: '3 hours ago', read: false },
  { id: 4, type: 'payment', icon: CreditCard, title: 'Payment Confirmed', desc: '₦4,500 payment for order ORD-2025-001 has been confirmed.', time: '1 day ago', read: true },
  { id: 5, type: 'wishlist', icon: Heart, title: 'Wishlist Alert', desc: 'iPhone 13 Pro is back in stock!', time: '2 days ago', read: true },
  { id: 6, type: 'announcement', icon: Megaphone, title: 'Platform Update', desc: 'UI Marketplace now supports digital product delivery!', time: '3 days ago', read: true },
];

const Notifications = () => {
  const [items, setItems] = useState(notifications);

  const markAllRead = () => setItems((p) => p.map((i) => ({ ...i, read: true })));
  const unreadCount = items.filter((i) => !i.read).length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Notifications</h1>
            <p className="mt-1 text-sm text-muted-foreground">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead} className="gap-1 text-xs">
              <Check className="h-3 w-3" /> Mark All Read
            </Button>
          )}
        </div>

        <div className="mt-6 space-y-2">
          {items.map((n) => (
            <div key={n.id} className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${
              n.read ? 'border-border bg-card' : 'border-primary/20 bg-primary-light'
            }`}>
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                n.read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
              }`}>
                <n.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${n.read ? 'text-foreground' : 'text-foreground'}`}>{n.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.desc}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
              </div>
              {!n.read && <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;