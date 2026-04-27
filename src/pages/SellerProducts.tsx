import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, ToggleLeft, ToggleRight, Package, Search, Headphones, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import { useSellerProducts, useDeleteProduct, useUpdateProduct } from '@/hooks/api/useProducts';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SellerProducts = () => {
  const { user, isAuthenticated } = useAuth();
  const { data: products = [], isLoading } = useSellerProducts(user?.id);
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const filtered = products.filter((p) =>
    !search || p.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updateProduct({ id, productData: { status: newStatus } }, {
      onSuccess: () => {
        toast({ title: 'Listing updated', description: `Product is now ${newStatus}.` });
      }
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteProduct(id, {
        onSuccess: () => {
          toast({ title: 'Product deleted', description: 'The listing has been removed.' });
        }
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'available': return <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">Active</span>;
      case 'pending': return <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">Pending Review</span>;
      case 'rejected': return <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">Rejected</span>;
      case 'inactive': return <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">Inactive</span>;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-slate-900 sm:text-2xl">My Listings</h1>
            <p className="mt-1 text-sm text-slate-500">{products.length} products total</p>
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
                <img src={product.images?.[0] || '/placeholder.svg'} alt={product.title} className="h-16 w-16 rounded-lg object-cover bg-slate-100" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-bold text-slate-900">{product.title}</p>
                    {getStatusBadge(product.status)}
                    {product.quantity <= 3 && product.quantity > 0 && (
                      <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-bold text-yellow-700">Low Stock</span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-500 font-medium">
                    {product.category} · Stock: {product.quantity}
                  </p>
                  {product.status === 'rejected' && product.rejection_reason && (
                    <div className="mt-2 flex items-start gap-2 rounded-lg bg-red-50 p-2 text-xs text-red-700">
                      <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <p><strong>Rejection Reason:</strong> {product.rejection_reason}</p>
                    </div>
                  )}
                </div>
                <p className="font-heading text-lg font-bold text-primary">₦{product.price.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStatus(product.id, product.status)}
                    className="text-slate-400 hover:text-primary transition-colors"
                    title={product.status === 'active' ? 'Deactivate' : 'Activate'}
                    disabled={product.status === 'pending' || product.status === 'rejected'}
                  >
                    {product.status === 'active' ? <ToggleRight className="h-6 w-6 text-primary" /> : <ToggleLeft className="h-6 w-6" />}
                  </button>
                  <Link to={`/products/${product.id}`}>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100"><Eye className="h-4 w-4" /></Button>
                  </Link>
                  <Link to={`/dashboard/seller/products/${product.id}/edit`}>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100"><Edit2 className="h-4 w-4" /></Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2 gap-1.5 h-9" 
                    onClick={() => window.open('mailto:admin@ui.edu.ng?subject=Verification Support: ' + product.title)}
                  >
                    <Headphones className="h-3.5 w-3.5" /> Contact Admin
                  </Button>
                </div>
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
