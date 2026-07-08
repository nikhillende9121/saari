'use client';

import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProductCard } from '@/components/ui/product-card';
import { bestSellers } from '@/lib/data/mock';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function BestSellers() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          accent="Customer Favorites"
          title="Best Sellers"
          subtitle="Our most popular sarees, loved and recommended by thousands of happy customers"
        >
          <Link
            href="/collections/best-sellers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-dark mt-4 transition-colors"
          >
            Shop All Best Sellers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </SectionHeading>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
