import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendar, FaUsers, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Toaster, toast } from 'react-hot-toast';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate guest count
    const guestCount = parseInt(formData.guestCount);
    if (guestCount < 1 || guestCount > 200) {
      toast.error(
        <div className="font-medium">
          Guest count must be between 1 and 200
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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventDate: formatDateForForm(formData.eventDate),
          eventType: formData.eventType,
          guestCount: formData.guestCount,
          additionalNotes: formData.additionalNotes || 'No additional notes'
        })
      });

      if (response.ok) {
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

        // Show success toast
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
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
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
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-[#05190E] text-white p-4 sm:p-6 relative">
                <h2 className="text-xl sm:text-2xl font-bold">Book Your Event</h2>
                <p className="text-[#EBC17D] mt-2 text-sm sm:text-base">Fill in the details below to request a booking</p>
                <button
                  onClick={onClose}
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white/80 hover:text-white transition-colors"
                >
                  <FaTimes className="text-lg sm:text-xl" />
                </button>
              </div>

              {/* Form */}
              <form 
                onSubmit={handleSubmit}
                className="p-4 sm:p-6 space-y-4 sm:space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#05190E] mb-2">
                        <FaUser className="inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#05190E] mb-2">
                        <FaEnvelope className="inline mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#05190E] mb-2">
                        <FaPhone className="inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#05190E] mb-2">
                        <FaCalendar className="inline mr-2" />
                        Event Date *
                      </label>
                      <DatePicker
                        selected={formData.eventDate}
                        onChange={(date: Date) => setFormData({ ...formData, eventDate: date })}
                        minDate={new Date()}
                        dateFormat="EEEE, MMMM d, yyyy"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBC17D] cursor-pointer"
                        placeholderText="Click to select a date"
                        required
                        showPopperArrow={false}
                        popperClassName="booking-datepicker-popper"
                        calendarClassName="booking-datepicker"
                        popperPlacement="bottom-start"
                        fixedHeight
                        monthsShown={1}
                        shouldCloseOnSelect={true}
                        customInput={
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBC17D] cursor-pointer"
                            placeholder="Click to select a date"
                          />
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#05190E] mb-2">
                        Event Type *
                      </label>
                      <select
                        name="eventType"
                        required
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
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
                      <label className="block text-sm font-medium text-[#05190E] mb-2">
                        <FaUsers className="inline mr-2" />
                        Expected Guest Count *
                      </label>
                      <input
                        type="number"
                        name="guestCount"
                        required
                        min="1"
                        max="200"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                        placeholder="Number of guests (1-200)"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-[#05190E] mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                    rows={4}
                    placeholder="Any special requirements or questions?"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 border border-[#05190E] text-[#05190E] rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#05190E] text-white rounded-lg hover:bg-[#C08329] transition-colors"
                  >
                    Submit Booking Request
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