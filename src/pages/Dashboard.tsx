import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
} from 'lucide-react';
import { StatsCard, RevenueChart, TrafficSourcesChart, VisitorsChart } from '@/components/charts';
import { Card, CardHeader, CardTitle, CardDescription, Avatar, Badge, Button } from '@/components/ui';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';

// Mock data
const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', amount: 1250, status: 'completed', date: new Date(Date.now() - 1000 * 60 * 5) },
  { id: '#ORD-002', customer: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', amount: 890, status: 'pending', date: new Date(Date.now() - 1000 * 60 * 30) },
  { id: '#ORD-003', customer: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', amount: 2340, status: 'processing', date: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: '#ORD-004', customer: 'Sarah Williams', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', amount: 560, status: 'completed', date: new Date(Date.now() - 1000 * 60 * 60 * 5) },
  { id: '#ORD-005', customer: 'Tom Brown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', amount: 1890, status: 'cancelled', date: new Date(Date.now() - 1000 * 60 * 60 * 24) },
];

const topProducts = [
  { name: 'MacBook Pro 16"', category: 'Electronics', sales: 1234, revenue: 2456789, trend: 12.5 },
  { name: 'iPhone 15 Pro Max', category: 'Electronics', sales: 2345, revenue: 3234567, trend: 8.2 },
  { name: 'AirPods Pro 2', category: 'Accessories', sales: 3456, revenue: 689123, trend: -2.4 },
  { name: 'iPad Air', category: 'Electronics', sales: 987, revenue: 789456, trend: 15.8 },
  { name: 'Apple Watch Ultra', category: 'Wearables', sales: 654, revenue: 523654, trend: 5.3 },
];

const activities = [
  { user: 'John Doe', action: 'placed a new order', target: '#ORD-001', time: new Date(Date.now() - 1000 * 60 * 2), type: 'order' },
  { user: 'System', action: 'completed backup', target: 'Database', time: new Date(Date.now() - 1000 * 60 * 15), type: 'system' },
  { user: 'Jane Smith', action: 'updated product', target: 'iPhone 15 Pro', time: new Date(Date.now() - 1000 * 60 * 45), type: 'product' },
  { user: 'Mike Johnson', action: 'left a review on', target: 'MacBook Pro', time: new Date(Date.now() - 1000 * 60 * 60), type: 'review' },
  { user: 'Sarah Williams', action: 'registered as new customer', target: '', time: new Date(Date.now() - 1000 * 60 * 90), type: 'user' },
];

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'primary' | 'info'> = {
  completed: 'success',
  pending: 'warning',
  processing: 'info',
  cancelled: 'danger',
};

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Download Report
          </Button>
          <Button size="sm" leftIcon={<TrendingUp className="h-4 w-4" />}>
            View Analytics
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="Total Revenue"
          value={284750}
          change={12.5}
          icon={DollarSign}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-100 dark:bg-emerald-900/30"
          format="currency"
          delay={0}
        />
        <StatsCard
          title="Total Orders"
          value={1842}
          change={-3.2}
          icon={ShoppingCart}
          iconColor="text-indigo-600"
          iconBgColor="bg-indigo-100 dark:bg-indigo-900/30"
          format="number"
          delay={0.1}
        />
        <StatsCard
          title="Active Users"
          value={12453}
          change={8.1}
          icon={Users}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100 dark:bg-amber-900/30"
          format="number"
          delay={0.2}
        />
        <StatsCard
          title="Conversion Rate"
          value={3.24}
          change={1.8}
          icon={TrendingUp}
          iconColor="text-pink-600"
          iconBgColor="bg-pink-100 dark:bg-pink-900/30"
          format="percentage"
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <TrafficSourcesChart />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Customer</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-900 dark:text-white">{order.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar src={order.avatar} name={order.customer} size="sm" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{order.customer}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(order.amount)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={statusColors[order.status]} size="sm">
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-500 dark:text-slate-400">{formatRelativeTime(order.date)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <Button variant="ghost" size="sm" className="w-full">
                View All Orders
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions in your store</CardDescription>
            </CardHeader>
            <div className="mt-4 space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-medium">{activity.user}</span>{' '}
                      {activity.action}{' '}
                      {activity.target && (
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">{activity.target}</span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {formatRelativeTime(activity.time)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button variant="ghost" size="sm" className="w-full">
                View All Activity
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitorsChart />
        
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Best selling products this month</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <div className="mt-4 space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 text-lg font-bold text-slate-500 dark:text-slate-400">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{product.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{product.category} • {product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900 dark:text-white">{formatCurrency(product.revenue)}</p>
                    <div className={`flex items-center justify-end gap-1 text-xs ${product.trend >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {product.trend >= 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(product.trend)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
