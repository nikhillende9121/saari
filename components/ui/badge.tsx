'use client';

import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'sale' | 'new' | 'trending' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  default: 'bg-charcoal text-white',
  sale: 'bg-rose text-white',
  new: 'bg-gold text-white',
  trending: 'bg-burgundy text-white',
  outline: 'border border-gold text-gold bg-transparent',
};

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium tracking-wide uppercase',
        size === 'sm' ? 'px-2 py-0.5 text-[10px] rounded' : 'px-3 py-1 text-xs rounded-md',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
