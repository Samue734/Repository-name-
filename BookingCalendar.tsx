import React from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import type { Booking, CalendarView } from '../../types';
import { StatusChip } from '../shared/StatusChip';

interface BookingCalendarProps {
  bookings: Booking[];
  view: CalendarView;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
  onBookingClick: (booking: Booking) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  bookings,
  view,
  selectedDate,
  onDateChange,
  onViewChange,
  onBookingClick,
}) => {
  const getWeekDays = () => {
    const days = [];
    const start = new Date(selectedDate);
    const day = start.getDay();
    start.setDate(start.getDate() - day);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const getBookingsForDay = (date: Date) => {
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);
    return bookings.filter(b => {
      const bStart = new Date(b.startTime);
      return bStart >= dayStart && bStart < dayEnd;
    });
  };

  const getBookingPosition = (booking: Booking) => {
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);
    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const endMinutes = end.getHours() * 60 + end.getMinutes();
    const top = (startMinutes / 1440) * 100;
    const height = ((endMinutes - startMinutes) / 1440) * 100;
    return { top: `${top}%`, height: `${height}%` };
  };

  const weekDays = getWeekDays();

  if (view === 'day') {
    const dayBookings = getBookingsForDay(selectedDate);
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDateChange(new Date(selectedDate.getTime() - 86400000))}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            <button
              onClick={() => onDateChange(new Date(selectedDate.getTime() + 86400000))}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => onViewChange('day')}
              className="px-3 py-1.5 text-sm font-medium rounded-md bg-white text-gray-900 shadow-sm"
            >
              Day
            </button>
            <button
              onClick={() => onViewChange('week')}
              className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-500 hover:text-gray-700"
            >
              Week
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex">
            <div className="w-16 flex-shrink-0 border-r border-gray-100 bg-gray-50">
              {HOURS.map(hour => (
                <div key={hour} className="h-16 flex items-start justify-center pt-1 text-xs text-gray-400">
                  {hour.toString().padStart(2, '0')}:00
                </div>
              ))}
            </div>
            <div className="flex-1 relative">
              {HOURS.map(hour => (
                <div key={hour} className="h-16 border-b border-gray-50" />
              ))}
              {dayBookings.map(booking => {
                const pos = getBookingPosition(booking);
                return (
                  <button
                    key={booking.id}
                    onClick={() => onBookingClick(booking)}
                    className="absolute left-1 right-1 rounded-lg px-2 py-1 text-left text-xs border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors overflow-hidden"
                    style={{ top: pos.top, height: pos.height }}
                  >
                    <div className="font-medium text-blue-900 truncate">{booking.purpose}</div>
                    <div className="text-blue-600 truncate">{booking.resourceName}</div>
                    <div className="text-blue-500 text-[10px]">
                      {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onDateChange(new Date(selectedDate.getTime() - 7 * 86400000))}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900">
            {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </h3>
          <button
            onClick={() => onDateChange(new Date(selectedDate.getTime() + 7 * 86400000))}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => onViewChange('day')}
            className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-500 hover:text-gray-700"
          >
            Day
          </button>
          <button
            onClick={() => onViewChange('week')}
            className="px-3 py-1.5 text-sm font-medium rounded-md bg-white text-gray-900 shadow-sm"
          >
            Week
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekDays.map((day, i) => (
            <button
              key={i}
              onClick={() => {
                onDateChange(day);
                onViewChange('day');
              }}
              className={`py-3 text-center transition-colors ${isSelected(day) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <div className="text-xs font-medium text-gray-500 uppercase">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className={`text-lg font-semibold mt-0.5 ${isToday(day) ? 'text-blue-600' : 'text-gray-900'}`}>
                {day.getDate()}
              </div>
              {isToday(day) && <div className="w-1 h-1 bg-blue-600 rounded-full mx-auto mt-1" />}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-7 divide-x divide-gray-100">
          {weekDays.map((day, i) => {
            const dayBookings = getBookingsForDay(day);
            return (
              <div key={i} className="min-h-[200px] p-2 space-y-1.5">
                {dayBookings.map(booking => (
                  <button
                    key={booking.id}
                    onClick={() => onBookingClick(booking)}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <div className="font-medium text-blue-900 truncate">{booking.purpose}</div>
                    <div className="text-blue-600 text-[10px] mt-0.5">
                      <Clock className="w-3 h-3 inline mr-0.5" />
                      {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <StatusChip status={booking.status} size="sm" className="mt-1" />
                  </button>
                ))}
                {dayBookings.length === 0 && (
                  <div className="text-xs text-gray-300 text-center py-4">No bookings</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BookingCalendar);
