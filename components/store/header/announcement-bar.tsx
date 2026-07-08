'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { announcements } from '@/lib/data/mock';
import { X } from 'lucide-react';

export function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-charcoal text-white relative overflow-hidden">
      <div className="container-custom flex items-center justify-center h-10">
        <p className="text-xs md:text-sm font-medium text-center animate-fade-in-up" key={current}>
          {announcements[current]}
        </p>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 md:right-6 p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          aria-label="Close announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
