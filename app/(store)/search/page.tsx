import { products } from '@/lib/data/mock';
import { Container } from '@/components/ui/container';
import { ProductCard } from '@/components/ui/product-card';
import Link from 'next/link';
import { ChevronRight, Filter, SlidersHorizontal, SearchX } from 'lucide-react';

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q } = await searchParams;
  const query = typeof q === 'string' ? q : '';

  // Filter products based on search query
  const searchResults = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName?.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric?.toLowerCase().includes(query.toLowerCase()) ||
          p.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="bg-cream min-h-screen pb-20 pt-24 md:pt-32">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-charcoal mb-4">
            Search Results
          </h1>
          {query ? (
            <p className="text-muted-foreground text-lg">
              Showing {searchResults.length} results for <span className="font-semibold text-charcoal">"{query}"</span>
            </p>
          ) : (
            <p className="text-muted-foreground text-lg">
              Please enter a search term to find products.
            </p>
          )}
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-8 overflow-x-auto pb-2 whitespace-nowrap">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <span className="text-charcoal font-medium">Search</span>
        </div>

        {query && searchResults.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters (Desktop) */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 bg-white p-6 border border-border-light rounded-lg">
                <div className="flex items-center gap-2 font-heading font-bold text-lg mb-6 border-b border-border-light pb-4">
                  <Filter className="w-5 h-5" /> Filters
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-charcoal mb-3">Availability</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded border border-border-light flex items-center justify-center group-hover:border-gold transition-colors">
                          <div className="w-3 h-3 bg-gold rounded-sm opacity-0" />
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-charcoal transition-colors">In Stock Only</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-end mb-8 gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button className="lg:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border-light rounded-md text-sm font-medium hover:bg-cream transition-colors">
                    <SlidersHorizontal className="w-4 h-4" /> Filters
                  </button>
                  <select className="flex-1 sm:w-auto px-4 py-2 bg-white border border-border-light rounded-md text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer">
                    <option>Relevance</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {searchResults.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </div>
          </div>
        ) : query ? (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-white border border-border-light border-dashed rounded-lg">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-4">
              <SearchX className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-charcoal mb-2">No results found</h3>
            <p className="text-muted-foreground max-w-md mb-8">
              We couldn't find any products matching "{query}". Try checking your spelling or using more general terms.
            </p>
            <Link 
              href="/products" 
              className="px-6 py-3 bg-charcoal text-white rounded-md font-medium hover:bg-charcoal/90 transition-colors"
            >
              Explore All Products
            </Link>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
