import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Plus, 
  Search, 
  ArrowUpRight, 
  Clock, 
  CheckCircle, 
  MessageSquare,
  Loader2,
  Store,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useSellerProducts } from '@/hooks/api/useProducts';
import { useSellerOrders } from '@/hooks/api/useOrders';

const SellerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Real-time data from hooks
  const { data: products = [], isLoading: loadingProducts } = useSellerProducts(user?.id);
  const { data: orders = [], isLoading: loadingOrders } = useSellerOrders();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  if (user?.role === 'buyer') {
    return <Navigate to="/dashboard/buyer" replace />;
  }

  const stats = {
    sales: orders.filter(o => o.status === 'completed').length,
    activeListings: products.filter(p => p.status === 'active' || p.status === 'available').length,
    pendingProducts: products.filter(p => p.status === 'pending').length,
    pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
  };

  const isLoading = loadingProducts || loadingOrders;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {!user?.student_id_verified && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-900">Verification Required</p>
                <p className="text-xs text-amber-700">You must verify your Student ID before you can list products.</p>
              </div>
            </div>
            <Link to="/settings?tab=verification">
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white border-none rounded-lg text-xs font-bold">
                Verify Now
              </Button>
            </Link>
          </div>
        )}
        {/* Welcome Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-slate-900">Seller Hub</h1>
            <p className="text-slate-500 mt-1">Manage your store, products, and sales in one place.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard/seller/products/new">
              <Button variant="hero" className="gap-2 shadow-lg shadow-primary/20">
                <Plus className="h-4 w-4" /> Add New Product
              </Button>
            </Link>
            <Link to={`/store/${user?.id}`}>
              <Button variant="outline" className="gap-2">
                <Store className="h-4 w-4" /> View My Store
              </Button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-slate-900">{stats.sales}</div>
                  <p className="text-xs mt-1 text-emerald-600 font-bold flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" /> Successful transactions
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wider">Active Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-slate-900">{stats.activeListings}</div>
                  <p className="text-xs mt-1 text-primary font-bold flex items-center">
                    <Package className="h-3 w-3 mr-1" /> Live in marketplace
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pending Approval</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-slate-900">{stats.pendingProducts}</div>
                  <p className="text-xs mt-1 text-amber-500 font-bold flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> Under review
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pending Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-slate-900">{stats.pendingOrders}</div>
                  <p className="text-xs mt-1 text-orange-500 font-bold flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> Actions required
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Recent Orders */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" /> Recent Orders
                  </h2>
                  <Link to="/dashboard/seller/orders" className="text-sm font-bold text-primary hover:underline">View All</Link>
                </div>
                
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                  {orders.length === 0 ? (
                    <div className="p-12 text-center">
                      <ShoppingBag className="h-12 w-12 text-slate-200 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No orders yet. Keep sharing your listings!</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-50">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                          <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                            <img 
                              src={order.product?.images?.[0] || '/placeholder.svg'} 
                              alt="" 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">{order.product?.title || 'Unknown Product'}</p>
                            <p className="text-xs text-slate-500">Bought by {order.buyer?.fullname || 'Student'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-slate-900">₦{order.amount.toLocaleString()}</p>
                            <p className={`text-[10px] font-bold uppercase tracking-tighter ${
                              order.status === 'completed' ? 'text-emerald-500' : 'text-orange-500'
                            }`}>{order.status}</p>
                          </div>
                          <Link to={`/dashboard/seller/orders`}>
                             <Button variant="ghost" size="icon" className="rounded-full h-8 w-8"><ArrowUpRight size={14} /></Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions & Tips */}
              <div className="space-y-6">
                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
                  <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" /> Sales Tip
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Products with at least 3 high-quality images are 40% more likely to sell quickly on campus. Use natural lighting for best results!
                  </p>
                  <Button variant="hero" className="w-full mt-6 bg-primary hover:bg-primary/90 text-white border-none h-12 rounded-2xl">
                    Share My Store
                  </Button>
                </div>

                <div className="space-y-3">
                  <h3 className="font-heading text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Quick Support</h3>
                  <a 
                    href="https://wa.me/2348000000000" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Contact Support</p>
                        <p className="text-xs text-slate-500">Get help via WhatsApp</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default SellerDashboard;
