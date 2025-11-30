import React from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Trash2, Archive, Reply, Forward, Send, Paperclip, Inbox, FileText, AlertCircle } from 'lucide-react';
import { Card, Button, Input, Badge, Avatar, Modal, ModalFooter } from '@/components/ui';
import { useToast } from '@/stores/notification.store';

interface Email {
  id: string;
  from: string;
  fromEmail: string;
  avatar: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash';
}

const initialEmails: Email[] = [
  { id: '1', from: 'John Doe', fromEmail: 'john@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', subject: 'Project Update Required', preview: 'Hi, I wanted to follow up on the project status...', body: 'Hi,\n\nI wanted to follow up on the project status. Can you please provide an update on the current progress?\n\nBest regards,\nJohn', date: '10:30 AM', read: false, starred: true, folder: 'inbox' },
  { id: '2', from: 'Jane Smith', fromEmail: 'jane@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', subject: 'Meeting Tomorrow', preview: 'Reminder about our meeting scheduled for tomorrow...', body: 'Hi,\n\nThis is a reminder about our meeting scheduled for tomorrow at 2 PM.\n\nPlease confirm your attendance.\n\nThanks,\nJane', date: '9:15 AM', read: true, starred: false, folder: 'inbox' },
  { id: '3', from: 'Support Team', fromEmail: 'support@company.com', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100', subject: 'Your ticket has been resolved', preview: 'Your support ticket #1234 has been resolved...', body: 'Hello,\n\nYour support ticket #1234 has been resolved. Please let us know if you need further assistance.\n\nBest,\nSupport Team', date: 'Yesterday', read: true, starred: false, folder: 'inbox' },
  { id: '4', from: 'Marketing', fromEmail: 'marketing@company.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', subject: 'New Campaign Launch', preview: 'We are excited to announce our new marketing campaign...', body: 'Hi Team,\n\nWe are excited to announce our new marketing campaign launching next week. Please review the attached materials.\n\nRegards,\nMarketing Team', date: 'Yesterday', read: false, starred: false, folder: 'inbox' },
  { id: '5', from: 'HR Department', fromEmail: 'hr@company.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', subject: 'Holiday Schedule', preview: 'Please find attached the holiday schedule for 2024...', body: 'Dear All,\n\nPlease find attached the holiday schedule for 2024. Mark your calendars accordingly.\n\nBest,\nHR Department', date: 'Dec 1', read: true, starred: true, folder: 'inbox' },
];

export const EmailPage: React.FC = () => {
  const [emails, setEmails] = React.useState<Email[]>(initialEmails);
  const [selectedEmail, setSelectedEmail] = React.useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFolder, setActiveFolder] = React.useState<Email['folder']>('inbox');
  const [showComposeModal, setShowComposeModal] = React.useState(false);
  const [newEmail, setNewEmail] = React.useState({ to: '', subject: '', body: '' });
  const toast = useToast();

  const folders = [
    { id: 'inbox' as const, name: 'Inbox', icon: Inbox, count: emails.filter(e => e.folder === 'inbox' && !e.read).length },
    { id: 'sent' as const, name: 'Sent', icon: Send, count: 0 },
    { id: 'drafts' as const, name: 'Drafts', icon: FileText, count: 0 },
    { id: 'spam' as const, name: 'Spam', icon: AlertCircle, count: 0 },
    { id: 'trash' as const, name: 'Trash', icon: Trash2, count: 0 },
  ];

  const filteredEmails = emails.filter(e => 
    e.folder === activeFolder &&
    (e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
     e.from.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleToggleStar = (emailId: string) => {
    setEmails(emails.map(e => e.id === emailId ? { ...e, starred: !e.starred } : e));
  };

  const handleMarkAsRead = (emailId: string) => {
    setEmails(emails.map(e => e.id === emailId ? { ...e, read: true } : e));
  };

  const handleDelete = (emailId: string) => {
    setEmails(emails.map(e => e.id === emailId ? { ...e, folder: 'trash' } : e));
    setSelectedEmail(null);
    toast.success('Deleted', 'Email moved to trash');
  };

  const handleSendEmail = () => {
    if (!newEmail.to || !newEmail.subject) {
      toast.error('Error', 'Please fill in required fields');
      return;
    }
    toast.success('Sent', 'Your email has been sent');
    setNewEmail({ to: '', subject: '', body: '' });
    setShowComposeModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Email</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your inbox</p>
        </div>
        <Button leftIcon={<Send className="h-4 w-4" />} onClick={() => setShowComposeModal(true)}>
          Compose
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card padding="md">
          <div className="space-y-1">
            {folders.map(folder => {
              const Icon = folder.icon;
              return (
                <button
                  key={folder.id}
                  onClick={() => setActiveFolder(folder.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    activeFolder === folder.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{folder.name}</span>
                  </div>
                  {folder.count > 0 && (
                    <Badge variant="primary" size="sm">{folder.count}</Badge>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Email List */}
        <div className="lg:col-span-2">
          <Card padding="none">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <Input
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {filteredEmails.map(email => (
                <motion.div
                  key={email.id}
                  whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                  onClick={() => { setSelectedEmail(email); handleMarkAsRead(email.id); }}
                  className={`flex items-start gap-3 p-4 cursor-pointer ${
                    !email.read ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''
                  } ${selectedEmail?.id === email.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
                >
                  <Avatar src={email.avatar} name={email.from} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${!email.read ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {email.from}
                      </p>
                      <span className="text-xs text-slate-500">{email.date}</span>
                    </div>
                    <p className={`text-sm truncate ${!email.read ? 'font-medium text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
                      {email.subject}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-1">{email.preview}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleStar(email.id); }}
                    className={`shrink-0 ${email.starred ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'}`}
                  >
                    <Star className={`h-4 w-4 ${email.starred ? 'fill-current' : ''}`} />
                  </button>
                </motion.div>
              ))}
              {filteredEmails.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                  <Inbox className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p>No emails found</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Email Detail */}
        <Card padding="none" className="lg:col-span-1">
          {selectedEmail ? (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Reply className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Forward className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(selectedEmail.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{selectedEmail.subject}</h3>
              </div>
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <Avatar src={selectedEmail.avatar} name={selectedEmail.from} size="sm" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{selectedEmail.from}</p>
                    <p className="text-xs text-slate-500">{selectedEmail.fromEmail}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">
                  {selectedEmail.body}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8 text-center text-slate-500">
              <div>
                <Inbox className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                <p>Select an email to read</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Compose Modal */}
      <Modal isOpen={showComposeModal} onClose={() => setShowComposeModal(false)} title="New Email" size="lg">
        <div className="space-y-4">
          <Input
            label="To"
            placeholder="recipient@example.com"
            value={newEmail.to}
            onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
          />
          <Input
            label="Subject"
            placeholder="Enter subject"
            value={newEmail.subject}
            onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Message
            </label>
            <textarea
              rows={8}
              placeholder="Write your message..."
              value={newEmail.body}
              onChange={(e) => setNewEmail({ ...newEmail, body: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>
        <ModalFooter>
          <Button variant="ghost" leftIcon={<Paperclip className="h-4 w-4" />}>Attach</Button>
          <Button onClick={handleSendEmail} leftIcon={<Send className="h-4 w-4" />}>Send</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
