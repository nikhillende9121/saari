'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      router.push('/admin/products');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <button className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-charcoal hover:bg-cream transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-charcoal">Add New Product</h2>
            <p className="text-muted-foreground mt-1">Create a new saree listing in your catalog.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products">
            <Button variant="outline" className="border-border-light text-charcoal bg-white">Cancel</Button>
          </Link>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-2 min-w-[120px] justify-center"
          >
            {isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Product</>}
          </Button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Details) */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <div className="bg-white rounded-xl border border-border-light shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-bold text-charcoal border-b border-border-light pb-4">General Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Product Title</label>
              <Input placeholder="e.g. Royal Blue Banarasi Silk Saree" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Description</label>
              <textarea 
                className="w-full min-h-[150px] p-3 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
                placeholder="Write a detailed description of the saree, its origin, work, and occasions it suits best..."
                required
              />
            </div>
          </div>

          {/* Media */}
          <div className="bg-white rounded-xl border border-border-light shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-bold text-charcoal border-b border-border-light pb-4">Product Images</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Image Upload Box */}
              <div className="aspect-[3/4] border-2 border-dashed border-border-light rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-cream/50 hover:border-gold transition-colors cursor-pointer bg-cream/20">
                <Upload className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium">Upload Image</span>
              </div>
              
              {/* Placeholders for uploaded images */}
              <div className="aspect-[3/4] border border-border-light rounded-lg bg-cream relative group">
                <button type="button" className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-rose opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-medium bg-white/80 py-1 rounded shadow-sm text-charcoal">Main Image</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Upload high-quality images in 3:4 aspect ratio. The first image will be used as the main thumbnail.</p>
          </div>
          
          {/* Inventory */}
          <div className="bg-white rounded-xl border border-border-light shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-bold text-charcoal border-b border-border-light pb-4">Inventory</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">SKU (Stock Keeping Unit)</label>
                <Input placeholder="e.g. VAS-BAN-BLU-01" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">Quantity in Stock</label>
                <Input type="number" min="0" defaultValue="10" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-white rounded-xl border border-border-light shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-bold text-charcoal border-b border-border-light pb-4">Pricing</h3>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Regular Price (₹)</label>
              <Input type="number" min="0" placeholder="0.00" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Compare at Price (₹)</label>
              <Input type="number" min="0" placeholder="0.00" />
              <p className="text-xs text-muted-foreground mt-1">To show a discounted price, move the original price here.</p>
            </div>
          </div>

          {/* Organization */}
          <div className="bg-white rounded-xl border border-border-light shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-bold text-charcoal border-b border-border-light pb-4">Organization</h3>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Category</label>
              <select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm outline-none focus:border-gold">
                <option value="silk-sarees">Silk Sarees</option>
                <option value="cotton-sarees">Cotton Sarees</option>
                <option value="banarasi-sarees">Banarasi Sarees</option>
                <option value="kanjivaram-sarees">Kanjivaram</option>
                <option value="chiffon-sarees">Chiffon Sarees</option>
                <option value="georgette-sarees">Georgette</option>
                <option value="linen-sarees">Linen Sarees</option>
                <option value="organza-sarees">Organza Sarees</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Fabric</label>
              <Input placeholder="e.g. Pure Silk, Cotton Blend" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Color Family</label>
              <Input placeholder="e.g. Blue, Red, Gold" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Color Hex Code</label>
              <div className="flex gap-3">
                <Input placeholder="#000000" defaultValue="#1E3A8A" />
                <div className="w-10 h-10 rounded-md border border-border-light shrink-0 bg-[#1E3A8A]"></div>
              </div>
            </div>
          </div>
          
          {/* Status */}
          <div className="bg-white rounded-xl border border-border-light shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-bold text-charcoal border-b border-border-light pb-4">Product Status</h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="status" value="active" className="w-4 h-4 text-gold focus:ring-gold" defaultChecked />
                <span className="text-sm text-charcoal">Active (Published)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="status" value="draft" className="w-4 h-4 text-gold focus:ring-gold" />
                <span className="text-sm text-charcoal">Draft (Hidden)</span>
              </label>
            </div>
            
            <div className="pt-4 border-t border-border-light space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-gold rounded focus:ring-gold" />
                <span className="text-sm text-charcoal">Mark as "Trending"</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-gold rounded focus:ring-gold" />
                <span className="text-sm text-charcoal">Mark as "New Arrival"</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
