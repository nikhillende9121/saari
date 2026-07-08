'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils/format';
import { Heart, Share2, Truck, ShieldCheck, Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCart } from '@/lib/store/cart-context';

export function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    // Add to recently viewed
    try {
      const recentStr = localStorage.getItem('recentlyViewed');
      let recent = recentStr ? JSON.parse(recentStr) : [];
      recent = recent.filter((id: string) => id !== product.id);
      recent.unshift(product.id);
      recent = recent.slice(0, 10); // Keep last 10
      localStorage.setItem('recentlyViewed', JSON.stringify(recent));
    } catch (e) {
      console.error('Failed to update recently viewed', e);
    }
  }, [product.id]);

  return (
    <div className="flex flex-col">
      {/* Title & Price */}
      <div className="mb-6 border-b border-border-light pb-6">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-charcoal mb-3">
          {product.name}
        </h1>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-4 h-4", 
                  i < Math.floor(product.rating || 5) ? "fill-gold text-gold" : "text-border-light"
                )} 
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">{product.reviewCount || 0} reviews</span>
        </div>

        <div className="flex items-end gap-3">
          <span className="text-3xl font-heading font-bold text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-lg text-muted-foreground line-through mb-1">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm font-medium text-rose mb-1.5 ml-2">
              Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-charcoal-light leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Color/Fabric Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        <div className="px-3 py-1 bg-cream rounded-full text-xs font-medium text-charcoal flex items-center gap-2 border border-border-light">
          <div 
            className="w-3 h-3 rounded-full border border-border-light/50" 
            style={{ backgroundColor: product.colorHex || '#ddd' }} 
          />
          {product.color}
        </div>
        <div className="px-3 py-1 bg-cream rounded-full text-xs font-medium text-charcoal border border-border-light">
          {product.fabric}
        </div>
      </div>

      {/* Actions */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-border-light rounded-md h-12 w-32 shrink-0">
            <button 
              className="flex-1 flex items-center justify-center hover:bg-cream transition-colors text-charcoal"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-10 text-center font-medium text-sm text-charcoal">{quantity}</span>
            <button 
              className="flex-1 flex items-center justify-center hover:bg-cream transition-colors text-charcoal"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <Button 
            onClick={() => addToCart(product, quantity)}
            className="flex-1 h-12 text-base shadow-md hover:shadow-lg transition-all"
          >
            Add to Cart
          </Button>
          
          <button 
            className="w-12 h-12 rounded-md border border-border-light flex items-center justify-center hover:border-charcoal hover:bg-cream transition-all shrink-0 group"
            onClick={() => setIsWishlisted(!isWishlisted)}
            aria-label="Add to wishlist"
          >
            <Heart className={cn(
              "w-5 h-5 transition-colors", 
              isWishlisted ? "fill-rose text-rose" : "text-charcoal group-hover:text-rose"
            )} />
          </button>
        </div>
        
        {/* Stock Status */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-700">In Stock</span>
          <span className="text-muted-foreground font-normal ml-1">— Ships within 48 hours</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border-light">
        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-charcoal">Free Shipping</h4>
            <p className="text-xs text-muted-foreground mt-0.5">On all domestic orders</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-charcoal">Authentic Weave</h4>
            <p className="text-xs text-muted-foreground mt-0.5">100% genuine handloom</p>
          </div>
        </div>
      </div>
      
      {/* Share */}
      <div className="mt-8 pt-6 border-t border-border-light flex items-center gap-4">
        <span className="text-sm font-medium text-charcoal">Share:</span>
        <button className="text-muted-foreground hover:text-charcoal transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
