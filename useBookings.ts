// ============================================
// ASSETFLOW ERP - USE BOOKINGS HOOK
// Screen 6: Resource Booking
// ============================================

import { useState, useCallback, useMemo } from 'react';
import type { 
  Booking, 
  BookingFormData, 
  BookingFilters, 
  CalendarView,
  ResourceAvailability,
  PaginatedResponse 
} from '../types';
import { mockBookings, mockAssets, getBookableResources } from '../lib/mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filters, setFilters] = useState<BookingFilters>({});
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('week');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookableResources = useMemo(() => getBookableResources(), []);

  // --- Check Overlap ---
  const checkOverlap = useCallback((resourceId: string, startTime: string, endTime: string, excludeBookingId?: string): boolean => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    return bookings.some(b => {
      if (b.resourceId !== resourceId) return false;
      if (b.status === 'cancelled') return false;
      if (excludeBookingId && b.id === excludeBookingId) return false;

      const bStart = new Date(b.startTime);
      const bEnd = new Date(b.endTime);

      // Check overlap: (StartA < EndB) && (EndA > StartB)
      return start < bEnd && end > bStart;
    });
  }, [bookings]);

  // --- CRUD Operations ---
  const createBooking = useCallback(async (data: BookingFormData): Promise<Booking> => {
    setLoading(true);
    setError(null);
    await delay(700);

    // Validate overlap
    if (checkOverlap(data.resourceId, data.startTime, data.endTime)) {
      setError('This time slot overlaps with an existing booking');
      setLoading(false);
      throw new Error('Booking overlap detected');
    }

    const resource = mockAssets.find(a => a.id === data.resourceId);
    const user = { id: 'usr-005', name: 'Raj Patel', department: 'Engineering' }; // Current user mock

    const newBooking: Booking = {
      id: `bkg-${Date.now()}`,
      resourceId: data.resourceId,
      resourceName: resource?.name || 'Unknown',
      resourceCategory: resource?.categoryName,
      resourceLocation: resource?.location,
      userId: user.id,
      userName: user.name,
      userDepartment: user.department,
      startTime: data.startTime,
      endTime: data.endTime,
      purpose: data.purpose || '',
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    };

    setBookings(prev => [...prev, newBooking]);
    setLoading(false);
    return newBooking;
  }, [checkOverlap]);

  const updateBooking = useCallback(async (id: string, data: Partial<BookingFormData>): Promise<Booking> => {
    setLoading(true);
    setError(null);
    await delay(500);

    const existing = bookings.find(b => b.id === id);
    if (!existing) throw new Error('Booking not found');

    // Check overlap if times changed
    if (data.startTime && data.endTime) {
      if (checkOverlap(existing.resourceId, data.startTime, data.endTime, id)) {
        setError('Rescheduled time overlaps with an existing booking');
        setLoading(false);
        throw new Error('Booking overlap detected');
      }
    }

    setBookings(prev => prev.map(b => 
      b.id === id ? {
        ...b,
        ...(data.resourceId && { resourceId: data.resourceId }),
        ...(data.startTime && { startTime: data.startTime }),
        ...(data.endTime && { endTime: data.endTime }),
        ...(data.purpose !== undefined && { purpose: data.purpose }),
      } : b
    ));

    const updated = bookings.find(b => b.id === id)!;
    setLoading(false);
    return updated;
  }, [bookings, checkOverlap]);

  const cancelBooking = useCallback(async (id: string, reason: string): Promise<Booking> => {
    setLoading(true);
    await delay(400);

    setBookings(prev => prev.map(b => 
      b.id === id ? {
        ...b,
        status: 'cancelled',
        cancelledAt: new Date().toISOString(),
        cancelledReason: reason,
      } : b
    ));

    const updated = bookings.find(b => b.id === id)!;
    setLoading(false);
    return updated;
  }, [bookings]);

  const deleteBooking = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    await delay(300);
    setBookings(prev => prev.filter(b => b.id !== id));
    setLoading(false);
  }, []);

  // --- Status Updates ---
  const updateBookingStatuses = useCallback(() => {
    const now = new Date();
    setBookings(prev => prev.map(b => {
      if (b.status === 'cancelled' || b.status === 'completed') return b;

      const start = new Date(b.startTime);
      const end = new Date(b.endTime);

      if (now >= end) return { ...b, status: 'completed' as const };
      if (now >= start && now < end) return { ...b, status: 'ongoing' as const };
      return b;
    }));
  }, []);

  // --- Filtering ---
  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    if (filters.resourceId) {
      result = result.filter(b => b.resourceId === filters.resourceId);
    }
    if (filters.status?.length) {
      result = result.filter(b => filters.status?.includes(b.status));
    }
    if (filters.dateFrom) {
      result = result.filter(b => new Date(b.startTime) >= new Date(filters.dateFrom!));
    }
    if (filters.dateTo) {
      result = result.filter(b => new Date(b.startTime) <= new Date(filters.dateTo!));
    }
    if (filters.userId) {
      result = result.filter(b => b.userId === filters.userId);
    }

    return result.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
  }, [bookings, filters]);

  const myBookings = useMemo(() => {
    // Mock current user ID
    const currentUserId = 'usr-005';
    return bookings
      .filter(b => b.userId === currentUserId)
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
  }, [bookings]);

  const upcomingBookings = useMemo(() => 
    filteredBookings.filter(b => b.status === 'upcoming'),
  [filteredBookings]);

  const ongoingBookings = useMemo(() => 
    filteredBookings.filter(b => b.status === 'ongoing'),
  [filteredBookings]);

  // --- Calendar Data ---
  const getResourceAvailability = useCallback((resourceId: string, date: Date): ResourceAvailability => {
    const resource = mockAssets.find(a => a.id === resourceId);
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const existingBookings = bookings
      .filter(b => 
        b.resourceId === resourceId && 
        b.status !== 'cancelled' &&
        new Date(b.startTime) < dayEnd &&
        new Date(b.endTime) > dayStart
      )
      .map(b => ({
        startTime: b.startTime,
        endTime: b.endTime,
        status: b.status,
      }));

    return {
      resourceId,
      resourceName: resource?.name || 'Unknown',
      location: resource?.location || '',
      category: resource?.categoryName || '',
      existingBookings,
    };
  }, [bookings]);

  const getDayBookings = useCallback((date: Date): Booking[] => {
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    return bookings.filter(b => 
      new Date(b.startTime) < dayEnd && new Date(b.endTime) > dayStart
    ).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [bookings]);

  const getWeekBookings = useCallback((date: Date): Booking[] => {
    const day = date.getDay();
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - day);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    return bookings.filter(b => 
      new Date(b.startTime) < weekEnd && new Date(b.endTime) > weekStart
    ).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [bookings]);

  return {
    // State
    bookings,
    filters,
    selectedResource,
    selectedDate,
    view,
    loading,
    error,
    bookableResources,

    // Setters
    setFilters,
    setSelectedResource,
    setSelectedDate,
    setView,
    setError,

    // CRUD
    createBooking,
    updateBooking,
    cancelBooking,
    deleteBooking,
    updateBookingStatuses,

    // Derived
    filteredBookings,
    myBookings,
    upcomingBookings,
    ongoingBookings,

    // Calendar
    getResourceAvailability,
    getDayBookings,
    getWeekBookings,
    checkOverlap,
  };
}
