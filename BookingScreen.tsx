import React, { useState } from 'react';
import { Plus, List, Calendar as CalendarIcon } from 'lucide-react';
import { useBookings } from '../hooks/useBookings';
import { BookingCalendar } from '../components/booking/BookingCalendar';
import { BookingForm } from '../components/booking/BookingForm';
import { StatusChip } from '../components/shared/StatusChip';
import { EmptyState } from '../components/shared/EmptyState';

export const BookingScreen: React.FC = () => {
  const booking = useBookings();
  const [showForm, setShowForm] = useState(false);
  const [listView, setListView] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Booking</h1>
          <p className="text-sm text-gray-500 mt-1">Book shared resources and manage your reservations</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setListView(!listView)}
            className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
            title={listView ? 'Calendar view' : 'List view'}
          >
            {listView ? <CalendarIcon className="w-4 h-4" /> : <List className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Book Resource
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Upcoming', value: booking.upcomingBookings.length, color: 'blue' },
          { label: 'Ongoing', value: booking.ongoingBookings.length, color: 'green' },
          { label: 'Completed', value: booking.bookings.filter(b => b.status === 'completed').length, color: 'gray' },
          { label: 'My Bookings', value: booking.myBookings.length, color: 'purple' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {listView ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Resource</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Purpose</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Booked By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {booking.filteredBookings.map(b => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-sm text-gray-900">{b.resourceName}</div>
                    <div className="text-xs text-gray-500">{b.resourceLocation}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div>{new Date(b.startTime).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(b.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{b.purpose}</td>
                  <td className="px-4 py-3"><StatusChip status={b.status} size="sm" /></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{b.userName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {booking.filteredBookings.length === 0 && <EmptyState type="calendar" />}
        </div>
      ) : (
        <BookingCalendar
          bookings={booking.filteredBookings}
          view={booking.view}
          selectedDate={booking.selectedDate}
          onDateChange={booking.setSelectedDate}
          onViewChange={booking.setView}
          onBookingClick={() => {}}
        />
      )}

      <BookingForm
        isOpen={showForm}
        resources={booking.bookableResources}
        onClose={() => setShowForm(false)}
        onSubmit={booking.createBooking}
        existingBookings={[]}
      />
    </div>
  );
};

export default BookingScreen;
