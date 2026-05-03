import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, BookOpen, Utensils, Laptop, Shirt, Wrench, LayoutGrid } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/api/useProducts';
import { useCategories } from '@/hooks/api/useMarket';
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

const conditions = ['New', 'Like New', 'Used (Good)', 'Used (Fair)', 'Refurbished'];
const sortOptions = ['Newest', 'Price: Low-High', 'Price: High-Low'];

const Products = () => {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || '');
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('Newest');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const toggleCondition = (c: string) => {
    setSelectedConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = !selectedCategory || p.category === selectedCategory;
      const matchCondition = selectedConditions.length === 0 || selectedConditions.includes(p.condition);
      const matchPriceMin = !priceMin || p.price >= Number(priceMin);
      const matchPriceMax = !priceMax || p.price <= Number(priceMax);
      return matchSearch && matchCat && matchCondition && matchPriceMin && matchPriceMax;
    });

    switch (sort) {
      case 'Price: Low-High':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'Price: High-Low':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [products, search, selectedCategory, selectedConditions, priceMin, priceMax, sort]);

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedConditions([]);
    setPriceMin('');
    setPriceMax('');
    setSort('Newest');
  };

  const hasActiveFilters = selectedCategory || selectedConditions.length > 0 || priceMin || priceMax;

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10 max-w-7xl">
        {/* Professional Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name || 'Products' : 'Browse Everything'}
            </h1>
            <p className="text-lg text-slate-500 font-medium flex items-center gap-2">
              <span className="flex h-6 px-2.5 items-center justify-center rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                {filtered.length} Results
              </span>
              finding the best for campus life
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-xl">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-14 bg-white border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-primary/5 transition-all text-base placeholder:text-slate-400"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)} 
              className={`h-14 gap-2 px-6 rounded-2xl font-bold border-slate-100 hover:bg-slate-50 transition-all ${showFilters ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800 hover:text-white' : ''}`}
            >
              <SlidersHorizontal className="h-5 w-5" /> 
              Filters
              {hasActiveFilters && (
                <span className="h-2 w-2 rounded-full bg-primary" />
              )}
            </Button>
          </div>
        </div>

        {/* Categories Bar - Fiverr style pills */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('')}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              !selectedCategory 
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                : 'bg-white border border-slate-100 text-slate-500 hover:border-primary hover:text-primary'
            }`}
          >
            All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
              className={`whitespace-nowrap flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                selectedCategory === cat.slug 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                  : 'bg-white border border-slate-100 text-slate-500 hover:border-primary hover:text-primary'
              }`}
            >
              <div className="text-primary group-hover:scale-110 transition-transform">
                {(() => { const Icon = getCategoryIcon(cat.slug); return <Icon className="h-5 w-5" />; })()}
              </div>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter Drawer - Premium look */}
        {showFilters && (
          <div 
            className="mb-10 bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">Refine Results</h3>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="text-xs font-black uppercase tracking-widest text-primary hover:underline">Reset All</button>
              )}
            </div>
            
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {/* Condition */}
              <div className="space-y-4">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Item Condition</p>
                <div className="flex flex-wrap gap-2">
                  {conditions.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleCondition(c)}
                      className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedConditions.includes(c) 
                          ? 'bg-primary text-white' 
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="space-y-4">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Price Range (₦)</p>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs font-bold">MIN</span>
                    <Input placeholder="0" type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="h-10 pl-10 bg-slate-50 border-transparent focus:bg-white text-sm font-bold" />
                  </div>
                  <span className="text-slate-300">—</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs font-bold">MAX</span>
                    <Input placeholder="50k+" type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="h-10 pl-10 bg-slate-50 border-transparent focus:bg-white text-sm font-bold" />
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div className="space-y-4">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sort By</p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full h-10 bg-slate-50 border-transparent rounded-xl px-4 text-sm font-bold text-slate-600 focus:bg-white focus:ring-0 outline-none cursor-pointer"
                >
                  {sortOptions.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Professional Empty State */}
        {filtered.length === 0 && (
          <div className="mt-20 text-center max-w-sm mx-auto">
            <div className="h-24 w-24 bg-white rounded-3xl shadow-xl shadow-slate-200/50 flex items-center justify-center mx-auto mb-8 border border-slate-50 relative">
               <Search className="h-10 w-10 text-slate-200" />
               <X className="h-5 w-5 text-rose-500 absolute bottom-6 right-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">No matches found</h2>
            <p className="text-slate-500 font-medium mb-8">
              We couldn't find any products matching your current filters. Try adjusting your search or category.
            </p>
            <Button 
              variant="hero" 
              className="px-10 rounded-2xl" 
              onClick={clearAllFilters}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
