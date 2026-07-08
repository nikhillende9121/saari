'use client';

import { useAuth } from '@/lib/store/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  
  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-charcoal mb-6 border-b border-border-light pb-4">
        Account Settings
      </h2>
      
      <div className="max-w-2xl">
        <form onSubmit={handleSave} className="space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-charcoal">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="fullName">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  defaultValue={user.displayName || ''}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="phone">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  defaultValue={user.phoneNumber || ''}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="email">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email || ''}
                disabled
                className="bg-cream/50 text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">Email address cannot be changed.</p>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-border-light">
            <h3 className="text-lg font-semibold text-charcoal">Password Change</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To change your password, please use the "Forgot Password" link on the login page, or click the button below to send a reset link to your email.
            </p>
            <Button variant="outline" type="button">
              Send Password Reset Email
            </Button>
          </div>

          <div className="pt-6 border-t border-border-light">
            <Button 
              type="submit" 
              className="w-full sm:w-auto min-w-[150px] flex items-center justify-center gap-2"
              disabled={isSaving}
            >
              {isSaving ? (
                'Saving...'
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
