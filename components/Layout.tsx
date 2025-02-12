import React from 'react';
import Navbar from './Navbar';
import BookingModal from './BookingModal';
import AIChatbot from './AIChatbot';
import { useBookingModal } from '../contexts/BookingModalContext';
import { useRouter } from 'next/router';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isBookingModalOpen, closeBookingModal } = useBookingModal();
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={isHomePage ? '' : 'pt-20'}>
        {children}
      </main>
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
      />
      <AIChatbot />
      <footer className="bg-[#05190E] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <FaPhone className="mr-2 text-[#EBC17D]" />
                  <a href="tel:+16479892753" className="hover:text-[#EBC17D]">
                    +1 (647) 989-2753
                  </a>
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="mr-2 text-[#EBC17D]" />
                  <a href="mailto:locuseventsinc@gmail.com" className="hover:text-[#EBC17D]">
                    locuseventsinc@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 