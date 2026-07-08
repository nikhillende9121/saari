'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProductCard } from '@/components/ui/product-card';
import { CountdownTimer } from '@/components/ui/countdown-timer';
import { flashSaleData } from '@/lib/data/mock';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function FlashSale() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy/5 via-transparent to-gold/5" />

      <Container className="relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-2"
            >
              <div className="w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center animate-pulse-gold">
                <Zap className="w-4 h-4 text-rose fill-rose" />
              </div>
              <span className="text-rose font-accent text-lg tracking-wider uppercase font-medium">
                {flashSaleData.title}
              </span>
            </motion.div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-charcoal">
              Don&apos;t Miss Out!
            </h2>
            <p className="text-charcoal-light text-sm md:text-base mt-2 max-w-md">
              Limited time offers on our finest handcrafted sarees. Hurry before they&apos;re gone!
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              {flashSaleData.subtitle}
            </span>
            <CountdownTimer endTime={flashSaleData.endTime} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {flashSaleData.products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/sale"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-rose text-rose rounded-lg font-medium text-sm hover:bg-rose hover:text-white transition-all"
          >
            View All Deals
          </Link>
        </div>
      </Container>
    </section>
  );
}
