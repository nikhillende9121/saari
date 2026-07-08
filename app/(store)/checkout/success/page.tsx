'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, Truck, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CheckoutSuccessPage() {
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate a random mock order ID
    const randomId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
  }, []);

  return (
    <div className="bg-cream min-h-screen pb-20 pt-32 md:pt-40">
      <Container>
        <div className="max-w-2xl mx-auto bg-white rounded-lg border border-border-light shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-50 border-b border-emerald-100 p-8 md:p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-emerald-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-emerald-700/80">
              Thank you for shopping with Vastrika. Your order has been placed successfully.
            </p>
          </div>

          {/* Details */}
          <div className="p-8 md:p-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-b border-border-light mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="text-lg font-bold text-charcoal font-mono">{orderId}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                <p className="text-lg font-bold text-charcoal">
                  {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4 p-4 rounded-md bg-cream/30 border border-border-light">
                <Mail className="w-6 h-6 text-gold shrink-0" />
                <div>
                  <h4 className="font-medium text-charcoal mb-1">Email Confirmation</h4>
                  <p className="text-sm text-muted-foreground">
                    We've sent a confirmation email with your order details and invoice.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-md bg-cream/30 border border-border-light">
                <Truck className="w-6 h-6 text-gold shrink-0" />
                <div>
                  <h4 className="font-medium text-charcoal mb-1">Order Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    You will receive tracking information once your saree is dispatched.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="w-full sm:w-auto">
                <Button className="w-full h-12 text-base px-8 flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Continue Shopping
                </Button>
              </Link>
              <Link href="/account/orders" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full h-12 text-base px-8">
                  View My Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
