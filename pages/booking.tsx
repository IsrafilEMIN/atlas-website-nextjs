import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MinimalLayout from '@/components/layout/MinimalLayout';
import type { NextPageWithLayout } from '@/pages/_app';

// --- NEW: Define a type for your form's data structure ---
type FormData = {
  name: string;
  phone: string;
  email: string;
  area: string;
  timeline: string;
};

// --- NEW: Define a type for the Modal's props ---
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
};


// --- BANT FORM MODAL COMPONENT (NOW WITH TYPES) ---
const QualificationFormModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    area: '',
    timeline: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email format.';
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) newErrors.phone = 'Phone number must be 10 digits.';
    if (!formData.area) newErrors.area = 'Please select your area.';
    if (!formData.timeline) newErrors.timeline = 'Please select a timeline.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data Submitted:', formData);
      onSubmit(formData);
    } else {
      console.log('Validation failed');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg text-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Just a Few Quick Questions
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" id="name" required className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" id="email" required className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" name="phone" id="phone" required className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange} />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">Are you a homeowner in the area below?</label>
            <select name="area" id="area" required className={`mt-1 block w-full px-3 py-2 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.area ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange}>
              <option value="">Please select an area</option>
              <option value="Richmond Hill">Richmond Hill</option>
              <option value="Vaughan">Vaughan</option>
              <option value="Markham">Markham</option>
              <option value="Aurora">Aurora</option>
              <option value="Newmarket">Newmarket</option>
            </select>
            {errors.area && <p className="mt-1 text-xs text-red-600">{errors.area}</p>}
          </div>
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">How fast do you need it to be done?</label>
            <select name="timeline" id="timeline" required className={`mt-1 block w-full px-3 py-2 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.timeline ? 'border-red-500' : 'border-gray-300'}`} onChange={handleChange}>
              <option value="">Please select a timeline</option>
              <option value="asap">As soon as possible</option>
              <option value="within-month">Within the next month</option>
              <option value="1-3-months">1-3 months</option>
              <option value="just-Browse">I&apos;m just getting a quote</option>
            </select>
            {errors.timeline && <p className="mt-1 text-xs text-red-600">{errors.timeline}</p>}
          </div>
          <div className="pt-4 flex justify-between items-center">
            <button type="submit" className="w-full bg-[#0F52BA] text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-800 transition-colors">Submit & Schedule</button>
            <button type="button" onClick={onClose} className="ml-4 text-sm text-gray-600 hover:underline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// The rest of your file is unchanged
const BookNowPage: NextPageWithLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleCloseModal = () => setIsModalOpen(false);
  
  const redirectToSchedulePage = (data: FormData) => {
    router.push({
      pathname: '/thank-you',
      query: data,
    });
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
        onSubmit={redirectToSchedulePage}
      />
      
      <div className="flex flex-col items-center min-h-screen relative text-white pb-20" style={{ background: 'linear-gradient(to bottom, #131628 0%, #131628 1070px, #e8e8e8 1520px, #e8e8e8 100%)' }}>
        {/* The rest of your page JSX can be pasted here */}
      </div>
    </>
  );
};


BookNowPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default BookNowPage;