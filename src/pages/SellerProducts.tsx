import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, ToggleLeft, ToggleRight, Package, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import { useProducts } from '@/hooks/api/useProducts';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SellerProducts = () => {
  const { user, isAuthenticated } = useAuth();
  const { data: products = [] } = useProducts();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [listings, setListings] = useState<any[]>([]);

  import('react').then(React => {
    React.useEffect(() => {
      if (products.length > 0 && listings.length === 0) {
        setListings(
          products.slice(0, 5).map((p, i) => ({
            ...p,
            active: i !== 3,
            stock: i === 1 ? 2 : i === 3 ? 0 : Math.floor(Math.random() * 20) + 5,
            totalSales: Math.floor(Math.random() * 50),
          }))
        );
      }
    }, [products]);
  });

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const filtered = listings.filter((p) =>
    !search || p.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setListings((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
    toast({ title: 'Listing updated', description: 'Product visibility changed.' });
  };

  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((p) => p.id !== id));
    toast({ title: 'Product deleted', description: 'The listing has been removed.' });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">My Listings</h1>
            <p className="mt-1 text-sm text-muted-foreground">{listings.length} products listed</p>
          </div>
          <Link to="/dashboard/seller/products/new">
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" /> Add New Product
            </Button>
          </Link>
        </div>

        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search your listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 max-w-sm"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-3 text-lg font-medium text-foreground">No products found</p>
            <Link to="/dashboard/seller/products/new">
              <Button variant="hero" className="mt-4 gap-2">
                <Plus className="h-4 w-4" /> Create Your First Listing
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {filtered.map((product) => (
              <div key={product.id} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
                <img src={product.image} alt={product.title} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-foreground">{product.title}</p>
                    {!product.active && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">Inactive</span>
                    )}
                    {product.stock <= 3 && product.stock > 0 && (
                      <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-medium text-yellow-700">Low Stock</span>
                    )}
                    {product.stock === 0 && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700">Out of Stock</span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {product.category} · Stock: {product.stock} · {product.totalSales} sold
                  </p>
                </div>
                <p className="font-heading text-lg font-bold text-primary">₦{product.price.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(product.id)}
                    className="text-muted-foreground hover:text-primary"
                    title={product.active ? 'Deactivate' : 'Activate'}
                  >
                    {product.active ? <ToggleRight className="h-5 w-5 text-primary" /> : <ToggleLeft className="h-5 w-5" />}
                  </button>
                  <Link to={`/products/${product.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                  </Link>
                  <Link to={`/dashboard/seller/products/${product.id}/edit`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-4 w-4" /></Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteListing(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SellerProducts;
