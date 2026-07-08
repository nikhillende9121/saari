'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Heart, User, ShoppingBag } from 'lucide-react';
import { mainNav } from '@/lib/data/mock';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-[70]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-[71] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-border-light">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
                  <span className="text-white font-heading text-sm font-bold">V</span>
                </div>
                <span className="font-heading font-bold text-lg text-charcoal">VASTRIKA</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-cream rounded-full transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              {mainNav.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-3.5 text-[15px] font-medium text-charcoal hover:bg-cream rounded-lg transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.badge && (
                        <span className="text-[10px] font-bold text-rose bg-rose/10 px-1.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                      )}
                    </span>
                    {item.children && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </Link>

                  {item.children && (
                    <div className="ml-4 pl-3 border-l border-border-light space-y-0.5 mb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          onClick={onClose}
                          className="block px-3 py-2 text-sm text-charcoal/60 hover:text-charcoal hover:bg-cream rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Footer Actions */}
            <div className="border-t border-border-light p-4 space-y-2">
              <Link
                href="/account"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-cream rounded-lg transition-colors"
              >
                <User className="w-4.5 h-4.5" />
                My Account
              </Link>
              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-cream rounded-lg transition-colors"
              >
                <Heart className="w-4.5 h-4.5" />
                Wishlist
              </Link>
              <Link
                href="/cart"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-cream rounded-lg transition-colors"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                Shopping Bag
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
