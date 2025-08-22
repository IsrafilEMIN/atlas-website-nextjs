// pages/landing-price-calculator.tsx

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import Image from 'next/image';
import * as fpixel from '../lib/fpixel';

// --- TYPE DEFINITIONS ---
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentCondition: string;
};

type EmbeddedFormProps = {
  onSubmit: (data: FormData) => void;
};

// --- EMBEDDED FORM COMPONENT (No changes needed here) ---
const EmbeddedQualificationForm: React.FC<EmbeddedFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({ 
    firstName: '', 
    lastName: '',
    email: '', 
    phone: '', 
    currentCondition: '' 
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (name: keyof FormData, value: string) => {
    switch (name) {
      case 'firstName': return value.trim() ? '' : 'First name is required.';
      case 'lastName': return value.trim() ? '' : 'Last name is required.';
      case 'email': return /\S+@\S+\.\S+/.test(value) ? '' : 'Please enter a valid email format.';
      case 'phone': const phoneDigits = value.replace(/\D/g, ''); return phoneDigits.length === 10 ? '' : 'Phone number must be 10 digits.';
      case 'currentCondition': return value ? '' : 'Please select your current plan.';
      default: return '';
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    let processedValue = value;
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        let formatted = '';
        if (match[1]) formatted += `(${match[1]}`;
        if (match[2]) formatted += `) ${match[2]}`;
        if (match[3]) formatted += `-${match[3]}`;
        processedValue = formatted;
      }
    }
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    if (errors[name]) setErrors(prev => ({...prev, [name]: ''}));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    const newTouched: { [key: string]: boolean } = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
        newTouched[key] = true;
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched(newTouched);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 text-gray-800 shadow-2xl">
      <h3 className="text-xl md:text-2xl font-bold text-center mb-2">Get Your Free Estimate Now</h3>
      <p className="text-center text-gray-600 mb-6 text-sm">Enter your info for instant access to the tool.</p>
      <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="sr-only">First Name</label>
            <input type="text" name="firstName" id="firstName" placeholder="First Name *" value={formData.firstName} required className={`block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} onBlur={handleBlur} />
            {errors.firstName && touched.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="sr-only">Last Name</label>
            <input type="text" name="lastName" id="lastName" placeholder="Last Name *" value={formData.lastName} required className={`block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} onBlur={handleBlur} />
            {errors.lastName && touched.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input type="email" name="email" id="email" placeholder="Email Address *" value={formData.email} required className={`block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} onBlur={handleBlur} />
          {errors.email && touched.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Phone</label>
          <input type="tel" name="phone" id="phone" placeholder="Phone Number *" value={formData.phone} required className={`block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} onBlur={handleBlur} maxLength={14} />
          {errors.phone && touched.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="currentCondition" className="sr-only">Current Condition</label>
          <select name="currentCondition" id="currentCondition" value={formData.currentCondition} required className={`block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${formData.currentCondition === "" ? 'text-gray-500' : 'text-gray-900'} ${errors.currentCondition && touched.currentCondition ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} onBlur={handleBlur}>
            <option value="" disabled>What is your current plan? *</option>
            <option value="hire_now">I&apos;m planning to hire a painter now</option>
            <option value="hire_3_months">I&apos;m planning to paint within 3 months</option>
            <option value="diy">I am planning to DIY</option>
            <option value="budgeting">I&apos;m budgeting for a future project</option>
            <option value="contractor">I&apos;m a contractor</option>
          </select>
          {errors.currentCondition && touched.currentCondition && <p className="mt-1 text-xs text-red-600">{errors.currentCondition}</p>}
        </div>
        <div className="pt-2">
          <button type="submit" className="w-full bg-[#0F52BA] text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-800 transition-colors">Reveal My Price Range</button>
          <p className="text-xs text-gray-500 text-center mt-3">100% Free. We respect your privacy.</p>
        </div>
      </form>
    </div>
  );
};

// --- THE MAIN PAGE COMPONENT (LOGIC FIXED) ---
const HomeownersShieldPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [leadSource, setLeadSource] = useState('Organic Traffic');
  
  useEffect(() => {
    if (router.isReady) {
      const source = router.query.utm_source as string;
      if (source) {
        if (source.toLowerCase().includes('facebook')) setLeadSource('Facebook Ads');
        else if (source.toLowerCase().includes('google')) setLeadSource('Google Ads');
      }
    }
  }, [router.isReady, router.query]);

// pages/landing-price-calculator.tsx

const handleFormSubmission = async (data: FormData) => {
  console.log('--- Step 1: Form submission initiated ---', data);

  // Analytics events
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'tool_lead_form_submit',
      form_data: { lead_source: leadSource, user_intent: data.currentCondition },
    });
    console.log('--- Step 2: Google Analytics data pushed ---');
    
    fpixel.event('Lead');
    console.log('--- Step 3: Facebook Pixel event sent ---');

  } catch (analyticsError) {
    console.error('🛑 ERROR during analytics tracking:', analyticsError);
    // We don't stop execution for analytics errors, but we log them.
  }

  try {
    console.log('--- Step 4: Attempting to call /api/process-lead ---');
    const response = await fetch('/api/process-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, leadSource, tool: "Homeowner's Shield Estimator" })
    });
    
    console.log(`--- Step 5: API responded with status: ${response.status} ---`);

    if (!response.ok) {
      // This is a likely point of failure.
      console.error('🛑 ERROR: API call was not successful. Halting execution.', response);
      alert('There was an error submitting your information. Please try again.');
      return; 
    }

    console.log('--- Step 6: API call successful. Proceeding to redirect logic. ---');
    const highIntentConditions = ['hire_now', 'hire_3_months'];

    if (highIntentConditions.includes(data.currentCondition)) {
      console.log('--- Step 7: High-intent user detected. Redirecting to /consultation-price-calculator ---');
      sessionStorage.setItem('leadDataForThankYou', JSON.stringify({ name: `${data.firstName} ${data.lastName}`, email: data.email }));
      sessionStorage.setItem('canAccessThankYou', 'true');
      router.push('/consultation-price-calculator');
    } else {
      console.log('--- Step 7: Low-intent user detected. Redirecting to /thank-you-estimator ---');
      router.push('/thank-you-estimator');
    }
  } catch (error) {
    console.error('🛑 FATAL ERROR during form submission fetch:', error);
    alert('A network error occurred. Please check your connection and try again.');
  }
};

  return (
    <>
      <Head>
        <title>The Homeowner&apos;s Shield: Free Paint Cost Estimator - Richmond Hill</title>
        <meta name="description" content="Avoid overpaying for your next painting project in Richmond Hill. Get a free, transparent price estimate in 60 seconds and protect yourself from scams." />
      </Head>
      <div className="flex flex-col items-center min-h-screen relative bg-gray-900 text-white pb-20">
        <div className="w-full text-center bg-gradient-to-b from-gray-800 to-gray-900 py-16 px-4">
          <p className="font-semibold text-yellow-400 mb-4">TRUSTED BY HUNDREDS OF HOMEOWNERS</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase">THE HOMEOWNER&apos;S SHIELD</h1>
          <p className="mt-4 text-2xl md:text-4xl text-gray-300 max-w-4xl mx-auto">Get a Fair & Accurate Price Estimate For Your Richmond Hill Home In 60 Seconds.</p>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
            <div className="aspect-video bg-slate-800 shadow-2xl overflow-hidden border-2 border-white/50 rounded-lg">
              <Image src="/paintingOfferImages/painting-offer-image-01.jpg" alt="Demonstration of the free paint cost estimator tool" className="w-full h-full object-cover" width={1280} height={720} priority unoptimized />
            </div>
            <div className="w-full max-w-md mx-auto">
              <EmbeddedQualificationForm onSubmit={handleFormSubmission} />
            </div>
          </div>
        </div>
        <div className="w-full max-w-5xl mx-auto py-20 px-4 text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-12">WHAT THIS FREE TOOL UNLOCKS FOR YOU</h2>
            <div className="space-y-10 text-lg">
                <div className="flex items-start space-x-4">
                    <div className="text-2xl flex-shrink-0 text-yellow-400 mt-1">✓</div>
                    <div>
                        <h3 className="font-bold">Instantly Spot an Inflated Quote</h3>
                        <p className="text-gray-400">Get an unbiased price range based on local Richmond Hill data, so you know if a quote is fair, overpriced, or too good to be true.</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="text-2xl flex-shrink-0 text-yellow-400 mt-1">✓</div>
                    <div>
                        <h3 className="font-bold">Understand Material Costs</h3>
                        <p className="text-gray-400">We&apos;ll show you the typical costs for different paint qualities so you can have an intelligent conversation with your painter about your options.</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="text-2xl flex-shrink-0 text-yellow-400 mt-1">✓</div>
                    <div>
                        <h3 className="font-bold">Hire With 100% Confidence</h3>
                        <p className="text-gray-400">Stop guessing. Walk into any conversation knowing exactly what your project <em>should</em> cost and negotiate from a position of power.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

HomeownersShieldPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default HomeownersShieldPage;