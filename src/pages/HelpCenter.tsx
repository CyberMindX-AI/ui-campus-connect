import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, MessageCircle, Mail, ShieldCheck, CreditCard, Package, Store, Users, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const helpCategories = [
  { icon: Users, title: 'Account & Registration', articles: [
    'How to register with your @ui.edu.ng email',
    'Verifying your email address',
    'Updating your profile information',
    'Resetting your password',
  ]},
  { icon: ShieldCheck, title: 'Safety & Trust', articles: [
    'How escrow protection works',
    'Tips for safe campus transactions',
    'Identifying suspicious listings',
    'Reporting a scam or unsafe behaviour',
  ]},
  { icon: CreditCard, title: 'Payments & Wallet', articles: [
    'How payments work on UI Marketplace',
    'Withdrawing funds from your wallet',
    'Payment methods accepted (Paystack)',
    'Understanding service fees and commissions',
  ]},
  { icon: Package, title: 'Orders & Delivery', articles: [
    'Tracking your order status',
    'Confirming receipt of an item',
    'How campus pickup works',
    'Digital delivery for online products',
  ]},
  { icon: Store, title: 'Selling on UI Marketplace', articles: [
    'How to create a product listing',
    'Setting prices and negotiation',
    'Managing your store profile',
    'Handling returns and exchanges',
  ]},
  { icon: AlertTriangle, title: 'Disputes & Refunds', articles: [
    'How to raise a dispute',
    'Dispute resolution timeline',
    'Requesting a refund',
    'Appealing a dispute decision',
  ]},
];

const HelpCenter = () => {
  const [search, setSearch] = useState('');
  const [openCat, setOpenCat] = useState<number | null>(0);

  const filteredCategories = helpCategories.filter((cat) =>
    !search || cat.title.toLowerCase().includes(search.toLowerCase()) ||
    cat.articles.some((a) => a.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Help Center</h1>
          <p className="mt-2 text-sm text-muted-foreground">Find answers to common questions about UI Marketplace</p>
          <div className="relative mx-auto mt-6 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          {filteredCategories.map((cat, i) => (
            <div key={cat.title} className="rounded-xl border border-border bg-card">
              <button
                onClick={() => setOpenCat(openCat === i ? null : i)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <cat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{cat.title}</p>
                    <p className="text-xs text-muted-foreground">{cat.articles.length} articles</p>
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openCat === i ? 'rotate-180' : ''}`} />
              </button>
              {openCat === i && (
                <div className="border-t border-border px-4 pb-4">
                  {cat.articles.map((article) => (
                    <button
                      key={article}
                      className="mt-2 block w-full rounded-lg p-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {article}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-border bg-card p-6 text-center">
          <MessageCircle className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-3 font-heading text-lg font-semibold text-foreground">Still need help?</h2>
          <p className="mt-1 text-sm text-muted-foreground">Our support team is available to assist you</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/support">
              <Button variant="hero">Contact Support</Button>
            </Link>
            <a href="mailto:support@uimarketplace.ng">
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" /> Email Us
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpCenter;
