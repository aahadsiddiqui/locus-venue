import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaGlassCheers, FaStar, FaCalendarCheck } from 'react-icons/fa';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhyChooseUs: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Flexible Capacity",
      description: "Accommodate 20-130 guests comfortably",
    },
    {
      icon: <FaGlassCheers className="text-4xl" />,
      title: "Full Service",
      description: "Catering and event planning support",
    },
    {
      icon: <FaStar className="text-4xl" />,
      title: "Premium Amenities",
      description: "State-of-the-art audio and lighting",
    },
    {
      icon: <FaCalendarCheck className="text-4xl" />,
      title: "Easy Booking",
      description: "Simple online reservation system",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-[#05190E] mb-12"
        >
          Why Choose Locus
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl p-6 text-center transform transition-all duration-300
                        border-2 border-[#EBC17D] hover:border-[#05190E]
                        hover:bg-gradient-to-b hover:from-white hover:to-[#F4E8D9]"
            >
              <div className="text-[#C08329] mb-4 flex justify-center items-center
                            w-16 h-16 mx-auto rounded-full bg-[#F4E8D9]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#05190E] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#C08329]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 