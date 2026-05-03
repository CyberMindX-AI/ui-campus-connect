import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, MessageSquare, Heart, TrendingUp, ChevronRight, Search, BookOpen, Utensils, Laptop, Shirt, Wrench, LayoutGrid } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const getCategoryIcon = (slug: string): LucideIcon => {
  const s = slug.toLowerCase();
  const map: Record<string, LucideIcon> = {
    textbooks: BookOpen,
    food: Utensils,
    'food-drinks': Utensils,
    electronics: Laptop,
    fashion: Shirt,
    'fashion-accessories': Shirt,
    services: Wrench,
  };
  return map[s] || LayoutGrid;
};
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/contexts/AuthContext';
import { useCategories } from '@/hooks/api/useMarket';
import { useProducts } from '@/hooks/api/useProducts';
import { useBuyerOrders } from '@/hooks/api/useOrders';
import { useWishlist } from '@/hooks/api/useWishlist';

const BuyerDashboard = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const { user, isAuthenticated } = useAuth();
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const { data: orders = [] } = useBuyerOrders();
  const { data: wishlist = [] } = useWishlist();

  const totalSpent = orders.reduce((acc: number, order: any) => acc + (order.amount || 0), 0);
  const activeOrders = orders.filter((o: any) => o.status !== 'Completed' && o.status !== 'Cancelled').length;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 'seller') {
    return <Navigate to="/dashboard/seller" replace />;
  }

  const handleContactAdmin = () => {
    const message = `Hello Admin, I am a buyer on UI Marketplace and need assistance with a product or order.\n\nBuyer: ${user?.fullname || 'Unknown'}\nEmail: ${user?.email || ''}\n\nPlease help me. Thank you.`;
    window.open(`https://wa.me/2348000000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10 max-w-7xl">
        {/* Fiverr-Style Hero Search Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight md:text-5xl">
              {greeting}, {user?.fullname?.split(' ')[0] || 'Student'}
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
              Find everything you need for campus life, from textbooks to delicious meals.
            </p>
          </div>
          
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-4 sm:left-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search e.g. 'Laptop'..." 
              className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-4 sm:py-5 bg-white border-2 border-slate-100 rounded-xl sm:rounded-2xl shadow-xl shadow-slate-200/50 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-slate-900 text-base sm:text-lg placeholder:text-slate-400"
            />
            <button className="hidden sm:block absolute right-3 top-2.5 bottom-2.5 px-8 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg">
              Search
            </button>
          </div>

          {/* Quick Browse Categories (Fiverr-style pills) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <span className="text-sm font-bold text-slate-400 mr-2">Popular:</span>
            {categories.slice(0, 5).map((cat) => (
              <Link 
                key={cat.slug} 
                to={`/products?category=${cat.slug}`}
                className="px-5 py-2 bg-white border border-slate-100 rounded-full text-sm font-bold text-slate-600 hover:border-primary hover:text-primary hover:shadow-md transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { label: "Active Orders", value: activeOrders.toString(), icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50", link: '/dashboard/buyer/orders' },
            { label: "Wishlist Items", value: wishlist.length.toString(), icon: Heart, color: "text-rose-600", bg: "bg-rose-50", link: '/wishlist' },
            { label: "Total Spent", value: `₦${totalSpent.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", link: null }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {stat.link ? (
                <Link to={stat.link} className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Categories Sidebar (Fiverr style) */}
          <div className="space-y-8">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Quick Categories</h2>
            <div className="grid grid-cols-1 gap-4">
              {categories.slice(0, 6).map((cat) => (
                <Link 
                  key={cat.slug} 
                  to={`/products?category=${cat.slug}`}
                  className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-primary group-hover:scale-110 transition-transform">
                      {(() => { const Icon = getCategoryIcon(cat.slug); return <Icon className="h-8 w-8" />; })()}
                    </div>
                    <span className="font-bold text-slate-700">{cat.name}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Empty State for Orders */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center">
              <div className="h-20 w-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-10 w-10 text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Active Orders</h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto mb-8">
                You haven't placed any orders yet. Start browsing to find what you need!
              </p>
              <Link to="/products">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 rounded-xl h-12 shadow-lg">
                  Browse Marketplace
                </Button>
              </Link>
            </div>

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
            {/* Contact Admin */}
            <section className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                <p className="text-slate-400 text-sm mb-4">Have a question about a product or seller? Contact the admin directly on WhatsApp for fast support.</p>
                <Button
                  onClick={handleContactAdmin}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl h-11 gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Contact Admin on WhatsApp
                </Button>
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
