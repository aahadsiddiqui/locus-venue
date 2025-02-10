import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useBookingModal } from '../contexts/BookingModalContext';

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { openBookingModal } = useBookingModal();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed w-full bg-[#05190E] text-white z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Locus Logo"
                  width={100}
                  height={35}
                  className="h-auto w-auto sm:w-[120px]"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-lg hover:text-[#EBC17D] transition-colors ${
                    router.pathname === item.path ? 'text-[#EBC17D]' : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={openBookingModal}
                className="bg-[#EBC17D] text-[#05190E] px-6 py-2 rounded-md font-semibold hover:bg-[#C08329] transition-colors"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FaTimes className="h-5 w-5" />
                ) : (
                  <FaBars className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-16 sm:top-20 left-0 right-0 bg-[#05190E] md:hidden overflow-hidden z-50"
      >
        <div className="px-4 py-2 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block py-2 text-lg ${
                router.pathname === item.path ? 'text-[#EBC17D]' : 'text-white'
              } hover:text-[#EBC17D] transition-colors`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              openBookingModal();
            }}
            className="block w-full text-center bg-[#EBC17D] text-[#05190E] px-6 py-2 rounded-md font-semibold hover:bg-[#C08329] transition-colors"
          >
            Book Now
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar; 