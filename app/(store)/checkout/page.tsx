'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/store/cart-context';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Lock, CreditCard, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/store/auth-context';

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ')[1] || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !isSubmitting) {
      router.push('/products');
    }
  }, [items, router, isSubmitting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for order processing
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 1500);
  };

  if (items.length === 0 && !isSubmitting) return null;

  return (
    <div className="bg-cream min-h-screen pb-20 pt-24 md:pt-32">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-charcoal mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Return to cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-charcoal">Secure Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Form */}
          <div className="flex-1 order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Contact Info */}
              <div className="bg-white p-6 md:p-8 rounded-lg border border-border-light shadow-sm">
                <h2 className="text-xl font-heading font-bold text-charcoal mb-6 border-b border-border-light pb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="email">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-cream/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="phone">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-cream/30"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 md:p-8 rounded-lg border border-border-light shadow-sm">
                <h2 className="text-xl font-heading font-bold text-charcoal mb-6 border-b border-border-light pb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="firstName">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="bg-cream/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="lastName">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="bg-cream/30"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="address">
                      Street Address
                    </label>
                    <Input
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="bg-cream/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="city">
                      City
                    </label>
                    <Input
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="bg-cream/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="state">
                      State
                    </label>
                    <Input
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="bg-cream/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="pincode">
                      PIN Code
                    </label>
                    <Input
                      id="pincode"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      className="bg-cream/30"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section (Dummy) */}
              <div className="bg-white p-6 md:p-8 rounded-lg border border-border-light shadow-sm">
                <h2 className="text-xl font-heading font-bold text-charcoal mb-6 border-b border-border-light pb-4">Payment Method</h2>
                
                <div className="border border-gold/40 bg-gold/5 rounded-md p-4 flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal">Demo Environment</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      No real payment is required. Clicking "Place Order" will simulate a successful transaction.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Processing Order...'
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Place Order ({formatPrice(totalAmount)})
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[400px] shrink-0 order-1 lg:order-2">
            <div className="bg-white p-6 rounded-lg border border-border-light shadow-sm sticky top-24">
              <h2 className="text-xl font-heading font-bold text-charcoal mb-6 border-b border-border-light pb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative w-16 h-20 rounded-md overflow-hidden shrink-0 border border-border-light">
                      <Image
                        src={item.product.images[0]?.url || '/images/placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-charcoal text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 py-1">
                      <h4 className="font-medium text-charcoal text-sm line-clamp-1">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.product.fabric}</p>
                      <p className="font-semibold text-charcoal text-sm mt-1">{formatPrice(item.product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border-light pt-4 space-y-3">
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
                  <span className="text-2xl font-heading font-bold text-charcoal">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
