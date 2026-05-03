import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCategories } from '@/hooks/api/useMarket';
import { BookOpen, Utensils, Laptop, Shirt, Wrench, LayoutGrid } from 'lucide-react';
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

const Categories = () => {
  const { data: categories = [] } = useCategories();
  
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            Explore Campus Marketplace
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Everything you need for your UI journey, sorted by category for your convenience.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-primary/20 transition-all text-center flex flex-col items-center gap-6"
            >
              <div className="h-24 w-24 rounded-3xl bg-slate-50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {(() => { const Icon = getCategoryIcon(cat.slug); return <Icon className="h-12 w-12" />; })()}
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <span className="inline-block px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-full">
                  {cat.count} listings
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
