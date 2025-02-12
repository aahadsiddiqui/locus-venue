import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! How can I help you today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { text: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // If message contains calendar-related keywords, show DatePicker
    if (inputMessage.toLowerCase().includes('calendar') || 
        inputMessage.toLowerCase().includes('schedule') || 
        inputMessage.toLowerCase().includes('booking')) {
      setMessages(prev => [...prev, {
        text: "Please select your preferred date:",
        isUser: false
      }]);
      // Add DatePicker message
      setMessages(prev => [...prev, {
        text: `<div class="w-full">
          <div class="booking-datepicker-container"></div>
        </div>`,
        isUser: false
      }]);
      return;
    }

    // Regular form submission for other messages
    try {
      await fetch('https://formsubmit.co/ajax/locuseventsinc@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "New Chat Inquiry from Locus Website",
          message: inputMessage,
          timestamp: new Date().toLocaleString()
        })
      });

      setMessages(prev => [...prev, {
        text: "Thanks for your message! We'll get back to you soon.",
        isUser: false
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "Sorry, there was an error sending your message. Please try again.",
        isUser: false
      }]);
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot; 