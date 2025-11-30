import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/stores/theme.store';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Calendar,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronDown,
  Layers,
  Mail,
  MessageSquare,
  Folder,
  PieChart,
  Table,
  FormInput,
  Bell,
  Image,
  Zap,
} from 'lucide-react';
import { Tooltip } from '@/components/ui';

interface NavItem {
  title: string;
  icon: React.ReactNode;
  path?: string;
  badge?: string;
  badgeColor?: 'primary' | 'success' | 'warning' | 'danger';
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { title: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/' },
  { title: 'Analytics', icon: <BarChart3 className="h-5 w-5" />, path: '/analytics' },
  {
    title: 'E-commerce',
    icon: <ShoppingCart className="h-5 w-5" />,
    children: [
      { title: 'Products', icon: <Layers className="h-4 w-4" />, path: '/ecommerce/products' },
      { title: 'Orders', icon: <FileText className="h-4 w-4" />, path: '/ecommerce/orders', badge: '12', badgeColor: 'danger' },
      { title: 'Customers', icon: <Users className="h-4 w-4" />, path: '/ecommerce/customers' },
    ],
  },
  {
    title: 'Apps',
    icon: <Zap className="h-5 w-5" />,
    children: [
      { title: 'Calendar', icon: <Calendar className="h-4 w-4" />, path: '/apps/calendar' },
      { title: 'Email', icon: <Mail className="h-4 w-4" />, path: '/apps/email', badge: '5', badgeColor: 'primary' },
      { title: 'Chat', icon: <MessageSquare className="h-4 w-4" />, path: '/apps/chat' },
      { title: 'File Manager', icon: <Folder className="h-4 w-4" />, path: '/apps/files' },
    ],
  },
  {
    title: 'Components',
    icon: <Layers className="h-5 w-5" />,
    children: [
      { title: 'Charts', icon: <PieChart className="h-4 w-4" />, path: '/components/charts' },
      { title: 'Tables', icon: <Table className="h-4 w-4" />, path: '/components/tables' },
      { title: 'Forms', icon: <FormInput className="h-4 w-4" />, path: '/components/forms' },
      { title: 'UI Elements', icon: <Image className="h-4 w-4" />, path: '/components/ui-elements' },
    ],
  },
  { title: 'Users', icon: <Users className="h-5 w-5" />, path: '/users' },
  { title: 'Notifications', icon: <Bell className="h-5 w-5" />, path: '/notifications', badge: '3', badgeColor: 'warning' },
];

const bottomNavigation: NavItem[] = [
  { title: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/settings' },
  { title: 'Help & Support', icon: <HelpCircle className="h-5 w-5" />, path: '/help' },
];

interface SidebarItemProps {
  item: NavItem;
  collapsed: boolean;
  depth?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, collapsed, depth = 0 }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path === location.pathname;
  const isChildActive = item.children?.some((child) => child.path === location.pathname);

  React.useEffect(() => {
    if (isChildActive) setIsOpen(true);
  }, [isChildActive]);

  const badgeColors = {
    primary: 'bg-indigo-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
  };

  const content = (
    <motion.div
      whileHover={{ x: collapsed ? 0 : 4 }}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200',
        'group relative',
        isActive || isChildActive
          ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50',
        depth > 0 && 'ml-4 py-2'
      )}
      onClick={() => hasChildren && setIsOpen(!isOpen)}
    >
      <span
        className={cn(
          'shrink-0 transition-colors',
          isActive || isChildActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
        )}
      >
        {item.icon}
      </span>
      {!collapsed && (
        <>
          <span className="flex-1 text-sm font-medium truncate">{item.title}</span>
          {item.badge && (
            <span
              className={cn(
                'px-1.5 py-0.5 text-[10px] font-bold text-white rounded-md',
                badgeColors[item.badgeColor || 'primary']
              )}
            >
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          )}
        </>
      )}
    </motion.div>
  );

  return (
    <div>
      {item.path && !hasChildren ? (
        collapsed ? (
          <Tooltip content={item.title} position="right">
            <Link to={item.path}>{content}</Link>
          </Tooltip>
        ) : (
          <Link to={item.path}>{content}</Link>
        )
      ) : collapsed ? (
        <Tooltip content={item.title} position="right">
          {content}
        </Tooltip>
      ) : (
        content
      )}

      <AnimatePresence>
        {hasChildren && isOpen && !collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-1">
              {item.children?.map((child) => (
                <SidebarItem key={child.title} item={child} collapsed={collapsed} depth={depth + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar, sidebarMobileOpen, setSidebarMobileOpen } = useThemeStore();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarCollapsed ? 80 : 280,
          x: isMobile && !sidebarMobileOpen ? -280 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed left-0 top-0 bottom-0 z-50 flex flex-col h-screen',
          'bg-slate-900 border-r border-slate-800',
          'lg:relative lg:z-auto'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-bold text-white"
              >
                AdminX
              </motion.span>
            )}
          </Link>
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className={cn('w-4 h-4 transition-transform', sidebarCollapsed && 'rotate-180')} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigation.map((item) => (
            <SidebarItem key={item.title} item={item} collapsed={sidebarCollapsed} />
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="py-4 px-3 border-t border-slate-800 space-y-1">
          {bottomNavigation.map((item) => (
            <SidebarItem key={item.title} item={item} collapsed={sidebarCollapsed} />
          ))}
        </div>
      </motion.aside>
    </>
  );
};
