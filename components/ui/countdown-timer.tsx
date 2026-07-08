'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface CountdownTimerProps {
  endTime: string;
  className?: string;
  variant?: 'default' | 'compact';
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(endTime: string): TimeLeft {
  const diff = Math.max(0, new Date(endTime).getTime() - Date.now());
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const ZERO: TimeLeft = { hours: 0, minutes: 0, seconds: 0 };

export function CountdownTimer({ endTime, className, variant = 'default' }: CountdownTimerProps) {
  // Start with zeros to avoid server/client mismatch from Date.now()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(ZERO);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calcTimeLeft(endTime));
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (variant === 'compact') {
    return (
      <span className={cn('font-mono text-sm font-semibold text-rose', className)}>
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    );
  }

  return (
    <div className={cn('flex items-center gap-2 md:gap-3', className)}>
      {[
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Mins' },
        { value: timeLeft.seconds, label: 'Secs' },
      ].map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2 md:gap-3">
          <div className="flex flex-col items-center">
            <div className="bg-charcoal text-white rounded-lg w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
              <span className="text-xl md:text-2xl font-mono font-bold">{pad(unit.value)}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1.5 font-medium">
              {unit.label}
            </span>
          </div>
          {i < 2 && (
            <span className="text-xl font-bold text-gold mb-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
