import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, Trash2, Settings, Mail, ShoppingCart, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { useToast } from '@/stores/notification.store';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
  category: 'order' | 'system' | 'user' | 'alert';
}

const initialNotifications: Notification[] = [
  { id: '1', title: 'New Order Received', message: 'You have received a new order #ORD-1234 from John Doe.', type: 'success', time: '5 min ago', read: false, category: 'order' },
  { id: '2', title: 'Server CPU Alert', message: 'Server CPU usage is above 80%. Please check immediately.', type: 'warning', time: '15 min ago', read: false, category: 'alert' },
  { id: '3', title: 'New User Registration', message: 'A new user Jane Smith has registered on the platform.', type: 'info', time: '1 hour ago', read: false, category: 'user' },
  { id: '4', title: 'Payment Successful', message: 'Payment for order #ORD-1233 has been processed successfully.', type: 'success', time: '2 hours ago', read: true, category: 'order' },
  { id: '5', title: 'System Update', message: 'System maintenance scheduled for tonight at 2:00 AM UTC.', type: 'info', time: '3 hours ago', read: true, category: 'system' },
  { id: '6', title: 'Low Stock Alert', message: 'Product "iPhone 15 Pro" is running low on stock (5 remaining).', type: 'warning', time: '5 hours ago', read: true, category: 'alert' },
  { id: '7', title: 'Failed Login Attempt', message: 'Multiple failed login attempts detected from IP 192.168.1.1', type: 'error', time: '6 hours ago', read: true, category: 'alert' },
  { id: '8', title: 'Backup Completed', message: 'Daily database backup completed successfully.', type: 'success', time: '8 hours ago', read: true, category: 'system' },
];

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = React.useState<'all' | 'unread'>('all');
  const toast = useToast();

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('Done', 'All notifications marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Deleted', 'Notification has been removed');
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success('Cleared', 'All notifications have been cleared');
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Info;
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30';
      case 'warning': return 'text-amber-500 bg-amber-100 dark:bg-amber-900/30';
      case 'error': return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      default: return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
    }
  };

  const getCategoryIcon = (category: Notification['category']) => {
    switch (category) {
      case 'order': return ShoppingCart;
      case 'system': return Settings;
      case 'user': return Mail;
      default: return Bell;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" onClick={clearAll} disabled={notifications.length === 0}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Filter */}
          <Card padding="md">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Filter</h3>
            <div className="space-y-2">
              <button
                onClick={() => setFilter('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  filter === 'all'
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="text-sm font-medium">All</span>
                <Badge variant="primary" size="sm">{notifications.length}</Badge>
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  filter === 'unread'
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="text-sm font-medium">Unread</span>
                <Badge variant="danger" size="sm">{unreadCount}</Badge>
              </button>
            </div>
          </Card>

          {/* Categories */}
          <Card padding="md">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Categories</h3>
            <div className="space-y-2">
              {[
                { name: 'Orders', icon: ShoppingCart, count: notifications.filter(n => n.category === 'order').length },
                { name: 'System', icon: Settings, count: notifications.filter(n => n.category === 'system').length },
                { name: 'Users', icon: Mail, count: notifications.filter(n => n.category === 'user').length },
                { name: 'Alerts', icon: Bell, count: notifications.filter(n => n.category === 'alert').length },
              ].map(cat => {
                const Icon = cat.icon;
                return (
                  <div key={cat.name} className="flex items-center justify-between px-3 py-2 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{cat.name}</span>
                    </div>
                    <span className="text-sm">{cat.count}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-3 space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card padding="lg" className="text-center">
              <Bell className="h-16 w-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No notifications</h3>
              <p className="text-slate-500 mt-1">You're all caught up!</p>
            </Card>
          ) : (
            filteredNotifications.map((notification, index) => {
              const TypeIcon = getTypeIcon(notification.type);
              const CategoryIcon = getCategoryIcon(notification.category);
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    padding="md" 
                    className={`${!notification.read ? 'border-l-4 border-l-indigo-500' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getTypeColor(notification.type)}`}>
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className={`font-medium ${!notification.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-slate-500 mt-1">{notification.message}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="flex items-center gap-1 text-xs text-slate-400">
                                <Clock className="h-3 w-3" />
                                {notification.time}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-slate-400">
                                <CategoryIcon className="h-3 w-3" />
                                {notification.category}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
