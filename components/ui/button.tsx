'use client';

import { cn } from '@/lib/utils/cn';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-gold text-white hover:shadow-lg hover:shadow-gold/20 active:scale-[0.98]',
  secondary:
    'bg-charcoal text-white hover:bg-charcoal/90 active:scale-[0.98]',
  outline:
    'border-2 border-gold text-gold hover:bg-gold hover:text-white active:scale-[0.98]',
  ghost:
    'text-charcoal hover:bg-charcoal/5 active:scale-[0.98]',
  link:
    'text-gold underline-offset-4 hover:underline p-0 h-auto',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-md',
  md: 'h-11 px-6 text-sm rounded-lg',
  lg: 'h-13 px-8 text-base rounded-lg',
  icon: 'h-10 w-10 rounded-full',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium tracking-wide',
          'transition-all duration-250 ease-out',
          'disabled:opacity-50 disabled:pointer-events-none',
          'cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button, type ButtonProps };
