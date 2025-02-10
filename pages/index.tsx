import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCalendar, FaGlassCheers, FaUsers, FaClock, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import WhyChooseUs from '../components/WhyChooseUs';
import { useBookingModal } from '../contexts/BookingModalContext';

const HomePage = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video */}
      <div className="relative h-screen">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src="/videos/locusvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-white">
              Create Unforgettable Moments
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white">
              Your Premier Event Destination in Scarborough
            </p>
            <button 
              onClick={openBookingModal}
              className="bg-[#EBC17D] text-[#05190E] px-6 sm:px-8 py-2 sm:py-3 rounded-md text-base sm:text-lg font-semibold hover:bg-[#C08329] transition-colors"
            >
              Book Your Event
            </button>
          </motion.div>
        </div>
      </div>

      {/* Event Types Section */}
      <section className="py-20 bg-[#F4E8D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-[#05190E] text-center mb-16"
          >
            Perfect for Every Occasion
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventTypes.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="text-[#EBC17D] text-4xl mb-4">
                  {event.icon}
                </div>
                <h3 className="text-2xl font-semibold text-[#05190E] mb-3">
                  {event.title}
                </h3>
                <p className="text-[#C08329]">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <WhyChooseUs />

      {/* Feature Cards (similar to About page) */}
      <section className="py-20 bg-gradient-to-b from-[#F4E8D9] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#05190E] text-white rounded-xl p-8 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <FaStar className="mx-auto text-4xl text-[#EBC17D] mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Premium Experience</h3>
              <p className="text-[#F4E8D9]">
                Elevate your events with our state-of-the-art facilities and exceptional service
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#05190E] text-white rounded-xl p-8 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <FaMapMarkerAlt className="mx-auto text-4xl text-[#EBC17D] mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Prime Location</h3>
              <p className="text-[#F4E8D9]">
                100 Ironside Crescent Unit 7
                <br />
                Scarborough, ON M1X 1M9
              </p>
              <a 
                href="https://maps.google.com/?q=100+Ironside+Crescent+Unit+7,+Scarborough,+ON+M1X+1M9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EBC17D] hover:text-[#F4E8D9] mt-2 inline-block"
              >
                Get Directions →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#05190E] text-white rounded-xl p-8 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <FaClock className="mx-auto text-4xl text-[#EBC17D] mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Business Hours</h3>
              <p className="text-[#F4E8D9]">
                Monday - Sunday
                <br />
                9:00 AM - 1:00 AM
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Event Types Data
const eventTypes = [
  {
    icon: <FaGlassCheers />,
    title: "Social Events",
    description: "Perfect for birthdays, anniversaries, and celebrations of all kinds."
  },
  {
    icon: <FaUsers />,
    title: "Corporate Events",
    description: "Ideal for conferences, meetings, team building, and business gatherings."
  },
  {
    icon: <FaCalendar />,
    title: "Special Occasions",
    description: "Weddings, engagement parties, and other milestone celebrations."
  }
];

// Features Data
const features = [
  {
    icon: <FaUsers />,
    title: "Flexible Capacity",
    description: "Accommodate 20-200 guests comfortably"
  },
  {
    icon: <FaGlassCheers />,
    title: "Full Service",
    description: "Catering and event planning support"
  },
  {
    icon: <FaStar />,
    title: "Premium Amenities",
    description: "State-of-the-art audio and lighting"
  },
  {
    icon: <FaCalendar />,
    title: "Easy Booking",
    description: "Simple online reservation system"
  }
];

export default HomePage; 