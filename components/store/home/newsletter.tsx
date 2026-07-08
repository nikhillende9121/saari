'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Mail, Gift } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-cream via-ivory to-cream relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-burgundy/5 rounded-full blur-3xl" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6 text-gold" />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-charcoal mb-3">
            Stay in the Loop
          </h2>
          <p className="text-charcoal-light text-sm md:text-base mb-8 leading-relaxed">
            Subscribe to receive exclusive offers, new collection launches, and style inspiration 
            straight to your inbox.
          </p>

          {/* Benefit badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {['10% Off First Order', 'Early Access to Sales', 'Styling Tips'].map((benefit) => (
              <span
                key={benefit}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-charcoal shadow-sm border border-border-light"
              >
                <Gift className="w-3 h-3 text-gold" />
                {benefit}
              </span>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 h-12 px-5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold placeholder:text-muted-foreground"
              required
            />
            <Button type="submit" size="lg" className="h-12 shrink-0">
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            No spam, unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
