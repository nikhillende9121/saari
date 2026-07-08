import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cream">
      {/* Left side - Branding & Image (hidden on mobile) */}
      <div className="hidden md:flex flex-1 relative bg-charcoal">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1610030469983-98e550d6159c?q=80&w=1200&auto=format&fit=crop"
            alt="Vastrika Collection"
            fill
            priority
            className="object-cover object-center opacity-60"
          />
        </div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-heading font-bold text-xl group-hover:scale-105 transition-transform shadow-lg">
                V
              </div>
              <span className="font-heading font-bold text-2xl tracking-wide text-white">
                VASTRIKA
              </span>
            </Link>
          </div>
          
          <div className="max-w-md">
            <h2 className="text-4xl font-heading font-bold text-white mb-4 leading-tight">
              Elegance Woven in Every Thread
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Join our community of saree enthusiasts and get exclusive access to our newest collections, early sale previews, and personalized recommendations.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-heading font-bold text-xl">
              V
            </div>
            <span className="font-heading font-bold text-2xl tracking-wide text-charcoal">
              VASTRIKA
            </span>
          </Link>
        </div>
        
        <div className="max-w-md w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
