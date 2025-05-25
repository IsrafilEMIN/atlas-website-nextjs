// pages/guides.tsx
import React, { useState } from 'react';
import Head from 'next/head';
import PDFPreviewCard from '@/components/guides/PDFPreviewCard';
// Ensure this path is correct for your GuideDownloadModal
import GuideDownloadModal from '@/components/popup/GuideDownloadModal'; 
import { Button } from '@/components/ui/button';
import { PdfGuide, LeadFormData } from '@/types';

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

const GuidesPage: React.FC = () => {
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
        body: JSON.stringify({ ...formData, guides: guideDetails, downloadSource: 'GuidesPage' }),
      });
      const result = await response.json();
      if (response.ok) {
        return { success: true, message: result.message || 'Success! Please check your email for the download link(s).' };
      } else {
        return { success: false, message: result.message || 'An error occurred. Please try again.' };
      }
    } catch (error) {
      console.error('Submission error:', error);
      return { success: false, message: 'A network error occurred. Please try again later.' };
    }
  };

  return (
    <>
      <Head>
        <title>Free Painting Guides - Atlas HomeServices</title>
        <meta name="description" content="Download our expert guides for your next painting project. Tips on prep, color selection, and exterior painting." />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
          
          <div className="relative mb-10 md:mb-16"> 
            <div className="text-center md:max-w-2xl lg:max-w-3xl mx-auto"> 
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 sm:tracking-tight lg:text-4xl">
                <span className="text-[#0F52BA]">FREE</span> PAINTING GUIDES
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Get step-by-step instructions, expert tips, and color-theory insights to transform any space.
              </p>
            </div>

            {/* "Download All Guides" Button Block */}
            <div className="mt-6 text-center md:absolute md:top-0 md:right-0 md:mt-0"> 
              <Button 
                onClick={() => handleOpenModal(guidesData)} 
                size="lg"
                className="rounded-full px-8 bg-[#0F52BA] text-white hover:bg-[#0F52BA] transition-colors"
                // Consider adding a slightly darker hover: e.g., hover:bg-[#0D47A1]
              >
                Download All Guides
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {guidesData.map((guide) => (
              <PDFPreviewCard
                key={guide.id}
                guide={guide}
                onDownloadClick={() => handleOpenModal([guide])}
              />
            ))}
          </div>
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
    </>
  );
};

export default GuidesPage;