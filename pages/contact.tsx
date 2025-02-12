import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    guestCount: '',
    message: '',
  });
  const [eventDate, setEventDate] = useState<Date | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, eventDate });
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      guestCount: '',
      message: '',
    });
    setEventDate(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4E8D9] to-[#FFFFFF] pt-16 md:pt-20">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#05190E] mb-2 md:mb-3">Contact Us</h1>
        <p className="text-[#C08329] text-base md:text-lg">Let's create something extraordinary together</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#05190E] mb-8">Event Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[#05190E] font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#05190E] font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-[#05190E] font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                  />
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-[#05190E] font-medium mb-2">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                  >
                    <option value="">Select Event Type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="birthday">Birthday</option>
                    <option value="social">Social Gathering</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventDate" className="block text-[#05190E] font-medium mb-2">
                    Preferred Date *
                  </label>
                  <DatePicker
                    selected={eventDate}
                    onChange={(date: Date | null) => setEventDate(date)}
                    minDate={new Date()}
                    placeholderText="Select a date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                    dateFormat="MMMM d, yyyy"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="guestCount" className="block text-[#05190E] font-medium mb-2">
                    Expected Guest Count *
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    min="1"
                    max="200"
                    required
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                  />
                </div>
              </div>

              <div className="flex-grow">
                <label htmlFor="message" className="block text-[#05190E] font-medium mb-2">
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={8}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#05190E] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#C08329] transition-colors"
              >
                Submit Inquiry
              </button>
            </form>
          </motion.div>

          {/* Right Column: Contact Info and Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 flex flex-col"
          >
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex-1">
              <h2 className="text-2xl font-bold text-[#05190E] mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="text-2xl text-[#C08329] mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#05190E]">Location</h3>
                    <p className="text-[#C08329]">
                      100 Ironside Crescent Unit 7<br />
                      Scarborough, ON M1X 1M9
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaPhone className="text-2xl text-[#C08329] mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#05190E]">Phone</h3>
                    <p className="text-[#C08329]">+1 (647) 989-2753</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaEnvelope className="text-2xl text-[#C08329] mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#05190E]">Email</h3>
                    <p className="text-[#C08329]">locuseventsinc@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FaClock className="text-2xl text-[#C08329] mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#05190E]">Hours</h3>
                    <p className="text-[#C08329]">
                      Monday - Sunday<br />
                      9:00 AM - 1:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex-1">
              <h2 className="text-2xl font-bold text-[#05190E] mb-8">Location</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.3862903185454!2d-79.2758893!3d43.8219444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d6e8f9a4f4f7%3A0x1b1b2b2b2b2b2b2b!2s100%20Ironside%20Crescent%2C%20Scarborough%2C%20ON%20M1X%201M9!5e0!3m2!1sen!2sca!4v1620000000000!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 