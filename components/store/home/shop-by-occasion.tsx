'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { occasions } from '@/lib/data/mock';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const occasionGradients = [
  'linear-gradient(135deg, #800020, #d4a574)',
  'linear-gradient(135deg, #b5651d, #ffd700)',
  'linear-gradient(135deg, #4a1942, #ff69b4)',
  'linear-gradient(135deg, #2d5a3e, #87ceeb)',
  'linear-gradient(135deg, #1b2838, #708090)',
  'linear-gradient(135deg, #8b0000, #c9a94e)',
];

export function ShopByOccasion() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          accent="Find Your Style"
          title="Shop By Occasion"
          subtitle="From grand celebrations to everyday grace — find the perfect saree for every moment"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {occasions.map((occasion, i) => (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/occasions/${occasion.slug}`}
                className="group block relative h-48 md:h-60 rounded-xl overflow-hidden"
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: occasionGradients[i] }}
                />
                <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/20 transition-colors" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-lg md:text-xl font-heading font-semibold text-white mb-1">
                    {occasion.name}
                  </h3>
                  <p className="text-white/60 text-xs mb-3">
                    {occasion.count} Sarees
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-gold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Shop Now <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
