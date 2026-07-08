'use client';

import { useCart } from '@/lib/store/cart-context';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function SlideOutCart() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalAmount, itemCount } = useCart();
  const router = useRouter();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[70]"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] md:w-[450px] bg-white shadow-2xl z-[71] flex flex-col border-l border-border-light"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-light bg-cream/30">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-charcoal" />
                <h2 className="text-xl font-heading font-bold text-charcoal">Your Cart</h2>
                <span className="bg-gold text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {itemCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-cream rounded-full transition-colors text-muted-foreground hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center text-muted-foreground">
                    <ShoppingBag className="w-8 h-8 opacity-50" />
                  </div>
                  <h3 className="text-lg font-medium text-charcoal">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground max-w-[250px]">
                    Looks like you haven't added any beautiful sarees to your cart yet.
                  </p>
                  <Button 
                    onClick={() => {
                      setIsCartOpen(false);
                      router.push('/products');
                    }}
                    className="mt-4"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 bg-white">
                    {/* Image */}
                    <div className="relative w-20 h-24 md:w-24 md:h-32 rounded-md overflow-hidden shrink-0 border border-border-light">
                      <Image
                        src={item.product.images[0]?.url || '/images/placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-medium text-charcoal text-sm md:text-base line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.product.fabric}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-rose p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center border border-border-light rounded-md">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-charcoal hover:bg-cream transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-charcoal hover:bg-cream transition-colors"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-semibold text-charcoal text-sm md:text-base">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border-light bg-cream/30 p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-charcoal">{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border-light/50">
                  <span className="text-base font-medium text-charcoal">Total</span>
                  <span className="text-xl font-heading font-bold text-charcoal">{formatPrice(totalAmount)}</span>
                </div>

                <div className="pt-2">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full h-12 text-base flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Taxes are calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
