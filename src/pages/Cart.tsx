import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { items, updateQty, removeFromCart } = useCart();

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const fee = Math.round(subtotal * 0.05);
  const total = subtotal + fee;

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Your Shopping Cart</h1>
          <p className="text-lg text-slate-500 font-medium mt-2">
            You have {items.length} item{items.length !== 1 ? 's' : ''} ready for checkout
          </p>
        </header>

        {items.length === 0 ? (
          <div className="mt-20 text-center max-w-md mx-auto">
            <div className="h-24 w-24 bg-white rounded-3xl shadow-xl shadow-slate-200/50 flex items-center justify-center mx-auto mb-8 border border-slate-50">
               <Trash2 className="h-10 w-10 text-slate-200" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">Your cart is empty</h2>
            <p className="text-slate-500 font-medium mb-8">
              Looks like you haven't added anything to your cart yet. Browse our campus marketplace to find great deals!
            </p>
            <Link to="/products">
              <Button variant="hero" className="px-10 rounded-2xl h-14 font-bold text-lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-3 items-start">
            <div className="space-y-6 lg:col-span-2">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative group">
                  <Link to={`/products/${product.id}`} className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50">
                    <img src={product.images?.[0] || '/placeholder.svg'} alt={product.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/products/${product.id}`} className="text-lg font-bold text-slate-900 hover:text-primary transition-colors">
                          {product.title}
                        </Link>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{product.category}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(product.id)} 
                        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4 bg-slate-50 p-1 rounded-xl border border-slate-100">
                        <button onClick={() => updateQty(product.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm text-slate-600 hover:text-primary transition-colors">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-black text-slate-900">{qty}</span>
                        <button onClick={() => updateQty(product.id, 1)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm text-slate-600 hover:text-primary transition-colors">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-2xl font-black text-slate-900">₦{(product.price * qty).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Summary Sidebar */}
            <div className="bg-white rounded-3xl border-2 border-slate-900 p-8 shadow-2xl shadow-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Order Summary</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                  <span className="font-black text-slate-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-400 uppercase tracking-widest">Service Fee (5%)</span>
                  <span className="font-black text-slate-900">₦{fee.toLocaleString()}</span>
                </div>
                <div className="h-px bg-slate-100 w-full" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-slate-900">Total</span>
                  <span className="text-3xl font-black text-primary">₦{total.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="relative">
                  <Input placeholder="PROMO CODE" className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white font-bold placeholder:text-slate-300" />
                  <button className="absolute right-2 top-2 bottom-2 px-4 bg-slate-900 text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-slate-800">Apply</button>
                </div>
                
                <Link to="/checkout" className="block">
                  <Button variant="hero" className="w-full h-16 rounded-2xl text-lg font-bold gap-3 shadow-xl shadow-primary/20">
                    Proceed to Checkout <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                
                <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Secure campus payments protected by UI Trust
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
