import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Package, MessageCircle, Check, X as XIcon, Truck } from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const initialOrders: any[] = [];

const tabs = ['All', 'New', 'Processing', 'Ready', 'Completed', 'Cancelled'];
const statusColors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Ready: 'bg-primary-light text-primary',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const SellerOrders = () => {
  const [tab, setTab] = useState('All');
  const [orders, setOrders] = useState(initialOrders);
  const { toast } = useToast();

  const filtered = tab === 'All' ? orders : orders.filter((o) => o.status === tab);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders((p) => p.map((o) => o.id === id ? { ...o, status: newStatus } : o));
    toast({ title: `Order ${newStatus.toLowerCase()}`, description: `Order ${id} marked as ${newStatus}.` });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Order Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">{orders.length} total orders</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                tab === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}>{t}</button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {filtered.map((order) => (
            <div key={order.id} className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <img src={order.image} alt={order.item} className="h-14 w-14 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.item}</p>
                    <p className="text-xs text-muted-foreground">{order.id} · Buyer: {order.buyer} · {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-foreground">₦{order.amount.toLocaleString()}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}>{order.status}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {order.status === 'New' && (
                  <>
                    <Button variant="hero" size="sm" className="text-xs gap-1" onClick={() => updateStatus(order.id, 'Processing')}>
                      <Check className="h-3 w-3" /> Accept
                    </Button>
                    <Button variant="destructive" size="sm" className="text-xs gap-1" onClick={() => updateStatus(order.id, 'Cancelled')}>
                      <XIcon className="h-3 w-3" /> Decline
                    </Button>
                  </>
                )}
                {order.status === 'Processing' && (
                  <Button variant="hero" size="sm" className="text-xs gap-1" onClick={() => updateStatus(order.id, 'Ready')}>
                    <Truck className="h-3 w-3" /> Mark as Ready
                  </Button>
                )}
                <Button variant="outline" size="sm" className="text-xs gap-1"><MessageCircle className="h-3 w-3" /> Message Buyer</Button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium text-foreground">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SellerOrders;