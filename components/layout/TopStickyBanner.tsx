// components/layout/TopStickyBanner.tsx
import Link from 'next/link';
import React from 'react';

const BANNER_HEIGHT = '70px'; 

const TopStickyBanner: React.FC = () => {
  return (
    <>
      {/* The Link component itself now handles the styling and rendering of the anchor tag.
        We have removed `legacyBehavior`, `passHref`, and the inner `<a>` tag.
      */}
      <Link 
        href="/painting-offer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: BANNER_HEIGHT,
          backgroundColor: '#093373', 
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          textAlign: 'center',
          padding: '0 15px',
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: '600',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          cursor: 'pointer',
        }}
        className="transition-opacity duration-150" 
      >
        {/* Customize your CTA text below */}
        Book a Call For Your Free Estimate Today! Click Here to Get Started.
      </Link>
      
      {/* Spacer div remains the same */}
      <div style={{ height: BANNER_HEIGHT }} />
    </>
  );
};

export default TopStickyBanner;