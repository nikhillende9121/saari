'use client';

import { useState } from 'react';
import { 
  Search, 
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockCustomers = [
  { id: 'CUST-101', name: 'Priya Sharma', email: 'priya.s@example.com', phone: '+91 98765 43210', orders: 4, spent: 45000, joined: 'Aug 12, 2025', location: 'Mumbai, MH' },
  { id: 'CUST-102', name: 'Anjali Patel', email: 'anjali.p@example.com', phone: '+91 91234 56789', orders: 1, spent: 12400, joined: 'Sep 05, 2025', location: 'Ahmedabad, GJ' },
  { id: 'CUST-103', name: 'Meera Krishnan', email: 'meera.k@example.com', phone: '+91 99887 76655', orders: 2, spent: 18500, joined: 'Jan 22, 2026', location: 'Chennai, TN' },
  { id: 'CUST-104', name: 'Neha Gupta', email: 'neha.g@example.com', phone: '+91 98765 12345', orders: 6, spent: 85200, joined: 'Mar 15, 2026', location: 'Delhi, DL' },
  { id: 'CUST-105', name: 'Riya Desai', email: 'riya.d@example.com', phone: '+91 91122 33445', orders: 1, spent: 9600, joined: 'Oct 01, 2026', location: 'Pune, MH' },
  { id: 'CUST-106', name: 'Sita Verma', email: 'sita.v@example.com', phone: '+91 95544 33221', orders: 3, spent: 34500, joined: 'May 18, 2026', location: 'Bangalore, KA' },
];

export default function AdminCustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-charcoal">Customers</h2>
        <p className="text-muted-foreground mt-1">Manage your customer database and view purchase history.</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-border-light shadow-sm flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by Name, Email, or Customer ID..." 
            className="pl-9 h-10 bg-cream/50 border-transparent focus:bg-white focus:border-gold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="h-10 px-4 rounded-md border border-border-light text-sm font-medium text-charcoal bg-white hover:bg-cream transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-border-light shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-cream/50 border-b border-border-light">
              <tr>
                <th className="px-6 py-4 font-medium">Customer Details</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium text-right">Orders</th>
                <th className="px-6 py-4 font-medium text-right">Total Spent</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-cream/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-charcoal">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-charcoal">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Phone className="w-3.5 h-3.5" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-charcoal">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      {customer.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-charcoal">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-emerald-600">
                    ₹{customer.spent.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-muted-foreground hover:text-charcoal hover:bg-cream rounded-md transition-colors" title="View Profile">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-charcoal hover:bg-cream rounded-md transition-colors" title="More Actions">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    <p>No customers found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-border-light flex items-center justify-between text-sm text-muted-foreground bg-white">
          <span>Showing {filteredCustomers.length} entries</span>
        </div>
      </div>
    </div>
  );
}
