import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useBookingModal } from '../contexts/BookingModalContext';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! How can I help you today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { openBookingModal } = useBookingModal();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    phone: ''
  });
  const [currentStep, setCurrentStep] = useState<'initial' | 'name' | 'email' | 'phone' | 'complete'>('initial');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { text: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Handle the conversation flow
    if (currentStep === 'initial') {
      if (inputMessage.toLowerCase().includes('book') || 
          inputMessage.toLowerCase().includes('reserve') || 
          inputMessage.toLowerCase().includes('schedule')) {
        setCurrentStep('name');
        setMessages(prev => [...prev, {
          text: "Great! Let's get started with your booking. What's your full name?",
          isUser: false
        }]);
      } else {
        // Handle other inquiries using Formspree
        try {
          const formData = new FormData();
          formData.append('message', inputMessage);
          formData.append('timestamp', new Date().toLocaleString());
          formData.append('type', 'chat_inquiry');

          const response = await fetch('https://formspree.io/f/xldneeyz', {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            setMessages(prev => [...prev, {
              text: "Thanks for your message! We'll get back to you soon. Would you like to make a booking?",
              isUser: false
            }]);
          } else {
            throw new Error('Failed to send message');
          }
        } catch (error) {
          setMessages(prev => [...prev, {
            text: "Sorry, there was an error sending your message. Please try again.",
            isUser: false
          }]);
        }
      }
    } else if (currentStep === 'name') {
      setUserInfo(prev => ({ ...prev, name: inputMessage }));
      setCurrentStep('email');
      setMessages(prev => [...prev, {
        text: `Nice to meet you, ${inputMessage}! What's your email address?`,
        isUser: false
      }]);
    } else if (currentStep === 'email') {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputMessage)) {
        setMessages(prev => [...prev, {
          text: "Please enter a valid email address.",
          isUser: false
        }]);
        return;
      }
      setUserInfo(prev => ({ ...prev, email: inputMessage }));
      setCurrentStep('phone');
      setMessages(prev => [...prev, {
        text: "And what's your phone number?",
        isUser: false
      }]);
    } else if (currentStep === 'phone') {
      // Basic phone validation
      const phoneRegex = /^[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(inputMessage)) {
        setMessages(prev => [...prev, {
          text: "Please enter a valid phone number.",
          isUser: false
        }]);
        return;
      }
      setUserInfo(prev => ({ ...prev, phone: inputMessage }));
      setCurrentStep('complete');
      setMessages(prev => [...prev, {
        text: "Perfect! I have all your information. Would you like to proceed with selecting a date for your event?",
        isUser: false
      }]);
    } else if (currentStep === 'complete') {
      if (inputMessage.toLowerCase().includes('yes') || 
          inputMessage.toLowerCase().includes('sure') || 
          inputMessage.toLowerCase().includes('okay')) {
        // Submit booking request to Formspree
        try {
          const formData = new FormData();
          formData.append('name', userInfo.name);
          formData.append('email', userInfo.email);
          formData.append('phone', userInfo.phone);
          formData.append('type', 'booking_request');
          formData.append('timestamp', new Date().toLocaleString());

          const response = await fetch('https://formspree.io/f/xldneeyz', {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            // Close chat and open booking modal with pre-filled information
            setIsOpen(false);
            openBookingModal();
          } else {
            throw new Error('Failed to submit booking request');
          }
        } catch (error) {
          setMessages(prev => [...prev, {
            text: "Sorry, there was an error submitting your booking request. Please try again or contact us directly.",
            isUser: false
          }]);
        }
      } else {
        setMessages(prev => [...prev, {
          text: "No problem! You can always come back to book later. Is there anything else I can help you with?",
          isUser: false
        }]);
        setCurrentStep('initial');
      }
    }
  };

  // Add this CSS to match the BookingModal styles
  const datePickerStyles = `
    .booking-datepicker-container .react-datepicker {
      font-family: inherit;
      border: 1px solid #EBC17D;
      border-radius: 0.5rem;
    }
    .booking-datepicker-container .react-datepicker__header {
      background-color: #05190E;
      color: white;
      border-bottom: 1px solid #EBC17D;
    }
    .booking-datepicker-container .react-datepicker__current-month {
      color: white;
    }
    .booking-datepicker-container .react-datepicker__day-name {
      color: #EBC17D;
    }
    .booking-datepicker-container .react-datepicker__day--selected {
      background-color: #05190E;
      color: white;
    }
    .booking-datepicker-container .react-datepicker__day:hover {
      background-color: #EBC17D;
    }
  `;

  return (
    <>
      <style>{datePickerStyles}</style>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-[#05190E] text-white p-4 rounded-full shadow-lg hover:bg-[#C08329] transition-colors z-50"
        aria-label="Open chat"
      >
        <FaComments className="text-2xl" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl z-50"
          >
            {/* Header */}
            <div className="bg-[#05190E] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-bold">Locus Chat Support</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-[#05190E] text-white'
                        : 'bg-[#F4E8D9] text-[#05190E]'
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  />
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBC17D]"
                />
                <button
                  type="submit"
                  className="bg-[#05190E] text-white p-2 rounded-lg hover:bg-[#C08329] transition-colors"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
            {/* Book Now Button */}
            <div className="p-4 border-t flex justify-center">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openBookingModal();
                }}
                className="w-full bg-[#EBC17D] text-[#05190E] px-6 py-2 rounded-md font-semibold hover:bg-[#C08329] transition-colors"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot; 