import { useState } from 'react';
import Image from "next/image";

export default function Logo() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center">
      <Image 
        src="/assets/logo.png"
        alt="Atlas HomeServices Logo" 
        className="h-12 w-12" 
        style={{ 
          objectFit: 'contain',
          opacity: 1
        }}
        onError={(e) => {
          console.error('Error loading logo:', e);
          setImageError(true);
        }}
      />
      {imageError && (
        <span className="text-white text-lg font-semibold">
          Atlas HomeServices
        </span>
      )}
    </div>
  );
}