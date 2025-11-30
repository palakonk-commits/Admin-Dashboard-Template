import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Smartphone,
  Camera,
  Save,
  Monitor,
  Sun,
  Moon,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, Button, Input, Toggle, Avatar, Dropdown, Badge } from '@/components/ui';
import { useThemeStore } from '@/stores/theme.store';
import { useAuthStore } from '@/stores/auth.store';
import { useToast } from '@/stores/notification.store';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('profile');
  const { theme, setTheme } = useThemeStore();
  const { user, updateProfile } = useAuthStore();
  const toast = useToast();

  const [profileData, setProfileData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 234 567 890',
    bio: 'Senior Developer at TechCorp. Passionate about building great products.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
  });

  const [notifications, setNotifications] = React.useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    productUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
  });

  const handleSaveProfile = () => {
    updateProfile({ name: profileData.name, email: profileData.email });
    toast.success('Profile updated', 'Your changes have been saved successfully.');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card padding="sm">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                    activeTab === tab.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details and photo.</CardDescription>
                </CardHeader>
                <div className="mt-6 space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar src={user?.avatar} name={user?.name} size="xl" />
                      <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Change Photo</Button>
                      <p className="text-xs text-slate-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                    <Input
                      label="Phone Number"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      leftIcon={<Smartphone className="h-4 w-4" />}
                    />
                    <Input
                      label="Location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      leftIcon={<Globe className="h-4 w-4" />}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button leftIcon={<Save className="h-4 w-4" />} onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive notifications.</CardDescription>
              </CardHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <Toggle
                    checked={notifications.emailNotifications}
                    onChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                    label="Email Notifications"
                    description="Receive email notifications for important updates"
                  />
                  <Toggle
                    checked={notifications.pushNotifications}
                    onChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                    label="Push Notifications"
                    description="Receive push notifications on your devices"
                  />
                  <Toggle
                    checked={notifications.weeklyDigest}
                    onChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                    label="Weekly Digest"
                    description="Get a weekly summary of your activity"
                  />
                  <Toggle
                    checked={notifications.productUpdates}
                    onChange={(checked) => setNotifications({ ...notifications, productUpdates: checked })}
                    label="Product Updates"
                    description="Be the first to know about new features"
                  />
                  <Toggle
                    checked={notifications.securityAlerts}
                    onChange={(checked) => setNotifications({ ...notifications, securityAlerts: checked })}
                    label="Security Alerts"
                    description="Get notified about security-related events"
                  />
                  <Toggle
                    checked={notifications.marketingEmails}
                    onChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                    label="Marketing Emails"
                    description="Receive promotional emails and offers"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    leftIcon={<Save className="h-4 w-4" />}
                    onClick={() => toast.success('Preferences saved', 'Your notification settings have been updated.')}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure.</CardDescription>
                </CardHeader>
                <div className="mt-6 space-y-4">
                  <Input label="Current Password" type="password" placeholder="Enter current password" />
                  <Input label="New Password" type="password" placeholder="Enter new password" />
                  <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
                  <div className="flex justify-end">
                    <Button onClick={() => toast.success('Password updated', 'Your password has been changed successfully.')}>
                      Update Password
                    </Button>
                  </div>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                      <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">2FA is enabled</p>
                      <p className="text-sm text-slate-500">Your account is protected with authenticator app</p>
                    </div>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Manage your active sessions across devices.</CardDescription>
                </CardHeader>
                <div className="mt-6 space-y-4">
                  {[
                    { device: 'MacBook Pro', location: 'San Francisco, CA', current: true, lastActive: 'Now' },
                    { device: 'iPhone 15 Pro', location: 'San Francisco, CA', current: false, lastActive: '2 hours ago' },
                    { device: 'Windows PC', location: 'New York, NY', current: false, lastActive: '3 days ago' },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <div className="flex items-center gap-4">
                        <Monitor className="h-5 w-5 text-slate-500" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-slate-900 dark:text-white">{session.device}</p>
                            {session.current && <Badge variant="success" size="sm">Current</Badge>}
                          </div>
                          <p className="text-sm text-slate-500">{session.location} • {session.lastActive}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
              </CardHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: 'Light', icon: Sun },
                      { id: 'dark', label: 'Dark', icon: Moon },
                      { id: 'system', label: 'System', icon: Monitor },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setTheme(option.id as 'light' | 'dark' | 'system')}
                        className={cn(
                          'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                          theme === option.id
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        )}
                      >
                        <option.icon className={cn(
                          'h-6 w-6',
                          theme === option.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
                        )} />
                        <span className={cn(
                          'text-sm font-medium',
                          theme === option.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'
                        )}>
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Dropdown
                    label="Language"
                    value="en"
                    onChange={() => {}}
                    options={[
                      { value: 'en', label: 'English (US)', icon: <Globe className="h-4 w-4" /> },
                      { value: 'es', label: 'Español' },
                      { value: 'fr', label: 'Français' },
                      { value: 'de', label: 'Deutsch' },
                      { value: 'ja', label: '日本語' },
                    ]}
                  />
                </div>

                <div>
                  <Dropdown
                    label="Timezone"
                    value="pst"
                    onChange={() => {}}
                    options={[
                      { value: 'pst', label: 'Pacific Time (PST)' },
                      { value: 'est', label: 'Eastern Time (EST)' },
                      { value: 'utc', label: 'UTC' },
                      { value: 'gmt', label: 'GMT' },
                    ]}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>Current Plan</CardTitle>
                      <CardDescription>You are currently on the Pro plan.</CardDescription>
                    </div>
                    <Badge variant="primary">Pro</Badge>
                  </div>
                </CardHeader>
                <div className="mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">$29</span>
                    <span className="text-slate-500">/month</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom integrations', 'API access'].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="ghost" className="text-red-600">Cancel Subscription</Button>
                  </div>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Manage your payment methods.</CardDescription>
                </CardHeader>
                <div className="mt-6">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                        <CreditCard className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">•••• •••• •••• 4242</p>
                        <p className="text-sm text-slate-500">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>View and download your past invoices.</CardDescription>
                </CardHeader>
                <div className="mt-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 text-xs font-medium text-slate-500 uppercase">Invoice</th>
                        <th className="text-left py-3 text-xs font-medium text-slate-500 uppercase">Date</th>
                        <th className="text-left py-3 text-xs font-medium text-slate-500 uppercase">Amount</th>
                        <th className="text-left py-3 text-xs font-medium text-slate-500 uppercase">Status</th>
                        <th className="py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 'INV-001', date: 'Nov 1, 2024', amount: '$29.00', status: 'Paid' },
                        { id: 'INV-002', date: 'Oct 1, 2024', amount: '$29.00', status: 'Paid' },
                        { id: 'INV-003', date: 'Sep 1, 2024', amount: '$29.00', status: 'Paid' },
                      ].map((invoice) => (
                        <tr key={invoice.id} className="border-b border-slate-100 dark:border-slate-700/50">
                          <td className="py-3 font-medium text-slate-900 dark:text-white">{invoice.id}</td>
                          <td className="py-3 text-slate-600 dark:text-slate-400">{invoice.date}</td>
                          <td className="py-3 text-slate-900 dark:text-white">{invoice.amount}</td>
                          <td className="py-3"><Badge variant="success" size="sm">{invoice.status}</Badge></td>
                          <td className="py-3 text-right">
                            <Button variant="ghost" size="sm">Download</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};
