import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Upload, MessageCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const disputeReasons = ['Item not received', 'Item not as described', 'Seller unresponsive', 'Payment issue', 'Other'];

const faqItems = [
  { q: 'How long does dispute resolution take?', a: 'Our team reviews disputes and makes a resolution within 3-5 business days.' },
  { q: 'What evidence should I provide?', a: 'Screenshots of conversations, photos of items received, order confirmations, and any relevant documentation.' },
  { q: 'Can I cancel a dispute?', a: 'Yes, you can cancel a dispute at any time before a resolution is made.' },
  { q: 'What are the possible outcomes?', a: 'Full refund to buyer, payment released to seller, partial refund, or escalation to admin.' },
];

const Dispute = () => {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [orderId, setOrderId] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !description || !orderId) {
      toast({ title: 'Please fill all required fields', variant: 'destructive' });
      return;
    }
    toast({ title: 'Dispute submitted', description: 'Our team will review your case within 3-5 business days.' });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Dispute & Support</h1>
        <p className="mt-1 text-sm text-muted-foreground">Need help? Raise a dispute or contact support.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Dispute Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-accent" />
                <h2 className="font-heading text-lg font-semibold text-foreground">Raise a Dispute</h2>
              </div>

              <div>
                <Label htmlFor="orderId">Order ID *</Label>
                <Input id="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="mt-1" placeholder="e.g. ORD-2025-001" />
              </div>

              <div>
                <Label>Dispute Reason *</Label>
                <select value={reason} onChange={(e) => setReason(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground">
                  <option value="">Select a reason</option>
                  {disputeReasons.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <Label htmlFor="desc">Description *</Label>
                <textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" rows={4}
                  placeholder="Describe your issue in detail..." />
              </div>

              <div>
                <Label>Upload Evidence</Label>
                <div className="mt-1 flex items-center justify-center rounded-lg border-2 border-dashed border-border p-6 text-center">
                  <div>
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Drag & drop files or click to upload</p>
                    <p className="text-xs text-muted-foreground">Images, screenshots, chat logs</p>
                  </div>
                </div>
              </div>

              <Button variant="hero" type="submit">Submit Dispute</Button>
            </form>
          </div>

          {/* Help sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <div className="flex items-center gap-2"><MessageCircle className="h-5 w-5 text-primary" /><h3 className="font-heading text-sm font-semibold text-foreground">Live Chat</h3></div>
              <p className="mt-2 text-xs text-muted-foreground">Available Mon-Fri, 8AM-6PM WAT</p>
              <Button variant="hero" size="sm" className="mt-3 w-full">Start Chat</Button>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <div className="flex items-center gap-2"><HelpCircle className="h-5 w-5 text-primary" /><h3 className="font-heading text-sm font-semibold text-foreground">FAQ</h3></div>
              <div className="mt-3 space-y-2">
                {faqItems.map((item, i) => (
                  <div key={i} className="rounded-lg border border-border">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between p-3 text-left text-xs font-medium text-foreground">
                      {item.q}
                      {openFaq === i ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                    {openFaq === i && <p className="px-3 pb-3 text-xs text-muted-foreground">{item.a}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dispute;