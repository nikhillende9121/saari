'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { mainNav } from '@/lib/data/mock';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/lib/store/auth-context';
import { useCart } from '@/lib/store/cart-context';
import { MobileMenu } from './mobile-menu';
import { SearchBar } from './search-bar';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-md'
            : 'bg-white'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left — Mobile Menu + Logo */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 -ml-2 hover:bg-cream rounded-lg transition-colors cursor-pointer"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-charcoal" />
              </button>

              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center">
                  <span className="text-white font-heading text-lg font-bold">V</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-heading font-bold text-charcoal tracking-tight leading-none">
                    VASTRIKA
                  </h1>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-medium">
                    Handcrafted Elegance
                  </span>
                </div>
              </Link>
            </div>

            {/* Center — Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation">
              {mainNav.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal/80',
                      'hover:text-charcoal transition-colors rounded-lg hover:bg-cream/50',
                    )}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="text-[10px] font-bold text-rose ml-0.5">{item.badge}</span>
                    )}
                    {item.children && (
                      <ChevronDown className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        activeDropdown === item.id && 'rotate-180'
                      )} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-0 pt-2 z-50"
                      >
                        <div className="bg-white rounded-xl shadow-xl border border-border-light p-2 min-w-[220px]">
                          {item.children.map((child) => (
                            <Link
                              key={child.id}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-charcoal/80 hover:text-charcoal hover:bg-cream rounded-lg transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right — Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 hover:bg-cream rounded-full transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-charcoal" />
              </button>

              <Link
                href="/wishlist"
                className="p-2.5 hover:bg-cream rounded-full transition-colors hidden sm:flex"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-charcoal" />
              </Link>

              {user ? (
                <div className="relative group hidden sm:block">
                  <Link
                    href="/account"
                    className="p-2.5 flex items-center hover:bg-cream rounded-full transition-colors cursor-pointer"
                    aria-label="Account"
                  >
                    <User className="w-5 h-5 text-charcoal" />
                  </Link>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-border-light shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="px-4 py-2 border-b border-border-light mb-1">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-medium text-charcoal truncate">{user.displayName || user.email}</p>
                    </div>
                    <Link href="/account" className="block px-4 py-2 text-sm text-charcoal hover:bg-cream transition-colors">
                      My Account
                    </Link>
                    <Link href="/account/orders" className="block px-4 py-2 text-sm text-charcoal hover:bg-cream transition-colors">
                      My Orders
                    </Link>
                    <button 
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-rose hover:bg-rose/10 transition-colors flex items-center gap-2 mt-1 border-t border-border-light"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="p-2.5 hover:bg-cream rounded-full transition-colors hidden sm:flex"
                  aria-label="Sign In"
                >
                  <User className="w-5 h-5 text-charcoal" />
                </Link>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 hover:bg-cream rounded-full transition-colors cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 text-charcoal" />
                {itemCount > 0 && (
                  <span className="absolute top-0 -right-1 w-5 h-5 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Search Overlay */}
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
