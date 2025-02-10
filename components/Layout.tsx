import React from 'react';
import Navbar from './Navbar';
import BookingModal from './BookingModal';
import AIChatbot from './AIChatbot';
import { useBookingModal } from '../contexts/BookingModalContext';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isBookingModalOpen, closeBookingModal } = useBookingModal();
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <>
      <Navbar />
      <main className={isHomePage ? '' : 'pt-20'}>
        {children}
      </main>
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
      />
      <AIChatbot />
    </>
  );
};

export default Layout; 