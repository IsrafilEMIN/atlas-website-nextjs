// src/pages/estimator-landing.tsx
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
    countryCode: string;
    currentCondition: string;
};
type QualificationFormProps = {
    onSubmit: (data: FormData) => void;
};
const generateEventId = () => {
    return 'event-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
};
const QualificationForm: React.FC<QualificationFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+1',
        currentCondition: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [step, setStep] = useState(1);
    const [teaserText, setTeaserText] = useState('');
    const validateField = (name: keyof FormData, value: string) => {
        switch (name) {
            case 'firstName': return value.trim() ? '' : 'First name is required.';
            case 'lastName': return value.trim() ? '' : 'Last name is required.';
            case 'email': return /\S+@\S+\.\S+/.test(value) ? '' : 'Please enter a valid email format.';
            case 'phone': const phoneDigits = value.replace(/\D/g, ''); return phoneDigits.length === 10 ? '' : 'Phone number must be 10 digits.';
            case 'countryCode': return value ? '' : 'Country code is required.';
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
        if (name === 'currentCondition') {
            const highIntent = ['hire_now'];
            const midIntent = ['hire_1_month', 'hire_1_3_months'];
            const lowIntent = ['just_looking', 'budgeting_3_plus_months'];
            if (highIntent.includes(value)) {
                setTeaserText('Get Your Free Estimate & All The Perks');
            } else if (midIntent.includes(value)) {
                setTeaserText('Get A Quick Consultation & All The Perks');
            } else if (lowIntent.includes(value)) {
                setTeaserText('Get Your Free PDFs');
            } else {
                setTeaserText('');
            }
        }
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

    const options = [
        { value: 'hire_now', label: "ready to hire a painter NOW" },
        { value: 'hire_1_month', label: "planning to paint within 1 month" },
        { value: 'hire_1_3_months', label: "planning to paint in 1-3 months" },
        { value: 'budgeting_3_plus_months', label: "exploring for a future project (3+ months)" },
        { value: 'just_looking', label: "looking for color ideas" },
    ];

    const handleOptionClick = (value: string) => {
        handleChange({ target: { name: 'currentCondition', value } } as React.ChangeEvent<HTMLSelectElement>);
        setStep(2);
    };

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 text-gray-800">
            <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                {step === 1 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                            What is your current plan?
                        </h2>
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                                className="cursor-pointer p-4 border rounded-md shadow-sm hover:bg-blue-100 transition-colors"
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
                {step === 2 && (
                    <>
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                            {teaserText}
                        </h2>
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
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label htmlFor="countryCode" className="sr-only">Country Code</label>
                                    <select name="countryCode" id="countryCode" value={formData.countryCode} className={`block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.countryCode && touched.countryCode ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} onBlur={handleBlur}>
                                        <option value="+1">+1 (Canada/US)</option>
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+61">+61 (Australia)</option>
                                        <option value="+49">+49 (Germany)</option>
                                        <option value="+33">+33 (France)</option>
                                    </select>
                                    {errors.countryCode && touched.countryCode && <p className="mt-1 text-xs text-red-600">{errors.countryCode}</p>}
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="phone" className="sr-only">Phone</label>
                                    <input type="tel" name="phone" id="phone" placeholder="Phone Number *" value={formData.phone} required className={`block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} onBlur={handleBlur} maxLength={14} />
                                    {errors.phone && touched.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                                </div>
                            </div>
                        <div className="pt-2 flex justify-between">
                            <button type="button" onClick={() => setStep(1)} className="bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-full text-lg hover:bg-gray-400 transition-colors">Back</button>
                            <button type="submit" className="bg-[#093373] text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-800 transition-colors">Submit & Get Your Perks</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};
// --- THE MAIN PAGE COMPONENT ---
const EstimatorLandingPage: NextPageWithLayout = () => {
    const router = useRouter();
    const [utmSource, setUtmSource] = useState('');
    const [utmMedium, setUtmMedium] = useState('');
    const [utmCampaign, setUtmCampaign] = useState('');
    const [utmContent, setUtmContent] = useState('');
    const pageContainerRef = useRef<HTMLDivElement>(null);
    const firstReviewRef = useRef<HTMLDivElement>(null);
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
            const source = router.query.utm_source as string || '';
            const medium = router.query.utm_medium as string || '';
            const campaign = router.query.utm_campaign as string || '';
            const content = router.query.utm_content as string || '';
            setUtmSource(source);
            setUtmMedium(medium);
            setUtmCampaign(campaign);
            setUtmContent(content);
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
            form_data: { utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign, utm_content: utmContent },
        });
        const phoneDigits = data.phone.replace(/\D/g, '');
        const countryDigits = data.countryCode.replace(/\D/g, '');
        const fullPhoneDigits = countryDigits + phoneDigits;
        const advancedMatchingData = {
            em: data.email,       // Email
            ph: fullPhoneDigits, // Phone number (digits only, E.164 format without +)
            fn: data.firstName,   // First name
            ln: data.lastName,    // Last name
        };
        const eventId = generateEventId();
        fpixel.event('Lead', advancedMatchingData, eventId);
        const submissionData = {
            ...data,
            utmSource,
            utmMedium,
            utmCampaign,
            utmContent,
            cleanedPhone: fullPhoneDigits,
        };
      
        try {
            await fetch('/api/process-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });
      
            sessionStorage.setItem('leadDataForThankYou', JSON.stringify({ name: `${data.firstName} ${data.lastName}`, email: data.email, intent: data.currentCondition }));
            const userIntent = ['hire_now', 'hire_1_month', 'hire_1_3_months', 'budgeting_3_plus_months', 'just_looking'];
            if (userIntent.includes(data.currentCondition)) {
                sessionStorage.setItem('canAccessThankYou', 'true');
                router.push('/thank-you');
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
                <meta name="robots" content="noindex" />
            </Head>
            {/* <GoogleReviewPill
                reviewLink="https://g.page/r/CXRbxbGzZYE3EBI/review"
                rating={5}
                reviewCount={5}
            /> */}
           
            <div ref={pageContainerRef} className="flex flex-col items-center min-h-screen relative text-white pb-20 challenge-page-gradient">
                <div className="w-full px-4 sm:px-6 lg:px-6 py-8 sm:py-10 text-center z-10">
                    <div className="space-y-2 md:space-y-8">
                        <h1 className="lg:mb-10 text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white max-w-7xl mx-auto uppercase">
                            FREE TOOL: THE INSTANT PROJECT BUDGET PLANNER THAT HELPS YOU ESTIMATE YOUR COSTS
                        </h1>
                        {/* Enhanced Image Layout with Side Images and Arrows */}
                        <div className="relative max-w-3xl mx-auto hidden lg:block">
                            {/* Left Side Image - Desktop Only */}
                            <div className="hidden lg:block absolute -left-[32rem] top-0 w-96">
                                <h3 className="text-white text-xl font-bold mb-2">FREE DOWNLOAD: THE ROOM INSPIRATION COLOR COLLECTION</h3>
                                <div className="aspect-[6/5] overflow-hidden rounded-lg">
                                    <Image
                                        src="/paintingOfferImages/the-color-collection-cover.png"
                                        alt="Before transformation - Atlas HomeServices"
                                        className="w-full h-full object-cover"
                                        width={600}
                                        height={800}
                                        priority
                                    />
                                </div>
                                {/* Final Doodle Arrow SVG */}
                                <div className="absolute -right-32 top-1/3 transform -translate-y-1/2 z-10">
                                    <svg width="120" height="680" viewBox="0 0 120 660" fill="none" className="text-white drop-shadow-lg">
                                        <path
                                            d="M20 290 C60 340, 20 420, 55 430 C75 445, 70 475, 50 470 C30 465, 35 425, 60 440 C95 460, 80 550, 110 620 L100 614 M110 620 L115 612"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="none"
                                        />
                                        <text x="85" y="400" fill="currentColor" fontSize="14" fontWeight="bold" textAnchor="middle">
                                            Get it here!
                                        </text>
                                    </svg>
                                </div>
                            </div>
                            {/* Center Content */}
                            <div className="space-y-8">
                                {/* Wrapper to control image size */}
                                <div className="max-w-3xl mx-auto">
                                    {/* Main Center Image */}
                                    <div className="aspect-video overflow-hidden rounded-lg">
                                        <Image
                                            src="/paintingOfferImages/painting-landing-image-02.png"
                                            alt="Beautifully painted interior by Atlas HomeServices - Main Image"
                                            className="w-full h-full object-cover"
                                            width={1280}
                                            height={720}
                                            priority
                                        />
                                    </div>
                                </div>
                                {/* Form Section */}
                                <div className="w-full">
                                    <QualificationForm onSubmit={handleFormSubmission} />
                                </div>
                            </div>
                        </div>
                        {/* Mobile Single Image Version */}
                        <div className="block lg:hidden">
                            {/* Mobile Merged Side Images */}
                            <div className="gap-4">
                                <div>
                                    <h3 className="mt-6 text-yellow text-xl font-bold mb-2 text-center">+ FREE DOWNLOAD</h3>
                                    <h3 className="mt-2 text-white text-lg md:text-xl font-bold mb-2 text-center">The Room Inspiration Color Collection</h3>                                    <div className="overflow-hidden rounded-lg">
                                        <Image
                                            src="/paintingOfferImages/the-landing-page-image.png"
                                            alt="Before transformation - Atlas HomeServices"
                                             className="object-cover" 
                                            width={1000}
                                            height={1200}
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Mobile Form */}
                            <div className="w-full max-w-2xl mx-auto">
                                <QualificationForm onSubmit={handleFormSubmission} />
                            </div>
                        </div>
                        <div className="mt-12 max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">Here are the 9 &quot;plays&quot; you&apos;ll get access to</h2>
                        <p className="text-lg text-center mb-8">When you download the free playbook, you&apos;ll unlock 9 proven plays that help gyms pack their classes, boost profit, and keep members coming back.</p>
                        <ul className="space-y-4 text-left">
                            <li className="flex items-start">
                            <span className="mr-2 text-yellow-500 text-xl">✓</span>
                            <div>
                                <span className="font-bold">Reactivation Play:</span> Convert your old leads into paying members with this proven 3-day SMS/email sequence that you can copy and paste.
                            </div>
                            </li>
                            <li className="flex items-start">
                            <span className="mr-2 text-yellow-500 text-xl">✓</span>
                            <div>
                                <span className="font-bold">Warm Outreach:</span> Turn the 6 types of social followers and leads into booked appointments consistently.
                            </div>
                            </li>
                            <li className="flex items-start">
                            <span className="mr-2 text-yellow-500 text-xl">✓</span>
                            <div>
                                <span className="font-bold">Class Card Downsell:</span> What to offer prospects who say &quot;no&quot; so they still hand you $600+ instead of walking away empty-handed.
                            </div>
                            </li>
                            <li className="flex items-start">
                            <span className="mr-2 text-yellow-500 text-xl">✓</span>
                            <div>
                                <span className="font-bold">The Diamond Sale:</span> The most powerful &quot;psychological selling&quot; system that strategically uses a series of 4 offers to get more leads to buy higher-ticket packages.
                            </div>
                            </li>
                            <li className="flex items-start">
                            <span className="mr-2 text-yellow-500 text-xl">✓</span>
                            <div>
                                <span className="font-bold">Class Pack Bolt On:</span> The new way to sell &quot;unlimited memberships&quot; without actually selling unlimited access (this actually makes money).
                            </div>
                            </li>
                            <li className="flex items-start">
                            <span className="mr-2 text-yellow-500 text-xl">✓</span>
                            <div>
                                <span className="font-bold">The Whale Play:</span> A one-day play that you can run for your top members to get them to spend more and stay longer.
                            </div>
                            </li>
                            <li className="flex items-start">
                            <span className="mr-2 text-yellow-500 text-xl">✓</span>
                            <div>
                                <span className="font-bold">The Free Internal Play:</span> The 28-day challenge system that transforms your most disengaged members into your biggest advocates and referral sources.
                            </div>
                            </li>
                            <li className="flex items-start">
                            <span className="mr-2 text-yellow-500 text-xl">✓</span>
                            <div>
                                <span className="font-bold">The Referral Week Play:</span> How to get your existing members to WANT to refer their friends, family, and colleagues naturally.
                            </div>
                            </li>
                            <li className="flex items-start">
                            <span className="mr-2 text-yellow-500 text-xl">✓</span>
                            <div>
                                <span className="font-bold">Free Cash Fridays:</span> The 10-minute weekly ritual that builds an incredible culture with your members and gets referrals pouring in.
                            </div>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="w-full bg-[#131628] py-12 px-4">
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
EstimatorLandingPage.getLayout = function getLayout(page: React.ReactElement) {
    return <MinimalLayout>{page}</MinimalLayout>;
};
export default EstimatorLandingPage;