// lib/fpixel.ts

// https://developers.facebook.com/docs/facebook-pixel/advanced/
// This is the type definition for the fbq function
declare global {
  interface Window {
    fbq: (...args: ['init', string] | ['track', string, object?]) => void;
  }
}

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

// Standard PageView event
export const pageview = () => {
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Custom event
// https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#custom-conversions
export const event = (name: string, options = {}) => {
  if (window.fbq) {
    window.fbq('track', name, options);
  }
};