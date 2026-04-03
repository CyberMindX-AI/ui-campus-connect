import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const EmailVerification = () => {
  const [status, setStatus] = useState<'pending' | 'verified' | 'expired'>('pending');
  const [countdown, setCountdown] = useState(300);
  const [resendDisabled, setResendDisabled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== 'pending') return;
    const timer = setInterval(() => setCountdown((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [status]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const handleResend = () => {
    setResendDisabled(true);
    toast({ title: 'Verification email resent!', description: 'Check your inbox.' });
    setTimeout(() => setResendDisabled(false), 300000);
  };

  const handleVerify = () => {
    setStatus('verified');
    toast({ title: 'Email verified!', description: 'Welcome to UI Marketplace.' });
    setTimeout(() => navigate('/dashboard/buyer'), 2000);
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-md text-center">
          {status === 'pending' && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-heading text-2xl font-bold text-foreground">Check your email</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                We sent a verification link to your UI email inbox. Click the link to activate your account.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Link expires in {formatTime(countdown)}</span>
              </div>
              <div className="mt-6 space-y-3">
                <Button variant="hero" className="w-full" onClick={handleVerify}>
                  I've verified my email
                </Button>
                <Button variant="outline" className="w-full" disabled={resendDisabled} onClick={handleResend}>
                  Resend Verification Email
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Verification links are single-use and expire after 24 hours
              </p>
            </>
          )}
          {status === 'verified' && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h1 className="font-heading text-2xl font-bold text-foreground">Email Verified!</h1>
              <p className="mt-2 text-sm text-muted-foreground">Redirecting you to your dashboard...</p>
            </>
          )}
          {status === 'expired' && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <h1 className="font-heading text-2xl font-bold text-foreground">Link Expired</h1>
              <p className="mt-2 text-sm text-muted-foreground">Your verification link has expired.</p>
              <Button variant="hero" className="mt-6 w-full" onClick={handleResend}>
                Request New Link
              </Button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EmailVerification;