import React, { useState, useEffect, useRef, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import Image from 'next/image';
import * as fpixel from '../lib/fpixel';
import GoogleReviewPill from '@/components/GoogleReviewPill';

// --- TYPE DEFINITIONS ---
type FormData = {
  name: string;
  phone: string;
  email: string;
};

type QualificationFormProps = {
  onSubmit: (data: FormData) => void;
};

// --- EMBEDDED QUALIFICATION FORM COMPONENT ---
const QualificationForm: React.FC<QualificationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
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
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email format.';
    
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) newErrors.phone = 'Phone number must be 10 digits.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    } else {
      console.log('Validation failed', errors);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 text-gray-800">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Get Your Free Estimate
      </h2>
      <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="name" className="text-left block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
          <input type="text" name="name" id="name" value={formData.name} required className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-left block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
          <input type="email" name="email" id="email" value={formData.email} required className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="text-left block text-sm font-medium text-gray-700">Phone <span className="text-red-500">*</span></label>
          <input type="tel" name="phone" id="phone" value={formData.phone} required className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} maxLength={14} />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
        {/* <div>
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
                <div className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center mr-3 ${
                  formData.otherAreasToPaint.includes(area) ? 'bg-[#0F52BA] border-[#0F52BA]' : 'bg-white border-gray-400'
                }`}>
                  {formData.otherAreasToPaint.includes(area) && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-800 select-none">{area}</span>
              </div>
            ))}
          </div>
        </div> */}
        <div className="pt-4">
          <button type="submit" className="w-full bg-[#0F52BA] text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-800 transition-colors">Submit & Schedule</button>
        </div>
      </form>
    </div>
  );
};

