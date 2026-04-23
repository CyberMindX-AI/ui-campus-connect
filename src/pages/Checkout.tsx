import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, CreditCard, Building2, Smartphone, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { checkoutService } from '@/services/checkout.service';
import { useToast } from '@/hooks/use-toast';

const steps = ['Delivery Details', 'Payment', 'Confirmation'];
const deliveryMethods = ['Campus Pickup', 'Hall Delivery', 'Digital Delivery'];
const paymentMethods = [
  { id: 'card', label: 'Debit/Credit Card', icon: CreditCard },
  { id: 'bank', label: 'Bank Transfer', icon: Building2 },
  { id: 'ussd', label: 'USSD', icon: Smartphone },
];

const Checkout = () => {
  const { items, total: cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState('Campus Pickup');
  const [payment, setPayment] = useState('card');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const subtotal = items.reduce((s, i) => s + (i.product.price * i.qty), 0);
  const fee = Math.round(subtotal * 0.05);
  const total = subtotal + fee;

  const handlePlaceOrder = async () => {
    if (!isAuthenticated || !user?.id) return;
    setLoading(true);
    try {
      const result = await checkoutService.createOrder(user.id, items);
      setOrderId(result?.[0]?.id.substring(0, 8).toUpperCase() || 'CC-' + Math.random().toString(36).substr(2, 6).toUpperCase());
      await clearCart();
      setStep(2);
      toast({ title: 'Order placed!', description: 'Your payment has been processed and seller notified.' });
    } catch (error) {
      console.error('Checkout error:', error);
      toast({ title: 'Payment Failed', description: 'There was an error processing your transaction.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== 2) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-xl font-bold">Your cart is empty</h2>
          <Link to="/products"><Button variant="hero" className="mt-4">Browse Products</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Checkout</h1>

        {/* Step indicator */}
        <div className="mt-6 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>{i + 1}</div>
              <span className={`hidden text-sm font-medium sm:block ${i <= step ? 'text-foreground' : 'text-muted-foreground'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`mx-2 h-px w-8 sm:w-16 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {step === 0 && (
              <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
                <h2 className="font-heading text-lg font-semibold text-foreground">Delivery Method</h2>
                <div className="mt-4 space-y-3">
                  {deliveryMethods.map((m) => (
                    <label key={m} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
                      delivery === m ? 'border-primary bg-primary-light' : 'border-border hover:border-primary/30'
                    }`}>
                      <input type="radio" name="delivery" checked={delivery === m} onChange={() => setDelivery(m)} className="accent-primary" />
                      <span className="text-sm font-medium text-foreground">{m}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4">
                  <Label htmlFor="notes">Additional Notes (optional)</Label>
                  <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
                    rows={3} placeholder="Any special instructions for the seller..." />
                </div>
                <Button variant="hero" className="mt-4" onClick={() => setStep(1)}>Continue to Payment</Button>
              </div>
            )}

            {step === 1 && (
              <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
                <h2 className="font-heading text-lg font-semibold text-foreground">Payment Method</h2>
                <div className="mt-4 space-y-3">
                  {paymentMethods.map((m) => (
                    <label key={m.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
                      payment === m.id ? 'border-primary bg-primary-light' : 'border-border hover:border-primary/30'
                    }`}>
                      <input type="radio" name="payment" checked={payment === m.id} onChange={() => setPayment(m.id)} className="accent-primary" />
                      <m.icon className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-foreground">{m.label}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-light p-3 text-sm text-primary">
                  <Shield className="h-4 w-4 flex-shrink-0" />
                  Payment is held securely in escrow until you confirm receipt
                </div>
                <div className="mt-4 flex gap-3">
                  <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                  <Button variant="hero" onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? 'Processing...' : `Pay ₦${total.toLocaleString()}`}
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-xl border border-border bg-card p-6 text-center sm:p-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h2 className="mt-4 font-heading text-xl font-bold text-foreground">Order Confirmed!</h2>
                <p className="mt-1 text-sm text-muted-foreground">Order ID: {orderId}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Your order has been placed successfully. The seller has been notified.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link to="/dashboard/buyer/orders"><Button variant="hero">View Order</Button></Link>
                  <Link to="/products"><Button variant="outline">Continue Shopping</Button></Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 h-fit">
            <h3 className="font-heading text-lg font-semibold text-foreground">Order Summary</h3>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.image} alt={item.product.title} className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{item.product.title}</p>
                    <p className="text-xs text-muted-foreground">{item.product.seller} x{item.qty}</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">₦{(item.product.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <hr className="my-4 border-border" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₦{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Service Fee (5%)</span><span className="text-foreground">₦{fee.toLocaleString()}</span></div>
              <hr className="border-border" />
              <div className="flex justify-between font-semibold"><span className="text-foreground">Total</span><span className="text-primary">₦{total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;