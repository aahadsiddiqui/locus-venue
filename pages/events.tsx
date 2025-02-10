import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { FaGlassCheers, FaRing, FaBriefcase, FaBirthdayCake, FaHeart, FaMusic } from 'react-icons/fa';
import Link from 'next/link';
import { useBookingModal } from '../contexts/BookingModalContext';

// Add this CSS to your globals.css file
// ```css:styles/globals.css
// @keyframes marquee {
//   0% {
//     transform: translateX(100%);
//   }
//   100% {
//     transform: translateX(-100%);
//   }
// }
// 
// .marquee {
//   white-space: nowrap;
//   overflow: hidden;
//   display: inline-block;
//   animation: marquee 20s linear infinite;
// }
// ```

const EventsPage = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4E8D9] to-[#FFFFFF]">
      {/* Marquee Text */}
      <div className="bg-[#F4E8D9]">
        <Marquee
          speed={50}
          gradient={false}
          className="py-6"
        >
          <span className="text-[#05190E] text-6xl font-bold tracking-widest uppercase mx-4">
            Celebrate
          </span>
          <span className="text-[#05190E] text-6xl font-bold tracking-widest uppercase mx-4">
            •
          </span>
          <span className="text-[#05190E] text-6xl font-bold tracking-widest uppercase mx-4">
            Create
          </span>
          <span className="text-[#05190E] text-6xl font-bold tracking-widest uppercase mx-4">
            •
          </span>
          <span className="text-[#05190E] text-6xl font-bold tracking-widest uppercase mx-4">
            Remember
          </span>
          <span className="text-[#05190E] text-6xl font-bold tracking-widest uppercase mx-4">
            •
          </span>
          <span className="text-[#05190E] text-6xl font-bold tracking-widest uppercase mx-4">
            Experience
          </span>
          <span className="text-[#05190E] text-6xl font-bold tracking-widest uppercase mx-4">
            •
          </span>
        </Marquee>
      </div>

      {/* Hero Section with dark green background */}
      <div className="relative h-[40vh] bg-[#05190E] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white z-10 px-4"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Celebrate Every Moment
            </h1>
            <p className="text-xl text-[#EBC17D]">
              Your Vision, Our Expertise
            </p>
          </motion.div>
        </div>
      </div>

      {/* Rest of the content */}
      <div className="pt-20">
        {/* Event Categories */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-[#05190E] text-center mb-16"
            >
              Events We Host
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {eventTypes.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#05190E] text-white rounded-xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="text-[#EBC17D] text-4xl mb-6">
                    {event.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                  <p className="text-[#F4E8D9] leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services & Amenities */}
        <section className="py-16 bg-[#05190E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Event Services & Amenities
              </h2>
              <p className="text-[#EBC17D] text-lg">
                Everything you need for a perfect event
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-[#05190E] mb-4">
                    {service.title}
                  </h3>
                  <ul className="space-y-2 text-[#C08329]">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#F4E8D9] rounded-xl p-12 text-center"
            >
              <h2 className="text-3xl font-bold text-[#05190E] mb-6">
                Ready to Plan Your Event?
              </h2>
              <p className="text-[#C08329] text-lg mb-8 max-w-2xl mx-auto">
                Let our expert team help you create an unforgettable experience. 
                Contact us today to start planning your perfect event.
              </p>
              <button
                onClick={openBookingModal}
                className="inline-block bg-[#05190E] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#C08329] transition-colors"
              >
                Book Your Event
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

const eventTypes = [
  {
    icon: <FaRing />,
    title: "Weddings & Engagements",
    description: "Create magical moments in our elegant venue, perfect for ceremonies and receptions."
  },
  {
    icon: <FaBirthdayCake />,
    title: "Birthday Celebrations",
    description: "From intimate gatherings to grand parties, make every birthday special."
  },
  {
    icon: <FaBriefcase />,
    title: "Corporate Events",
    description: "Professional spaces for meetings, conferences, and team building events."
  },
  {
    icon: <FaHeart />,
    title: "Bridal Showers",
    description: "Elegant settings for memorable pre-wedding celebrations."
  },
  {
    icon: <FaGlassCheers />,
    title: "Social Gatherings",
    description: "Perfect for reunions, anniversaries, and special celebrations."
  },
  {
    icon: <FaMusic />,
    title: "Private Parties",
    description: "Versatile spaces for any celebration, customized to your needs."
  }
];

const services = [
  {
    title: "Venue Setup & Decor",
    items: [
      "Flexible floor plans",
      "Custom lighting design",
      "Decor consultation",
      "Setup and teardown service"
    ]
  },
  {
    title: "Catering & Beverages",
    items: [
      "Professional catering services",
      "Custom menu planning",
      "Bar service available",
      "Dietary accommodations"
    ]
  },
  {
    title: "Technical Amenities",
    items: [
      "State-of-the-art sound system",
      "Professional lighting",
      "Projection capabilities",
      "WiFi throughout venue"
    ]
  },
  {
    title: "Event Planning",
    items: [
      "Dedicated event coordinator",
      "Vendor recommendations",
      "Timeline planning",
      "On-site management"
    ]
  },
  {
    title: "Additional Services",
    items: [
      "Valet parking available",
      "Security services",
      "Coat check",
      "Photography areas"
    ]
  },
  {
    title: "Special Additions",
    items: [
      "Dance floor installation",
      "Stage setup",
      "Photo booth areas",
      "Custom signage"
    ]
  }
];

export default EventsPage; 