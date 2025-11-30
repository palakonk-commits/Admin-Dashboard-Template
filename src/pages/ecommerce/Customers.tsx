import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Mail, Phone, MapPin, MoreHorizontal, UserPlus } from 'lucide-react';
import { Card, Button, Input, Badge, Avatar, Modal, ModalFooter } from '@/components/ui';
import { useToast } from '@/stores/notification.store';
import { formatCurrency } from '@/lib/utils';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  orders: number;
  spent: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

const initialCustomers: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', location: 'New York, USA', orders: 24, spent: 4520, status: 'active', joinDate: '2023-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 891', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', location: 'Los Angeles, USA', orders: 18, spent: 3200, status: 'active', joinDate: '2023-03-22' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234 567 892', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', location: 'Chicago, USA', orders: 12, spent: 1890, status: 'active', joinDate: '2023-05-10' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1 234 567 893', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', location: 'Houston, USA', orders: 8, spent: 980, status: 'inactive', joinDate: '2023-02-18' },
  { id: '5', name: 'Tom Brown', email: 'tom@example.com', phone: '+1 234 567 894', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', location: 'Phoenix, USA', orders: 31, spent: 6750, status: 'active', joinDate: '2022-11-01' },
  { id: '6', name: 'Emily Davis', email: 'emily@example.com', phone: '+1 234 567 895', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', location: 'Seattle, USA', orders: 15, spent: 2340, status: 'active', joinDate: '2023-08-05' },
];

export const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = React.useState<Customer[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newCustomer, setNewCustomer] = React.useState({ name: '', email: '', phone: '', location: '' });
  const toast = useToast();

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast.error('Error', 'Please fill in required fields');
      return;
    }
    const customer: Customer = {
      id: Date.now().toString(),
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone || 'N/A',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      location: newCustomer.location || 'Unknown',
      orders: 0,
      spent: 0,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
    };
    setCustomers([customer, ...customers]);
    setNewCustomer({ name: '', email: '', phone: '', location: '' });
    setShowAddModal(false);
    toast.success('Success', 'Customer added successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Customers</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your customer base</p>
        </div>
        <Button leftIcon={<UserPlus className="h-4 w-4" />} onClick={() => setShowAddModal(true)}>
          Add Customer
        </Button>
      </div>

      {/* Filters */}
      <Card padding="md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
            Filters
          </Button>
        </div>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card hover padding="md">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar src={customer.avatar} name={customer.name} size="lg" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{customer.name}</h3>
                    <Badge variant={customer.status === 'active' ? 'success' : 'danger'} size="sm">
                      {customer.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Mail className="h-4 w-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Phone className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <MapPin className="h-4 w-4" />
                  <span>{customer.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{customer.orders}</p>
                  <p className="text-xs text-slate-500">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(customer.spent)}</p>
                  <p className="text-xs text-slate-500">Total Spent</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{customer.joinDate}</p>
                  <p className="text-xs text-slate-500">Joined</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Customer Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Customer" size="md">
        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter customer name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter email address"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          />
          <Input
            label="Phone"
            placeholder="Enter phone number"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          />
          <Input
            label="Location"
            placeholder="Enter location"
            value={newCustomer.location}
            onChange={(e) => setNewCustomer({ ...newCustomer, location: e.target.value })}
          />
        </div>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button onClick={handleAddCustomer}>Add Customer</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
