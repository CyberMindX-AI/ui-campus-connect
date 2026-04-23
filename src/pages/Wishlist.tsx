import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useWishlist } from '@/hooks/api/useWishlist';
import { useCart } from '@/contexts/CartContext';

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const { data: wishlistItems = [], isLoading, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">
          Loading your wishlist...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">My Wishlist</h1>
            <p className="mt-1 text-sm text-muted-foreground">{wishlistItems.length} saved items</p>
          </div>
          {wishlistItems.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => clearWishlist()}>
              Clear All
            </Button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="mt-16 text-center">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-3 text-lg font-medium text-foreground">Your wishlist is empty</p>
            <p className="mt-1 text-sm text-muted-foreground">Save items you love to find them later</p>
            <Link to="/products">
              <Button variant="hero" className="mt-4">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {wishlistItems.map((product) => (
              <div key={product.id} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                <Link to={`/products/${product.id}`} className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted sm:h-24 sm:w-24">
                  <img src={product.images?.[0] || '/placeholder.svg'} alt={product.title} className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                </Link>
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <Link to={`/products/${product.id}`} className="text-sm font-medium text-foreground hover:text-primary line-clamp-1">
                      {product.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">{product.seller} · {product.location || 'Campus'}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-lg font-bold text-primary">₦{product.price.toLocaleString()}</p>
                    <div className="flex gap-2">
                      <Button variant="hero" size="sm" className="gap-1 text-xs" onClick={() => addToCart(product)}>
                        <ShoppingCart className="h-3 w-3" /> Add to Cart
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => removeFromWishlist(product.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
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

export default Wishlist;
