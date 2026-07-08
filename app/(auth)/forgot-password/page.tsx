'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send reset email. Please check your address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Link href="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-charcoal mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to sign in
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">Reset Password</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose/10 border border-rose/20 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose shrink-0 mt-0.5" />
          <p className="text-sm text-rose font-medium">{error}</p>
        </div>
      )}

      {success ? (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-emerald-800 mb-2">Check your email</h3>
            <p className="text-emerald-700/80 text-sm">
              We've sent a password reset link to <span className="font-semibold">{email}</span>. Please check your inbox and spam folder.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-2 bg-white"
            onClick={() => setSuccess(false)}
          >
            Try another email
          </Button>
        </div>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-6">
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

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium" 
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Sending Link...
              </span>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
