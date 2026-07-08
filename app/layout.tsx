import type { Metadata } from "next";
import { AuthProvider } from "@/lib/store/auth-context";
import { CartProvider } from "@/lib/store/cart-context";
import { SlideOutCart } from "@/components/store/cart/slide-out-cart";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vastrika — Handcrafted Sarees | Premium Indian Saree Brand",
    template: "%s | Vastrika",
  },
  description:
    "Discover exquisite handcrafted sarees at Vastrika. Shop premium Banarasi, Kanjivaram, Silk, Cotton, and designer sarees online. Free shipping on orders above ₹2,999.",
  keywords: [
    "sarees online",
    "buy sarees",
    "Indian sarees",
    "silk sarees",
    "banarasi sarees",
    "kanjivaram sarees",
    "handloom sarees",
    "designer sarees",
    "wedding sarees",
    "cotton sarees",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Vastrika",
    title: "Vastrika — Handcrafted Sarees | Premium Indian Saree Brand",
    description:
      "Discover exquisite handcrafted sarees at Vastrika. Shop premium Banarasi, Kanjivaram, Silk, Cotton, and designer sarees online.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vastrika — Handcrafted Sarees",
    description: "Premium handcrafted sarees from India's finest artisans.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            {children}
            <SlideOutCart />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
