// components/guides/GuideDownloadModal.tsx (or components/popup/GuideDownloadModal.tsx)
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PdfGuide, LeadFormData } from '@/types'; // LeadFormData still expects a single 'phone' string

// Define an internal state type for the modal's form
interface ModalFormState {
  name: string;
  email: string;
  countryCode: string;
  nationalPhone: string; // For the part of the number after the country code
}

// countryCodeOptions array is no longer needed

interface GuideDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  guidesToDownload: PdfGuide[];
  onSubmitForm: (formData: LeadFormData) => Promise<{ success: boolean; message: string }>;
}

const GuideDownloadModal: React.FC<GuideDownloadModalProps> = ({
  isOpen,
  onClose,
  guidesToDownload,
  onSubmitForm,
}) => {
  const [formState, setFormState] = useState<ModalFormState>({
    name: '',
    email: '',
    countryCode: '+1', // Default to +1, user can change this text input
    nationalPhone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // HTMLSelectElement is removed
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (message && !isSuccess) {
      setMessage('');
    }
  };

  // Updated client-side phone validation for the national part and text-based country code
  const validatePhoneNumber = (countryCode: string, nationalNum: string): string | null => {
    const cc = countryCode.trim();
    const num = nationalNum.trim();

    if (!cc) {
        return "Country code is required.";
    }
    if (!cc.startsWith('+')) {
      return "Country code must start with a '+'. Example: +1";
    }
    // Basic regex for country code: starts with +, followed by 1 to 4 digits
    if (!/^\+[0-9]{1,4}$/.test(cc)) { 
      return "Invalid country code format. Use digits after '+', e.g., +1, +44.";
    }
    if (num.length === 0) {
      return "The main phone number part is required.";
    }
    
    const minNationalLength = 6; // General minimum, can be adjusted based on common patterns
    if (num.replace(/[\s-().]/g, '').length < minNationalLength) {
      return `The phone number part seems too short.`;
    }
    if (!/^[0-9\s-().]*$/.test(num)) { // Allows digits, spaces, -, (), . for national part
      return "Phone number (national part) contains invalid characters.";
    }
    
    const fullNumberForCheck = cc.replace(/\D/g, '') + num.replace(/\D/g, ''); // Digits only
    if (fullNumberForCheck.length < 8 || fullNumberForCheck.length > 15) { 
        return "The complete phone number (country code + number) seems to be an unusual length."
    }

    return null; // No error
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    const phoneValidationError = validatePhoneNumber(formState.countryCode, formState.nationalPhone);
    if (phoneValidationError) {
      setMessage(phoneValidationError);
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    
    let formattedCountryCode = formState.countryCode.trim();
    // Ensure country code starts with + and contains only digits after the +
    if (!formattedCountryCode.startsWith('+')) {
        formattedCountryCode = `+${formattedCountryCode.replace(/\D/g, '')}`;
    } else {
        // Keep the leading +, remove any other non-digits after it
        formattedCountryCode = `+${formattedCountryCode.substring(1).replace(/\D/g, '')}`;
    }
    const cleanedNationalPhone = formState.nationalPhone.replace(/\D/g, '');
    const fullPhoneNumber = formattedCountryCode + cleanedNationalPhone;

    const dataToSubmit: LeadFormData = {
        name: formState.name,
        email: formState.email,
        phone: fullPhoneNumber,
    };

    const result = await onSubmitForm(dataToSubmit);
    
    if (result.success) {
      setIsSuccess(true);
      setMessage("Thank you! Your guide(s) are on their way to your inbox. Happy painting!");
      setFormState({ name: '', email: '', countryCode: '+1', nationalPhone: '' }); 
    } else {
      setIsSuccess(false);
      setMessage(result.message || "An unknown error occurred.");
    }
    setIsSubmitting(false);
  };
  
  const handleCloseAndReset = () => {
    onClose();
    setMessage('');
    setIsSuccess(false);
    setFormState({ name: '', email: '', countryCode: '+1', nationalPhone: '' });
  };

  if (!isOpen) return null;

  // selectedCountry variable is no longer needed as we don't have a dropdown with example formats

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md relative transform transition-all duration-300 scale-100 opacity-100">
        <button onClick={handleCloseAndReset} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl" aria-label="Close modal">&times;</button>
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Download Your Guide{guidesToDownload.length > 1 ? 's' : ''}!</h2>
        
        {!isSuccess && (
          <>
            <p className="text-sm text-gray-600 mb-1">You&apos;re requesting:</p>
            <ul className="list-disc list-inside text-sm text-gray-700 font-medium mb-4 space-y-1 pl-1">
              {guidesToDownload.map(guide => (
                <li key={guide.id} className="break-words">{guide.title}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 mb-6">Please fill in your details below to receive the download link via email.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" name="email" id="email" value={formState.email} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              
              {/* MODIFIED: Phone number input with text box for country code */}
              <div>
                <label htmlFor="nationalPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="flex items-stretch space-x-2"> {/* items-stretch to make inputs same height if one has more padding due to text size */}
                  <input
                    type="text" // Changed from select
                    name="countryCode"
                    id="countryCode"
                    value={formState.countryCode}
                    onChange={handleChange}
                    required
                    // Adjusted styling for a text input: width, max-width, text-center
                    className="w-1/5 max-w-[70px] px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm text-center"
                    aria-label="Country Code"
                    placeholder="+1" // Initial value is +1, user can change
                  />
                  <input 
                    type="tel" 
                    name="nationalPhone" 
                    id="nationalPhone" 
                    value={formState.nationalPhone} 
                    onChange={handleChange} 
                    required 
                    placeholder="Phone number" // Placeholder for the national part
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" 
                  />
                </div>
              </div>
              {/* END OF MODIFIED Phone number input */}

              <Button type="submit" disabled={isSubmitting} className="w-full rounded-full text-black bg-[#F0AD45] hover:bg-[#F0AD45] transition-colors py-3 text-base">
                {isSubmitting ? 'Sending...' : 'Download'}
              </Button>
            </form>
          </>
        )}

        {message && (
          <div className={`text-center text-sm font-medium ${isSuccess ? 'text-green-700 mt-6' : 'text-red-600 mt-4'}`}>
            {message}
          </div>
        )}
        {isSuccess && (
           <Button 
            onClick={handleCloseAndReset} 
            variant="outline" 
            className="w-full mt-4 rounded-full py-3 text-base bg-[#F0AD45] hover:bg-[#F0AD45] transition-colors"
          >
             Close
           </Button>
         )}
      </div>
    </div>
  );
};

export default GuideDownloadModal;