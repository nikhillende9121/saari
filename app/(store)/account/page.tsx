'use client';

import { useAuth } from '@/lib/store/auth-context';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountOverviewPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-charcoal mb-6 border-b border-border-light pb-4">
        Profile Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Account Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium text-charcoal">{user.displayName || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="font-medium text-charcoal">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-medium text-charcoal">{user.phoneNumber || 'Not provided'}</p>
            </div>
          </div>
          <Link href="/account/settings">
            <Button variant="outline" className="mt-6 border-charcoal text-charcoal hover:bg-charcoal hover:text-white">
              Edit Profile
            </Button>
          </Link>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Recent Orders</h3>
          <div className="bg-cream rounded-md p-6 text-center border border-border-light border-dashed">
            <Package className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-charcoal font-medium">No recent orders found</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">You haven't placed any orders yet.</p>
            <Button onClick={() => router.push('/products')}>
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
