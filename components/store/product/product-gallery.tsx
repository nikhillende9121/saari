'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Handle fallback if no images exist
  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] w-full bg-cream flex items-center justify-center rounded-lg border border-border-light">
        <span className="text-muted-foreground text-sm">No image available</span>
      </div>
    );
  }

  const activeImage = images[activeIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 lg:sticky lg:top-32">
      {/* Thumbnails (Vertical on desktop, horizontal on mobile) */}
      <div className="flex md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide md:w-20 shrink-0">
        {images.map((image, idx) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "relative aspect-[3/4] w-16 md:w-full rounded-md overflow-hidden shrink-0 border-2 transition-colors",
              activeIndex === idx ? "border-gold" : "border-transparent hover:border-gold/50"
            )}
          >
            <Image
              src={image.url}
              alt={image.alt || `${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 64px, 80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image with Zoom effect */}
      <div 
        className="relative aspect-[3/4] w-full bg-cream rounded-lg overflow-hidden border border-border-light cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={activeImage.url}
          alt={activeImage.alt || productName}
          fill
          priority
          className={cn(
            "object-cover transition-opacity duration-300",
            isZoomed ? "opacity-0" : "opacity-100"
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Zoomed Image Overlay */}
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            isZoomed ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          style={{
            backgroundImage: `url(${activeImage.url})`,
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            backgroundSize: '250%',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Zoom hint (mobile only) */}
        <div className="md:hidden absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-medium text-charcoal shadow-sm pointer-events-none">
          Tap to view
        </div>
      </div>
    </div>
  );
}
