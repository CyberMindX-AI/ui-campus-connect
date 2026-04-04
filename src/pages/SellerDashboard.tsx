import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus, Package, MessageSquare, Wallet, TrendingUp, ShoppingCart,
  Star, Eye, ChevronRight, AlertTriangle, BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const overviewCards = [
  { icon: TrendingUp, label: 'Total Sales', value: '₦187,500', change: '+12%', color: 'bg-primary/10 text-primary' },
  { icon: ShoppingCart, label: 'Total Orders', value: '34', change: '+5', color: 'bg-blue-500/10 text-blue-500' },
  { icon: Package, label: 'Active Listings', value: '12', change: '2 new', color: 'bg-accent/10 text-accent' },
  { icon: Star, label: 'Avg Rating', value: '4.7', change: '↑ 0.2', color: 'bg-yellow-500/10 text-yellow-600' },
];

const quickActions = [
  { icon: Plus, label: 'Add Product', to: '/dashboard/seller/products/new', variant: 'hero' as const },
  { icon: Package, label: 'My Listings', to: '/dashboard/seller/products', variant: 'outline' as const },
  { icon: MessageSquare, label: 'Messages', to: '/messages', variant: 'outline' as const },
  { icon: Wallet, label: 'Withdraw', to: '/wallet', variant: 'outline' as const },
];

const recentOrders = [
  { id: 'ORD-2025-101', buyer: 'Tunde M.', item: 'Organic Chemistry Textbook', amount: 4500, status: 'New', date: '2025-07-01' },
  { id: 'ORD-2025-098', buyer: 'Amina S.', item: 'Handmade Ankara Bag', amount: 8500, status: 'Processing', date: '2025-06-30' },
  { id: 'ORD-2025-095', buyer: 'Chidi E.', item: 'HP Laptop Charger', amount: 5500, status: 'Completed', date: '2025-06-28' },
  { id: 'ORD-2025-090', buyer: 'Kemi O.', item: 'Standing Fan', amount: 15000, status: 'Completed', date: '2025-06-25' },
];

const topProducts = [
  { name: 'Homemade Jollof Rice', views: 342, sales: 87, revenue: 130500 },
  { name: 'Organic Chemistry Textbook', views: 198, sales: 23, revenue: 103500 },
  { name: 'Ankara Laptop Bag', views: 156, sales: 31, revenue: 263500 },
];

const statusColors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Completed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const SellerDashboard = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl bg-gradient-to-r from-primary-dark to-primary p-5 text-primary-foreground sm:mb-8 sm:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-xl font-bold sm:text-2xl lg:text-3xl">
                {greeting}, Seller! 🏪
              </h1>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Here's how your store is performing today
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.to}>
                  <Button
                    size="sm"
                    variant={action.variant}
                    className={action.variant === 'hero' ? '' : 'border-white/30 text-white hover:bg-white/10'}
                  >
                    <action.icon className="mr-1.5 h-4 w-4" /> {action.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4 lg:grid-cols-4">
          {overviewCards.map((card, i) => (
            <motion.div
              key={card.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="rounded-xl border border-border bg-card p-4 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.color}`}>
                  <card.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="text-[10px] font-medium text-green-600 sm:text-xs">{card.change}</span>
              </div>
              <p className="mt-3 text-lg font-bold text-foreground sm:text-xl">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Wallet + Alerts Row */}
        <div className="mb-6 grid gap-4 sm:mb-8 sm:grid-cols-2">
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="rounded-xl border border-border bg-card p-4 sm:p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Wallet Balance</p>
                <p className="text-xl font-bold text-foreground">₦142,300</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Pending: ₦18,500</span>
              <Link to="/wallet">
                <Button variant="hero" size="sm" className="text-xs">Withdraw</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 sm:p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-800">Inventory Alerts</p>
                <p className="text-xs text-yellow-600">2 products are low on stock</p>
              </div>
            </div>
            <Link to="/dashboard/seller/products" className="mt-2 block text-xs font-medium text-yellow-700 hover:underline">
              View listings →
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Recent Orders */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border p-4 sm:p-5">
                <h2 className="font-heading text-base font-semibold text-foreground sm:text-lg">Recent Orders</h2>
                <Link to="/dashboard/seller/orders" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline sm:text-sm">
                  View all <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{order.item}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {order.id} · Buyer: {order.buyer} · {order.date}
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

          {/* Top Products */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border p-4 sm:p-5">
                <BarChart3 className="h-4 w-4 text-primary" />
                <h2 className="font-heading text-base font-semibold text-foreground sm:text-lg">Top Products</h2>
              </div>
              <div className="divide-y divide-border">
                {topProducts.map((product, i) => (
                  <div key={product.name} className="p-4 sm:p-5">
                    <p className="text-sm font-medium text-foreground">
                      <span className="mr-2 text-muted-foreground">#{i + 1}</span>
                      {product.name}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {product.views}</span>
                      <span className="flex items-center gap-1"><ShoppingCart className="h-3 w-3" /> {product.sales}</span>
                      <span className="font-medium text-foreground">₦{product.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Store Completion */}
            <div className="mt-4 rounded-xl border border-border bg-card p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-foreground">Store Profile</h3>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Profile completion</span>
                  <span className="font-medium text-primary">75%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-muted">
                  <div className="h-full w-3/4 rounded-full bg-primary transition-all" />
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Add a store banner to complete your profile</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
