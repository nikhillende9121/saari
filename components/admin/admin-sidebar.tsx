'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Store
} from 'lucide-react';
import { useAuth } from '@/lib/store/auth-context';

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-charcoal text-white flex flex-col fixed left-0 top-0 border-r border-charcoal/80">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 text-gold hover:text-white transition-colors">
          <Store className="w-5 h-5" />
          <span className="font-heading font-bold text-xl tracking-wide uppercase">Silks</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-2">
          Management
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          // Special case for exact match on dashboard
          const isReallyActive = item.href === '/admin' ? pathname === '/admin' : isActive;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all',
                isReallyActive
                  ? 'bg-gold/20 text-gold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 flex-shrink-0 h-5 w-5',
                  isReallyActive ? 'text-gold' : 'text-white/40 group-hover:text-white/70'
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Admin User / Footer */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-sm font-bold text-white">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.displayName || 'Admin User'}
            </p>
            <p className="text-xs text-white/50 truncate">
              {user?.email || 'admin@vastrika.com'}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-rose hover:bg-rose/10 hover:text-rose-400 rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
