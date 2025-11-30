import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Globe, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, Dropdown } from '@/components/ui';
import { StatsCard } from '@/components/charts';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const pageViewsData = [
  { name: 'Mon', views: 4000, visitors: 2400 },
  { name: 'Tue', views: 3000, visitors: 1398 },
  { name: 'Wed', views: 5000, visitors: 3800 },
  { name: 'Thu', views: 4780, visitors: 3908 },
  { name: 'Fri', views: 5890, visitors: 4800 },
  { name: 'Sat', views: 4390, visitors: 3200 },
  { name: 'Sun', views: 3490, visitors: 2300 },
];

const conversionData = [
  { name: 'Jan', rate: 2.5 },
  { name: 'Feb', rate: 2.8 },
  { name: 'Mar', rate: 3.2 },
  { name: 'Apr', rate: 2.9 },
  { name: 'May', rate: 3.5 },
  { name: 'Jun', rate: 3.8 },
  { name: 'Jul', rate: 4.2 },
];

const topPages = [
  { page: '/dashboard', views: 12453, bounce: 32, duration: '3:45' },
  { page: '/products', views: 8234, bounce: 45, duration: '2:30' },
  { page: '/checkout', views: 5678, bounce: 28, duration: '4:15' },
  { page: '/blog', views: 4567, bounce: 52, duration: '5:20' },
  { page: '/contact', views: 2345, bounce: 38, duration: '1:45' },
];

const countryData = [
  { country: 'United States', visitors: 45234, percentage: 35 },
  { country: 'United Kingdom', visitors: 23456, percentage: 18 },
  { country: 'Germany', visitors: 18234, percentage: 14 },
  { country: 'France', visitors: 12345, percentage: 10 },
  { country: 'Japan', visitors: 9876, percentage: 8 },
];

const deviceData = [
  { name: 'Desktop', value: 55, color: '#6366f1' },
  { name: 'Mobile', value: 35, color: '#10b981' },
  { name: 'Tablet', value: 10, color: '#f59e0b' },
];

const referralData = [
  { source: 'Google', visitors: 34567, percentage: 45, change: 12.5 },
  { source: 'Direct', visitors: 23456, percentage: 30, change: 5.2 },
  { source: 'Social Media', visitors: 12345, percentage: 16, change: -3.4 },
  { source: 'Email', visitors: 5678, percentage: 7, change: 8.1 },
  { source: 'Other', visitors: 1234, percentage: 2, change: -1.2 },
];

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState('7d');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Track your website performance and user behavior.
          </p>
        </div>
        <Dropdown
          value={timeRange}
          onChange={setTimeRange}
          options={[
            { value: '24h', label: 'Last 24 Hours' },
            { value: '7d', label: 'Last 7 Days' },
            { value: '30d', label: 'Last 30 Days' },
            { value: '90d', label: 'Last 90 Days' },
          ]}
          className="w-40"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="Page Views"
          value={128453}
          change={12.5}
          icon={BarChart3}
          iconColor="text-indigo-600"
          iconBgColor="bg-indigo-100 dark:bg-indigo-900/30"
          format="number"
          delay={0}
        />
        <StatsCard
          title="Unique Visitors"
          value={45234}
          change={8.2}
          icon={Users}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-100 dark:bg-emerald-900/30"
          format="number"
          delay={0.1}
        />
        <StatsCard
          title="Bounce Rate"
          value={34.5}
          change={-2.3}
          icon={TrendingUp}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100 dark:bg-amber-900/30"
          format="percentage"
          delay={0.2}
        />
        <StatsCard
          title="Avg. Session"
          value="4:32"
          change={5.8}
          icon={Clock}
          iconColor="text-pink-600"
          iconBgColor="bg-pink-100 dark:bg-pink-900/30"
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page Views Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Page Views & Visitors</CardTitle>
              <CardDescription>Daily website traffic overview</CardDescription>
            </CardHeader>
            <div className="h-80 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pageViewsData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Device Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
              <CardDescription>Visitors by device type</CardDescription>
            </CardHeader>
            <div className="h-48 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {deviceData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription>Monthly conversion trend</CardDescription>
            </CardHeader>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Referral Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors come from</CardDescription>
            </CardHeader>
            <div className="mt-4 space-y-4">
              {referralData.map((item) => (
                <div key={item.source} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{item.source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">{item.visitors.toLocaleString()}</span>
                      <span className={`flex items-center text-xs ${item.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {item.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(item.change)}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="h-full bg-indigo-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages on your site</CardDescription>
            </CardHeader>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 text-xs font-medium text-slate-500 uppercase">Page</th>
                    <th className="text-right py-3 text-xs font-medium text-slate-500 uppercase">Views</th>
                    <th className="text-right py-3 text-xs font-medium text-slate-500 uppercase">Bounce</th>
                    <th className="text-right py-3 text-xs font-medium text-slate-500 uppercase">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {topPages.map((page) => (
                    <tr key={page.page} className="border-b border-slate-100 dark:border-slate-700/50">
                      <td className="py-3 font-medium text-slate-900 dark:text-white">{page.page}</td>
                      <td className="py-3 text-right text-slate-600 dark:text-slate-400">{page.views.toLocaleString()}</td>
                      <td className="py-3 text-right text-slate-600 dark:text-slate-400">{page.bounce}%</td>
                      <td className="py-3 text-right text-slate-600 dark:text-slate-400">{page.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Top Countries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
              <CardDescription>Visitors by geographic location</CardDescription>
            </CardHeader>
            <div className="mt-4 space-y-4">
              {countryData.map((item, index) => (
                <div key={item.country} className="flex items-center gap-4">
                  <span className="text-lg font-bold text-slate-400 w-6">{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{item.country}</span>
                      <span className="text-sm text-slate-500">{item.visitors.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      />
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
