import React from 'react';
import { motion } from 'framer-motion';
import { cn, formatNumber, formatCurrency, formatPercentage } from '@/lib/utils';
import { Card } from '@/components/ui';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  format?: 'number' | 'currency' | 'percentage' | 'none';
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon: Icon,
  iconColor = 'text-indigo-600',
  iconBgColor = 'bg-indigo-100 dark:bg-indigo-900/30',
  format = 'none',
  delay = 0,
}) => {
  const formattedValue = React.useMemo(() => {
    if (typeof value === 'string') return value;
    switch (format) {
      case 'number':
        return formatNumber(value);
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return `${value}%`;
      default:
        return value.toString();
    }
  }, [value, format]);

  const isPositive = change !== undefined && change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Card hover className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-10">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
        </div>

        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.1, type: 'spring' }}
              className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-2"
            >
              {formattedValue}
            </motion.p>
            {change !== undefined && (
              <div className="flex items-center gap-1.5 mt-3">
                <span
                  className={cn(
                    'inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-medium rounded-full',
                    isPositive
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {formatPercentage(change)}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{changeLabel}</span>
              </div>
            )}
          </div>
          <div className={cn('p-3 rounded-xl', iconBgColor)}>
            <Icon className={cn('h-6 w-6', iconColor)} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
