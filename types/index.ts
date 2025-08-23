// types/index.ts (or at the top of pages/guides.tsx)
export interface PdfGuide {
  id: string;
  title: string;
  coverImage: string; // Path to cover image, e.g., '/images/guide-covers/guide1.jpg'
  fileName: string;   // Actual PDF filename, e.g., 'painting-tips-guide.pdf'
  downloadUrl?: string; // Optional: direct download URL if not constructed from fileName
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
}

// Defines the structure for your analytics event data
export interface DataLayerEvent {
  event: string;
  form_data: {
    lead_source: string;
    user_intent?: string; // This now allows the 'user_intent' property
  };
}

// Extends the global Window interface to make TypeScript aware of dataLayer
declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}