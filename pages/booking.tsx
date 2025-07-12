import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import Image from 'next/image';

// --- TYPE DEFINITIONS ---
type FormData = {
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  otherAreasToPaint: string[];
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
};


// --- BANT FORM MODAL COMPONENT (MODIFIED) ---
const QualificationFormModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    postalCode: '',
    otherAreasToPaint: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const paintAreaOptions = ["Living Room", "Bedroom", "Kitchen", "Stairway", "Exterior", "Garage"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let processedValue = value;

    if (name === 'phone') {
        const cleaned = value.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
        if (match) {
            let formatted = '';
            if (match[1]) {
                formatted += `(${match[1]}`;
            }
            if (match[2]) {
                formatted += `) ${match[2]}`;
            }
            if (match[3]) {
                formatted += `-${match[3]}`;
            }
            processedValue = formatted;
        }
    } else if (name === 'postalCode') {
        const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        
        if (cleaned.length > 3) {
            processedValue = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`;
        } else {
            processedValue = cleaned;
        }
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleAreaSelection = (area: string) => {
    setFormData((prev) => {
      const currentAreas = prev.otherAreasToPaint;
      const newAreas = currentAreas.includes(area)
        ? currentAreas.filter((a) => a !== area)
        : [...currentAreas, area];
      return { ...prev, otherAreasToPaint: newAreas };
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const gtaPostalCodeRegex = /^(M\d[A-Z]|L[0-9][A-Z]) \d[A-Z]\d$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email format.';
    
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) newErrors.phone = 'Phone number must be 10 digits.';

    if (!formData.postalCode.trim()) {
        newErrors.postalCode = 'Postal code is required.';
    } else if (!gtaPostalCodeRegex.test(formData.postalCode)) {
        newErrors.postalCode = 'Please enter a valid GTA postal code (e.g., M5V 2T6 or L3T 3N7).';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    } else {
      console.log('Validation failed');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    // --- MODIFICATION: Changed modal alignment and scrolling behavior ---
    // - `items-start`: Aligns the form to the top instead of the center.
    // - `overflow-y-auto`: Makes the entire modal area scrollable if content is too long.
    // - `pt-12`: Adds padding to the top so the form isn't flush with the screen edge.
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start overflow-y-auto z-50 p-4 pt-12">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg text-gray-800 relative mb-8">
        <button  
          onClick={onClose}  
          className="absolute top-2 right-2 p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 transition-all"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 pl-2 pr-2">
          Just a Few Quick Questions
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
          {/* Form Fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
            <input type="text" name="name" id="name" value={formData.name} required className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
            <input type="email" name="email" id="email" value={formData.email} required className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone <span className="text-red-500">*</span></label>
            <input type="tel" name="phone" id="phone" value={formData.phone} required className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} maxLength={14}/>
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code <span className="text-red-500">*</span></label>
            <input type="text" name="postalCode" id="postalCode" value={formData.postalCode} required className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} maxLength={7} />
            {errors.postalCode && <p className="mt-1 text-xs text-red-600">{errors.postalCode}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Do you plan to paint other areas in your house?</label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {paintAreaOptions.map((area) => (
                    <div
                        key={area}
                        onClick={() => handleAreaSelection(area)}
                        className="flex items-center p-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
                    >
                        {/* Custom Checkbox */}
                        <div className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center mr-3 ${
                            formData.otherAreasToPaint.includes(area)
                                ? 'bg-[#0F52BA] border-[#0F52BA]'
                                : 'bg-white border-gray-400'
                        }`}>
                            {/* Checkmark Icon */}
                            {formData.otherAreasToPaint.includes(area) && (
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        {/* Label */}
                        <span className="text-gray-800 select-none">{area}</span>
                    </div>
                ))}
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button type="submit" className="w-full bg-[#0F52BA] text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-800 transition-colors">Submit & Schedule</button>
            <button type="button" onClick={onClose} className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-300 transition-colors">Cancel</button>
          </div>

          {/* --- MODIFICATION: Scroll Down Indicator for mobile --- */}
          <div className="text-center pt-4 md:hidden">
              <svg className="w-8 h-8 text-gray-300 mx-auto animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- REMAINDER OF THE FILE (UNCHANGED) ---

// --- THE MAIN PAGE COMPONENT ---
const BookNowPage: NextPageWithLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  
  const [leadSource, setLeadSource] = useState('Organic Traffic');

  useEffect(() => {
    if (router.isReady) {
      const source = router.query.utm_source as string;
      if (source) {
        if (source.toLowerCase().includes('facebook')) {
          setLeadSource('Facebook Ads');
        } else if (source.toLowerCase().includes('google')) {
          setLeadSource('Google Ads');
        }
      }
    }
  }, [router.isReady, router.query]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmission = async (data: FormData) => {
    fetch('/api/send-email-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        postalCode: data.postalCode,
        email: data.email,
        otherAreasToPaint: data.otherAreasToPaint.join(', ')
      }),
    }).catch(error => {
      console.error('Non-critical error: Instant notification failed to send.', error);
    });

    const submissionData = {
      ...data,
      leadSource: leadSource,
    };

    try {
      const response = await fetch('/api/add-lead-to-notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }
      
      console.log('Successfully added lead to Notion!');

      router.push({
        pathname: '/thank-you',
        query: { ...data },
      });

    } catch (error) {
      console.error('Failed to submit lead to Notion:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Book Your Premium Painting Service - Atlas HomeServices</title>
        <meta name="description" content="Experience a seamless booking process for your next painting project. Atlas HomeServices guarantees quality and satisfaction." />
      </Head>

      <QualificationFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmission}
      />
      
      {/* --- Page Content --- */}
      <div className="flex flex-col items-center min-h-screen relative text-white pb-20" style={{ background: 'linear-gradient(to bottom, #131628 0%, #131628 1070px, #e8e8e8 1520px, #e8e8e8 100%)' }}>
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-center z-10">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto">
              TRANSFORM YOUR HOME WITH US
            </h1>
            <p className="mt-3 text-2xl md:text-4xl text-white max-w-5xl mx-auto">
              Join our <strong><u>limited-time</u></strong> &quot;One Room Transformation&quot; Challenge.
            </p>
            <div className="mt-8 md:mt-10 mx-auto w-full max-w-2xl">
              <div className="aspect-video bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/atlas-hero-image.png"
                  alt="Beautifully painted interior by Atlas HomeServices"
                  className="w-full h-full object-cover"
                  width={800}
                  height={400}
                  priority
                />
              </div>
            </div>
            <p className="mt-8 md:mt-10 text-2xl md:text-3xl text-slate-300 max-w-5xl mx-auto leading-relaxed">
              It&apos;s a flawless painting process with <strong><u>MONEY BACK</u></strong> guarantee.
            </p>
            <p className="mt-3 text-3xl md:text-4xl text-white max-w-5xl mx-auto">
              Only <strong><u>4 SPOTS</u></strong> left for July.
            </p>
            <div className="mt-10 md:mt-12">
              <button type="button" onClick={handleOpenModal} className="inline-block px-24 py-4 sm:px-26 sm:py-8 text-2xl sm:text-4xl font-bold text-center bg-[#0F52BA] text-white rounded-full transition-all duration-300">
                I&apos;M READY TO TRANSFORM
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


BookNowPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default BookNowPage;
