import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Toast } from '@/components/ui';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-white dark:bg-slate-900">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              AdminX
            </span>
          </motion.div>

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">
              Welcome to AdminX
            </h1>
            <p className="text-lg text-white/80 max-w-md">
              The most powerful and flexible admin dashboard template for your next project.
            </p>
          </motion.div>

          {/* Floating Cards */}
          <div className="relative mt-12 w-full max-w-lg h-80">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-0 left-0 w-48 h-32 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
            >
              <div className="h-4 w-20 bg-white/30 rounded mb-3" />
              <div className="h-3 w-full bg-white/20 rounded mb-2" />
              <div className="h-3 w-3/4 bg-white/20 rounded" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute top-1/3 right-0 w-56 h-40 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/30" />
                <div>
                  <div className="h-3 w-20 bg-white/30 rounded mb-1" />
                  <div className="h-2 w-16 bg-white/20 rounded" />
                </div>
              </div>
              <div className="h-3 w-full bg-white/20 rounded mb-2" />
              <div className="h-3 w-5/6 bg-white/20 rounded" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-0 left-1/4 w-52 h-36 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
            >
              <div className="flex justify-between mb-4">
                <div className="h-4 w-16 bg-white/30 rounded" />
                <div className="h-4 w-8 bg-emerald-400/50 rounded" />
              </div>
              <div className="flex items-end gap-1 h-16">
                {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-white/30 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <Toast />
    </div>
  );
};
