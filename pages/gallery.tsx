import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaUsers, FaLightbulb, FaGlassCheers } from 'react-icons/fa';
import { useBookingModal } from '../contexts/BookingModalContext';

// Custom arrow components
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#05190E] bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all"
  >
    <FaArrowRight />
  </button>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#05190E] bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all"
  >
    <FaArrowLeft />
  </button>
);

const GalleryPage = () => {
  const { openBookingModal } = useBookingModal();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
  };

  const images = [
    { 
      src: '/images/main1.png', 
      alt: 'Main Hall',
      title: 'Grand Hall',
      description: 'Our stunning main hall perfect for large celebrations and corporate events'
    },
    { 
      src: '/images/main2.png', 
      alt: 'Cocktail Area',
      title: 'Cocktail Lounge',
      description: 'Elegant pre-function space ideal for cocktail hours and networking'
    },
    { 
      src: '/images/main3.png', 
      alt: 'Conference Setup',
      title: 'Conference Setup',
      description: 'Professional meeting space with state-of-the-art technology'
    },
    { 
      src: '/images/main4.png', 
      alt: 'Banquet Setup',
      title: 'Banquet Hall',
      description: 'Versatile space that adapts to your unique event needs'
    },
    { 
      src: '/images/main5.png', 
      alt: 'Wedding Setup',
      title: 'Wedding Venue',
      description: 'Romantic setting for your perfect wedding day'
    },
    { 
      src: '/images/main6.png', 
      alt: 'Private Event Space',
      title: 'Private Events',
      description: 'Intimate space for smaller gatherings and celebrations'
    },
    { 
      src: '/images/main7.png', 
      alt: 'Evening Setup',
      title: 'Evening Events',
      description: 'Sophisticated ambiance for evening functions'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4E8D9] to-[#FFFFFF] pt-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#05190E] overflow-hidden mb-16">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white z-10 px-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Explore Our Venue
            </h1>
            <p className="text-xl text-[#EBC17D]">
              Where Every Detail Matters
            </p>
          </motion.div>
        </div>
      </div>

      {/* Venue Description */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-[#05190E] mb-6">Welcome to Locus</h2>
          <p className="text-[#C08329] text-lg mb-8">
            Step into our sophisticated venue where every corner has been thoughtfully designed 
            to create the perfect backdrop for your special moments. From intimate gatherings 
            to grand celebrations, our spaces adapt to bring your vision to life.
          </p>
        </motion.div>
      </div>

      {/* Main Carousel with Descriptions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="relative">
                <div className="relative h-[600px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-xl"
                    priority={index === 0}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#05190E] bg-opacity-80 p-6 rounded-b-xl">
                    <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                    <p className="text-[#EBC17D]">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>

      {/* Venue Features */}
      <section className="py-16 bg-[#05190E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="text-white">
              <FaUsers className="text-4xl text-[#EBC17D] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Capacity</h3>
              <p className="text-[#F4E8D9]">Accommodating 20-130 guests comfortably</p>
            </div>
            <div className="text-white">
              <FaLightbulb className="text-4xl text-[#EBC17D] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Modern Amenities</h3>
              <p className="text-[#F4E8D9]">State-of-the-art lighting and sound systems</p>
            </div>
            <div className="text-white">
              <FaGlassCheers className="text-4xl text-[#EBC17D] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Full Service</h3>
              <p className="text-[#F4E8D9]">Complete event planning and catering available</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
      >
        <h2 className="text-3xl font-bold text-[#05190E] mb-4">
          Ready to Visit Our Venue?
        </h2>
        <p className="text-[#C08329] text-lg mb-8">
          Schedule a tour today and let us show you the perfect space for your next event.
        </p>
        <button 
          onClick={openBookingModal}
          className="bg-[#05190E] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#C08329] transition-colors"
        >
          Schedule a Tour
        </button>
      </motion.div>

      {/* Gallery items for mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <div className="relative h-[600px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-xl"
                priority={index === 0}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#05190E] bg-opacity-80 p-6 rounded-b-xl">
                <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                <p className="text-[#EBC17D]">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage; 