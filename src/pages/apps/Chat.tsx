import React from 'react';
import { motion } from 'framer-motion';
import { Search, Send, Phone, Video, MoreVertical, Smile, Paperclip, Image, Mic } from 'lucide-react';
import { Card, Button, Input, Avatar, Badge } from '@/components/ui';

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  read: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

const contacts: Contact[] = [
  { id: '1', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', status: 'online', lastMessage: 'Hey, how are you doing?', lastMessageTime: '2m ago', unread: 2 },
  { id: '2', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', status: 'online', lastMessage: 'The meeting is at 3 PM', lastMessageTime: '15m ago', unread: 0 },
  { id: '3', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', status: 'away', lastMessage: 'Can you send me the file?', lastMessageTime: '1h ago', unread: 1 },
  { id: '4', name: 'Sarah Williams', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', status: 'offline', lastMessage: 'Thanks for your help!', lastMessageTime: '2h ago', unread: 0 },
  { id: '5', name: 'Tom Brown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', status: 'online', lastMessage: 'Let\'s catch up later', lastMessageTime: '3h ago', unread: 0 },
];

const initialMessages: Message[] = [
  { id: '1', senderId: '1', text: 'Hey! How are you doing?', time: '10:00 AM', read: true },
  { id: '2', senderId: 'me', text: 'I\'m doing great, thanks! How about you?', time: '10:02 AM', read: true },
  { id: '3', senderId: '1', text: 'Pretty good! Just working on some new features for the dashboard.', time: '10:05 AM', read: true },
  { id: '4', senderId: 'me', text: 'That sounds exciting! Need any help with that?', time: '10:07 AM', read: true },
  { id: '5', senderId: '1', text: 'Actually, yes! Can you review the new analytics page when you get a chance?', time: '10:10 AM', read: true },
  { id: '6', senderId: 'me', text: 'Sure thing! I\'ll take a look at it this afternoon.', time: '10:12 AM', read: true },
  { id: '7', senderId: '1', text: 'Thanks! Let me know if you have any feedback.', time: '10:15 AM', read: false },
];

export const ChatPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = React.useState<Contact>(contacts[0]);
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const message: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    away: 'bg-amber-500',
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Contacts List */}
        <Card padding="none" className="lg:col-span-1 flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Messages</h2>
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map(contact => (
              <motion.div
                key={contact.id}
                whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                onClick={() => setSelectedContact(contact)}
                className={`flex items-center gap-3 p-4 cursor-pointer border-b border-slate-100 dark:border-slate-700/50 ${
                  selectedContact.id === contact.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                }`}
              >
                <div className="relative">
                  <Avatar src={contact.avatar} name={contact.name} size="md" />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${statusColors[contact.status]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{contact.name}</p>
                    <span className="text-xs text-slate-500">{contact.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <Badge variant="primary" size="sm">{contact.unread}</Badge>
                )}
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card padding="none" className="lg:col-span-3 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar src={selectedContact.avatar} name={selectedContact.name} size="md" />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${statusColors[selectedContact.status]}`} />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{selectedContact.name}</p>
                <p className="text-sm text-slate-500 capitalize">{selectedContact.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.senderId === 'me' ? 'order-2' : 'order-1'}`}>
                  {message.senderId !== 'me' && (
                    <Avatar src={selectedContact.avatar} name={selectedContact.name} size="sm" className="mb-1" />
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.senderId === 'me'
                        ? 'bg-indigo-500 text-white rounded-br-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className={`text-xs text-slate-500 mt-1 ${message.senderId === 'me' ? 'text-right' : 'text-left'}`}>
                    {message.time}
                  </p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Smile className="h-5 w-5 text-slate-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Paperclip className="h-5 w-5 text-slate-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Image className="h-5 w-5 text-slate-500" />
                </Button>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Mic className="h-5 w-5 text-slate-500" />
              </Button>
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
