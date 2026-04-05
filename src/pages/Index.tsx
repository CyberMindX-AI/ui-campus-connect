import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, Store, CreditCard, Star, ChevronDown,
  Users, Package, TrendingUp, Zap, Lock, Clock, CheckCircle2,
  MessageCircle, Heart, Search, BookOpen, Smartphone, UtensilsCrossed,
  Shirt, Monitor, Palette
} from 'lucide-react';
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

const features = [
  { icon: ShieldCheck, title: 'Verified Students Only', desc: 'Every user is verified with a @ui.edu.ng email — trade only with trusted campus members.' },
  { icon: Lock, title: 'Escrow Protection', desc: 'Payments are held securely until you confirm receipt. No more scams or risky deals.' },
  { icon: Zap, title: 'Instant Listings', desc: 'List your products in under 2 minutes with photos, pricing, and delivery options.' },
  { icon: MessageCircle, title: 'In-App Messaging', desc: 'Chat directly with buyers and sellers. Negotiate prices and arrange meetups safely.' },
  { icon: Clock, title: '24-Hour Disputes', desc: 'Raise a dispute within 48 hours and get resolution within 3-5 business days.' },
  { icon: CreditCard, title: 'Secure Payments', desc: 'Pay with Paystack — cards, bank transfers, USSD. Fast, reliable, and protected.' },
];

const successStories = [
  {
    name: 'Adewale T.',
    role: 'Medicine, 400L',
    text: "I sold all my old textbooks in one week! UI Marketplace is a game-changer for students. I made ₦45,000 from books that were just collecting dust.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    rating: 5,
  },
  {
    name: 'Ngozi E.',
    role: 'Law, 300L',
    text: "Finally a safe place to buy things on campus. No more risky WhatsApp deals! The escrow system gives me peace of mind with every purchase.",
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop',
    rating: 5,
  },
  {
    name: 'Femi A.',
    role: 'Engineering, 500L',
    text: "Started my laptop accessories business here. Made ₦200k in my first month! The platform makes it so easy to reach other students.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
    rating: 5,
  },
  {
    name: 'Bukola F.',
    role: 'Agriculture, 200L',
    text: "My food business exploded after joining! I get 20+ orders daily for my jollof rice. Best decision I've made this semester.",
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop',
    rating: 5,
  },
  {
    name: 'Ibrahim K.',
    role: 'Computer Science, 300L',
    text: "Bought a barely-used laptop for half the market price. The seller was verified and the transaction was smooth. 10/10 would recommend!",
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    rating: 5,
  },
  {
    name: 'Chioma N.',
    role: 'Pharmacy, 400L',
    text: "I've been selling handmade crafts and fashion items. Already have 50+ repeat customers. UI Marketplace understands student entrepreneurs!",
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop',
    rating: 5,
  },
];

