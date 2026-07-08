'use client';

import { cn } from '@/lib/utils/cn';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  count?: number;
  className?: string;
}

const sizes = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export function Rating({ value, max = 5, size = 'md', showValue, count, className }: RatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const filled = i < Math.floor(value);
          const half = i === Math.floor(value) && value % 1 >= 0.5;

          return (
            <Star
              key={i}
              className={cn(
                sizes[size],
                filled || half
                  ? 'text-gold fill-gold'
                  : 'text-border fill-transparent'
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-charcoal ml-1">{value}</span>
      )}
      {count !== undefined && (
        <span className="text-xs text-muted-foreground ml-0.5">({count})</span>
      )}
    </div>
  );
}
