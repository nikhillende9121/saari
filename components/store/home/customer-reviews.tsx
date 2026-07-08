'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Rating } from '@/components/ui/rating';
import { testimonials } from '@/lib/data/mock';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export function CustomerReviews() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <section className="py-16 md:py-24 bg-cream/50">
      <Container>
        <SectionHeading
          accent="Loved By Thousands"
          title="What Our Customers Say"
          subtitle="Real stories from real customers who found their perfect saree"
        />

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-border-light text-center relative"
            >
              {/* Quote icon */}
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Quote className="w-5 h-5 text-gold" />
              </div>

              <Rating
                value={testimonial.rating}
                size="lg"
                className="justify-center mb-5"
              />

              <blockquote className="text-base md:text-lg text-charcoal/80 leading-relaxed mb-6 italic font-accent">
                &ldquo;{testimonial.comment}&rdquo;
              </blockquote>

              {/* Customer Info */}
              <div>
                <div className="w-12 h-12 rounded-full bg-gradient-gold mx-auto flex items-center justify-center mb-3">
                  <span className="text-white font-heading font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <p className="font-medium text-charcoal">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                {testimonial.productName && (
                  <p className="text-xs text-gold mt-1">Purchased: {testimonial.productName}</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    i === current ? 'w-6 bg-gold' : 'bg-border hover:bg-gold/40'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
