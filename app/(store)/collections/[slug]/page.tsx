import { collections, products } from '@/lib/data/mock';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { ProductCard } from '@/components/ui/product-card';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Filter, SlidersHorizontal } from 'lucide-react';

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find(c => c.slug === slug);
  
  if (!collection) {
    notFound();
  }
  
  const collectionProducts = products.filter(p => p.collectionIds.includes(collection.id));

  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Collection Hero */}
      <div className="relative h-[30vh] md:h-[40vh] w-full bg-charcoal">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 drop-shadow-md">
            {collection.name}
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-sm">
            {collection.description}
          </p>
        </div>
      </div>

      <Container className="mt-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-8 overflow-x-auto pb-2 whitespace-nowrap">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <Link href="/collections" className="hover:text-charcoal transition-colors cursor-default">Collections</Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <span className="text-charcoal font-medium">{collection.name}</span>
        </div>

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

                <div>
                  <h3 className="font-medium text-charcoal mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {['Under ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹20,000', 'Above ₹20,000'].map((range) => (
                      <label key={range} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded border border-border-light flex items-center justify-center group-hover:border-gold transition-colors"></div>
                        <span className="text-sm text-muted-foreground group-hover:text-charcoal transition-colors">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <p className="text-muted-foreground text-sm">
                Showing <span className="font-medium text-charcoal">{collectionProducts.length}</span> products
              </p>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="lg:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border-light rounded-md text-sm font-medium hover:bg-cream transition-colors">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
                <select className="flex-1 sm:w-auto px-4 py-2 bg-white border border-border-light rounded-md text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {collectionProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {collectionProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-border-light border-dashed rounded-lg">
                <h3 className="text-lg font-medium text-charcoal mb-2">No products found</h3>
                <p className="text-muted-foreground">We couldn't find any products in this collection.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
