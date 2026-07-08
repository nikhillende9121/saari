import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data/mock';
import { Container } from '@/components/ui/container';
import { ProductGallery } from '@/components/store/product/product-gallery';
import { ProductInfo } from '@/components/store/product/product-info';
import { ProductReviews } from '@/components/store/product/product-reviews';
import { RelatedProducts } from '@/components/store/product/related-products';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Vastrika',
    };
  }

  return {
    title: `${product.name} - Premium ${product.fabric} Saree | Vastrika`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Vastrika`,
      description: product.description,
      images: [{ url: product.images[0]?.url }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    notFound();
  }
  
  // Find related products (same category, exclude current)
  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-cream min-h-screen pb-20 pt-24 md:pt-32">
      <Container>
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-8 overflow-x-auto pb-2 whitespace-nowrap">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <Link href="/products" className="hover:text-charcoal transition-colors">Sarees</Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <Link href={`/categories/${product.categoryId}`} className="hover:text-charcoal transition-colors">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <span className="text-charcoal font-medium truncate max-w-[200px] md:max-w-none">
            {product.name}
          </span>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2">
            <ProductGallery images={product.images} productName={product.name} />
          </div>
          
          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2">
            <ProductInfo product={product} />
          </div>
        </div>
        
        {/* Specifications & Care */}
        <div className="border-t border-border-light pt-16 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-heading font-bold text-charcoal mb-6">Specifications</h2>
              <div className="bg-white rounded-lg border border-border-light overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specifications && Object.entries(product.specifications).map(([key, value], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-cream/30' : 'bg-white'}>
                        <td className="py-3 px-4 font-medium text-charcoal w-1/3 border-b border-border-light last:border-0">{key}</td>
                        <td className="py-3 px-4 text-muted-foreground border-b border-border-light last:border-0">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-heading font-bold text-charcoal mb-6">Care & Shipping</h2>
              <div className="bg-white rounded-lg border border-border-light p-6">
                <h3 className="font-medium text-charcoal mb-3">Care Instructions</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mb-8">
                  {product.careInstructions?.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                  {!product.careInstructions && (
                    <li>Dry clean only to maintain the fabric's luster.</li>
                  )}
                </ul>
                
                <h3 className="font-medium text-charcoal mb-3">Shipping & Returns</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complimentary express shipping on all domestic orders. Dispatched within 48 hours.
                </p>
                <p className="text-sm text-muted-foreground">
                  7-day hassle-free returns. Ensure the saree is unused and tags are intact.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        {product.reviewCount > 0 && (
          <ProductReviews productId={product.id} rating={product.rating} count={product.reviewCount} />
        )}
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </Container>
    </div>
  );
}
