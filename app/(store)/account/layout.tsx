'use client';

import { useAuth } from '@/lib/store/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, User as UserIcon, MapPin, Package, Settings, LogOut } from 'lucide-react';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-cream">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  const menuItems = [
    { name: 'Profile Overview', icon: UserIcon, href: '/account' },
    { name: 'Order History', icon: Package, href: '/account/orders' },
    { name: 'Saved Addresses', icon: MapPin, href: '/account/addresses' },
    { name: 'Account Settings', icon: Settings, href: '/account/settings' },
  ];

  return (
    <div className="bg-cream min-h-screen py-12 md:py-20">
      <Container>
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-charcoal mb-4">My Account</h1>
          <p className="text-muted-foreground">Welcome back, {user.displayName || 'Valued Customer'}.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-lg border border-border-light overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border-light bg-charcoal text-white">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-2xl font-heading font-bold mb-3 shadow-md">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <h3 className="font-medium text-lg truncate">{user.displayName || 'User'}</h3>
                <p className="text-sm text-white/70 truncate">{user.email}</p>
              </div>
              <div className="p-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-cream text-charcoal" 
                          : "text-muted-foreground hover:bg-cream/50 hover:text-charcoal"
                      )}
                    >
                      <item.icon className={cn("w-5 h-5", isActive ? "text-gold" : "")} />
                      {item.name}
                    </Link>
                  );
                })}
                
                <div className="my-2 border-t border-border-light"></div>
                
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-rose hover:bg-rose/5 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-border-light p-6 md:p-8 shadow-sm min-h-[400px]">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
