'use client';

import { useAuth } from '@/lib/store/auth-context';
import { Button } from '@/components/ui/button';
import { Package, ChevronRight, Download } from 'lucide-react';
import { formatPrice } from '@/lib/utils/format';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-812349',
    date: 'Oct 12, 2026',
    status: 'Delivered',
    total: 18500,
    items: [
      {
        id: 'item-1',
        name: 'Midnight Blue Banarasi Silk Saree',
        fabric: 'Pure Silk',
        price: 18500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6159c?q=80&w=800&auto=format&fit=crop',
      }
    ]
  },
  {
    id: 'ORD-759210',
    date: 'Sep 05, 2026',
    status: 'Delivered',
    total: 8200,
    items: [
      {
        id: 'item-2',
        name: 'Crimson Red Cotton Saree',
        fabric: 'Cotton',
        price: 8200,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1583391733975-612b7792e35a?q=80&w=800&auto=format&fit=crop',
      }
    ]
  }
];

export default function OrdersPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h2 className="text-2xl font-heading font-bold text-charcoal mb-6 border-b border-border-light pb-4">
        Order History
      </h2>
      
      {mockOrders.length > 0 ? (
        <div className="space-y-6">
          {mockOrders.map((order) => (
            <div key={order.id} className="border border-border-light rounded-lg overflow-hidden bg-white">
              {/* Order Header */}
              <div className="bg-cream/50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-light text-sm">
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <div>
                    <p className="text-muted-foreground mb-0.5">Order Placed</p>
                    <p className="font-medium text-charcoal">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5">Total</p>
                    <p className="font-medium text-charcoal">{formatPrice(order.total)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5">Ship To</p>
                    <p className="font-medium text-charcoal">{user.displayName || 'Customer'}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-1">
                  <p className="text-muted-foreground">Order # <span className="font-medium text-charcoal">{order.id}</span></p>
                  <Link href={`#`} className="text-gold hover:text-gold-dark font-medium flex items-center gap-1 transition-colors">
                    View Invoice <Download className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h3 className="font-semibold text-emerald-700">{order.status}</h3>
                </div>
                
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-24 rounded-md overflow-hidden shrink-0 border border-border-light">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 py-1">
                      <h4 className="font-medium text-charcoal text-base">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">Fabric: {item.fabric}</p>
                      <p className="text-sm font-medium text-charcoal mt-2">
                        {formatPrice(item.price)} <span className="text-muted-foreground font-normal ml-1">x {item.quantity}</span>
                      </p>
                    </div>
                    <div className="hidden sm:flex flex-col gap-2 justify-center shrink-0">
                      <Button variant="outline" size="sm" className="w-32">Track Package</Button>
                      <Button variant="outline" size="sm" className="w-32">Write Review</Button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4 sm:hidden flex flex-col gap-2">
                  <Button variant="outline" className="w-full">Track Package</Button>
                  <Button variant="outline" className="w-full">Write Review</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-cream rounded-md p-12 text-center border border-border-light border-dashed mt-8">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-heading font-medium text-charcoal mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You haven't placed any orders yet. Explore our exquisite collection and find your perfect saree.
          </p>
          <Link href="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
