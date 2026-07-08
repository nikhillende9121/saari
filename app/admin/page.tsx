'use client';

import { 
  TrendingUp, 
  Users, 
  Package, 
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { formatPrice } from '@/lib/utils/format';

const stats = [
  {
    name: 'Total Revenue',
    value: 2450000,
    change: '+12.5%',
    trend: 'up',
    icon: IndianRupee,
  },
  {
    name: 'Active Orders',
    value: 124,
    change: '+3.2%',
    trend: 'up',
    icon: Package,
  },
  {
    name: 'Total Customers',
    value: 1450,
    change: '+18.1%',
    trend: 'up',
    icon: Users,
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '-0.4%',
    trend: 'down',
    icon: TrendingUp,
  },
];

const recentOrders = [
  { id: 'ORD-8123', customer: 'Priya Sharma', date: 'Just now', amount: 18500, status: 'Processing' },
  { id: 'ORD-8122', customer: 'Anjali Patel', date: '2 hours ago', amount: 12400, status: 'Shipped' },
  { id: 'ORD-8121', customer: 'Meera Krishnan', date: '5 hours ago', amount: 8200, status: 'Processing' },
  { id: 'ORD-8120', customer: 'Neha Gupta', date: '1 day ago', amount: 24500, status: 'Delivered' },
  { id: 'ORD-8119', customer: 'Riya Desai', date: '1 day ago', amount: 9600, status: 'Delivered' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-charcoal">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">Welcome to the Vastrika admin control panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-border-light shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-charcoal">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-rose'
              }`}>
                {stat.change}
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 ml-1" />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
              <h3 className="text-2xl font-bold text-charcoal mt-1">
                {typeof stat.value === 'number' && stat.name.includes('Revenue')
                  ? formatPrice(stat.value)
                  : stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border-light shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border-light flex items-center justify-between">
            <h3 className="font-bold text-charcoal text-lg">Recent Orders</h3>
            <button className="text-sm font-medium text-gold hover:text-gold-dark">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-cream/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-charcoal">{order.id}</td>
                    <td className="px-6 py-4 text-charcoal">{order.customer}</td>
                    <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                    <td className="px-6 py-4 font-medium text-charcoal">{formatPrice(order.amount)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Popular Products */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-border-light shadow-sm p-6">
            <h3 className="font-bold text-charcoal text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg border border-border-light hover:border-gold hover:bg-gold/5 transition-colors font-medium text-charcoal text-sm flex items-center justify-between group">
                Add New Product
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-gold" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-border-light hover:border-gold hover:bg-gold/5 transition-colors font-medium text-charcoal text-sm flex items-center justify-between group">
                Create Discount Code
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-gold" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-border-light hover:border-gold hover:bg-gold/5 transition-colors font-medium text-charcoal text-sm flex items-center justify-between group">
                Export Revenue Report
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-gold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
