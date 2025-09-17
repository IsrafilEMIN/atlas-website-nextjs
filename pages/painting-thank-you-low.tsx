// src/pages/painting-thank-you-low.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import Image from 'next/image';
import * as fpixel from '../lib/fpixel';

const generateEventId = () => {
    return 'event-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
};

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
    currentCondition: string;
};

type HireFormProps = {
    onSubmit: (data: FormData) => void;
};

const HireForm: React.FC<HireFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+1',
        currentCondition: 'hire_now'
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const validateField = (name: keyof FormData, value: string) => {
        switch (name) {
            case 'firstName': return value.trim() ? '' : 'First name is required.';
            case 'lastName': return value.trim() ? '' : 'Last name is required.';
            case 'email': return /\S+@\S+\.\S+/.test(value) ? '' : 'Please enter a valid email format.';
            case 'phone': const phoneDigits = value.replace(/\D/g, ''); return phoneDigits.length === 10 ? '' : 'Phone number must be 10 digits.';
            case 'countryCode': return value ? '' : 'Country code is required.';
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
            if (key !== 'currentCondition') {
                newTouched[key] = true;
                const error = validateField(key, formData[key]);
                if (error) newErrors[key] = error;
            }
        });
        setErrors(newErrors);
        setTouched(newTouched);
        if (Object.keys(newErrors).length === 0) {
            onSubmit(formData);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 text-gray-800">
            <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                    Get Your Free Estimate
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
                <div className="pt-2 flex justify-center">
                    <button type="submit" className="bg-[#093373] text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-800 transition-colors">Get Estimate</button>
                </div>
            </form>
        </div>
    );
};

const PaintingThankYouLow: NextPageWithLayout = () => {
    const router = useRouter();
    const [name, setName] = useState('Valued Customer');

    useEffect(() => {
        const canAccess = sessionStorage.getItem('canAccessThankYouLow');
        if (!canAccess) {
            router.push('/painting-landing');
            return;
        }

        const leadDataString = sessionStorage.getItem('leadDataForThankYou');
        if (leadDataString) {
            try {
                const leadData = JSON.parse(leadDataString);
                if (leadData.name) {
                    setName(leadData.name);
                }
            } catch (error) {
                console.error("Error parsing leadData from sessionStorage:", error);
            }
        }
    }, [router]);

    const handleHireSubmit = async (data: FormData) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'google_lead_form_submit',
            form_data: { utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '' },
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
            utmSource: 'thank_you_low',
            utmMedium: '',
            utmCampaign: '',
            utmContent: '',
            cleanedPhone: fullPhoneDigits,
        };
      
        try {
            await fetch('/api/process-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });
      
            sessionStorage.setItem('leadDataForThankYou', JSON.stringify({ name: `${data.firstName} ${data.lastName}`, email: data.email, intent: data.currentCondition }));
            sessionStorage.setItem('canAccessThankYouHigh', 'true');
            router.push('/painting-thank-you-high');
        } catch(error) {
           console.error("Form submission error:", error);
           alert("There was an error submitting your request. Please try again.");
        }
    };

    return (
        <>
            <Head>
                <title>Thank You - Atlas HomeServices</title>
                <meta name="description" content="Thank you for choosing Atlas HomeServices. We're excited to help with your painting project!" />
            </Head>
            <div className="flex flex-col items-center min-h-screen relative text-white pb-20 challenge-page-gradient">
                <div className="w-full px-4 sm:px-6 lg:px-6 py-8 sm:py-10 text-center z-10">
                    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
                        <h1 className="text-3xl md:text-7xl font-extrabold tracking-tight uppercase">Thank You<br></br> {name}</h1>
                        <p className="text-2xl md:text-4xl">Enjoy exploring ideas! Check back when you're ready to paint.</p>
                        <div className="flex justify-center">
                            <svg className="w-32 h-32 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-xl md:text-2xl font-semibold bg-white/10 p-4 rounded-lg shadow-md">Check your email for the Color Palette PDF.<br></br>⬇️ You can also access it below ⬇️</p>
                        <div className="flex flex-col space-y-4">
                            <a href="/color-palette.pdf" download className="bg-[#093373] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-800 transition-colors shadow-lg">Download Color Palette PDF</a>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold mt-8">If you're ready to paint, schedule now!</h2>
                        <div className="mt-4 max-w-2xl mx-auto">
                            <HireForm onSubmit={handleHireSubmit} />
                        </div>
                        <p className="text-xl md:text-2xl">We hope this inspires your future projects.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
                                <div className="flex-grow flex items-center justify-center mb-4">
                                    <Image
                                        src="/paintingOfferImages/painting-offer-image-01.jpg"
                                        alt="Beautiful painting result"
                                        width={400}
                                        height={250}
                                        className="rounded-lg object-contain max-h-full max-w-full"
                                        unoptimized
                                    />
                                </div>
                                <p className="text-lg font-bold">Stunning transformations await!</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
                                <div className="flex-grow flex items-center justify-center mb-4">
                                    <Image
                                        src="/paintingOfferImages/painting-offer-image-02.jpg"
                                        alt="Professional painters at work"
                                        width={400}
                                        height={250}
                                        className="rounded-lg object-contain max-h-full max-w-full"
                                        unoptimized
                                    />
                                </div>
                                <p className="text-lg font-bold">Expert craftsmanship guaranteed.</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
                                <div className="flex-grow flex items-center justify-center mb-4">
                                    <Image
                                        src="/testimonialImages/testimonial-image-01.png"
                                        alt="Happy customer review"
                                        width={400}
                                        height={250}
                                        className="rounded-lg object-contain max-h-full max-w-full"
                                        unoptimized
                                    />
                                </div>
                                <p className="text-lg font-bold">Join our delighted clients.</p>
                            </div>
                        </div>
                        <p className="text-lg mt-8">In the meantime, if you have any immediate questions, feel free to contact us at your convenience.</p>
                        <button 
                            onClick={() => router.push('/painting-landing?utm_source=thank_you_low')}
                            className="mt-6 bg-[#093373] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-800 transition-colors shadow-lg"
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
            `}</style>
        </>
    );
};

PaintingThankYouLow.getLayout = function getLayout(page: React.ReactElement) {
    return <MinimalLayout>{page}</MinimalLayout>;
};

export default PaintingThankYouLow;