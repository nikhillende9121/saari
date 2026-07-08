'use client';

import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProductCard } from '@/components/ui/product-card';
import { trendingProducts } from '@/lib/data/mock';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function TrendingSarees() {
  return (
    <section className="py-16 md:py-24 bg-cream/50">
      <Container>
        <SectionHeading
          accent="What's Hot"
          title="Trending Now"
          subtitle="Discover the most loved sarees by our customers this season"
        >
          <Link
            href="/collections/trending"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-dark mt-4 transition-colors"
          >
            View All Trending
            <ArrowRight className="w-4 h-4" />
          </Link>
        </SectionHeading>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {trendingProducts.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
