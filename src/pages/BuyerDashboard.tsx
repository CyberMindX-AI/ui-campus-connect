import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, MessageSquare, Heart, Package, TrendingUp, Clock, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/mock';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const quickActions = [
  { icon: ShoppingBag, label: 'Browse Products', to: '/products', color: 'bg-primary/10 text-primary' },
  { icon: Package, label: 'My Orders', to: '/dashboard/buyer/orders', color: 'bg-accent/10 text-accent' },
  { icon: MessageSquare, label: 'Messages', to: '/messages', color: 'bg-blue-500/10 text-blue-500' },
  { icon: Heart, label: 'Wishlist', to: '/wishlist', color: 'bg-pink-500/10 text-pink-500' },
];

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-5 text-primary-foreground sm:mb-8 sm:p-8"
        >
          <h1 className="font-heading text-xl font-bold sm:text-2xl lg:text-3xl">
            {greeting}, Student! 👋
          </h1>
          <p className="mt-1 text-sm text-primary-foreground/80 sm:text-base">
            {new Date().toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/products">
              <Button size="sm" className="bg-white text-primary hover:bg-white/90">
                <ShoppingBag className="mr-2 h-4 w-4" /> Start Shopping
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:grid-cols-4 sm:gap-4">
          {quickActions.map((action, i) => (
            <motion.div key={action.label} custom={i} variants={fadeUp} initial="hidden" animate="visible">
              <Link
                to={action.to}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/30 hover:shadow-md sm:p-5"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color} sm:h-12 sm:w-12`}>
                  <action.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="text-xs font-medium text-foreground sm:text-sm">{action.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Active Orders */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="lg:col-span-2"
          >
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border p-4 sm:p-5">
                <h2 className="font-heading text-base font-semibold text-foreground sm:text-lg">Recent Orders</h2>
                <Link to="/dashboard/buyer/orders" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline sm:text-sm">
                  View all <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{order.item}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {order.id} · {order.seller} · {order.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-foreground">₦{order.amount.toLocaleString()}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Sidebar */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Your Activity</h3>
              <div className="space-y-3">
                {[
                  { icon: Package, label: 'Total Orders', value: '12' },
                  { icon: TrendingUp, label: 'Amount Spent', value: '₦47,500' },
                  { icon: Star, label: 'Reviews Given', value: '8' },
                  { icon: Clock, label: 'Member Since', value: 'Jan 2025' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <stat.icon className="h-4 w-4" />
                      <span className="text-xs sm:text-sm">{stat.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unread Messages */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Messages</h3>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">3</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">You have 3 unread messages from sellers</p>
              <Link to="/messages">
                <Button variant="outline" size="sm" className="mt-3 w-full text-xs">Open Messages</Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Category Quick Access */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mt-6 sm:mt-8">
          <h2 className="mb-4 font-heading text-base font-semibold text-foreground sm:text-lg">Browse by Category</h2>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3 lg:grid-cols-10">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-3 text-center transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <span className="text-xl sm:text-2xl">{cat.icon}</span>
                <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">{cat.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recommended Products */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mt-6 sm:mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-base font-semibold text-foreground sm:text-lg">Recommended For You</h2>
            <Link to="/products" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline sm:text-sm">
              See all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default BuyerDashboard;
