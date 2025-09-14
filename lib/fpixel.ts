// In lib/fpixel.ts

declare global {
  interface Window {
    // Update the 'track' signature to include event ID options
    fbq: (...args: ['init', string] | ['track', string, object?] | ['track', string, object, { eventID: string }]) => void;
  }
}

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = () => {
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// --- FIX STARTS HERE ---
// Update the event function to accept the optional eventId
export const event = (name: string, options = {}, eventId?: string) => {
  if (window.fbq) {
    if (eventId) {
      window.fbq('track', name, options, { eventID: eventId });
    } else {
      window.fbq('track', name, options);
    }
  }
};
// --- FIX ENDS HERE ---