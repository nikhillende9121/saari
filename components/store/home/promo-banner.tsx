'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { promoBanners } from '@/lib/data/mock';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {promoBanners.map((banner, i) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                href={banner.ctaLink || '/sale'}
                className="group block relative h-44 md:h-56 rounded-2xl overflow-hidden"
              >
                <Image 
                  src={banner.desktopImage}
                  alt={banner.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-charcoal/10" />

                <div className="absolute inset-0 flex items-center p-8 md:p-10">
                  <div>
                    <span className="text-white/70 text-xs uppercase tracking-widest font-medium">
                      {banner.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1 mb-4">
                      {banner.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/20 backdrop-blur-sm px-5 py-2 rounded-lg group-hover:bg-white/30 transition-colors">
                      {banner.ctaText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
