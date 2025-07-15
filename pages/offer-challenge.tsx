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


// --- BANT FORM MODAL COMPONENT (UNCHANGED) ---
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
        </form>
      </div>
    </div>
  );
};


// --- THE MAIN PAGE COMPONENT ---
const OfferChallengePage: NextPageWithLayout = () => {
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

  // --- MODIFIED SUBMISSION HANDLER ---
  const handleFormSubmission = async (data: FormData) => {
    // 1. Instantly send the notification.
    fetch('/api/send-email-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        postalCode: data.postalCode,
        email: data.email,
      }),
    }).catch(error => {
      console.error('Non-critical error: Instant notification failed to send.', error);
    });

    // 2. Handle the primary action: saving the lead to Notion.
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

      // >>> CHANGE 1: Set a flag and the form data in session storage.
      sessionStorage.setItem('canAccessThankYou', 'true');
      sessionStorage.setItem('leadDataForThankYou', JSON.stringify(data));

      // >>> CHANGE 2: Redirect to a clean URL. The thank-you page will handle the rest.
      router.push('/thank-you');

    } catch (error) {
      console.error('Failed to submit lead to Notion:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Book a call with us - Atlas HomeServices</title>
        <meta name="description" content="Experience a seamless booking process for your next painting project. Atlas HomeServices guarantees quality and satisfaction." />
      </Head>

      <QualificationFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmission}
      />
      
      {/* --- Page Content (UNCHANGED) --- */}
      <div className="flex flex-col items-center min-h-screen relative text-white pb-20 challenge-page-gradient">
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-6 py-8 sm:py-10 text-center z-10">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto">
              TRANSFORM YOUR HOME
            </h1>
            <p className="mt-3 text-3xl md:text-4xl text-white max-w-5xl mx-auto">
              Do you need a painter but don&apos;t know <strong><u>who to trust</u></strong>? 
            </p>
            <p className="mt-3 text-3xl md:text-4xl text-white max-w-5xl mx-auto">
              Join our <u>limited-time</u> &quot;One Room Transformation&quot; Challenge:
            </p>
            <div className="mt-8 md:mt-10 mx-auto w-full max-w-2xl">
                <div className="aspect-video bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
                    <Image
                        src="/heroImages/atlas-hero-image.png"
                        alt="Beautifully painted interior by Atlas HomeServices"
                        className="w-full h-full object-cover"
                        width={1200}
                        height={600}
                        priority
                    />
                </div>
            </div>
            <p className="mt-3 text-2xl md:text-3xl text-white max-w-5xl text-left">
              - Before you commit to a big project, we paint your first room for <strong>$899.</strong> <br></br>  
              - If there&apos;s any issue, we <strong>refund</strong> the full amount. <br></br>
              - If you love it, we credit the <strong>$899</strong> to the next project.
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


OfferChallengePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default OfferChallengePage;