// --- THE MAIN PAGE COMPONENT ---
const PaintingOfferPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [leadSource, setLeadSource] = useState('Organic Traffic');

  const pageContainerRef = useRef<HTMLDivElement>(null);
  const firstReviewRef = useRef<HTMLDivElement>(null);

  const location = router.query.location as string;
  const normalizedLocation = location ? location.toLowerCase() : '';
  const locationMap: { [key: string]: string } = {
    'vaughan': 'Vaughan',
    'markham': 'Markham',
    'richmond hill': 'Richmond Hill',
  };
  const properLocation = locationMap[normalizedLocation];
  const headerTitle = properLocation ? `${properLocation} Realtor\'s Trusted Painter` : 'Realtor\'s Trusted Painter';
  const subTextLocation = properLocation ? `${properLocation} realtors` : 'realtors';

  const reviews = useMemo(() => [
    { src: "/testimonialImages/testimonial-image-08.png", alt: "Google review for Atlas HomeServices", width: 800, height: 400 },
    { src: "/testimonialImages/testimonial-image-01.png", alt: "HomeStars review for Atlas HomeServices", width: 800, height: 400 },
    { src: "/testimonialImages/testimonial-image-02.png", alt: "HomeStars review for Atlas HomeServices", width: 800, height: 550 },
    { src: "/testimonialImages/testimonial-image-03.png", alt: "HomeStars review for Atlas HomeServices", width: 800, height: 420 },
    { src: "/testimonialImages/testimonial-image-04.png", alt: "HomeStars Review for Atlas HomeServices", width: 800, height: 500 },
    { src: "/testimonialImages/testimonial-image-05.png", alt: "HomeStars Review for Atlas HomeServices", width: 800, height: 450 },
    { src: "/testimonialImages/testimonial-image-06.png", alt: "Google Review for Atlas HomeServices", width: 800, height: 520 },
    { src: "/testimonialImages/testimonial-image-07.png", alt: "Google Review for Atlas HomeServices", width: 800, height: 410 }
  ], []);

  useEffect(() => {
    if (router.isReady) {
      const source = router.query.utm_source as string;
      if (source) {
        if (source.toLowerCase().includes('facebook')) setLeadSource('Facebook Ads');
        else if (source.toLowerCase().includes('google')) setLeadSource('Google Ads');
      }
    }
  }, [router.isReady, router.query]);
  
  useEffect(() => {
    const calculateGradient = () => {
      const pageContainer = pageContainerRef.current;
      const firstReview = firstReviewRef.current;
      if (!pageContainer || !firstReview) return;

      const firstReviewTop = firstReview.offsetTop;
      const firstReviewHeight = firstReview.clientHeight;
      const gradientMidpoint = firstReviewTop + (firstReviewHeight / 2);
      const gradientStart = gradientMidpoint - 125;
      const gradientEnd = gradientMidpoint + 125;
      
      pageContainer.style.setProperty('--gradient-start', `${gradientStart}px`);
      pageContainer.style.setProperty('--gradient-end', `${gradientEnd}px`);
    };

    calculateGradient();
    window.addEventListener('resize', calculateGradient);
    return () => window.removeEventListener('resize', calculateGradient);
  }, [reviews]);

  const handleFormSubmission = async (data: FormData) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'google_lead_form_submit',
      form_data: { lead_source: leadSource },
    });
    console.log('DataLayer event pushed: google_lead_form_submit');

    fpixel.event('Lead');
    console.log("Meta Pixel 'Lead' event fired.");

    const submissionData = { ...data, leadSource };
    fetch('/api/send-email-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
    }).catch(error => console.error('Non-critical: Notification failed.', error));

    fetch('/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
    }).catch(error => console.error('Non-critical: Notion sync failed.', error));
    
    sessionStorage.setItem('canAccessThankYou', 'true');
    sessionStorage.setItem('leadDataForThankYou', JSON.stringify(data));
    router.push('/thank-you');
  };

  return (
    <>
      <Head>
        <title>Book a call with us - Atlas HomeServices</title>
        <meta name="description" content="Experience a seamless booking process for your next painting project. Atlas HomeServices guarantees quality and satisfaction." />
      </Head>

      <GoogleReviewPill 
        reviewLink="https://g.page/r/CXRbxbGzZYE3EBI/review" 
        rating={5} 
        reviewCount={5}
      />
      
      <div ref={pageContainerRef} className="flex flex-col items-center min-h-screen relative text-white pb-20 challenge-page-gradient">
        <div className="w-full px-4 sm:px-6 lg:px-6 py-8 sm:py-10 text-center z-10">
          <div className="space-y-2 md:space-y-8">
            <h1 className="mt-0 my-4 lg:mt-4 lg:my-12 text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto uppercase">
              {headerTitle}
            </h1>
            <p className="mt-3 text-2xl md:text-5xl text-white max-w-6xl mx-auto">
              Have your properties ready for listing in 72 hours.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 aspect-video bg-slate-800 shadow-2xl overflow-hidden border border-white">
                <Image
                  src="/paintingOfferImages/painting-offer-image-01.jpg"
                  alt="Beautifully painted interior by Atlas HomeServices - Image 1"
                  className="w-full h-full object-cover"
                  width={1600}
                  height={900}
                  priority
                />
              </div>
              <div className="flex-1 aspect-video bg-slate-800 shadow-2xl overflow-hidden border border-white">
                <Image
                  src="/paintingOfferImages/painting-offer-image-02.jpg"
                  alt="Beautifully painted interior by Atlas HomeServices - Image 2"
                  className="w-full h-full object-cover"
                  width={1600}
                  height={900}
                  priority
                />
              </div>
              <div className="flex-1 aspect-video bg-slate-800 shadow-2xl overflow-hidden border border-white">
                <Image
                  src="/paintingOfferImages/painting-offer-image-03.jpg"
                  alt="Beautifully painted interior by Atlas HomeServices - Image 3"
                  className="w-full h-full object-cover"
                  width={1600}
                  height={900}
                  priority
                />
              </div>
            </div>
            <p className="mt-3 text-lg md:text-3xl text-white max-w-5xl mx-auto text-center">
              It&apos;s a <strong><u>fixed price</u></strong>, <u>72-hour</u> ready-for-listing guaranteed painting for {subTextLocation}.
            </p>
            <div className="mt-8 md:mt-10 mx-auto w-full max-w-2xl">
              <QualificationForm onSubmit={handleFormSubmission} />
            </div>
          </div>
          
          <div className="pt-12 sm:pt-28 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-5xl mx-auto">
              What Our Happy Clients Say
            </h2>
            <div className="mt-12 mx-auto w-full max-w-3xl space-y-0">
              {reviews.map((review, index) => (
                <div 
                  key={index}
                  ref={index === 0 ? firstReviewRef : null} 
                  className="bg-black/10 rounded-lg shadow-2xl"
                >
                  <Image
                    src={review.src}
                    alt={review.alt}
                    className="w-full h-auto border-2 border-gray-400/50 rounded-md"
                    width={review.width}
                    height={review.height}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

PaintingOfferPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default PaintingOfferPage;