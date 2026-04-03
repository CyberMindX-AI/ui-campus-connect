import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, MessageCircle, Heart, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/mock';

const SellerStore = () => {
  const seller = {
    name: "Adebayo's Store",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    tagline: 'Quality textbooks and study materials',
    faculty: 'Science',
    department: 'Chemistry',
    memberSince: 'January 2024',
    rating: 4.8,
    totalOrders: 156,
    responseTime: '< 1 hour',
  };

  const storeProducts = products.filter((p) => p.seller === 'Adebayo O.');
  const reviews = [
    { name: 'Tunde M.', rating: 5, text: 'Great seller! Book was exactly as described. Fast response.', date: '2025-06-28' },
    { name: 'Amina S.', rating: 4, text: 'Good condition textbook. Pickup was smooth.', date: '2025-06-20' },
    { name: 'Chidi E.', rating: 5, text: 'Very reliable. Bought 3 books from this seller.', date: '2025-06-15' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Store header */}
        <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-6 text-primary-foreground sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <img src={seller.avatar} alt={seller.name} className="h-20 w-20 rounded-full border-4 border-white/20 object-cover" />
            <div className="flex-1">
              <h1 className="font-heading text-xl font-bold sm:text-2xl">{seller.name}</h1>
              <p className="mt-1 text-sm text-primary-foreground/80">{seller.tagline}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-primary-foreground/80">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-current" /> {seller.rating}</span>
                <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> {seller.totalOrders} sales</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Responds {seller.responseTime}</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {seller.faculty}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-white text-primary hover:bg-white/90 gap-1"><MessageCircle className="h-4 w-4" /> Message</Button>
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-1"><Heart className="h-4 w-4" /> Follow</Button>
            </div>
          </div>
        </div>

        {/* Store stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="font-heading text-2xl font-bold text-foreground">{storeProducts.length}</p>
            <p className="text-xs text-muted-foreground">Active Listings</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="font-heading text-2xl font-bold text-foreground">{seller.totalOrders}</p>
            <p className="text-xs text-muted-foreground">Completed Orders</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="font-heading text-2xl font-bold text-foreground">{seller.rating}</p>
            <p className="text-xs text-muted-foreground">Average Rating</p>
          </div>
        </div>

        {/* Products */}
        <div className="mt-8">
          <h2 className="font-heading text-lg font-semibold text-foreground">Products</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {(storeProducts.length > 0 ? storeProducts : products.slice(0, 4)).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <h2 className="font-heading text-lg font-semibold text-foreground">Reviews</h2>
          <div className="mt-4 space-y-3">
            {reviews.map((r, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                <span className="mt-1 inline-block text-[10px] font-medium text-primary">✓ Verified Purchase</span>
              </div>
            ))}
          </div>
        </div>

        {/* Store Policies */}
        <div className="mt-8 rounded-xl border border-border bg-card p-4 sm:p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Store Policies</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-foreground">Pickup Instructions</p>
              <p className="mt-1 text-xs text-muted-foreground">Available at Kuti Hall, Room 205. Mon-Fri 4-6PM.</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Return Policy</p>
              <p className="mt-1 text-xs text-muted-foreground">Returns accepted within 24 hours of pickup if item is not as described.</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Response Time</p>
              <p className="mt-1 text-xs text-muted-foreground">Usually responds within 1 hour during business hours.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerStore;