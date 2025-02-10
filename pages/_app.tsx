import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { BookingModalProvider } from '../contexts/BookingModalContext';
import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Fix for mobile viewport height
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  return (
    <BookingModalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BookingModalProvider>
  );
}

export default MyApp; 