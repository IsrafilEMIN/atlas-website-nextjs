import * as React from "react";
import Image from "next/image";

export default function DownloadGuides() {
  const handleGuideFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.guideEmail.value;
    try {
      await fetch('/api/subscribe-to-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, guide: '2025 Listing Accelerator Colors' }),
      });
      // Trigger download
      const link = document.createElement('a');
      link.href = '/guides/2025-Listing-Accelerator-Colors.pdf';
      link.download = '2025-Listing-Accelerator-Colors.pdf';
      link.click();
    } catch (error) {
      console.error('Failed to subscribe', error);
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#162733] font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif]">
          Free Painting Guides
        </h2>
        <p className="mt-4 text-lg text-center text-gray-600 font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif]">
          Download our expert guides to help with your painting project.
        </p>
        <div className="mt-10 flex justify-center">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full">
            <div className="w-full h-48 relative rounded-t-lg overflow-hidden">
              <Image
                src="/guides/cover-image.png"
                alt="Cover image for 2025 Trending Colors guide"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#162733] font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif]">
                2025 Trending Colors
              </h3>
              <p className="mt-2 text-gray-600">
                Learn how to choose the fastest selling color palettes.
              </p>
              <form onSubmit={handleGuideFormSubmit} className="mt-4">
                <button
                  type="submit"
                  className="mt-2 w-full bg-[#0F52BA] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0F52BA]/90 transition"
                >
                  Download Guide
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}