const topSellers = [
  { name: 'Bukola F.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop', category: 'Food & Drinks', sales: 87, rating: 4.9 },
  { name: 'Adebayo O.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', category: 'Textbooks', sales: 45, rating: 4.8 },
  { name: 'Folake A.', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop', category: 'Handmade', sales: 31, rating: 4.7 },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    const dest = user?.role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer';
    return <Navigate to={dest} replace />;
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(148_60%_32%),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(37_87%_38%/0.15),transparent_50%)]" />
        <div className="container relative mx-auto px-4 py-16 sm:py-20 md:py-28">
          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-3xl text-center">
            <motion.div variants={fadeUp} custom={0} className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground/90 backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              🎓 Exclusive to University of Ibadan Students
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading text-3xl font-extrabold leading-tight text-primary-foreground sm:text-4xl md:text-6xl">
              Buy & Sell Within Your{' '}
              <span className="bg-gradient-to-r from-primary-foreground to-accent bg-clip-text text-transparent">
                Campus Community
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/75 sm:mt-5 sm:text-lg">
              The University of Ibadan's official student marketplace. Trade textbooks, electronics, food, services — safely and exclusively with fellow UI members.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center">
              <Link to="/register">
                <Button size="lg" variant="accent" className="gap-2 px-8 text-base">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="hero-outline" className="border-primary-foreground/30 px-8 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Browse Products
                </Button>
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} custom={4} className="mt-4 text-xs text-primary-foreground/50">
              ✓ Free to join &nbsp; ✓ No hidden fees &nbsp; ✓ Secure escrow payments
            </motion.p>
          </motion.div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="hsl(140 20% 97%)" />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto grid grid-cols-3 divide-x divide-border px-4 py-6">
          {[
            { icon: Package, label: 'Active Listings', value: '1,247+' },
            { icon: Users, label: 'Verified Students', value: '389+' },
            { icon: TrendingUp, label: 'Transactions', value: '3,456+' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-1 px-4 text-center"
            >
              <s.icon className="h-5 w-5 text-primary" />
              <span className="font-heading text-xl font-bold text-foreground md:text-2xl">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">HOW IT WORKS</span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">Get Started in 3 Simple Steps</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Join thousands of UI students already trading on the safest campus marketplace</p>
          </div>
          <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-3">
            {[
              { step: '01', icon: ShieldCheck, title: 'Verify with UI Email', desc: 'Sign up with your @ui.edu.ng email to join the trusted campus community. Verification takes under a minute.' },
              { step: '02', icon: Store, title: 'Browse or List Items', desc: 'Discover products from fellow students or create your own listings with photos and details in minutes.' },
              { step: '03', icon: CreditCard, title: 'Buy & Sell Safely', desc: 'Secure payments via Paystack with escrow protection. Funds released only after buyer confirms receipt.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                  Step {item.step}
                </span>
                <div className="mx-auto mb-4 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-card-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="bg-card py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">CATEGORIES</span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">Find What You Need</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">From textbooks to food, electronics to services — everything a student needs</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-background p-4 transition-all hover:border-primary hover:shadow-md sm:p-5"
                >
                  <span className="text-3xl sm:text-4xl">{cat.icon}</span>
                  <span className="text-sm font-medium text-card-foreground">{cat.name}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{cat.count} items</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">TRENDING</span>
              <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">Hot Right Now 🔥</h2>
            </div>
            <Link to="/products" className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex sm:items-center sm:gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-3 grid-cols-2 sm:gap-4 md:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link to="/products">
              <Button variant="outline" className="gap-2">View All Products <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-card py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">WHY UI MARKETPLACE</span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">Built for Students, By Students</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">Everything you need to buy and sell safely within the University of Ibadan community</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-2xl border border-border bg-background p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Sellers */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">TOP SELLERS</span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">Meet Our Star Sellers ⭐</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {topSellers.map((seller, i) => (
              <motion.div
                key={seller.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <img src={seller.avatar} alt={seller.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-heading text-sm font-semibold text-foreground">{seller.name}</p>
                  <p className="text-xs text-muted-foreground">{seller.category}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 text-accent">
                      <Star className="h-3 w-3 fill-current" /> {seller.rating}
                    </span>
                    <span>{seller.sales} sales</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary/5 py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">TESTIMONIALS</span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">What Students Are Saying</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Real reviews from real University of Ibadan students</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {successStories.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-card-foreground">"{t.text}"</p>
                <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <CheckCircle2 className="ml-auto h-4 w-4 text-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <section className="bg-card py-14 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-primary-dark to-primary p-6 text-primary-foreground sm:p-10">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <div>
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">Your Safety is Our Priority</h2>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
                  Every transaction on UI Marketplace is protected by our multi-layer security system. From verified student accounts to escrow-protected payments, we've built the safest way to trade on campus.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: ShieldCheck, label: 'Email Verification', desc: '@ui.edu.ng only' },
                  { icon: Lock, label: 'Escrow Payments', desc: 'Funds protected' },
                  { icon: MessageCircle, label: '24/7 Support', desc: 'Always available' },
                  { icon: CheckCircle2, label: 'Dispute Resolution', desc: '3-5 day turnaround' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-primary-foreground/10 p-3 backdrop-blur sm:p-4">
                    <item.icon className="h-5 w-5 text-primary-foreground/90" />
                    <p className="mt-2 text-xs font-semibold text-primary-foreground sm:text-sm">{item.label}</p>
                    <p className="text-[10px] text-primary-foreground/60 sm:text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">FAQ</span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">Frequently Asked Questions</h2>
          </div>
          <div className="mt-8 space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="rounded-xl border border-border bg-card shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-4 text-left text-sm font-medium text-card-foreground"
                >
                  {faq.q}
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-border px-4 pb-4 pt-2 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-16 text-center sm:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl font-bold text-primary-foreground sm:text-3xl md:text-4xl">
              Ready to Join the UI Marketplace Community?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/70 sm:text-base">
              Sign up with your @ui.edu.ng email and start buying or selling today. It's 100% free to get started.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/register">
                <Button variant="accent" size="lg" className="gap-2 px-8 text-base">
                  Create Your Account <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="hero-outline" size="lg" className="border-primary-foreground/30 px-8 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Browse First
                </Button>
              </Link>
            </div>
            <div className="mx-auto mt-8 flex max-w-sm flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-primary-foreground/50">
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Free forever</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> No credit card</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Secure & private</span>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
