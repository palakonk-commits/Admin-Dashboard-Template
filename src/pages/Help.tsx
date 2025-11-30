import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Book, MessageCircle, Video, FileText, ExternalLink, Search, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { Card, Button, Input, Badge } from '@/components/ui';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  { question: 'How do I reset my password?', answer: 'You can reset your password by clicking on "Forgot Password" on the login page. Follow the instructions sent to your email.', category: 'Account' },
  { question: 'How can I update my profile information?', answer: 'Go to Settings > Profile to update your personal information, avatar, and preferences.', category: 'Account' },
  { question: 'What payment methods are accepted?', answer: 'We accept all major credit cards, PayPal, and bank transfers. You can manage payment methods in Settings > Billing.', category: 'Billing' },
  { question: 'How do I add new team members?', answer: 'Navigate to Users page and click "Add User". Fill in the required information and send an invitation.', category: 'Users' },
  { question: 'Can I export my data?', answer: 'Yes! Go to Settings > Data and click "Export Data" to download all your information in CSV or JSON format.', category: 'Data' },
  { question: 'How do I integrate with third-party apps?', answer: 'Check out our API documentation and integrations page in Settings > Integrations for available connections.', category: 'Integration' },
];

const resources = [
  { title: 'Documentation', description: 'Comprehensive guides and API reference', icon: Book, link: '#' },
  { title: 'Video Tutorials', description: 'Step-by-step video guides', icon: Video, link: '#' },
  { title: 'API Reference', description: 'Technical documentation for developers', icon: FileText, link: '#' },
  { title: 'Community Forum', description: 'Connect with other users', icon: MessageCircle, link: '#' },
];

export const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expandedFAQ, setExpandedFAQ] = React.useState<number | null>(null);

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(faqs.map(f => f.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">How can we help you?</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Search our knowledge base or browse categories below
        </p>
        <div className="mt-6">
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-5 w-5" />}
            className="max-w-md mx-auto"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <motion.a
              key={resource.title}
              href={resource.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover padding="md" className="h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{resource.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{resource.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </div>
              </Card>
            </motion.a>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="md">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(category => (
                <Badge key={category} variant="primary" size="md" className="cursor-pointer">
                  {category}
                </Badge>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-indigo-500 shrink-0" />
                      <span className="font-medium text-slate-900 dark:text-white">{faq.question}</span>
                    </div>
                    <ChevronRight className={`h-5 w-5 text-slate-400 transition-transform ${expandedFAQ === index ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-slate-600 dark:text-slate-400 pl-8">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">No results found for "{searchQuery}"</p>
              </div>
            )}
          </Card>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <Card padding="md">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Still need help?</h3>
            <p className="text-sm text-slate-500 mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Button className="w-full" leftIcon={<MessageCircle className="h-4 w-4" />}>
              Contact Support
            </Button>
          </Card>

          <Card padding="md">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Mail className="h-5 w-5 text-indigo-500" />
                <span>support@adminx.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Phone className="h-5 w-5 text-indigo-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="h-5 w-5 text-indigo-500" />
                <span>123 Business Ave, Suite 100</span>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Office Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Monday - Friday</span>
                <span className="text-slate-900 dark:text-white">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Saturday</span>
                <span className="text-slate-900 dark:text-white">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sunday</span>
                <span className="text-slate-900 dark:text-white">Closed</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
