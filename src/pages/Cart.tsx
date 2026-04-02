import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import { products } from '@/data/mock';
import { useState } from 'react';

interface CartItem {
  product: typeof products[0];
  qty: number;
}

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([
    { product: products[0], qty: 1 },
    { product: products[4], qty: 2 },
  ]);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id));

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const fee = Math.round(subtotal * 0.05);
  const total = subtotal + fee;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Shopping Cart</h1>
        <p className="mt-1 text-sm text-muted-foreground">{items.length} item{items.length !== 1 ? 's' : ''}</p>

        {items.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-lg font-medium text-foreground">Your cart is empty</p>
            <Link to="/products">
              <Button variant="hero" className="mt-4">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                  <Link to={`/products/${product.id}`} className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link to={`/products/${product.id}`} className="text-sm font-medium text-card-foreground hover:text-primary">
                        {product.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">{product.seller}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(product.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-foreground">{qty}</span>
                        <button onClick={() => updateQty(product.id, 1)} className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-heading text-lg font-bold text-primary">₦{(product.price * qty).toLocaleString()}</p>
                    </div>
                  </div>
                  <button onClick={() => remove(product.id)} className="self-start text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold text-card-foreground">Order Summary</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee (5%)</span>
                  <span className="font-medium text-foreground">₦{fee.toLocaleString()}</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-heading text-xl font-bold text-primary">₦{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4">
                <Input placeholder="Enter promo code" className="text-sm" />
              </div>
              <Button variant="hero" className="mt-4 w-full gap-2" size="lg">
                Checkout <ArrowRight className="h-4 w-4" />
              </Button>
              <Link to="/products" className="mt-3 block text-center text-sm text-primary hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
