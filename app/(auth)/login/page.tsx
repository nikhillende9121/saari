'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // MOCK LOGIN BYPASS
      setTimeout(() => {
        router.push('/admin'); // Redirect straight to Admin for demo
      }, 800);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to sign in. Please check your credentials.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      router.push('/account');
    } catch (err: any) {
      console.error(err);
      setError('Failed to sign in with Google.');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">Welcome Back</h1>
        <p className="text-muted-foreground text-sm">Sign in to your Vastrika account to continue.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose/10 border border-rose/20 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose shrink-0 mt-0.5" />
          <p className="text-sm text-rose font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleEmailLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Mail className="w-4 h-4" />
            </div>
            <Input
              id="email"
              type="email"
              required
              className="pl-10 bg-white"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-charcoal" htmlFor="password">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs text-gold hover:text-gold-dark font-medium transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Lock className="w-4 h-4" />
            </div>
            <Input
              id="password"
              type="password"
              required
              className="pl-10 bg-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-base font-medium" 
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <div className="mt-8 mb-6 flex items-center">
        <div className="flex-1 border-t border-border-light"></div>
        <span className="px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">Or continue with</span>
        <div className="flex-1 border-t border-border-light"></div>
      </div>

      <Button 
        type="button" 
        variant="outline" 
        className="w-full h-12 bg-white"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          <path fill="none" d="M1 1h22v22H1z" />
        </svg>
        Google
      </Button>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link href="/register" className="text-gold font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
