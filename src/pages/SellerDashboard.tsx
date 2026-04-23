import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus, Package, MessageSquare, Wallet, TrendingUp, ShoppingCart,
  Star, Eye, ChevronRight, AlertTriangle, BarChart3, BadgeCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const overviewCards = [
  { icon: TrendingUp, label: 'Total Sales', value: '₦0', change: '0%', color: 'bg-primary/10 text-primary' },
  { icon: ShoppingCart, label: 'Total Orders', value: '0', change: '0', color: 'bg-blue-500/10 text-blue-500' },
  { icon: Package, label: 'Active Listings', value: '0', change: '0 new', color: 'bg-accent/10 text-accent' },
  { icon: Star, label: 'Avg Rating', value: '0.0', change: '0.0', color: 'bg-yellow-500/10 text-yellow-600' },
];

const quickActions = [
  { icon: Plus, label: 'Add Product', to: '/dashboard/seller/products/new', variant: 'hero' as const },
  { icon: Package, label: 'My Listings', to: '/dashboard/seller/products', variant: 'outline' as const },
  { icon: MessageSquare, label: 'Messages', to: '/messages', variant: 'outline' as const },
  { icon: Wallet, label: 'Withdraw', to: '/wallet', variant: 'outline' as const },
];

// Live data to be hydrated from backend:
const recentOrders: any[] = [];
const topProducts: any[] = [];

const statusColors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const SellerDashboard = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10 max-w-7xl">
        {/* Professional Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              {greeting}, {user?.fullname?.split(' ')[0] || 'Seller'}
              {user?.isVerified && (
                <BadgeCheck className="h-6 w-6 text-blue-500 fill-blue-500/10" />
              )}
            </h1>
            <p className="text-slate-500 font-medium">
              Manage your campus business and track your store performance.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {quickActions.map((action) => (
              <Link key={action.label} to={action.to} className="flex-1 sm:flex-none">
                <Button
                  className={`${action.variant === 'hero' ? 'bg-slate-900 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'} font-bold shadow-sm rounded-xl px-4 sm:px-6 w-full text-xs sm:text-sm h-10 sm:h-11`}
                >
                  <action.icon className="mr-2 h-4 w-4" /> {action.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Business Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {overviewCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{card.change}</span>
              </div>
              <p className="text-2xl font-black text-slate-900 leading-none">{card.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Financial & Alerts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group overflow-hidden relative">
            <div className="flex items-start gap-6 relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm shadow-emerald-100/50">
                <Wallet className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Balance</p>
                <p className="text-3xl font-black text-slate-900">₦0</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50 relative z-10">
              <p className="text-sm font-medium text-slate-500">Pending Clearance: <span className="text-slate-900 font-bold">₦0</span></p>
              <Link to="/wallet">
                <Button className="bg-slate-100 hover:bg-slate-200 text-slate-400 font-bold px-8 rounded-xl cursor-not-allowed" disabled>
                  Withdraw Funds
                </Button>
              </Link>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
              <Wallet className="h-48 w-48" />
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden group">
            <div className="flex items-start gap-4 relative z-10">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Store Performance</h3>
                <p className="text-sm font-medium text-slate-400 mt-1">Your store is now active. Listings will appear in search results.</p>
              </div>
            </div>
            <Link to="/dashboard/seller/products" className="relative z-10">
              <Button variant="outline" className="mt-6 w-full border-white/20 text-white hover:bg-white/10 font-bold rounded-xl py-6">
                Add New Listing
              </Button>
            </Link>
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform">
              <Store className="h-40 w-40" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Sales Data (Reset) */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Recent Sales</h2>
                <Link to="/dashboard/seller/orders" className="text-sm font-bold text-primary hover:underline">View All Orders</Link>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-12 text-center">
                  <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart className="h-10 w-10 text-slate-200" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">No Sales Yet</h3>
                  <p className="text-slate-500 font-medium max-w-xs mx-auto">
                    Your store is live! New orders will appear here as students browse your listings.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar (Reset) */}
          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Top Performers</h2>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-6">
                <div className="text-center py-6">
                  <BarChart3 className="h-10 w-10 text-slate-100 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">No data available</p>
                </div>
              </div>
            </section>

            <section 
              onClick={() => setProfileModalOpen(true)}
              className="bg-white border border-slate-100 rounded-3xl p-8 text-slate-900 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Store Health</h3>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                  <span className="uppercase tracking-widest text-slate-300">COMPLETION</span>
                  <span className="text-rose-500">0%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full mb-6">
                  <div className="h-full w-[0%] bg-rose-500 rounded-full"></div>
                </div>
                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 font-bold rounded-xl">
                  Complete Profile
                </Button>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:scale-110 transition-transform text-slate-900">
                <BadgeCheck className="h-40 w-40" />
              </div>
            </section>
          </div>
        </div>
      </div>

      <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Complete Your Store Profile</DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              Follow these steps to build trust and increase your campus visibility.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 pt-6">
            {[
              { id: 1, title: 'Add a Store Banner', desc: 'Personalize your storefront with high-quality images.' },
              { id: 2, title: 'Verify Phone Number', desc: 'Mandatory for high-value items (over ₦50,000).' },
              { id: 3, title: 'Create First Listing', desc: 'Start selling to 5,000+ students on campus.' },
              { id: 4, title: 'Set Delivery Areas', desc: 'Specify which halls/faculties you deliver to.' }
            ].map((step) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 font-bold shrink-0">{step.id}</div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{step.title}</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={() => setProfileModalOpen(false)} className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 rounded-xl">
              Get Started
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SellerDashboard;
