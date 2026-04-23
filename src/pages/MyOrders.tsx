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
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Manage Orders</h1>
          <p className="text-slate-500 font-medium mt-1">Track and manage your campus purchases</p>
        </div>

        {/* Professional Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit mb-8 shadow-inner">
          {tabs.map((t) => (
            <button 
              key={t} 
              onClick={() => setTab(t)}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${
                tab === t 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filtered.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Order Image & Main Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <img src={order.image} alt={order.item} className="h-20 w-20 rounded-xl object-cover shadow-sm" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">Order {order.id}</p>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">{order.item}</h3>
                      <p className="text-sm font-medium text-slate-400">Seller: <span className="text-slate-600 underline cursor-pointer">{order.seller}</span> • Purchased {order.date}</p>
                    </div>
                  </div>

                  {/* Status & Price */}
                  <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-4 min-w-[120px]">
                    <p className="text-xl font-bold text-slate-900">₦{order.amount.toLocaleString()}</p>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Professional Action Buttons */}
                <div className="mt-6 pt-6 border-t border-slate-50 flex flex-wrap items-center gap-3">
                  {order.status === 'Delivered' && (
                    <>
                      <Button className="bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold px-4 h-9 gap-2">
                        <Star className="h-3.5 w-3.5" /> Leave Review
                      </Button>
                      <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold px-4 h-9 gap-2">
                        <RefreshCw className="h-3.5 w-3.5" /> Reorder
                      </Button>
                    </>
                  )}
                  {order.status === 'Processing' && (
                    <Button className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold px-4 h-9 gap-2 shadow-emerald-100 shadow-lg">
                      <Package className="h-3.5 w-3.5" /> Confirm Receipt
                    </Button>
                  )}
                  <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold px-4 h-9 gap-2">
                    <MessageCircle className="h-3.5 w-3.5" /> Message Seller
                  </Button>
                  {order.status !== 'Cancelled' && (
                    <Button variant="ghost" className="text-slate-400 hover:text-rose-500 text-xs font-bold px-4 h-9 gap-2 transition-colors ml-auto">
                      <AlertTriangle className="h-3.5 w-3.5" /> Raise Dispute
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No {tab.toLowerCase()} orders yet</h3>
              <p className="text-slate-400 text-sm mt-1 mb-6">Looks like you haven't made any purchases in this category.</p>
              <Link to="/products">
                <Button className="bg-slate-900 text-white hover:bg-slate-800 font-bold px-8 py-6 rounded-xl">
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;