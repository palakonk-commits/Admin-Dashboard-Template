import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, X } from 'lucide-react';
import { Card, Button, Modal, ModalFooter, Input } from '@/components/ui';
import { useToast } from '@/stores/notification.store';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'meeting' | 'event' | 'reminder' | 'holiday';
  description?: string;
  location?: string;
  attendees?: number;
}

const eventTypeColors = {
  meeting: 'bg-indigo-500',
  event: 'bg-emerald-500',
  reminder: 'bg-amber-500',
  holiday: 'bg-pink-500',
};

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = React.useState(false);
  const [events, setEvents] = React.useState<Event[]>([
    { id: '1', title: 'Team Meeting', date: new Date(2024, 10, 28), time: '10:00', type: 'meeting', location: 'Conference Room A', attendees: 8 },
    { id: '2', title: 'Product Launch', date: new Date(2024, 10, 30), time: '14:00', type: 'event', description: 'New product announcement' },
    { id: '3', title: 'Code Review', date: new Date(2024, 11, 2), time: '11:00', type: 'reminder' },
    { id: '4', title: 'Holiday Party', date: new Date(2024, 11, 15), time: '18:00', type: 'holiday', location: 'Main Hall', attendees: 50 },
  ]);
  const [newEvent, setNewEvent] = React.useState({ title: '', time: '', type: 'meeting' as Event['type'] });
  const toast = useToast();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
  
  const getEventsForDate = (day: number) => {
    return events.filter(e => 
      e.date.getDate() === day && 
      e.date.getMonth() === currentDate.getMonth() && 
      e.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !selectedDate) {
      toast.error('Error', 'Please fill in all fields');
      return;
    }
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate,
      time: newEvent.time || '09:00',
      type: newEvent.type,
    };
    setEvents([...events, event]);
    setNewEvent({ title: '', time: '', type: 'meeting' });
    setShowEventModal(false);
    toast.success('Event Added', 'Your event has been created');
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
    toast.success('Deleted', 'Event has been removed');
  };

  const todayEvents = events.filter(e => {
    const today = new Date();
    return e.date.getDate() === today.getDate() && 
           e.date.getMonth() === today.getMonth() && 
           e.date.getFullYear() === today.getFullYear();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Calendar</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your schedule and events</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => { setSelectedDate(new Date()); setShowEventModal(true); }}>
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card padding="md">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center py-2 text-sm font-medium text-slate-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square p-2" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDate(day);
                const isToday = new Date().getDate() === day && 
                               new Date().getMonth() === currentDate.getMonth() &&
                               new Date().getFullYear() === currentDate.getFullYear();
                
                return (
                  <motion.div
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => { setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)); setShowEventModal(true); }}
                    className={`aspect-square p-2 rounded-xl cursor-pointer transition-colors ${
                      isToday 
                        ? 'bg-indigo-500 text-white' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-sm font-medium">{day}</div>
                    <div className="flex flex-wrap gap-0.5 mt-1">
                      {dayEvents.slice(0, 3).map(event => (
                        <div
                          key={event.id}
                          className={`w-1.5 h-1.5 rounded-full ${eventTypeColors[event.type]}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Today's Events */}
        <div className="space-y-6">
          <Card padding="md">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Today's Events</h3>
            {todayEvents.length === 0 ? (
              <p className="text-sm text-slate-500">No events scheduled for today</p>
            ) : (
              <div className="space-y-3">
                {todayEvents.map(event => (
                  <div key={event.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <div className={`w-1 h-full rounded-full ${eventTypeColors[event.type]}`} />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">{event.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Upcoming Events */}
          <Card padding="md">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {events.slice(0, 5).map(event => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${eventTypeColors[event.type]}`}>
                    {event.date.getDate()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{event.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Legend */}
          <Card padding="md">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Event Types</h3>
            <div className="space-y-2">
              {Object.entries(eventTypeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">{type}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Add Event Modal */}
      <Modal isOpen={showEventModal} onClose={() => setShowEventModal(false)} title="Add Event" size="md">
        <div className="space-y-4">
          <Input
            label="Event Title"
            placeholder="Enter event title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <Input
            label="Time"
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Event Type
            </label>
            <div className="flex gap-2">
              {(['meeting', 'event', 'reminder', 'holiday'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setNewEvent({ ...newEvent, type })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    newEvent.type === type
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-500">
            Date: {selectedDate?.toLocaleDateString()}
          </p>
        </div>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowEventModal(false)}>Cancel</Button>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
