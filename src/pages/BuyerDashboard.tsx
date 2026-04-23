import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, MessageSquare, Heart, Package, TrendingUp, Star, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/contexts/AuthContext';
import { useCategories } from '@/hooks/api/useMarket';
import { useProducts } from '@/hooks/api/useProducts';

const recentOrders = [
  { id: 'ORD-2025-001', item: 'Organic Chemistry Textbook', seller: 'Adebayo O.', amount: 4500, status: 'Delivered', date: '2025-06-28' },
  { id: 'ORD-2025-002', item: 'Homemade Jollof Rice & Chicken', seller: 'Bukola F.', amount: 1500, status: 'Processing', date: '2025-06-30' },
  { id: 'ORD-2025-003', item: 'HP Laptop Charger', seller: 'Grace O.', amount: 5500, status: 'Pending', date: '2025-07-01' },
];

const statusColors: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Pending: 'bg-muted text-muted-foreground',
  Cancelled: 'bg-red-100 text-red-700',
};

const BuyerDashboard = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const { user, isAuthenticated } = useAuth();
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10 max-w-7xl">
        {/* Top Section: Greeting & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {greeting}, {user?.fullname?.split(' ')[0] || 'Student'}
            </h1>
            <p className="text-slate-500 font-medium">
              What can we help you find on campus today?
            </p>
          </div>
          
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search for textbooks, food, or services..." 
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Active Orders", value: "3", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Messages", value: "8", icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Wishlist Items", value: "12", icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
            { label: "Total Spent", value: "₦47,500", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Active Orders Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Active Orders</h2>
                <Link to="/dashboard/buyer/orders" className="text-sm font-bold text-primary hover:underline">Manage Orders</Link>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-50">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
                          <Package className="h-6 w-6 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-none mb-1">{order.item}</p>
                          <p className="text-xs font-medium text-slate-400">Order #{order.id} • Seller: {order.seller}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-bold text-slate-900">₦{order.amount.toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                        <ChevronRight className="h-5 w-5 text-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Recommendations */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Inspired by your shopping</h2>
                <Link to="/products" className="text-sm font-bold text-primary hover:underline">View All</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {products.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Secondary Content */}
          <div className="space-y-10">
            {/* Quick Access Categories */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                {categories.slice(0, 6).map((cat) => (
                  <Link 
                    key={cat.slug} 
                    to={`/products?category=${cat.slug}`}
                    className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all text-center"
                  >
                    <span className="text-2xl mb-2">{cat.icon}</span>
                    <span className="text-xs font-bold text-slate-900">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Profile Health / Trust Box */}
            <section className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Campus Trust Badge</h3>
                <p className="text-slate-400 text-sm mb-4">Complete 5 successful transactions to earn your "Verified Buyer" badge.</p>
                <div className="w-full bg-white/10 h-2 rounded-full mb-2">
                  <div className="bg-primary h-full w-[60%] rounded-full"></div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">3 / 5 COMPLETED</p>
              </div>
              <div className="absolute -bottom-6 -right-6 opacity-10">
                <TrendingUp className="h-32 w-32" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyerDashboard;
