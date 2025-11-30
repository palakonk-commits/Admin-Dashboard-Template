import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/stores/theme.store';
import { useAuthStore } from '@/stores/auth.store';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Settings,
  LogOut,
  User,
  ChevronDown,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { Avatar, Badge, Button, Input, Tooltip } from '@/components/ui';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'New Order', message: 'You have received a new order #1234', time: '5m ago', read: false, type: 'success' },
  { id: '2', title: 'Server Alert', message: 'CPU usage is above 80%', time: '15m ago', read: false, type: 'warning' },
  { id: '3', title: 'New User', message: 'John Doe just signed up', time: '1h ago', read: true, type: 'info' },
];

export const Header: React.FC = () => {
  const { theme, toggleTheme, setSidebarMobileOpen } = useThemeStore();
  const { user, logout } = useAuthStore();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const notificationRef = React.useRef<HTMLDivElement>(null);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search */}
          <div className="hidden md:block relative w-80">
            <Input
              type="search"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
              className="h-10 bg-slate-100 dark:bg-slate-800 border-0"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 text-xs text-slate-400">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono">⌘</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono">K</kbd>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Tooltip content={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-slate-400" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-600" />
                )}
              </motion.div>
            </Button>
          </Tooltip>

          {/* Messages */}
          <Tooltip content="Messages">
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5 text-slate-500" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-indigo-500 rounded-full" />
            </Button>
          </Tooltip>

          {/* Notifications */}
          <div ref={notificationRef} className="relative">
            <Tooltip content="Notifications">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="h-5 w-5 text-slate-500" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-4 w-4 text-[10px] font-bold text-white bg-red-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </Tooltip>

            {/* Notification Dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Notifications</h3>
                  <Badge variant="primary" size="sm">{unreadCount} new</Badge>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        'flex items-start gap-3 p-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer',
                        !notification.read && 'bg-indigo-50/50 dark:bg-indigo-900/10'
                      )}
                    >
                      <div
                        className={cn(
                          'shrink-0 w-2 h-2 mt-2 rounded-full',
                          notification.type === 'success' && 'bg-emerald-500',
                          notification.type === 'warning' && 'bg-amber-500',
                          notification.type === 'info' && 'bg-sky-500'
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                          {notification.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Help */}
          <Tooltip content="Help & Support">
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <HelpCircle className="h-5 w-5 text-slate-500" />
            </Button>
          </Tooltip>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2 hidden lg:block" />

          {/* User Menu */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Avatar
                src={user?.avatar}
                name={user?.name || 'User'}
                size="sm"
                status="online"
              />
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {user?.name || 'Guest'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user?.role || 'User'}
                </p>
              </div>
              <ChevronDown className="hidden lg:block h-4 w-4 text-slate-400" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden"
              >
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <p className="font-medium text-slate-900 dark:text-slate-100">{user?.name}</p>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                </div>
                <div className="p-2 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
