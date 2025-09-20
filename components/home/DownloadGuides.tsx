// components/home/DownloadGuides.tsx
import * as React from "react";
import { Download, ChevronRight } from "lucide-react";

export default function DownloadGuides() {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleGuideFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe-to-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, guide: '2025 Listing Accelerator Colors' }),
      });
      
      if (response.ok) {
        // Trigger download
        const link = document.createElement('a');
        link.href = '/guides/2025-Listing-Accelerator-Colors.pdf';
        link.download = '2025-Listing-Accelerator-Colors.pdf';
        link.click();
        
        setEmail('');
      }
    } catch (error) {
      console.error('Failed to subscribe', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-0.5 bg-slate-400 mx-auto mb-6"></div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Free Color Guide
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get expert insights on 2025&apos;s trending colors that increase home value and appeal.
          </p>
        </div>

        {/* Guide Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-colors duration-300">
            {/* Image */}
            <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <Download className="w-12 h-12 text-slate-400" />
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  2025 Color Trends
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Professional color recommendations that boost curb appeal and resale value.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleGuideFormSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="guideEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Download Guide
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-slate-500 mt-4 text-center">
                No spam, just valuable painting insights
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-6 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Instant Download
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Expert Tips
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              No Cost
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}