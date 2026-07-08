'use client';

import { useAuth } from '@/lib/store/auth-context';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';

const mockAddresses = [
  {
    id: 'addr-1',
    isDefault: true,
    name: 'John Doe',
    type: 'Home',
    address: '123 Heritage Lane, Phase 1',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 9876543210',
  },
  {
    id: 'addr-2',
    isDefault: false,
    name: 'John Doe',
    type: 'Office',
    address: 'Vastrika Tech Park, Tower B, 4th Floor',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    phone: '+91 9876543211',
  }
];

export default function AddressesPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-border-light pb-4">
        <h2 className="text-2xl font-heading font-bold text-charcoal">
          Saved Addresses
        </h2>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Address
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAddresses.map((address) => (
          <div 
            key={address.id} 
            className={`border rounded-lg p-6 relative bg-white ${
              address.isDefault ? 'border-gold shadow-sm' : 'border-border-light'
            }`}
          >
            {address.isDefault && (
              <span className="absolute -top-3 left-6 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                Default
              </span>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold text-charcoal">{address.name}</h3>
                <span className="bg-cream text-charcoal text-xs px-2 py-0.5 rounded-full ml-2">
                  {address.type}
                </span>
              </div>
            </div>
            
            <div className="text-sm text-charcoal-light space-y-1 mb-6">
              <p>{address.address}</p>
              <p>{address.city}, {address.state} - {address.pincode}</p>
              <p className="pt-2">Mobile: {address.phone}</p>
            </div>
            
            <div className="flex items-center gap-4 pt-4 border-t border-border-light">
              <button className="text-sm font-medium text-gold hover:text-gold-dark flex items-center gap-1 transition-colors">
                <Edit2 className="w-4 h-4" /> Edit
              </button>
              <button className="text-sm font-medium text-rose hover:text-rose/80 flex items-center gap-1 transition-colors">
                <Trash2 className="w-4 h-4" /> Remove
              </button>
              
              {!address.isDefault && (
                <button className="text-sm font-medium text-muted-foreground hover:text-charcoal ml-auto transition-colors">
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
