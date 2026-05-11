import { useNotifications } from '@/hooks/api/useNotifications';
import { Bell, CheckCircle, Info, AlertTriangle, AlertCircle, CheckCheck, Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Notification } from '@/types';

const iconMap: Record<string, any> = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

const colorMap: Record<string, string> = {
  success: 'bg-green-100 text-green-600',
  warning: 'bg-yellow-100 text-yellow-600',
  error: 'bg-red-100 text-red-600',
  info: 'bg-blue-100 text-blue-600',
};

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const items: Notification[] = notifications.data || [];
  const isLoading = notifications.isLoading;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Notifications</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {unreadCount > 0 ? (
                <span className="text-primary font-semibold">{unreadCount} unread</span>
              ) : (
                'All caught up!'
              )}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-xs"
              onClick={() => markAllAsRead()}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* List */}
        <div className="space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center">
              <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Bell className="h-8 w-8" />
              </div>
              <p className="text-slate-500 font-medium italic text-sm">
                No notifications yet. We'll alert you here when something happens!
              </p>
            </div>
          ) : (
            items.map((n: Notification) => {
              const Icon = iconMap[n.type] || Info;
              const iconColor = colorMap[n.type] || colorMap.info;
              return (
                <div
                  key={n.id}
                  onClick={() => !n.is_read && markAsRead(n.id)}
                  className={`flex items-start gap-3 rounded-xl border p-4 transition-all cursor-pointer group ${
                    n.is_read
                      ? 'border-border bg-card opacity-70 hover:opacity-100'
                      : 'border-primary/20 bg-primary-light shadow-sm hover:shadow'
                  }`}
                >
                  {/* Icon */}
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-tight">{n.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{n.message}</p>
                    <p className="mt-1.5 text-[10px] text-muted-foreground/70">
                      {new Date(n.created_at).toLocaleString('en-NG', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>

                  {/* Unread dot */}
                  {!n.is_read && (
                    <div className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;