import { useState } from 'react';
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`flex items-center ${className}`}>
      {!imageError ? (
        <Image 
          src="/assets/logo.png"
          alt="Atlas HomeServices - Premium Residential & Commercial Painting"
          width={96}
          height={96}
          className="block object-contain leading-none m-0 p-0"
          onError={(e) => {
            console.error('Error loading logo:', e);
            setImageError(true);
          }}
        />
      ) : (
        <span className="text-[#D8C6A1] text-lg font-semibold leading-none">
          Atlas HomeServices
        </span>
      )}
    </div>
  );
}
