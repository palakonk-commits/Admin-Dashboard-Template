import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui';

const data = [
  { name: 'Mon', visits: 4000, unique: 2400 },
  { name: 'Tue', visits: 3000, unique: 1398 },
  { name: 'Wed', visits: 5000, unique: 3800 },
  { name: 'Thu', visits: 4780, unique: 3908 },
  { name: 'Fri', visits: 5890, unique: 4800 },
  { name: 'Sat', visits: 4390, unique: 3200 },
  { name: 'Sun', visits: 3490, unique: 2300 },
];

export const VisitorsChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Weekly Visitors</CardTitle>
          <CardDescription>Total and unique visitors this week</CardDescription>
        </CardHeader>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">{label}</p>
                        {payload.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <span
                              className="w-2.5 h-2.5 rounded"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-slate-500 dark:text-slate-400 capitalize">
                              {entry.name === 'visits' ? 'Total' : 'Unique'}:
                            </span>
                            <span className="font-medium text-slate-900 dark:text-white">
                              {entry.value?.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="visits" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="unique" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-indigo-500" />
            <span className="text-sm text-slate-500 dark:text-slate-400">Total Visits</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-sm text-slate-500 dark:text-slate-400">Unique Visitors</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
