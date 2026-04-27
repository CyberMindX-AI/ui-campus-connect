import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, Store, CreditCard, Star, ChevronDown,
  Users, Package, TrendingUp, Zap, Lock, Clock, CheckCircle2,
  MessageCircle, Heart, Search, BookOpen, Smartphone, UtensilsCrossed,
  Shirt, Monitor, Palette, MousePointer2, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useMarketStats, useMarketFaqs } from '@/hooks/api/useMarket';

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isAuthenticated, user } = useAuth();
  const { data: statsData } = useMarketStats();
  const { data: faqsData = [] } = useMarketFaqs();

  if (isAuthenticated) {
    const dest = user?.role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer';
    return <Navigate to={dest} replace />;
  }

  const stats = statsData || { totalListings: 0, totalSellers: 0, totalTransactions: 0 };
  const displayFaqs = (Array.isArray(faqsData) && faqsData.length > 0) ? faqsData : [
    {
      q: "Is it exclusively for UI students?",
      a: "Absolutely. Every account is tied to a verified @ui.edu.ng email address. This ensures a closed, trusted ecosystem for all campus transactions."
    },
    {
      q: "How does the payment protection work?",
      a: "We use a secure escrow system. When you pay for an item, the funds are held by UI Marketplace and only released to the seller once you confirm receipt of the item."
    },
    {
      q: "What can I sell on UI Marketplace?",
      a: "From textbooks and electronics to fashion and food services — as long as it's legal and follows campus guidelines, you can list it."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white border-b border-slate-100">
        {/* Subtle Background Detail - Grid/Line Effect */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1.5px,transparent_1.5px),linear-gradient(to_bottom,#e2e8f0_1.5px,transparent_1.5px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] opacity-80"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-32 md:pt-40">
          <div className="max-w-4xl mx-auto text-center" id="about">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold tracking-wider uppercase mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Verified UI Community Only
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.2] md:leading-[1.1] mb-8"
            >
              Buy, Sell & Trade <br className="hidden sm:block" />
              <span className="text-primary italic">Inside</span> the Net.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              The premier campus marketplace for the University of Ibadan. 
              Connect with trusted students for seamless transactions, clear requests, and secure logistics.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/register">
                <Button size="lg" className="h-14 px-10 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-base font-semibold shadow-xl shadow-slate-200">
                  Join UI Marketplace
                </Button>
              </Link>
              <a href="#how">
                <Button size="lg" variant="ghost" className="h-14 px-10 rounded-xl text-slate-600 hover:bg-slate-50 text-base font-semibold">
                  How it works <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-slate-100 py-12">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-slate-900 mb-2">{stats.totalSellers.toLocaleString()}</h3>
              <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">Verified Sellers</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-slate-900 mb-2">{stats.totalListings.toLocaleString()}</h3>
              <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">Active Listings</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-slate-900 mb-2">{stats.totalTransactions.toLocaleString()}</h3>
              <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">Successful Trades</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Errandly Style */}
      <section id="how" className="py-24 bg-white border-b border-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">How it works — on the net</h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              UI Marketplace connects students who need things with trusted campus sellers. 
              List your product, agree on a price, and watch it get delivered — securely, swiftly, and transparently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {[
              { 
                step: "1", 
                title: "Verification", 
                subtitle: "Join the net",
                desc: "Everyone starts as a verified student. We check @ui.edu.ng emails so people can trust transactions on the net."
              },
              { 
                step: "2", 
                title: "List Product", 
                subtitle: "Your items, your price",
                desc: "Describe your item with photos, condition, and a price. Clear listings get picked faster by buyers on campus."
              },
              { 
                step: "3", 
                title: "Match & Chat", 
                subtitle: "Agreement in a tap",
                desc: "A buyer accepts your offer or starts a chat. Connect via our in-app messenger for real-time coordination."
              },
              { 
                step: "4", 
                title: "Secure Payment", 
                subtitle: "Funds in escrow",
                desc: "The buyer pays the agreed amount. Funds are held securely in our system until the transaction is complete."
              },
              { 
                step: "5", 
                title: "Coordinate", 
                subtitle: "Meet on campus",
                desc: "Arrange a pickup or delivery at a safe campus location. All details logged for security on the net."
              },
              { 
                step: "6", 
                title: "Payout", 
                subtitle: "Done, confirmed, paid",
                desc: "Once received and confirmed, funds land in your wallet immediately for easy withdrawal."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col"
              >
                <div className="text-primary font-bold text-sm mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px]">{item.step}</span>
                  <span className="uppercase tracking-widest">{item.title}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.subtitle}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Built for student life, <br />scaled for campus.</h2>
              <ul className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Verified Student Profiles", desc: "No anonymous accounts. Every user is a current UI student." },
                  { icon: Lock, title: "Transparent Payment Flow", desc: "Clear escrow tracking from the moment you pay to the final payout." },
                  { icon: Clock, title: "Fast Local Turnaround", desc: "Trade within minutes since everyone is right here on campus." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 h-5 w-5 text-primary shrink-0"><item.icon className="h-5 w-5" /></div>
                    <div>
                      <p className="font-bold text-lg mb-1">{item.title}</p>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-transparent absolute -inset-10 blur-3xl opacity-50"></div>
              <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-700 animate-pulse"></div>
                    <div>
                      <div className="h-3 w-24 bg-slate-700 rounded mb-2"></div>
                      <div className="h-2 w-16 bg-slate-800 rounded"></div>
                    </div>
                  </div>
                  <div className="h-8 w-20 bg-primary/20 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-slate-700/50 rounded"></div>
                  <div className="h-4 w-[90%] bg-slate-700/50 rounded"></div>
                  <div className="h-4 w-[70%] bg-slate-700/50 rounded"></div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">₦15,000</div>
                  <div className="h-10 w-32 bg-primary rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Reset) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Trusted by UI Students</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Join the growing community of students buying and selling securely on the net. 
            Real reviews from real transactions will appear here soon.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-16 text-center">FAQ — built for the net</h2>
          <div className="space-y-4">
            {displayFaqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 text-slate-500 leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white border-t border-slate-100 text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Ready to get started?</h2>
            <p className="text-lg text-slate-500 mb-12">
              Join {stats.totalSellers}+ UI students trading securely on the net. 
              Clear posts, secure payments, and verified campus logistics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="h-14 px-10 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-base font-semibold">
                  Start Trading
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 text-base font-semibold">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-slate-400 font-medium text-sm">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Verified couriers</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Escrowed payment</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Same‑day payout</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
