'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import {
  Camera,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Globe,
  Play,
  AtSign,
} from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'New Arrivals', href: '/collections/new-arrivals' },
    { label: 'Best Sellers', href: '/collections/best-sellers' },
    { label: 'Silk Sarees', href: '/categories/silk-sarees' },
    { label: 'Cotton Sarees', href: '/categories/cotton-sarees' },
    { label: 'Wedding Collection', href: '/collections/wedding-collection' },
    { label: 'Sale', href: '/sale' },
  ],
  help: [
    { label: 'Track Your Order', href: '/track-order' },
    { label: 'Shipping Policy', href: '/pages/shipping-policy' },
    { label: 'Return & Exchange', href: '/pages/return-policy' },
    { label: 'Size Guide', href: '/pages/size-guide' },
    { label: 'FAQs', href: '/pages/faqs' },
    { label: 'Contact Us', href: '/pages/contact' },
  ],
  company: [
    { label: 'About Us', href: '/pages/about' },
    { label: 'Our Artisans', href: '/pages/artisans' },
    { label: 'Sustainability', href: '/pages/sustainability' },
    { label: 'Careers', href: '/pages/careers' },
    { label: 'Press', href: '/pages/press' },
    { label: 'Blog', href: '/blog' },
  ],
};

const socialLinks = [
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: Play, href: '#', label: 'YouTube' },
  { icon: AtSign, href: '#', label: 'Twitter' },
];

const paymentIcons = ['Visa', 'Mastercard', 'UPI', 'RuPay', 'NetBanking', 'COD'];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80 mt-auto">
      {/* Main Footer */}
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center pt-1">
                <span className="text-gold font-heading italic text-4xl font-bold tracking-tighter">VR</span>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-white tracking-wide mt-1 uppercase">VR Silks</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-sm mb-6">
              Celebrating India&apos;s textile heritage through exquisite handcrafted sarees. 
              Each piece tells a story of tradition, artistry, and timeless elegance.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-sm hover:text-gold transition-colors group">
                <Phone className="w-4 h-4 text-gold" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:hello@vastrika.com" className="flex items-center gap-3 text-sm hover:text-gold transition-colors group">
                <Mail className="w-4 h-4 text-gold" />
                <span>hello@vastrika.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                <span>123 Silk Market, Chandni Chowk,<br />New Delhi — 110006</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold hover:bg-gold/10 hover:text-gold transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-5">Shop</h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-5">Help</h4>
            <ul className="space-y-2.5">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-5">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} VR Silks. All rights reserved. Made with ♥ in India.
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-3">
            {paymentIcons.map((icon) => (
              <div
                key={icon}
                className="px-2.5 py-1.5 bg-white/5 rounded text-[10px] font-medium text-white/50 border border-white/10"
              >
                {icon}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link href="/pages/privacy-policy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/pages/terms" className="hover:text-white/70 transition-colors">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
