import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHeart, FaHistory, FaHandshake, FaGem } from 'react-icons/fa';
import Link from 'next/link';

const generateTimeline = () => {
  const startDate = new Date(2024, 8); // September 2024
  const currentDate = new Date();
  const months = [];
  let currentMonth = new Date(startDate);

  while (currentMonth <= currentDate) {
    const monthYear = currentMonth.toLocaleString('default', { month: 'short', year: 'numeric' });
    
    // Define milestones based on the month
    let milestone = {
      year: monthYear,
      title: "",
      description: ""
    };

    switch(monthYear) {
      case "Sep 2024":
        milestone.title = "Grand Opening";
        milestone.description = "Locus Venue officially opens its doors in Scarborough, introducing a new standard for event spaces.";
        break;
      case "Oct 2024":
        milestone.title = "First Wedding";
        milestone.description = "Successfully hosted our first wedding celebration, marking the beginning of countless love stories.";
        break;
      case "Nov 2024":
        milestone.title = "Corporate Launch";
        milestone.description = "Introduced specialized corporate event packages and state-of-the-art conference facilities.";
        break;
      case "Dec 2024":
        milestone.title = "Holiday Season";
        milestone.description = "Hosted multiple end-of-year celebrations and launched our signature winter wonderland decor.";
        break;
      default:
        if (currentMonth.getTime() === currentDate.getTime()) {
          milestone.year = "Present";
          milestone.title = "Growing Strong";
          milestone.description = "Continuing to create extraordinary moments and exceed expectations.";
        } else {
          currentMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
          continue;
        }
    }
    months.push(milestone);
    currentMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
  }
  return months;
};

