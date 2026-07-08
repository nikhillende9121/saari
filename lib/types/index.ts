// ─── Product ──────────────────────────────────────────────
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  color?: string;
  colorHex?: string;
  size?: string;
  image?: ProductImage;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  images: ProductImage[];
  video?: string;
  price: number;
  compareAtPrice?: number;
  variants: ProductVariant[];
  categoryId: string;
  categoryName?: string;
  collectionIds: string[];
  tags: string[];
  fabric: string;
  occasion: string[];
  color: string;
  colorHex: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isOnSale?: boolean;
  specifications?: Record<string, string>;
  careInstructions?: string[];
  createdAt: string;
  updatedAt: string;
  seo?: SEOMetadata;
}

// ─── Category ─────────────────────────────────────────────
export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image: string;
  banner?: string;
  parentId?: string;
  order: number;
  productCount: number;
}

// ─── Collection ───────────────────────────────────────────
export interface Collection {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image: string;
  banner?: string;
  productCount: number;
  isFeatured?: boolean;
}

// ─── Banner ───────────────────────────────────────────────
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  desktopImage: string;
  mobileImage?: string;
  overlay?: boolean;
  textPosition?: 'left' | 'center' | 'right';
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  order: number;
}

// ─── Review ───────────────────────────────────────────────
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  isVerified: boolean;
  isApproved: boolean;
  createdAt: string;
  reply?: {
    message: string;
    createdAt: string;
  };
}

// ─── Cart ─────────────────────────────────────────────────
export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  color?: string;
  size?: string;
  slug: string;
}

// ─── Wishlist ─────────────────────────────────────────────
export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  slug: string;
  addedAt: string;
}

// ─── User ─────────────────────────────────────────────────
export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  addresses: Address[];
  role: 'customer' | 'admin' | 'manager';
  createdAt: string;
}

// ─── Order ────────────────────────────────────────────────
export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
  shippingAddress: Address;
  billingAddress?: Address;
  status: OrderStatus;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded';

// ─── Coupon ───────────────────────────────────────────────
export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  perUserLimit?: number;
  expiresAt?: string;
  isActive: boolean;
  applicableCategories?: string[];
  applicableCollections?: string[];
  applicableProducts?: string[];
}

// ─── Flash Sale ───────────────────────────────────────────
export interface FlashSale {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  products: string[];
  discountPercentage: number;
  isActive: boolean;
}

// ─── Homepage ─────────────────────────────────────────────
export interface HomepageSection {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
  enabled: boolean;
  order: number;
  data?: Record<string, unknown>;
}

// ─── Navigation ───────────────────────────────────────────
export interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
  image?: string;
  badge?: string;
}

// ─── Settings ─────────────────────────────────────────────
export interface SiteSettings {
  brandName: string;
  tagline: string;
  logo?: string;
  favicon?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    pinterest?: string;
    youtube?: string;
    twitter?: string;
  };
  currency: string;
  taxRate: number;
  shippingCharge: number;
  freeShippingThreshold: number;
  announcement?: string;
  seo: SEOMetadata;
}

// ─── SEO ──────────────────────────────────────────────────
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

// ─── Testimonial ──────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  location?: string;
  rating: number;
  comment: string;
  productName?: string;
  productImage?: string;
  date: string;
}

// ─── Instagram Post ───────────────────────────────────────
export interface InstagramPost {
  id: string;
  image: string;
  link: string;
  likes: number;
  caption?: string;
}
