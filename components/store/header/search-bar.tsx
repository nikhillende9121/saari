'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { products } from '@/lib/data/mock';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = [
  'Banarasi Silk', 'Kanjivaram', 'Wedding Saree', 'Cotton Saree',
  'Organza', 'Party Wear', 'Under ₹5000',
];

const recentSearches = [
  'Red silk saree', 'Bridal collection',
];

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof products>([]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const q = query.toLowerCase();
      const filtered = products.filter(
        p => p.name.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q))
      ).slice(0, 4);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSuggestionClick = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-[61] bg-white shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="container-custom py-6">
              {/* Search Input */}
              <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for sarees, collections, occasions..."
                  className="w-full h-14 pl-12 pr-12 text-base bg-cream border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/40 placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-charcoal/5 rounded-full transition-colors cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </form>

              {/* Dynamic Results or Suggestions */}
              <div className="max-w-2xl mx-auto mt-6">
                {query.trim().length > 1 ? (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                      Products
                    </h3>
                    {results.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {results.map((product) => (
                          <div 
                            key={product.id}
                            onClick={() => {
                              router.push(`/products/${product.slug}`);
                              onClose();
                            }}
                            className="flex items-center gap-4 p-2 rounded-lg hover:bg-cream cursor-pointer transition-colors"
                          >
                            <div className="w-16 h-20 relative rounded overflow-hidden shrink-0">
                              <img src={product.images[0]?.url} alt={product.name} className="object-cover w-full h-full" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-charcoal line-clamp-1">{product.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{product.categoryName}</p>
                              <p className="text-sm font-semibold text-charcoal mt-1">₹{product.price.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No products found for "{query}"
                      </div>
                    )}
                    
                    {results.length > 0 && (
                      <button 
                        onClick={handleSubmit}
                        className="w-full mt-6 py-3 border border-border-light rounded-lg text-sm font-medium text-charcoal hover:bg-cream transition-colors"
                      >
                        View all results for "{query}"
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recent */}
                    {recentSearches.length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          Recent Searches
                        </h3>
                        <ul className="space-y-1.5">
                          {recentSearches.map((term) => (
                            <li key={term}>
                              <button 
                                onClick={() => handleSuggestionClick(term)}
                                className="text-sm text-charcoal/70 hover:text-gold transition-colors cursor-pointer"
                              >
                                {term}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Popular */}
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Popular Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleSuggestionClick(term)}
                            className={cn(
                              'px-3 py-1.5 text-sm rounded-full border border-border-light',
                              'hover:border-gold hover:text-gold transition-colors cursor-pointer text-charcoal/80',
                            )}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
