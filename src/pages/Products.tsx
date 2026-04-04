import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/mock';

const conditions = ['New', 'Like New', 'Used'];
const sortOptions = ['Newest', 'Price: Low-High', 'Price: High-Low', 'Most Popular', 'Highest Rated'];

const Products = () => {
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
      const matchCat = !selectedCategory || p.category.toLowerCase() === categories.find(c => c.slug === selectedCategory)?.name.toLowerCase();
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
      case 'Most Popular':
        result = [...result].sort((a, b) => b.reviews - a.reviews);
        break;
      case 'Highest Rated':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [search, selectedCategory, selectedConditions, priceMin, priceMax, sort]);

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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name || 'Products' : 'All Products'}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{filtered.length} products found</p>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
              {hasActiveFilters && <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">!</span>}
            </Button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mt-4 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Filters</h3>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="text-xs text-primary hover:underline">Clear all</button>
              )}
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {/* Condition */}
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Condition</p>
                <div className="flex flex-wrap gap-2">
                  {conditions.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleCondition(c)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        selectedConditions.includes(c) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price range */}
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Price Range (₦)</p>
                <div className="flex items-center gap-2">
                  <Input placeholder="Min" type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="h-8 text-xs" />
                  <span className="text-muted-foreground">—</span>
                  <Input placeholder="Max" type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="h-8 text-xs" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
              !selectedCategory ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                selectedCategory === cat.slug ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-input bg-background px-2 py-1 text-sm text-foreground"
          >
            {sortOptions.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Product Grid */}
        <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-lg font-medium text-foreground">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters</p>
            <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
