'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function FestivalCollection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Full-width gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy via-burgundy/90 to-charcoal" />

      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-gold/50 animate-float" />
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full border border-gold/30" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full border border-gold/20 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-gold font-accent text-lg tracking-wider uppercase">
                Limited Edition
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-4">
              Festive Season<br />
              <span className="gradient-text">Collection 2025</span>
            </h2>

            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Celebrate every festival in style with our exclusive collection of handcrafted sarees, 
              designed to make you shine at every gathering.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/collections/festive-edit">
                <Button size="lg">
                  Shop Festive Collection
                </Button>
              </Link>
              <Link href="/collections/wedding-collection">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                  Wedding Edit
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-white/10">
              {[
                { value: '500+', label: 'Unique Designs' },
                { value: '50+', label: 'Master Weavers' },
                { value: '20k+', label: 'Happy Customers' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-heading font-bold text-gold">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-80 md:h-[500px] hidden lg:block"
          >
            {/* Decorative card stack */}
            <div className="absolute top-8 right-8 w-64 h-80 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 transform rotate-6" />
            <div className="absolute top-4 right-4 w-64 h-80 rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/30 transform rotate-3" />
            <div className="absolute top-0 right-0 w-64 h-80 rounded-2xl bg-gradient-to-br from-gold/40 to-burgundy-light/20 border border-gold/40 flex items-center justify-center">
              <span className="text-6xl font-heading font-bold text-white/20">✦</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
