// components/layout/TopStickyBanner.tsx
import Link from 'next/link';
import React from 'react';

// Define the height of the banner. This is important for the spacer.
// Increased from '45px' to '55px' to make it "wider" (taller).
// You can adjust this value further to your preference (e.g., '60px', '50px').
const BANNER_HEIGHT = '70px'; 

const TopStickyBanner: React.FC = () => {
  return (
    <>
      {/* The clickable, fixed banner */}
      <Link href="/booking" passHref legacyBehavior>
        <a
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: BANNER_HEIGHT, // Uses the updated height
            backgroundColor: '#0F52BA', 
            color: '#ffffff',           
            display: 'flex',
            alignItems: 'center',       // This will keep the text vertically centered
            justifyContent: 'center',
            zIndex: 1000,                
            textAlign: 'center',
            padding: '0 15px',           // Horizontal padding remains the same
            textDecoration: 'none',
            fontSize: '0.9rem',          
            fontWeight: '600',           
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
            cursor: 'pointer',
          }}
          className="transition-opacity duration-150" 
        >
          {/* Customize your CTA text below */}
          Book Your Project Today & Get a Special Discount! Click Here!
        </a>
      </Link>
      {/* Spacer div: This also uses the updated height to push content down correctly. */}
      <div style={{ height: BANNER_HEIGHT }} />
    </>
  );
};

export default TopStickyBanner;