'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { collections } from '@/lib/data/mock';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const collectionColors = [
  'linear-gradient(135deg, #800020, #c9a94e)',
  'linear-gradient(135deg, #2d5a3e, #a8d5ba)',
  'linear-gradient(135deg, #4a1942, #d4a5d0)',
  'linear-gradient(135deg, #1b2838, #c9a94e)',
];

export function FeaturedCollections() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          accent="Curated For You"
          title="Featured Collections"
          subtitle="Explore our handpicked collections, each telling a unique story of artistry and tradition"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {collections.filter(c => c.isFeatured).map((collection, i) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/collections/${collection.slug}`}
                className="group block relative h-80 md:h-96 rounded-2xl overflow-hidden"
              >
                {/* Background gradient */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{ background: collectionColors[i % collectionColors.length] }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/10" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-gold text-xs font-medium uppercase tracking-wider">
                    {collection.productCount} Products
                  </span>
                  <h3 className="text-xl font-heading font-semibold text-white mt-1 mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-2 mb-3">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold group-hover:gap-3 transition-all">
                    Explore
                    <ArrowRight className="w-4 h-4" />
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
