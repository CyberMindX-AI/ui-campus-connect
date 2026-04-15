import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCategories } from '@/hooks/api/useMarket';

const Categories = () => {
  const { data: categories = [] } = useCategories();
  
  return (
    <Layout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">Browse Categories</h1>
      <p className="mt-1 text-sm text-muted-foreground">Find exactly what you need</p>
      <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/products?category=${cat.slug}`}
            className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
          >
            <span className="text-5xl transition-transform group-hover:scale-110">{cat.icon}</span>
            <span className="font-heading text-base font-semibold text-card-foreground">{cat.name}</span>
            <span className="rounded-full bg-muted px-3 py-0.5 text-xs text-muted-foreground">{cat.count} items</span>
          </Link>
        ))}
      </div>
    </div>
  </Layout>
  );
};

export default Categories;
