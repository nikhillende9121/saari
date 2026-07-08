'use client';

import { Product } from '@/lib/types';
import { ProductCard } from '@/components/ui/product-card';

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="border-t border-border-light pt-16">
      <h2 className="text-2xl font-heading font-bold text-charcoal mb-8">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
    </div>
  );
}
