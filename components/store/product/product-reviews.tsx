'use client';

import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/lib/data/mock';

interface ProductReviewsProps {
  productId: string;
  rating: number;
  count: number;
}

export function ProductReviews({ productId, rating, count }: ProductReviewsProps) {
  // In a real app, we would fetch reviews for this specific productId.
  // For now, we'll just slice the mock testimonials to simulate product reviews.
  const productReviews = testimonials.slice(0, 3);
  
  return (
    <div className="border-t border-border-light pt-16 mb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-5 h-5", 
                    i < Math.floor(rating || 5) ? "fill-gold text-gold" : "text-border-light"
                  )} 
                />
              ))}
            </div>
            <span className="font-bold text-charcoal text-lg">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground text-sm">Based on {count} reviews</span>
          </div>
        </div>
        
        <Button variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white">
          Write a Review
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productReviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg border border-border-light shadow-sm">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-4 h-4", 
                    i < review.rating ? "fill-gold text-gold" : "text-border-light"
                  )} 
                />
              ))}
            </div>
            <h4 className="font-medium text-charcoal mb-2 font-heading">{review.comment.substring(0, 30)}...</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
              "{review.comment}"
            </p>
            <div className="flex flex-col text-xs text-muted-foreground pt-4 border-t border-border-light/50">
              <span className="font-medium text-charcoal mb-0.5">{review.name}</span>
              <span>Verified Buyer</span>
            </div>
          </div>
        ))}
      </div>
      
      {count > 3 && (
        <div className="text-center mt-10">
          <Button variant="outline" className="bg-white">
            View All {count} Reviews
          </Button>
        </div>
      )}
    </div>
  );
}
