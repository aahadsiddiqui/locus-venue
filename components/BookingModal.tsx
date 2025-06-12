import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendar, FaUsers, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  eventDate: Date | null;
  eventType: string;
  guestCount: string;
  additionalNotes: string;
}

// Add interface for calendar events
interface CalendarEvent {
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    eventDate: null,
    eventType: '',
    guestCount: '',
    additionalNotes: '',
  });

  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  
  // Fetch blocked dates when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchBlockedDates();
    }
  }, [isOpen]);

  const fetchBlockedDates = async () => {
    try {
      const response = await fetch('/api/google-calendar/events');
      const data = await response.json();
      
      if (!response.ok) {
        // Log the error details from the API
        console.error('API Error:', data);
        throw new Error(data.details || 'Failed to fetch calendar events');
      }

      // Convert events to blocked dates
      const dates = data.events.map(event => new Date(event.start.dateTime || event.start.date || ''));
      setBlockedDates(dates);
    } catch (error) {
      console.error('Error fetching blocked dates:', error);
      // Show a more user-friendly error message
      toast.error(
        <div className="font-medium">
          Unable to load calendar availability. Please try again later.
        </div>,
        {
          duration: 4000,
          style: {
            background: '#05190E',
            color: '#FFFFFF',
            border: '2px solid #EBC17D',
          },
        }
      );
    }
  };

  // Function to check if a date should be blocked
  const isDateBlocked = (date: Date) => {
    return blockedDates.some(blockedDate => 
      blockedDate.toDateString() === date.toDateString()
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate guest count
    const guestCount = parseInt(formData.guestCount);
    if (guestCount < 1 || guestCount > 130) {
      toast.error(
        <div className="font-medium">
          Guest count must be between 1 and 130
        </div>,
        {
          duration: 4000,
          style: {
            background: '#05190E',
            color: '#FFFFFF',
            border: '2px solid #EBC17D',
          },
        }
      );
      return;
    }

    try {
      const response = await fetch(`https://formsubmit.co/ajax/locuseventsinc@gmail.com`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "New Booking Request from Locus Venue",
          _template: "table",
          _captcha: "false",
          _autoresponse: "Thank you for your booking request at Locus Venue. We have received your inquiry and will contact you shortly to confirm your event details.",
          _replyto: formData.email,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventDate: formatDateForForm(formData.eventDate),
          eventType: formData.eventType,
          guestCount: formData.guestCount,
          additionalNotes: formData.additionalNotes || 'No additional notes'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send booking request');
      }

      // Close modal first
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: null,
        eventType: '',
        guestCount: '',
        additionalNotes: '',
      });

      toast.success(
        <div className="flex flex-col">
          <span className="font-bold text-lg mb-1">Booking Request Sent!</span>
          <span className="text-sm">
            Thank you for choosing Locus Venue. We will contact you shortly to confirm your booking details.
          </span>
        </div>,
        {
          duration: 5000,
          style: {
            background: '#05190E',
            color: '#FFFFFF',
            border: '2px solid #EBC17D',
            padding: '16px',
            minWidth: '300px',
          },
          icon: '🎉',
        }
      );
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        <div className="font-medium">
          Error sending booking request. Please try again or contact us directly.
        </div>,
        {
          duration: 4000,
          style: {
            background: '#05190E',
            color: '#FFFFFF',
            border: '2px solid #EBC17D',
          },
        }
      );
    }
  };

  // Add this function to format the date for the hidden input
  const formatDateForForm = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'rounded-lg shadow-lg',
          duration: 5000,
        }}
      />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Made more compact */}
              <div className="bg-[#05190E] text-white p-3 sm:p-4 relative">
                <h2 className="text-lg sm:text-xl font-bold">Book Your Event</h2>
                <p className="text-[#EBC17D] mt-1 text-sm">Fill in the details below</p>
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-white/80 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Form - Adjusted spacing */}
              <form 
                onSubmit={handleSubmit}
                className="p-3 sm:p-4 space-y-3 sm:space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Personal Information */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-[#05190E] mb-1">
                        <FaUser className="inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EBC17D]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#05190E] mb-1">
                        <FaEnvelope className="inline mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EBC17D]"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#05190E] mb-1">
                        <FaPhone className="inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EBC17D]"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  {/* Event Details - Calendar made more compact */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-[#05190E] mb-1">
                        <FaCalendar className="inline mr-2" />
                        Event Date *
                      </label>
                      <DatePicker
                        selected={formData.eventDate}
                        onChange={(date: Date) => setFormData({ ...formData, eventDate: date })}
                        minDate={new Date()}
                        filterDate={date => !isDateBlocked(date)}
                        dateFormat="EEEE, MMMM d, yyyy"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EBC17D]"
                        placeholderText="Select date"
                        required
                        inline
                        calendarClassName="booking-calendar !w-full sm:!w-[280px]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#05190E] mb-1">
                        Event Type *
                      </label>
                      <select
                        name="eventType"
                        required
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EBC17D]"
                      >
                        <option value="">Select Event Type</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Corporate">Corporate Event</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Social">Social Gathering</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#05190E] mb-1">
                        <FaUsers className="inline mr-2" />
                        Expected Guest Count *
                      </label>
                      <input
                        type="number"
                        name="guestCount"
                        required
                        min="1"
                        max="130"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EBC17D]"
                        placeholder="Number of guests (1-130)"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Notes - More compact */}
                <div>
                  <label className="block text-sm font-medium text-[#05190E] mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EBC17D]"
                    rows={3}
                    placeholder="Any special requirements?"
                  />
                </div>

                {/* Submit Buttons - More compact */}
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm border border-[#05190E] text-[#05190E] rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-[#05190E] text-white rounded-lg hover:bg-[#C08329]"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookingModal; 