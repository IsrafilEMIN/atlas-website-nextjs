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
    start_date?: string; 
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
  };
}

// Extends the global Window interface to make TypeScript aware of dataLayer
declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}