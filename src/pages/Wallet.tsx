import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus, Building2, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const transactions = [
  { id: 1, type: 'credit', desc: 'Sale: Organic Chemistry Textbook', amount: 4275, date: '2025-07-01', status: 'Completed' },
  { id: 2, type: 'credit', desc: 'Sale: Ankara Laptop Bag', amount: 7820, date: '2025-06-29', status: 'Completed' },
  { id: 3, type: 'debit', desc: 'Withdrawal to GTBank', amount: 50000, date: '2025-06-28', status: 'Completed' },
  { id: 4, type: 'credit', desc: 'Sale: Jollof Rice x3', amount: 4275, date: '2025-06-27', status: 'Completed' },
  { id: 5, type: 'refund', desc: 'Refund: Order ORD-2025-088', amount: 5500, date: '2025-06-25', status: 'Completed' },
  { id: 6, type: 'credit', desc: 'Sale: Standing Fan', amount: 14250, date: '2025-06-24', status: 'Pending' },
];

const Wallet = () => {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const handleWithdraw = () => {
    const num = Number(amount);
    if (num < 500) { toast({ title: 'Minimum ₦500', description: 'Minimum withdrawal amount is ₦500.', variant: 'destructive' }); return; }
    toast({ title: 'Withdrawal requested', description: `₦${num.toLocaleString()} will be sent in 1-3 business days.` });
    setShowWithdraw(false);
    setAmount('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Wallet</h1>

        {/* Balance cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-gradient-to-br from-primary to-primary-dark p-5 text-primary-foreground">
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80"><WalletIcon className="h-4 w-4" /> Available Balance</div>
            <p className="mt-2 font-heading text-3xl font-bold">₦142,300</p>
            <Button size="sm" className="mt-4 bg-white text-primary hover:bg-white/90" onClick={() => setShowWithdraw(true)}>Withdraw</Button>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" /> Pending</div>
            <p className="mt-2 font-heading text-2xl font-bold text-foreground">₦18,500</p>
            <p className="mt-1 text-xs text-muted-foreground">In escrow awaiting confirmation</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><ArrowUpRight className="h-4 w-4" /> Total Earnings</div>
            <p className="mt-2 font-heading text-2xl font-bold text-foreground">₦487,500</p>
            <p className="mt-1 text-xs text-muted-foreground">All time</p>
          </div>
        </div>

        {/* Withdraw modal */}
        {showWithdraw && (
          <div className="mt-6 rounded-xl border border-primary/30 bg-primary-light p-4 sm:p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground">Withdraw Funds</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div><Label>Amount (₦)</Label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1" placeholder="Min ₦500" /></div>
              <div><Label>Bank Account</Label>
                <select className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                  <option>GTBank - **** 4521</option>
                  <option>Access Bank - **** 8903</option>
                </select>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Processing time: 1-3 business days</p>
            <div className="mt-4 flex gap-3">
              <Button variant="hero" onClick={handleWithdraw}>Confirm Withdrawal</Button>
              <Button variant="outline" onClick={() => setShowWithdraw(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Bank accounts */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">Bank Accounts</h2>
            <Button variant="outline" size="sm" className="gap-1"><Plus className="h-3 w-3" /> Add Account</Button>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[{ bank: 'GTBank', number: '**** 4521', name: 'Adebayo Ogunlesi' }, { bank: 'Access Bank', number: '**** 8903', name: 'Adebayo Ogunlesi' }].map((acc) => (
              <div key={acc.number} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"><Building2 className="h-5 w-5 text-muted-foreground" /></div>
                <div><p className="text-sm font-medium text-foreground">{acc.bank}</p><p className="text-xs text-muted-foreground">{acc.number} · {acc.name}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction history */}
        <div className="mt-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Transaction History</h2>
          <div className="mt-3 space-y-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    tx.type === 'credit' ? 'bg-green-100 text-green-600' : tx.type === 'debit' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {tx.type === 'credit' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.desc}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wallet;