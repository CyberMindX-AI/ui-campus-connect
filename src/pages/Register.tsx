import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const faculties = [
  'Agriculture', 'Arts', 'Clinical Sciences', 'Dentistry', 'Education', 'Law',
  'Pharmacy', 'Science', 'Social Sciences', 'Technology', 'Veterinary Medicine',
  'Public Health', 'Economics', 'Environmental Design & Management', 'Renewable Natural Resources',
  'Multidisciplinary Studies', 'Basic Medical Sciences',
];

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<'buyer' | 'seller' | 'both'>('buyer');
  const [form, setForm] = useState({ fullname: '', email: '', password: '', confirm: '', faculty: '', matric: '', terms: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const update = (field: string, value: string | boolean) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullname.trim() || form.fullname.trim().length < 3) errs.fullname = 'Full name is required (min 3 characters)';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!form.email.endsWith('@ui.edu.ng')) errs.email = 'Must be a valid @ui.edu.ng email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Minimum 8 characters';
    else if (!/[A-Z]/.test(form.password)) errs.password = 'Must include an uppercase letter';
    else if (!/[0-9]/.test(form.password)) errs.password = 'Must include a number';
    else if (!/[^A-Za-z0-9]/.test(form.password)) errs.password = 'Must include a special character';
    if (!form.confirm) errs.confirm = 'Please confirm your password';
    else if (form.confirm !== form.password) errs.confirm = 'Passwords do not match';
    if (!form.faculty) errs.faculty = 'Please select your faculty';
    if (!form.terms) errs.terms = 'You must agree to the terms';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Account created!', description: 'Check your UI email for a verification link.' });
      navigate('/login');
    }, 1500);
  };

  const FieldError = ({ field }: { field: string }) =>
    errors[field] ? (
      <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
        <AlertCircle className="h-3 w-3 flex-shrink-0" /> {errors[field]}
      </p>
    ) : null;

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <span className="font-heading text-xl font-bold text-primary-foreground">UI</span>
            </div>
            <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Join 5,000+ UI students already trading on the platform</p>
          </div>

          <form className="mt-6 space-y-4 sm:mt-8" onSubmit={handleSubmit} noValidate>
            <div>
              <Label htmlFor="fullname">Full Name</Label>
              <Input id="fullname" placeholder="Adebayo Ogunlesi" className={`mt-1 ${errors.fullname ? 'border-destructive' : ''}`} value={form.fullname} onChange={(e) => update('fullname', e.target.value)} />
              <FieldError field="fullname" />
            </div>
            <div>
              <Label htmlFor="email">UI Email Address</Label>
              <Input id="email" type="email" placeholder="you@ui.edu.ng" className={`mt-1 ${errors.email ? 'border-destructive' : ''}`} value={form.email} onChange={(e) => update('email', e.target.value)} />
              <p className="mt-1 text-xs text-muted-foreground">Only @ui.edu.ng emails are accepted</p>
              <FieldError field="email" />
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input id="password" type={showPw ? 'text' : 'password'} placeholder="Min 8 characters" className={errors.password ? 'border-destructive' : ''} value={form.password} onChange={(e) => update('password', e.target.value)} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <FieldError field="password" />
              </div>
              <div>
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" type="password" placeholder="Re-enter password" className={`mt-1 ${errors.confirm ? 'border-destructive' : ''}`} value={form.confirm} onChange={(e) => update('confirm', e.target.value)} />
                <FieldError field="confirm" />
              </div>
            </div>
            <div>
              <Label>I want to</Label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(['buyer', 'seller', 'both'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                      role === r
                        ? 'border-primary bg-primary-light text-primary'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    {r === 'both' ? 'Buy & Sell' : r === 'buyer' ? 'Buy' : 'Sell'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="faculty">Faculty</Label>
              <select
                id="faculty"
                className={`mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground ${errors.faculty ? 'border-destructive' : 'border-input'}`}
                value={form.faculty}
                onChange={(e) => update('faculty', e.target.value)}
              >
                <option value="">Select your faculty</option>
                {faculties.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <FieldError field="faculty" />
            </div>
            <div>
              <Label htmlFor="matric">Matric Number (optional)</Label>
              <Input id="matric" placeholder="e.g. 200101" className="mt-1" value={form.matric} onChange={(e) => update('matric', e.target.value)} />
            </div>
            <div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 rounded border-input accent-primary"
                  checked={form.terms}
                  onChange={(e) => update('terms', e.target.checked)}
                />
                <Label htmlFor="terms" className="text-sm font-normal leading-snug">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and{' '}
                  <a href="#" className="text-primary hover:underline">Community Guidelines</a>
                </Label>
              </div>
              <FieldError field="terms" />
            </div>
            <Button variant="hero" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
