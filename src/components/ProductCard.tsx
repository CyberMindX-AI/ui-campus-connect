import { Link } from 'react-router-dom';
import { Heart, Star, MapPin } from 'lucide-react';
import type { Product } from '@/data/mock';

const ProductCard = ({ product }: { product: Product }) => (
  <Link to={`/products/${product.id}`} className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg">
    <div className="relative aspect-square overflow-hidden bg-muted">
      <img src={product.image} alt={product.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
      <button
        onClick={(e) => { e.preventDefault(); }}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background"
      >
        <Heart className="h-4 w-4 text-muted-foreground" />
      </button>
      {product.negotiable && (
        <span className="absolute left-3 top-3 rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
          Negotiable
        </span>
      )}
    </div>
    <div className="p-3">
      <h3 className="line-clamp-2 text-sm font-medium text-card-foreground">{product.title}</h3>
      <p className="mt-1 font-heading text-lg font-bold text-primary">₦{product.price.toLocaleString()}</p>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-accent text-accent" />
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="truncate max-w-[80px]">{product.location}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <img src={product.sellerAvatar} alt={product.seller} className="h-5 w-5 rounded-full object-cover" />
        <span className="text-xs text-muted-foreground">{product.seller}</span>
      </div>
    </div>
  </Link>
);

export default ProductCard;
