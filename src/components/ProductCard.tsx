import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, ShieldCheck } from 'lucide-react';
import type { Product } from '@/types';
import { useWishlist } from '@/hooks/api/useWishlist';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ProductCard = ({ product }: { product: Product }) => {
  const { isAuthenticated } = useAuth();
  const { data: wishlist = [], toggleWishlist } = useWishlist();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isWishlisted = wishlist.some((w) => w.id === product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast({ title: 'Please sign in', description: 'Sign in to save items to your wishlist.' });
      navigate('/login');
      return;
    }
    toggleWishlist(product.id);
  };

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <img 
          src={product.images?.[0] || '/placeholder.svg'} 
          alt={product.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 bg-slate-100" 
          loading="lazy" 
        />
        <button
          onClick={handleWishlist}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95 ${isWishlisted ? 'bg-rose-50' : ''}`}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`h-4 w-4 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-400 hover:text-rose-500'}`} />
        </button>
        {product.negotiable && (
          <span className="absolute left-3 top-3 rounded-lg bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
            Negotiable
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <img src={product.sellerAvatar || '/placeholder.svg'} alt={product.seller || 'Seller'} className="h-6 w-6 rounded-full border border-slate-100 object-cover" />
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-900">{product.seller || 'Verified Seller'}</span>
            {product.isVerified && (
              <div className="flex items-center justify-center h-4 w-4 rounded-full bg-blue-600 text-white shadow-sm" title="Verified Seller">
                <ShieldCheck className="h-2.5 w-2.5 fill-white" />
              </div>
            )}
          </div>
        </div>

        <h3 className="line-clamp-2 text-sm font-bold text-slate-900 mb-4 h-10 group-hover:text-primary transition-colors leading-tight">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.condition}</span>
        </div>

        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1 text-slate-400">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-tight truncate max-w-[80px]">{product.location || 'Campus'}</span>
          </div>
          <p className="font-bold text-lg text-slate-900 leading-none">₦{product.price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
