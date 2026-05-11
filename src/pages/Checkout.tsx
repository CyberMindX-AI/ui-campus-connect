import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shield, CreditCard, Building2, Smartphone, CheckCircle, MessageCircle, Package, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { checkoutService } from '@/services/checkout.service';
import { useToast } from '@/hooks/use-toast';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

// Declare Paystack global type
declare global {
  interface Window { PaystackPop: any; }
}

const generateRef = () =>
  `CC-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

const steps = ['Delivery Details', 'Payment', 'Confirmation'];
const deliveryMethods = ['Campus Pickup', 'Hall Delivery', 'Digital Delivery'];
const paymentMethods = [
  { id: 'card', label: 'Debit/Credit Card', icon: CreditCard },
  { id: 'bank', label: 'Bank Transfer', icon: Building2 },
  { id: 'ussd', label: 'USSD', icon: Smartphone },
];

const Checkout = () => {
  const { items, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState('Campus Pickup');
  const [payment, setPayment] = useState('card');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paystackRef, setPaystackRef] = useState('');
  // Snapshot cart before it clears so confirmation screen can display items
  const [orderSnapshot, setOrderSnapshot] = useState<{ title: string; amount: number }[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const fee = Math.round(subtotal * 0.1);
  const total = subtotal + fee;

  const handlePlaceOrder = async (ref: string) => {
    if (!isAuthenticated || !user?.id) {
      toast({ title: 'Authentication Required', description: 'Please login to complete your order.', variant: 'destructive' });
      return;
    }

    // Save snapshot before cart clears
    const snapshot = items.map(i => ({ title: i.product.title, amount: i.product.price * i.qty }));
    setOrderSnapshot(snapshot);
    setPaystackRef(ref);

    setLoading(true);
    try {
      const result = await checkoutService.createOrder(user.id, items, delivery, payment, ref);
      const newOrderId = result?.[0]?.id?.substring(0, 8).toUpperCase() || generateRef();
      setOrderId(newOrderId);
      await clearCart();
      setStep(2);
      toast({ title: '🎉 Payment Confirmed!', description: 'Your order has been placed and the seller notified.' });
    } catch (error) {
      console.error('Checkout error:', error);
      toast({ title: 'Order Failed', description: 'Payment received but order save failed. Please contact admin.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentInitiation = () => {
    if (!isAuthenticated) {
      toast({ title: 'Login Required', description: 'Please login to proceed with payment.', variant: 'destructive' });
      return;
    }
    if (!import.meta.env.VITE_PAYSTACK_PUBLIC_KEY) {
      toast({ title: 'Configuration Error', description: 'Payment key is not configured. Please contact support.', variant: 'destructive' });
      return;
    }
    if (!window.PaystackPop) {
      toast({ title: 'Payment Error', description: 'Paystack SDK not loaded. Please refresh and try again.', variant: 'destructive' });
      return;
    }

    // Fresh reference every click — ensures Paystack generates a new virtual account for bank transfer
    const freshRef = generateRef();

    try {
      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: user?.email || 'student@campus.edu',
        amount: total * 100, // kobo
        ref: freshRef,
        callback: (response: any) => handlePlaceOrder(response.reference),
        onClose: () => toast({ title: 'Payment Cancelled', description: 'You closed the payment window.' }),
      });
      handler.openIframe();
    } catch (err) {
      console.error('Paystack error:', err);
      toast({ title: 'Payment Error', description: 'Could not open payment window. Please refresh and try again.', variant: 'destructive' });
    }
  };

  // Build pre-filled WhatsApp message to admin with full order details
  const buildAdminMessage = () => {
    const itemList = orderSnapshot.map(i => `• ${i.title} — ₦${i.amount.toLocaleString()}`).join('\n');
    const msg =
      `🛒 *New Order — UI Marketplace*\n\n` +
      `*Order ID:* ${orderId}\n` +
      `*Buyer:* ${user?.email}\n` +
      `*Payment Ref:* ${paystackRef}\n` +
      `*Delivery:* ${delivery}\n\n` +
      `*Items:*\n${itemList}\n\n` +
      `*Total Paid:* ₦${total.toLocaleString()}\n\n` +
      `Please confirm and coordinate delivery. Thank you!`;
    return buildWhatsAppUrl(msg);
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

        {/* Step Indicator */}
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

            {/* ── STEP 0: Delivery ── */}
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

            {/* ── STEP 1: Payment ── */}
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
                  <Button variant="hero" onClick={handlePaymentInitiation} disabled={loading}>
                    {loading ? 'Processing...' : `Pay ₦${total.toLocaleString()}`}
                  </Button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Confirmation ── */}
            {step === 2 && (
              <div className="rounded-xl border border-border bg-card p-6 text-center sm:p-8">
                {/* Success icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>

                <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">Payment Confirmed! 🎉</h2>
                <p className="mt-1 text-sm font-mono text-muted-foreground">
                  Order ID: <span className="font-bold text-foreground">{orderId}</span>
                </p>
                {paystackRef && (
                  <p className="mt-0.5 text-xs text-muted-foreground">Ref: {paystackRef}</p>
                )}

                <p className="mt-4 text-sm text-muted-foreground">
                  Your payment was successful. Contact admin on WhatsApp to confirm your delivery,
                  then track your order status below.
                </p>

                {/* Order recap */}
                {orderSnapshot.length > 0 && (
                  <div className="mt-5 rounded-lg bg-muted/50 p-4 text-left space-y-2">
                    {orderSnapshot.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-foreground font-medium truncate max-w-[60%]">{item.title}</span>
                        <span className="text-muted-foreground">₦{item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-2 flex justify-between text-sm font-bold">
                      <span className="text-foreground">Total Paid</span>
                      <span className="text-primary">₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                  <a href={buildAdminMessage()} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white gap-2 h-12 text-base font-bold">
                      <MessageCircle className="h-5 w-5" />
                      Contact Admin on WhatsApp
                    </Button>
                  </a>

                  <Link to="/dashboard/buyer/orders">
                    <Button variant="hero" className="w-full gap-2 h-12 text-base font-bold">
                      <Package className="h-5 w-5" />
                      Track My Order
                    </Button>
                  </Link>

                  <Link to="/products">
                    <Button variant="outline" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary sidebar — hidden on confirmation step */}
          {step !== 2 && (
            <div className="rounded-xl border border-border bg-card p-4 sm:p-6 h-fit">
              <h3 className="font-heading text-lg font-semibold text-foreground">Order Summary</h3>
              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.images?.[0] || '/placeholder.svg'}
                      alt={item.product.title}
                      className="h-12 w-12 rounded-lg object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                    />
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
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₦{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Service Fee (10%)</span><span>₦{fee.toLocaleString()}</span></div>
                <hr className="border-border" />
                <div className="flex justify-between font-semibold"><span>Total</span><span className="text-primary">₦{total.toLocaleString()}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;