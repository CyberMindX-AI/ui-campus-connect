import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, ChevronRight, Download, RefreshCw, MessageCircle, AlertTriangle, Star } from 'lucide-react';
import Layout from '@/components/Layout';

const orders = [
  { id: 'ORD-2025-001', item: 'Organic Chemistry Textbook', seller: 'Adebayo O.', amount: 4500, status: 'Delivered', date: '2025-06-28', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop' },
  { id: 'ORD-2025-002', item: 'Homemade Jollof Rice & Chicken', seller: 'Bukola F.', amount: 1500, status: 'Processing', date: '2025-06-30', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=100&h=100&fit=crop' },
  { id: 'ORD-2025-003', item: 'HP Laptop Charger', seller: 'Grace O.', amount: 5500, status: 'Pending', date: '2025-07-01', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=100&h=100&fit=crop' },
  { id: 'ORD-2025-004', item: 'Nike Air Force 1', seller: 'Ibrahim K.', amount: 22000, status: 'Cancelled', date: '2025-06-20', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
  { id: 'ORD-2025-005', item: 'Figma UI Kit', seller: 'Tunde M.', amount: 3000, status: 'Delivered', date: '2025-06-15', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=100&h=100&fit=crop' },
];

const tabs = ['All', 'Pending', 'Processing', 'Delivered', 'Cancelled'];
const statusColors: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Pending: 'bg-muted text-muted-foreground',
  Cancelled: 'bg-red-100 text-red-700',
};

const MyOrders = () => {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? orders : orders.filter((o) => o.status === tab);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">My Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">{orders.length} total orders</p>

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
                    <p className="text-xs text-muted-foreground">{order.id} · {order.seller} · {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-foreground">₦{order.amount.toLocaleString()}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}>{order.status}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {order.status === 'Delivered' && (
                  <>
                    <Button variant="hero" size="sm" className="text-xs gap-1"><Star className="h-3 w-3" /> Leave Review</Button>
                    <Button variant="outline" size="sm" className="text-xs gap-1"><RefreshCw className="h-3 w-3" /> Reorder</Button>
                  </>
                )}
                {order.status === 'Processing' && (
                  <Button variant="hero" size="sm" className="text-xs gap-1"><Package className="h-3 w-3" /> Confirm Receipt</Button>
                )}
                <Button variant="outline" size="sm" className="text-xs gap-1"><MessageCircle className="h-3 w-3" /> Message Seller</Button>
                {order.status !== 'Cancelled' && (
                  <Button variant="outline" size="sm" className="text-xs gap-1"><AlertTriangle className="h-3 w-3" /> Raise Dispute</Button>
                )}
                <Button variant="outline" size="sm" className="text-xs gap-1"><Download className="h-3 w-3" /> Receipt</Button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium text-foreground">No orders found</p>
              <Link to="/products"><Button variant="hero" size="sm" className="mt-3">Start Shopping</Button></Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;