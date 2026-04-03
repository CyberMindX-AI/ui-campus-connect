import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Store, CreditCard, Star, ChevronDown, Users, Package, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, categories, stats, testimonials, faqs } from '@/data/mock';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard/buyer" replace />;
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(148_60%_32%),transparent_60%)]" />
        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-3xl text-center">
            <motion.div variants={fadeUp} custom={0} className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground/90 backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              Verified UI Community Only
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
              Buy & Sell Within Your{' '}
              <span className="bg-gradient-to-r from-primary-foreground to-accent bg-clip-text text-transparent">
                Campus Community
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mx-auto mt-5 max-w-xl text-lg text-primary-foreground/75">
              The University of Ibadan's official student marketplace. Trade textbooks, electronics, food, services — safely and exclusively with fellow UI members.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/register">
                <Button size="lg" variant="accent" className="gap-2 px-8 text-base">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="hero-outline" className="border-primary-foreground/30 px-8 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Browse Products
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-background">
        <div className="container mx-auto grid grid-cols-3 divide-x divide-border px-4 py-6">
          {[
            { icon: Package, label: 'Active Listings', value: stats.totalListings.toLocaleString() },
            { icon: Users, label: 'Sellers', value: stats.totalSellers.toLocaleString() },
            { icon: TrendingUp, label: 'Transactions', value: stats.totalTransactions.toLocaleString() },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-4 text-center">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="font-heading text-xl font-bold text-foreground md:text-2xl">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-heading text-3xl font-bold text-foreground">How It Works</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">Get started in 3 simple steps</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { step: '1', icon: ShieldCheck, title: 'Verify with UI Email', desc: 'Sign up with your @ui.edu.ng email to join the trusted campus community.' },
              { step: '2', icon: Store, title: 'Browse or List', desc: 'Discover products from fellow students or create your own listings in minutes.' },
              { step: '3', icon: CreditCard, title: 'Buy & Sell Safely', desc: 'Secure payments via Paystack with escrow protection for every transaction.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-card-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-heading text-3xl font-bold text-foreground">Browse Categories</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-medium text-card-foreground">{cat.name}</span>
                <span className="text-xs text-muted-foreground">{cat.count} items</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-3xl font-bold text-foreground">Trending Now</h2>
            <Link to="/products" className="text-sm font-medium text-primary hover:underline">View all →</Link>
          </div>
          <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary-light py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-heading text-3xl font-bold text-foreground">What Students Say</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl border border-border bg-card p-6">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-3 text-sm text-card-foreground">"{t.text}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-16">
        <div className="container mx-auto max-w-2xl px-4">
          <h2 className="text-center font-heading text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-card">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-4 text-left text-sm font-medium text-card-foreground"
                >
                  {faq.q}
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-border px-4 pb-4 pt-2 text-sm text-muted-foreground">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">Ready to Join UI Marketplace?</h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/70">
            Sign up with your @ui.edu.ng email and start buying or selling today.
          </p>
          <Link to="/register">
            <Button variant="accent" size="lg" className="mt-6 gap-2 px-8 text-base">
              Create Your Account <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
