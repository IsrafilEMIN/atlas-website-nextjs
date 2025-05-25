// components/LeadMagnetPopup.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';

// Define the shape of your form data
interface FormData {
  name: string;
  email: string;
  phone: string; // Now required in the form logic
}

// Define props for the LeadMagnetPopup component
interface LeadMagnetPopupProps {
  forceOpenTrigger: boolean; // New prop to explicitly open the popup
  onForceOpenTriggered: () => void; // New callback to acknowledge trigger
}

const LeadMagnetPopup: React.FC<LeadMagnetPopupProps> = ({ forceOpenTrigger, onForceOpenTriggered }) => {
  console.log('[LeadMagnetPopup] Props received. forceOpenTrigger:', forceOpenTrigger, 'Type of onForceOpenTriggered:', typeof onForceOpenTriggered);

  // State to control popup visibility
  const [isOpen, setIsOpen] = useState(false);
  // State for form data
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '' });
  // State for submission status and messages
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for messages displayed in the popup (e.g., success/error)
  const [message, setMessage] = useState('');
  // State to indicate if submission was successful
  const [isSuccess, setIsSuccess] = useState(false);

  // Ref to store the latest value of isOpen to use in event listeners
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
    console.log('[LeadMagnetPopup] isOpen state updated to:', isOpen); // Log isOpen changes
  }, [isOpen]);

  // Function to close the modal and set a cookie to prevent immediate re-showing
  const closeModal = useCallback(() => {
    console.log('[LeadMagnetPopup] closeModal called.');
    setIsOpen(false);
    // Set a cookie to hide the popup for 7 days (or adjust duration as needed)
    document.cookie = 'leadMagnetShown=true; max-age=' + 60 * 60 * 24 * 7 + '; path=/';
  }, []);

  // Effect to handle closing the modal via Escape key or clicking outside
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpenRef.current) { // Use ref for latest isOpen state
        console.log('[LeadMagnetPopup] Escape key pressed, closing modal.');
        closeModal();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpenRef.current && event.target instanceof HTMLElement && !event.target.closest('.lead-magnet-popup-content')) {
        console.log('[LeadMagnetPopup] Outside click detected, closing modal.');
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeModal]);

  // Handle changes in form input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[LeadMagnetPopup] Form submission started.');
    setIsSubmitting(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await fetch('/api/send-lead-magnet-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('[LeadMagnetPopup] Form submission successful.');
        setIsSuccess(true);
        setMessage('Success! Check your email for the guide.');
        setTimeout(closeModal, 3000);
      } else {
        console.warn('[LeadMagnetPopup] Form submission failed on server.', data);
        setMessage(data.error || 'Something went wrong. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('[LeadMagnetPopup] Form submission error (client-side):', error);
      setMessage('An error occurred. Please try again later.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Trigger Logic ---

  // 1. Trigger: On Page Load (after a delay)
  useEffect(() => {
    const hasBeenShown = document.cookie.includes('leadMagnetShown=true');
    console.log('[LeadMagnetPopup] Page load trigger check. hasBeenShown:', hasBeenShown);
    if (hasBeenShown) return;

    const timer = setTimeout(() => {
      console.log('[LeadMagnetPopup] Page load timer triggered popup.');
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // 2. Trigger: On Scroll Depth
  useEffect(() => {
    const hasBeenShown = document.cookie.includes('leadMagnetShown=true');
    // console.log('[LeadMagnetPopup] Scroll trigger check. hasBeenShown:', hasBeenShown); // Can be noisy
    if (hasBeenShown) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

      if (scrollPercentage > 30 && !isOpenRef.current) {
        console.log('[LeadMagnetPopup] Scroll depth triggered popup.');
        setIsOpen(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    if (!isOpenRef.current) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // 3. Trigger: On Exit Intent (Commented out in original, keeping it so)
  /*
  useEffect(() => {
    // ...
  }, []);
  */

  // NEW: Effect to force open the popup via the `forceOpenTrigger` prop
  useEffect(() => {
    console.log('[LeadMagnetPopup] forceOpenTrigger effect running. forceOpenTrigger:', forceOpenTrigger);
    if (forceOpenTrigger) {
      console.log('[LeadMagnetPopup] forceOpenTrigger is true, setting isOpen to true.');
      setIsOpen(true);
      console.log('[LeadMagnetPopup] Calling onForceOpenTriggered.');
      onForceOpenTriggered(); // Acknowledge the trigger
    }
  }, [forceOpenTrigger, onForceOpenTriggered]);


  if (!isOpen) {
    // console.log('[LeadMagnetPopup] isOpen is false, rendering null.'); // Can be noisy
    return null;
  }

  console.log('[LeadMagnetPopup] isOpen is true, rendering popup.');
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="lead-magnet-popup-content bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">WAIT! Don't Miss This Free Guide!</h3>
          <p className="text-gray-600">Discover how to avoid costly painting mistakes & find a trustworthy painter.</p>
          <img
            src="/images/lead-magnet-cover.jpg"
            alt="Free Homeowner's Guide Cover"
            className="w-48 mx-auto my-4 rounded shadow-md"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (Required)"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Download Your FREE Guide Now!'}
          </button>
          {message && (
            <p className={`text-center mt-2 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>
        <p className="text-center text-gray-500 text-xs mt-4">
          We respect your privacy and will never share your information.
        </p>
      </div>
    </div>
  );
};

export default LeadMagnetPopup;