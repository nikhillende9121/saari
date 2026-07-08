import { HeroSlider } from '@/components/store/home/hero-slider';
import { FeaturedCollections } from '@/components/store/home/featured-collections';
import { ShopByCategory } from '@/components/store/home/shop-by-category';
import { ShopByOccasion } from '@/components/store/home/shop-by-occasion';
import { TrendingSarees } from '@/components/store/home/trending-sarees';
import { BestSellers } from '@/components/store/home/best-sellers';
import { NewArrivals } from '@/components/store/home/new-arrivals';
import { FlashSale } from '@/components/store/home/flash-sale';
import { PromoBanner } from '@/components/store/home/promo-banner';
import { FestivalCollection } from '@/components/store/home/festival-collection';
import { CustomerReviews } from '@/components/store/home/customer-reviews';
import { InstagramGallery } from '@/components/store/home/instagram-gallery';
import { Newsletter } from '@/components/store/home/newsletter';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedCollections />
      <ShopByCategory />
      <PromoBanner />
      <TrendingSarees />
      <FlashSale />
      <BestSellers />
      <FestivalCollection />
      <ShopByOccasion />
      <NewArrivals />
      <CustomerReviews />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
