import React, { useState, useEffect } from 'react';
import { X, Clock, AlertTriangle } from 'lucide-react';
import type { BookingFormData, Asset } from '../../types';
import { bookingSchema } from '../../lib/validators';

interface BookingFormProps {
  isOpen: boolean;
  resources: Asset[];
  onClose: () => void;
  onSubmit: (data: BookingFormData) => Promise<void>;
  existingBookings: Array<{ startTime: string; endTime: string; status: string }>;
  initialResourceId?: string | null;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  isOpen,
  resources,
  onClose,
  onSubmit,
  existingBookings,
  initialResourceId,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    resourceId: '',
    startTime: '',
    endTime: '',
    purpose: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [overlapWarning, setOverlapWarning] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        resourceId: initialResourceId || '',
        startTime: '',
        endTime: '',
        purpose: '',
      });
      setErrors({});
      setOverlapWarning(null);
    }
  }, [isOpen, initialResourceId]);

  const selectedResource = resources.find(r => r.id === formData.resourceId);

  const checkOverlap = (start: string, end: string): boolean => {
    if (!start || !end) return false;
    const startTime = new Date(start);
    const endTime = new Date(end);
    return existingBookings.some(b => {
      if (b.status === 'cancelled') return false;
      const bStart = new Date(b.startTime);
      const bEnd = new Date(b.endTime);
      return startTime < bEnd && endTime > bStart;
    });
  };

  const validate = (): boolean => {
    try {
      bookingSchema.parse(formData);
      if (checkOverlap(formData.startTime, formData.endTime)) {
        setOverlapWarning('This time slot overlaps with an existing booking');
        return false;
      }
      setOverlapWarning(null);
      return true;
    } catch (err: any) {
      const fieldErrors: Record<string, string> = {};
      err.errors?.forEach((e: any) => {
        fieldErrors[e.path[0]] = e.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const minDateTime = new Date();
  minDateTime.setMinutes(minDateTime.getMinutes() - minDateTime.getTimezoneOffset());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Book Resource</h3>
            <p className="text-sm text-gray-500 mt-0.5">Reserve a shared resource for your team</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resource *</label>
            <select
              value={formData.resourceId}
              onChange={e => {
                setFormData(prev => ({ ...prev, resourceId: e.target.value }));
                setErrors(prev => ({ ...prev, resourceId: '' }));
                setOverlapWarning(null);
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.resourceId ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
            >
              <option value="">Select a resource...</option>
              {resources.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.location})
                </option>
              ))}
            </select>
            {errors.resourceId && <p className="mt-1 text-xs text-red-600">{errors.resourceId}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  min={minDateTime.toISOString().slice(0, 16)}
                  onChange={e => {
                    setFormData(prev => ({ ...prev, startTime: e.target.value }));
                    setErrors(prev => ({ ...prev, startTime: '' }));
                    setOverlapWarning(null);
                  }}
                  className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm ${errors.startTime ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                />
              </div>
              {errors.startTime && <p className="mt-1 text-xs text-red-600">{errors.startTime}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="datetime-local"
                  value={formData.endTime}
                  min={formData.startTime || undefined}
                  onChange={e => {
                    setFormData(prev => ({ ...prev, endTime: e.target.value }));
                    setErrors(prev => ({ ...prev, endTime: '' }));
                    setOverlapWarning(null);
                  }}
                  className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm ${errors.endTime ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                />
              </div>
              {errors.endTime && <p className="mt-1 text-xs text-red-600">{errors.endTime}</p>}
            </div>
          </div>

          {overlapWarning && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {overlapWarning}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
            <textarea
              value={formData.purpose}
              onChange={e => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
              placeholder="Describe the purpose of this booking..."
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !!overlapWarning}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BookingForm);
