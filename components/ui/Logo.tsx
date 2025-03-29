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
          width={48}
          height={48}
          style={{ objectFit: 'contain', opacity: 1 }}
          onError={(e) => {
            console.error('Error loading logo:', e);
            setImageError(true);
          }}
        />
      ) : (
        <span className="text-white text-lg font-semibold">
          Atlas HomeServices
        </span>
      )}
    </div>
  );
}
