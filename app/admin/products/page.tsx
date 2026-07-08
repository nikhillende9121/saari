'use client';

import { useState } from 'react';
import Link from 'next/link';
import { products } from '@/lib/data/mock';
import { formatPrice } from '@/lib/utils/format';
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.categoryId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-charcoal">Products</h2>
          <p className="text-muted-foreground mt-1">Manage your saree catalog.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Add New Product
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-border-light shadow-sm flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            className="pl-9 h-10 bg-cream/50 border-transparent focus:bg-white focus:border-gold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="h-10 px-3 rounded-md border border-border-light text-sm text-charcoal bg-white outline-none focus:border-gold">
            <option value="">All Categories</option>
            <option value="silk-sarees">Silk Sarees</option>
            <option value="cotton-sarees">Cotton Sarees</option>
            <option value="banarasi-sarees">Banarasi</option>
          </select>
          <select className="h-10 px-3 rounded-md border border-border-light text-sm text-charcoal bg-white outline-none focus:border-gold">
            <option value="">Status</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-border-light shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-cream/50">
              <tr>
                <th className="px-6 py-4 font-medium w-12">Image</th>
                <th className="px-6 py-4 font-medium">Product Details</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-cream/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div 
                      className="w-12 h-16 rounded-md bg-cream shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${product.colorHex}22, ${product.colorHex}44, ${product.colorHex}22)`,
                      }}
                    ></div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-charcoal truncate max-w-[250px]">{product.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{product.fabric} • {product.color}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cream text-charcoal">
                      {product.categoryName}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-charcoal">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      In Stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/products/${product.slug}`} target="_blank">
                        <button className="p-1.5 text-muted-foreground hover:text-charcoal hover:bg-cream rounded-md transition-colors" title="View on store">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-1.5 text-muted-foreground hover:text-gold hover:bg-gold/10 rounded-md transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-rose hover:bg-rose/10 rounded-md transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    <Package className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    <p>No products found matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-border-light flex items-center justify-between text-sm text-muted-foreground bg-white">
          <span>Showing 1 to {Math.min(10, filteredProducts.length)} of {filteredProducts.length} entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-border-light rounded-md hover:bg-cream disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-border-light rounded-md bg-charcoal text-white">1</button>
            <button className="px-3 py-1 border border-border-light rounded-md hover:bg-cream">2</button>
            <button className="px-3 py-1 border border-border-light rounded-md hover:bg-cream">3</button>
            <button className="px-3 py-1 border border-border-light rounded-md hover:bg-cream">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
