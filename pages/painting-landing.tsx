// src/pages/painting-landing.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import Image from 'next/image';
import * as fpixel from '../lib/fpixel';
// import GoogleReviewPill from '@/components/GoogleReviewPill';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    currentCondition: string;
};

type QualificationFormProps = {
    onSubmit: (data: FormData) => void;
};

const QualificationForm: React.FC<QualificationFormProps> = ({ onSubmit }) => {
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
        <div className="bg-white rounded-3xl p-6 md:p-8 text-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                Get Your Free Estimate
            </h2>
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
                    <button type="submit" className="w-full bg-[#093373] text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-800 transition-colors">Submit & Schedule</button>
                </div>
            </form>
        </div>
    );
};


// --- THE MAIN PAGE COMPONENT ---
const PaintingLandingPage: NextPageWithLayout = () => {
    const router = useRouter();
    const [leadSource, setLeadSource] = useState('Organic Traffic');
    const [platform] = useState('website');
    const pageContainerRef = useRef<HTMLDivElement>(null);
    const firstReviewRef = useRef<HTMLDivElement>(null);

    const headerTitle = 'Homeowner\'s Trusted Painter';

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
            const medium = router.query.utm_medium as string;
            if (source && medium) {
                if (source.toLowerCase().includes('facebook') && medium.toLocaleLowerCase().includes('ads')) setLeadSource('Facebook Ads');
                else if (source.toLowerCase().includes('google') && medium.toLocaleLowerCase().includes('ads')) setLeadSource('Google Ads');
                else if (source.toLowerCase().includes('facebook') && medium.toLocaleLowerCase().includes('organic')) setLeadSource('Facebook Organic');
                else if (source.toLowerCase().includes('google') && medium.toLocaleLowerCase().includes('organic')) setLeadSource('Google Organic');
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
            form_data: { platform: platform, lead_source: leadSource },
        });
        fpixel.event('Lead');

        const submissionData = { 
            ...data, 
            leadSource, 
            tool: "Painting Offer Page", 
            platform: platform,
        };
        
        try {
            await fetch('/api/process-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });
        
            sessionStorage.setItem('leadDataForThankYou', JSON.stringify({ name: `${data.firstName} ${data.lastName}`, email: data.email }));

            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'America/Toronto',
                hour: 'numeric',
                hour12: false
            });
            const hour = parseInt(formatter.format(now), 10);
            if (hour >= 8 && hour < 20) {
                sessionStorage.setItem('canAccessThankYou', 'false');
                router.push('/painting-thank-you');
            } else {
                sessionStorage.setItem('canAccessThankYou', 'true');
                router.push('/painting-consultation');
            }

        } catch(error) {
             console.error("Form submission error:", error);
            alert("There was an error submitting your request. Please try again.");
        }
    };

    return (
        <>
            <Head>
                <title>Book a call with us - Atlas HomeServices</title>
                <meta name="description" content="Experience a seamless booking process for your next painting project. Atlas HomeServices guarantees quality and satisfaction." />
            </Head>

            {/* <GoogleReviewPill 
                reviewLink="https://g.page/r/CXRbxbGzZYE3EBI/review" 
                rating={5} 
                reviewCount={5}
            /> */}
            
            <div ref={pageContainerRef} className="flex flex-col items-center min-h-screen relative text-white pb-20 challenge-page-gradient">
                <div className="w-full px-4 sm:px-6 lg:px-6 py-8 sm:py-10 text-center z-10">
                    <div className="space-y-2 md:space-y-8">
                        <h1 className="mt-0 my-4 lg:mt-4 lg:my-12 text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto uppercase">
                            {headerTitle}
                        </h1>
                        <p className="mt-3 text-2xl md:text-5xl text-white max-w-6xl mx-auto">
                            Experience a truly <strong><u>hassle-free</u></strong> painting service.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                            <div className="flex-1 aspect-video bg-slate-800 shadow-2xl overflow-hidden border border-white">
                                <Image
                                    src="/paintingOfferImages/painting-offer-image-03.png"
                                    alt="Beautifully painted interior by Atlas HomeServices - Image 1"
                                    className="w-full h-full object-cover"
                                    width={1280}
                                    height={720}
                                    priority
                                />
                            </div>
                            <div className="flex-1 aspect-video bg-slate-800 shadow-2xl overflow-hidden border border-white">
                                <Image
                                    src="/paintingOfferImages/painting-offer-image-04.png"
                                    alt="Beautifully painted interior by Atlas HomeServices - Image 2"
                                    className="w-full h-full object-cover"
                                    width={1280}
                                    height={720}
                                    priority
                                />
                            </div>
                        </div>
                        <div className="mt-8 md:mt-10 mx-auto w-full max-w-2xl">
                            <QualificationForm onSubmit={handleFormSubmission} />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                            <div className="flex-1 aspect-video bg-slate-800 shadow-2xl overflow-hidden border border-white">
                                <Image
                                    src="/paintingOfferImages/painting-offer-image-05.jpeg"
                                    alt="Beautifully painted interior by Atlas HomeServices - Image 1"
                                    className="w-full h-full object-cover"
                                    width={1280}
                                    height={720}
                                    priority
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                            <div className="flex-1 aspect-video bg-slate-800 shadow-2xl overflow-hidden border border-white">
                                <Image
                                    src="/paintingOfferImages/painting-offer-image-06.png"
                                    alt="Beautifully painted interior by Atlas HomeServices - Image 1"
                                    className="w-full h-full object-cover"
                                    width={1280}
                                    height={720}
                                    priority
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                            <div className="flex-1 aspect-video bg-slate-800 shadow-2xl overflow-hidden border border-white">
                                <Image
                                    src="/paintingOfferImages/painting-offer-image-01.jpg"
                                    alt="Beautifully painted interior by Atlas HomeServices - Image 1"
                                    className="w-full h-full object-cover"
                                    width={1280}
                                    height={720}
                                    priority
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                            <div className="flex-1 aspect-video bg-slate-800 shadow-2xl overflow-hidden border border-white">
                                <Image
                                    src="/paintingOfferImages/painting-offer-image-02.jpg"
                                    alt="Beautifully painted interior by Atlas HomeServices - Image 1"
                                    className="w-full h-full object-cover"
                                    width={1280}
                                    height={720}
                                    priority
                                />
                            </div>
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
            <footer className="w-full bg-gray-900 py-12 px-4">
              <div className="max-w-4xl mx-auto text-center">
                
                <Image src="/assets/Header - Atlas HomeServices Transparent-White.png" alt="Company Logo" width={300} height={100} className="mx-auto mb-4" unoptimized />

                <div className="space-y-4 text-md text-gray-400">
                  <p>
                    This website is NOT endorsed by YouTube, Google or Facebook in any way. FACEBOOK is a trademark of FACEBOOK Inc. YOUTUBE is a trademark of GOOGLE Inc.
                  </p>
                  <p>
                    Individual experiences presented here may not be typical. Their background, education, effort, and application affected their experience. The information shared here are for example purposes and not a guarantee of a rate of return or a specific result. Your results may vary.
                  </p>
                  <p className="pt-4 text-gray-500">
                    © {new Date().getFullYear()} Atlas HomeServices Inc. | Richmond Hill, ON. All Rights Reserved.
                  </p>
                </div>
              </div>
            </footer>
        </>
    );
};

PaintingLandingPage.getLayout = function getLayout(page: React.ReactElement) {
    return <MinimalLayout>{page}</MinimalLayout>;
};

export default PaintingLandingPage;