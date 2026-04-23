import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLogin } from '@/hooks/api/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const { mutate: performLogin, isPending: loading } = useLogin(); 

  if (isAuthenticated) {
    const dashboardPath = user?.role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer';
    return <Navigate to={dashboardPath} replace />;
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = 'Email is required';
    else if (!email.endsWith('@ui.edu.ng')) errs.email = 'Must be a valid @ui.edu.ng email';
    if (!password.trim()) errs.password = 'Password is required';
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    performLogin(
      { email, password },
      {
        onSuccess: (data) => {
          login(data.user); // Sync Context if needed
          toast({ title: 'Welcome back!', description: 'You have signed in successfully.' });
          
          // Dynamic redirection based on role
          const dashboardPath = data.user.role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer';
          navigate(dashboardPath);
        },
        onError: (err: any) => {
          toast({ title: 'Login Failed', description: err.message || 'Invalid credentials.', variant: 'destructive' });
        }
      }
    );
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <span className="font-heading text-xl font-bold text-primary-foreground">UI</span>
            </div>
            <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to your UI Marketplace account</p>
          </div>

          <form className="mt-6 space-y-4 sm:mt-8" onSubmit={handleSubmit} noValidate>
            <div>
              <Label htmlFor="email">UI Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@ui.edu.ng"
                className={`mt-1 ${errors.email ? 'border-destructive' : ''}`}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
              />
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" /> {errors.email}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={errors.password ? 'border-destructive' : ''}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" /> {errors.password}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-input accent-primary" />
              <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
            </div>
            <Button variant="hero" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
