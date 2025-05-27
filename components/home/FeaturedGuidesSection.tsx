// components/home/FeaturedGuidesSection.tsx
import React, { useState } from 'react';
import PDFPreviewCard from '@/components/guides/PDFPreviewCard';
import GuideDownloadModal from '@/components/popup/GuideDownloadModal';
import { PdfGuide, LeadFormData } from '@/types';

// You can import the full guidesData or define a subset here
const guidesData: PdfGuide[] = [
  {
    id: 'full-paint-guide',
    title: 'COMPLETE PAINTING GUIDE',
    coverImage: '/guides/full-paint-guide-cover.png',
    fileName: '/guides/full-paint-guide.pdf',
  },
  {
    id: 'free-color-palette',
    title: 'COLOR PALETTE GUIDE',
    coverImage: '/guides/free-color-palette-cover.jpeg',
    fileName: '/guides/free-color-palette.pdf',
  },
  {
    id: 'diy-painting-checklist',
    title: 'DIY CHECKLIST',
    coverImage: '/guides/diy-painting-checklist-cover.jpeg',
    fileName: '/guides/diy-painting-checklist.pdf',
  },
];

interface FeaturedGuidesSectionProps {
  title?: string;
  subtitle?: string;
  backgroundColor?: string; // e.g., 'bg-white' or 'bg-gray-100'
}

const FeaturedGuidesSection: React.FC<FeaturedGuidesSectionProps> = ({
  subtitle = "Download our comprehensive guide to kickstart your home transformation. Pro tips, checklists, and more!",
  backgroundColor = "bg-gray-50", // Or choose a color that fits below your hero
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuidesForModal, setSelectedGuidesForModal] = useState<PdfGuide[]>([]);

  const handleOpenModal = (guidesToDownload: PdfGuide[]) => {
    setSelectedGuidesForModal(guidesToDownload);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGuidesForModal([]);
  };

  const handleModalFormSubmit = async (formData: LeadFormData): Promise<{ success: boolean; message: string}> => {
    const guideDetails = selectedGuidesForModal.map(guide => ({
      id: guide.id,
      title: guide.title,
      fileName: guide.fileName,
    }));

    try {
      const response = await fetch('/api/send-guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Add a source to distinguish homepage downloads if needed
        body: JSON.stringify({ ...formData, guides: guideDetails, downloadSource: 'HomePageGuides' }),
      });
      const result = await response.json();
      if (response.ok) {
        return { success: true, message: result.message || 'Success! Check your email for the download link(s).' };
      } else {
        return { success: false, message: result.message || 'An error occurred. Please try again.' };
      }
    } catch (error) {
      console.error('Submission error:', error);
      return { success: false, message: 'A network error occurred. Please try again later.' };
    }
  };

  return (
    <div className={`${backgroundColor} py-12 md:py-16`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 sm:tracking-tight">
          <span className="text-[#0F52BA]">FREE</span> PAINTING GUIDES
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* divider */}
        <div className="mt-8 h-px w-1/2 bg-[#162733] mx-auto" />

        {/* Display all guides from guidesData */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"> {/* Adjusted max-w if needed */}
          {guidesData.map((guide) => (
            <PDFPreviewCard
              key={guide.id}
              guide={guide}
              onDownloadClick={() => handleOpenModal([guide])} // Opens modal for the specific guide
            />
          ))}
        </div>
      </div>

      {isModalOpen && selectedGuidesForModal.length > 0 && (
        <GuideDownloadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          guidesToDownload={selectedGuidesForModal}
          onSubmitForm={handleModalFormSubmit}
        />
      )}
    </div>
  );
};

export default FeaturedGuidesSection;