const AboutPage = () => {
  const values = [
    {
      icon: <FaHeart />,
      title: "Passion",
      description: "We pour our hearts into every event, ensuring each detail is perfect."
    },
    {
      icon: <FaHistory />,
      title: "Experience",
      description: "Years of expertise in creating memorable celebrations."
    },
    {
      icon: <FaHandshake />,
      title: "Trust",
      description: "Building lasting relationships with our clients and partners."
    },
    {
      icon: <FaGem />,
      title: "Excellence",
      description: "Committed to delivering premium quality in every aspect."
    }
  ];

  const timeline = generateTimeline();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4E8D9] to-white pt-20">
      {/* Header Section */}
      <section className="bg-[#F4E8D9] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-[#05190E]">
              Welcome to Locus
            </h1>
            <p className="text-lg md:text-xl text-[#C08329] max-w-2xl mx-auto">
              A premier event venue where memories are crafted with elegance and style
            </p>
            <div className="w-24 h-1 bg-[#EBC17D] mx-auto mt-6"></div>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[80vh] bg-[#05190E] overflow-hidden"
      >
        {/* Background Image with Parallax Effect */}
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            scale: 1.1,
            transition: { duration: 10, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          <Image
            src="/images/main6.png"
            alt="Venue Interior"
            fill
            className="object-cover opacity-40"
            priority
          />
        </motion.div>

        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05190E]/80 via-transparent to-[#05190E]/80" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#EBC17D]/20 rounded-full" />
            <div className="absolute bottom-20 right-10 w-40 h-40 border-2 border-[#EBC17D]/20 rounded-full" />
            <div className="absolute top-40 right-20 w-24 h-24 border-2 border-[#EBC17D]/20 rounded-full" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Main Title with Highlight Effect */}
              <div className="relative inline-block">
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold text-white mb-4"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Our Story
                </motion.h1>
                <motion.div
                  className="absolute -inset-1 bg-[#EBC17D]/20 rounded-lg blur-lg"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              {/* Animated Text Lines */}
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl text-[#EBC17D] max-w-2xl mx-auto font-light"
                >
                  Creating unforgettable moments and bringing dreams to life since 2024
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl text-white/80 max-w-3xl mx-auto font-light"
                >
                  Where every celebration becomes an extraordinary experience
                </motion.div>
              </div>

              {/* Animated Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center space-x-12 mt-12"
              >
                {[
                  { number: "100+", label: "Events Hosted" },
                  { number: "500+", label: "Happy Clients" },
                  { number: "5⭐", label: "Rating" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.1 }}
                    className="text-center"
                  >
                    <motion.div
                      className="text-3xl font-bold text-[#EBC17D]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-white/80 text-sm mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-[#EBC17D] text-sm">Scroll Down</div>
          <div className="w-1 h-8 bg-[#EBC17D]/30 mx-auto mt-2 rounded-full">
            <motion.div
              className="w-full h-1/2 bg-[#EBC17D] rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-[#05190E] mb-16"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                }}
                className="bg-white rounded-xl p-8 text-center shadow-lg
                          transform transition-all duration-300
                          hover:shadow-2xl hover:bg-gradient-to-br hover:from-white hover:to-[#F4E8D9]"
              >
                <div className="text-4xl text-[#C08329] mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-[#05190E] mb-3">{value.title}</h3>
                <p className="text-[#C08329]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-[#05190E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-white mb-16"
          >
            Our Journey
          </motion.h2>
          <div className="relative">
            {/* Timeline Line - Hidden on mobile */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#EBC17D] hidden md:block" />
            
            {/* Timeline Items */}
            <div className="space-y-8 md:space-y-20">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-full md:w-1/2 px-4 md:px-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-6 rounded-xl shadow-lg"
                    >
                      <h3 className="text-2xl font-bold text-[#05190E] mb-2">{item.title}</h3>
                      <p className="text-[#C08329]">{item.description}</p>
                    </motion.div>
                  </div>
                  <div className="my-4 md:my-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-14 h-14 rounded-full bg-[#EBC17D] flex items-center justify-center
                                text-[#05190E] font-bold border-4 border-white"
                    >
                      <span className="text-[10px] md:text-xs whitespace-nowrap">
                        {item.year}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F4E8D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#05190E] mb-4">Meet Our Founders</h2>
            <p className="text-[#C08329] text-lg max-w-3xl mx-auto">
              Bringing expertise in sales, customer relations, and event management to ensure your event exceeds expectations
            </p>
            <div className="w-24 h-1 bg-[#EBC17D] mx-auto mt-8"></div>
          </motion.div>

          {/* Founders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-0">
            {/* Ryan Wahab Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 cursor-pointer w-full"
            >
              <div className="relative h-[250px] sm:h-[300px] lg:h-80 overflow-hidden">
                <Image
                  src="/images/Ryan_Wahab.jpeg"
                  alt="Ryan Wahab"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05190E] via-[#05190E]/50 to-transparent 
                                group-hover:via-[#05190E]/60 transition-all duration-300" />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6 text-white transform"
                  initial={{ y: 0 }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-[#EBC17D] transition-colors duration-300">
                    Ryan Wahab
                  </h3>
                  <p className="text-[#EBC17D] text-sm sm:text-base mb-4">Director of Operations & Event Management</p>
                </motion.div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#05190E] mb-2">Ryan Wahab</h3>
                <p className="text-[#C08329] text-sm sm:text-base mb-4">Director of Operations & Event Management</p>
                <p className="text-[#05190E] text-sm sm:text-base mb-6">
                  With a strong background in event management and operations, Ryan brings exceptional 
                  organizational skills and attention to detail to every event. His dedication to 
                  understanding operational needs and delivering flawless execution has earned him a 
                  reputation for excellence.
                </p>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#F4E8D9] rounded-lg p-4 text-center hover:bg-[#EBC17D] transition-colors duration-300"
                  >
                    <div className="text-[#05190E] font-bold mb-2">Expertise</div>
                    <div className="text-[#C08329] group-hover:text-[#05190E]">Event Operations</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#F4E8D9] rounded-lg p-4 text-center hover:bg-[#EBC17D] transition-colors duration-300"
                  >
                    <div className="text-[#05190E] font-bold mb-2">Focus</div>
                    <div className="text-[#C08329] group-hover:text-[#05190E]">Event Excellence</div>
                  </motion.div>
                </div>
                
                <div className="mt-6 overflow-hidden">
                  <motion.a
                    href="https://instagram.com/locus.venue"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full py-3 bg-[#05190E] text-white text-center rounded-lg 
                              hover:bg-[#C08329] transition-colors duration-300 transform 
                              group-hover:translate-y-0"
                  >
                    Connect with Ryan
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Ryan Noel Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 cursor-pointer w-full"
            >
              <div className="relative h-[250px] sm:h-[300px] lg:h-80 overflow-hidden">
                <Image
                  src="/images/Ryan_Noel.jpg"
                  alt="Ryan Noel"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05190E] via-[#05190E]/50 to-transparent 
                                group-hover:via-[#05190E]/60 transition-all duration-300" />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6 text-white transform"
                  initial={{ y: 0 }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-[#EBC17D] transition-colors duration-300">
                    Ryan Noel
                  </h3>
                  <p className="text-[#EBC17D] text-sm sm:text-base mb-4">Director of Sales & Customer Relations</p>
                </motion.div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#05190E] mb-2">Ryan Noel</h3>
                <p className="text-[#C08329] text-sm sm:text-base mb-4">Director of Sales & Customer Relations</p>
                <p className="text-[#05190E] text-sm sm:text-base mb-6">
                  With extensive experience in sales and customer relations, Ryan brings a unique blend of 
                  professionalism and personal touch to every client interaction. His dedication to 
                  understanding client needs and delivering exceptional service has earned him a 
                  reputation for excellence.
                </p>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#F4E8D9] rounded-lg p-4 text-center hover:bg-[#EBC17D] transition-colors duration-300"
                  >
                    <div className="text-[#05190E] font-bold mb-2">Expertise</div>
                    <div className="text-[#C08329] group-hover:text-[#05190E]">Sales & Relations</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#F4E8D9] rounded-lg p-4 text-center hover:bg-[#EBC17D] transition-colors duration-300"
                  >
                    <div className="text-[#05190E] font-bold mb-2">Focus</div>
                    <div className="text-[#C08329] group-hover:text-[#05190E]">Client Experience</div>
                  </motion.div>
                </div>
                
                <div className="mt-6 overflow-hidden">
                  <motion.a
                    href="https://instagram.com/locus.venue"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full py-3 bg-[#05190E] text-white text-center rounded-lg 
                              hover:bg-[#C08329] transition-colors duration-300 transform 
                              group-hover:translate-y-0"
                  >
                    Connect with Ryan
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold text-[#05190E] mb-4">
              Ready to Plan Your Event?
            </h3>
            <p className="text-[#C08329] mb-6">
              Connect with our team to bring your vision to life
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#05190E] text-white px-8 py-3 rounded-md
                        hover:bg-[#C08329] transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
