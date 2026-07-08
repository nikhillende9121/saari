'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/utils/format';
import { 
  Search, 
  MoreHorizontal,
  Eye,
  CheckCircle,
  Truck,
  Package as PackageIcon
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockOrders = [
  { id: 'ORD-8123', customer: 'Priya Sharma', date: 'Oct 12, 2026', items: 2, amount: 18500, status: 'Processing', address: 'Mumbai, MH' },
  { id: 'ORD-8122', customer: 'Anjali Patel', date: 'Oct 11, 2026', items: 1, amount: 12400, status: 'Shipped', address: 'Ahmedabad, GJ' },
  { id: 'ORD-8121', customer: 'Meera Krishnan', date: 'Oct 10, 2026', items: 1, amount: 8200, status: 'Processing', address: 'Chennai, TN' },
  { id: 'ORD-8120', customer: 'Neha Gupta', date: 'Oct 08, 2026', items: 3, amount: 24500, status: 'Delivered', address: 'Delhi, DL' },
  { id: 'ORD-8119', customer: 'Riya Desai', date: 'Oct 05, 2026', items: 1, amount: 9600, status: 'Delivered', address: 'Pune, MH' },
  { id: 'ORD-8118', customer: 'Sita Verma', date: 'Oct 02, 2026', items: 2, amount: 15200, status: 'Delivered', address: 'Bangalore, KA' },
];

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredOrders = mockOrders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? o.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"><CheckCircle className="w-3 h-3" /> Delivered</span>;
      case 'Shipped':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"><Truck className="w-3 h-3" /> Shipped</span>;
      case 'Processing':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700"><PackageIcon className="w-3 h-3" /> Processing</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-charcoal">Orders</h2>
        <p className="text-muted-foreground mt-1">Manage and fulfill customer orders.</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-border-light shadow-sm flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by Order ID or Customer Name..." 
            className="pl-9 h-10 bg-cream/50 border-transparent focus:bg-white focus:border-gold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            className="h-10 px-3 rounded-md border border-border-light text-sm text-charcoal bg-white outline-none focus:border-gold"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-border-light shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-cream/50 border-b border-border-light">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-cream/20 transition-colors group">
                  <td className="px-6 py-4 font-medium text-charcoal">{order.id}</td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-charcoal">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.address}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-charcoal">{formatPrice(order.amount)}</p>
                    <p className="text-xs text-muted-foreground">{order.items} item(s)</p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-muted-foreground hover:text-charcoal hover:bg-cream rounded-md transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <select className="h-7 text-xs px-2 rounded border border-border-light outline-none bg-white text-charcoal focus:border-gold">
                        <option value="">Update Status</option>
                        <option value="Shipped">Mark as Shipped</option>
                        <option value="Delivered">Mark as Delivered</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    <PackageIcon className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    <p>No orders found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-border-light flex items-center justify-between text-sm text-muted-foreground bg-white">
          <span>Showing {filteredOrders.length} entries</span>
        </div>
      </div>
    </div>
  );
}
