'use client';

import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { instagramPosts } from '@/lib/data/mock';
import { motion } from 'framer-motion';
import { Camera, Heart } from 'lucide-react';

const igGradients = [
  'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
  'linear-gradient(135deg, #405de6, #5851db, #833ab4)',
  'linear-gradient(135deg, #fd1d1d, #e1306c, #833ab4)',
  'linear-gradient(135deg, #fcb045, #fd1d1d, #833ab4)',
  'linear-gradient(135deg, #833ab4, #c13584, #e1306c)',
  'linear-gradient(135deg, #405de6, #833ab4, #c13584)',
];

export function InstagramGallery() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          accent="@vastrika_official"
          title="Follow Us on Instagram"
          subtitle="Join our community of saree lovers and get inspired by our latest looks"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-rose hover:text-rose/80 transition-colors"
          >
            <Camera className="w-4 h-4" />
            Follow @vastrika_official
          </a>
        </SectionHeading>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Gradient Placeholder */}
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                style={{ background: igGradients[i % igGradients.length] }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <Heart className="w-5 h-5 text-white fill-white mx-auto mb-1" />
                  <span className="text-white text-xs font-medium">{post.likes.toLocaleString()}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
