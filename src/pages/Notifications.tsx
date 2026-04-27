import { useNotifications } from '@/hooks/api/useNotifications';
import { Bell, Package, Check, Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { Notification } from '@/types';

const Notifications = () => {
  const { notifications, markAsRead } = useNotifications();
  const items = notifications.data || [];
  const isLoading = notifications.isLoading;
  
  const unreadCount = items.filter((i) => !i.is_read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertCircle;
      default: return Info;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Notifications</h1>
            <p className="mt-1 text-sm text-muted-foreground">{unreadCount} unread</p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          {isLoading ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">Loading notifications...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center">
              <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Bell className="h-8 w-8" />
              </div>
              <p className="text-slate-500 font-medium italic text-sm">No notifications yet. We'll alert you here when something happens!</p>
            </div>
          ) : items.map((n: Notification) => {
            const Icon = getIcon(n.type);
            return (
              <div 
                key={n.id} 
                className={`flex items-start gap-3 rounded-xl border p-4 transition-colors cursor-pointer ${
                  n.is_read ? 'border-border bg-card' : 'border-primary/20 bg-primary-light'
                }`}
                onClick={() => !n.is_read && markAsRead(n.id)}
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                  n.is_read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium text-foreground`}>{n.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.message}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{new Date(n.created_at).toLocaleString()}</p>
                </div>
                {!n.is_read && <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;