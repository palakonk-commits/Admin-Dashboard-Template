import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Truck, Package, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, Button, Input, Badge, Modal, ModalFooter } from '@/components/ui';
import { useToast } from '@/stores/notification.store';
import { formatCurrency } from '@/lib/utils';

interface Order {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: string;
}

const initialOrders: Order[] = [
  { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', items: 3, total: 1250, status: 'delivered', date: '2024-11-28', address: '123 Main St, New York' },
  { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', items: 2, total: 890, status: 'shipped', date: '2024-11-28', address: '456 Oak Ave, Los Angeles' },
  { id: 'ORD-003', customer: 'Mike Johnson', email: 'mike@example.com', items: 5, total: 2340, status: 'processing', date: '2024-11-27', address: '789 Pine Rd, Chicago' },
  { id: 'ORD-004', customer: 'Sarah Williams', email: 'sarah@example.com', items: 1, total: 560, status: 'pending', date: '2024-11-27', address: '321 Elm St, Houston' },
  { id: 'ORD-005', customer: 'Tom Brown', email: 'tom@example.com', items: 4, total: 1890, status: 'cancelled', date: '2024-11-26', address: '654 Maple Dr, Phoenix' },
  { id: 'ORD-006', customer: 'Emily Davis', email: 'emily@example.com', items: 2, total: 720, status: 'delivered', date: '2024-11-26', address: '987 Cedar Ln, Seattle' },
];

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = React.useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const toast = useToast();

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast.success('Updated', `Order status changed to ${newStatus}`);
  };

  const statusConfig = {
    pending: { color: 'warning' as const, icon: Clock, label: 'Pending' },
    processing: { color: 'info' as const, icon: Package, label: 'Processing' },
    shipped: { color: 'primary' as const, icon: Truck, label: 'Shipped' },
    delivered: { color: 'success' as const, icon: CheckCircle, label: 'Delivered' },
    cancelled: { color: 'danger' as const, icon: XCircle, label: 'Cancelled' },
  };

  const stats = [
    { label: 'Total Orders', value: orders.length, color: 'bg-indigo-500' },
    { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'bg-amber-500' },
    { label: 'Processing', value: orders.filter(o => o.status === 'processing').length, color: 'bg-sky-500' },
    { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Orders</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Track and manage customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card padding="md">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card padding="md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search orders..."
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

      {/* Orders Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Order ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Items</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Total</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <tr key={order.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">#{order.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{order.customer}</p>
                        <p className="text-sm text-slate-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-700 dark:text-slate-300">{order.items} items</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(order.total)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={statusConfig[order.status].color} className="inline-flex items-center gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[order.status].label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-500">{order.date}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => { setSelectedOrder(order); setShowDetailModal(true); }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {order.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                          >
                            Process
                          </Button>
                        )}
                        {order.status === 'processing' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                          >
                            Ship
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Order Detail Modal */}
      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title={`Order #${selectedOrder?.id}`} size="md">
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500">Customer</p>
                <p className="font-medium text-slate-900 dark:text-white">{selectedOrder.customer}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-900 dark:text-white">{selectedOrder.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Order Date</p>
                <p className="font-medium text-slate-900 dark:text-white">{selectedOrder.date}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Total</p>
                <p className="font-medium text-slate-900 dark:text-white">{formatCurrency(selectedOrder.total)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500">Shipping Address</p>
              <p className="font-medium text-slate-900 dark:text-white">{selectedOrder.address}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">Status</p>
              <Badge variant={statusConfig[selectedOrder.status].color} size="lg">
                {statusConfig[selectedOrder.status].label}
              </Badge>
            </div>
          </div>
        )}
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowDetailModal(false)}>Close</Button>
          {selectedOrder?.status !== 'delivered' && selectedOrder?.status !== 'cancelled' && (
            <Button onClick={() => {
              const nextStatus = selectedOrder?.status === 'pending' ? 'processing' :
                               selectedOrder?.status === 'processing' ? 'shipped' : 'delivered';
              updateOrderStatus(selectedOrder!.id, nextStatus as Order['status']);
              setShowDetailModal(false);
            }}>
              Update Status
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};
