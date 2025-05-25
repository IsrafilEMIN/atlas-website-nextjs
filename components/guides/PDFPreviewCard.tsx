// components/guides/PDFPreviewCard.tsx
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Assuming you have this
import { PdfGuide } from '@/types'; // Or import from where you defined it

interface PDFPreviewCardProps {
  guide: PdfGuide;
  onDownloadClick: () => void;
}

const PDFPreviewCard: React.FC<PDFPreviewCardProps> = ({ guide, onDownloadClick }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden flex flex-col bg-white">
      <div className="relative w-full h-64"> {/* This container needs to be relative */}
        <Image
          src={guide.coverImage || '/images/placeholder-cover.jpg'} // Example fallback
          alt={guide.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {/* === MODIFIED "IT'S FREE" BANNER START === */}
        <div 
          className="absolute top-3 right-0 bg-red-600 text-white font-size:10px font-weight:bolder px-3 py-1 rounded-l-full rounded-r-none shadow-md"
        >
          It&apos;s Free
        </div>
        {/* === MODIFIED "IT'S FREE" BANNER END === */}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-6 text-gray-800 text-center">{guide.title}</h3>
        <Button 
          onClick={onDownloadClick} 
          className="w-full mt-auto rounded-full text-white bg-[#0F52BA] hover:bg-[#0F52BA] transition-colors py-3 text-base"
        >
          Download This Guide
        </Button>
      </div>
    </div>
  );
};

export default PDFPreviewCard;