import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  accent,
  align = 'center',
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' && 'text-center',
        className
      )}
    >
      {accent && (
        <span className="text-gold font-accent text-lg md:text-xl tracking-wider uppercase block mb-2">
          {accent}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-charcoal tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-charcoal-light text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
