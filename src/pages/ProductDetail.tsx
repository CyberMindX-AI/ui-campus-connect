import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, MessageCircle, Heart, Star, MapPin, Shield, ChevronLeft, Truck, Package as PackageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/mock';
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg font-medium text-foreground">Product not found</p>
          <Link to="/products"><Button variant="outline" className="mt-4">Back to Products</Button></Link>
        </div>
      </Layout>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Link to="/products" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ChevronLeft className="h-4 w-4" /> Back to products
        </Link>

        <div className="mt-4 grid gap-8 md:grid-cols-2">
          {/* Images */}
          <div>
            <div className="aspect-square overflow-hidden rounded-xl bg-muted">
              <img src={product.images[selectedImage]} alt={product.title} className="h-full w-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === i ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">{product.category}</span>
                {product.negotiable && (
                  <span className="ml-2 rounded-md bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">Negotiable</span>
                )}
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted">
                <Heart className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <h1 className="mt-3 font-heading text-2xl font-bold text-foreground md:text-3xl">{product.title}</h1>

            <p className="mt-2 font-heading text-3xl font-extrabold text-primary">₦{product.price.toLocaleString()}</p>

            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" /> {product.rating} ({product.reviews} reviews)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {product.location}
              </span>
            </div>

            <div className="mt-3 inline-flex rounded-md bg-muted px-3 py-1.5 text-sm">
              Condition: <span className="ml-1 font-medium text-foreground">{product.condition}</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Delivery */}
            <div className="mt-5 space-y-2">
              <p className="text-sm font-medium text-foreground">Delivery Options</p>
              {product.delivery.map((d) => (
                <div key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                  {d === 'Digital Delivery' ? <PackageIcon className="h-4 w-4 text-primary" /> : <Truck className="h-4 w-4 text-primary" />}
                  {d}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <Button variant="hero" size="lg" className="flex-1 gap-2">
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="hero-outline" size="lg" className="gap-2">
                <MessageCircle className="h-4 w-4" /> Message Seller
              </Button>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-light p-3 text-sm text-primary">
              <Shield className="h-4 w-4" />
              Payment held securely in escrow until you confirm receipt
            </div>

            {/* Seller card */}
            <div className="mt-6 rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <img src={product.sellerAvatar} alt={product.seller} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-card-foreground">{product.seller}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-accent text-accent" /> {product.rating} · {product.reviews} sales
                  </div>
                </div>
              </div>
              <Link to="/products">
                <Button variant="outline" size="sm" className="mt-3 w-full">View Store</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-foreground">Related Products</h2>
            <div className="mt-4 grid gap-4 grid-cols-2 md:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
