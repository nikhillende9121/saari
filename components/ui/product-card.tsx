'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { formatPrice, calcDiscount } from '@/lib/utils/format';
import type { Product } from '@/lib/types';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/store/cart-context';

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export function ProductCard({ product, index = 0, className }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const discount = product.compareAtPrice
    ? calcDiscount(product.compareAtPrice, product.price)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn('group product-card', className)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-xl bg-cream aspect-[3/4]">
          {/* Placeholder gradient for product image */}
          <div
            className="absolute inset-0 product-card-img"
            style={{
              background: `linear-gradient(135deg, ${product.colorHex}22, ${product.colorHex}44, ${product.colorHex}22)`,
            }}
          />

          {/* Overlay with centered product initial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-6xl font-heading font-bold opacity-15"
              style={{ color: product.colorHex }}
            >
              {product.name.charAt(0)}
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNew && <Badge variant="new">New</Badge>}
            {discount > 0 && <Badge variant="sale">{discount}% Off</Badge>}
            {product.isTrending && !product.isNew && <Badge variant="trending">Trending</Badge>}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-gold hover:text-white transition-colors shadow-md cursor-pointer"
              aria-label="Add to wishlist"
              onClick={(e) => { e.preventDefault(); }}
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-gold hover:text-white transition-colors shadow-md cursor-pointer"
              aria-label="Quick view"
              onClick={(e) => { e.preventDefault(); }}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <button
              className="w-full h-10 bg-charcoal/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-charcoal transition-colors cursor-pointer"
              onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                addToCart(product, 1);
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1.5">
          <p className="text-xs text-gold font-medium uppercase tracking-wider">
            {product.fabric}
          </p>
          <h3 className="font-medium text-charcoal text-sm leading-snug line-clamp-2 group-hover:text-gold transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <Rating value={product.rating} size="sm" count={product.reviewCount} />

          {/* Price */}
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-base font-semibold text-charcoal">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Color indicator */}
          <div className="flex items-center gap-1.5 pt-1">
            <span
              className="w-3.5 h-3.5 rounded-full border border-border"
              style={{ backgroundColor: product.colorHex }}
            />
            <span className="text-xs text-muted-foreground">{product.color}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
