// components/layout/DefaultLayout.tsx
import React from 'react';
import TopStickyBanner from "@/components/layout/TopStickyBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      {/* The TopStickyBanner's fixed part will overlay,
          and its spacer div will push down the following content. */}
      <TopStickyBanner />

      <div className="min-h-screen flex flex-col">
        {/* Header is now rendered after TopStickyBanner's spacer if TopStickyBanner is designed that way,
            or simply below it in the document flow. It will scroll with this parent div. */}
        <Header />
        <main className="flex-grow"> {/* Changed div to main for semantic HTML */}
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;