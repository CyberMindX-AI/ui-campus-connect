import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, MessageCircle, AlertTriangle, Star, RefreshCw, Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { useBuyerOrders } from '@/hooks/api/useOrders';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const tabs = ['All', 'pending', 'processing', 'completed', 'cancelled'];
const tabLabels: Record<string, string> = {
  All: 'All',
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Delivered',
  cancelled: 'Cancelled',
};

const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  processing: 'bg-yellow-100 text-yellow-700',
  pending: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
};

const MyOrders = () => {
  const [tab, setTab] = useState('All');
  const { isAuthenticated } = useAuth();
  const { data: orders = [], isLoading } = useBuyerOrders();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const filtered = tab === 'All' ? orders : orders.filter((o: any) => o.status === tab);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Orders</h1>
          <p className="text-slate-500 font-medium mt-1">Track and manage your campus purchases</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit mb-8 shadow-inner overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap px-5 py-2 text-sm font-bold rounded-lg transition-all ${
                tab === t
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tabLabels[t]}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((order: any) => (
              <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={order.product?.images?.[0] || '/placeholder.svg'}
                        alt={order.product?.title || 'Product'}
                        className="h-20 w-20 rounded-xl object-cover shadow-sm bg-slate-100"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                      />
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                          Order #{typeof order.id === 'string' ? order.id.slice(0, 8).toUpperCase() : order.id}
                        </p>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight">
                          {order.product?.title || 'Unknown Product'}
                        </h3>
                        <p className="text-sm font-medium text-slate-400">
                          Seller: <span className="text-slate-600">{order.seller?.fullname || 'Campus Seller'}</span>
                          {' · '}
                          {new Date(order.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Status & Price */}
                    <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-4 min-w-[120px]">
                      <p className="text-xl font-bold text-slate-900">₦{(order.amount || 0).toLocaleString()}</p>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[order.status] || 'bg-slate-100 text-slate-600'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-6 border-t border-slate-50 flex flex-wrap items-center gap-3">
                    {order.status === 'completed' && (
                      <>
                        <Button className="bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold px-4 h-9 gap-2">
                          <Star className="h-3.5 w-3.5" /> Leave Review
                        </Button>
                        <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold px-4 h-9 gap-2">
                          <RefreshCw className="h-3.5 w-3.5" /> Reorder
                        </Button>
                      </>
                    )}
                    {order.status === 'processing' && (
                      <Button className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold px-4 h-9 gap-2">
                        <Package className="h-3.5 w-3.5" /> Confirm Receipt
                      </Button>
                    )}
                    <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold px-4 h-9 gap-2">
                      <MessageCircle className="h-3.5 w-3.5" /> Message Seller
                    </Button>
                    {order.status !== 'cancelled' && (
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
                <h3 className="text-lg font-bold text-slate-900">No {tabLabels[tab].toLowerCase()} orders yet</h3>
                <p className="text-slate-400 text-sm mt-1 mb-6">Looks like you haven't made any purchases in this category.</p>
                <Link to="/products">
                  <Button className="bg-slate-900 text-white hover:bg-slate-800 font-bold px-8 py-6 rounded-xl">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyOrders;