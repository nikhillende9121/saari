'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { categories } from '@/lib/data/mock';
import { motion } from 'framer-motion';

const categoryGradients = [
  '#8B0000', '#C9A94E', '#7B2D8E', '#800020',
  '#191970', '#008080', '#D2B48C', '#FFB6C1',
];

export function ShopByCategory() {
  return (
    <section className="py-16 md:py-24 bg-cream/50">
      <Container>
        <SectionHeading
          accent="Browse By"
          title="Shop By Category"
          subtitle="Find the perfect saree by exploring our curated fabric categories"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="group block text-center"
              >
                {/* Circle Image */}
                <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-4 rounded-full overflow-hidden border-2 border-transparent group-hover:border-gold transition-all duration-300">
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${categoryGradients[i]}33, ${categoryGradients[i]}66)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-3xl font-heading font-bold opacity-30"
                      style={{ color: categoryGradients[i] }}
                    >
                      {category.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-medium text-sm md:text-base text-charcoal group-hover:text-gold transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {category.productCount} Products
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
