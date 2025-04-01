import GallerySection from "@/components/gallery/GallerySection";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white py-24 px-6">
      <GallerySection
        title="Residential Painting Projects"
        images={[
          
        ]}
      />

      <GallerySection
        title="Commercial Painting Projects"
        images={[
          {
            src: "/images/gallery/commercial/04.jpg",
            alt: "School in Richmond Hill",
          },
          {
            src: "/images/gallery/commercial/02.jpg",
            alt: "Retail shop painting project in Toronto",
          },
          {
            src: "/images/gallery/commercial/03.jpg",
            alt: "Condo project in Mississauga",
          },
          {
            src: "/images/gallery/commercial/01.jpg",
            alt: "Office interior commercial painting in Vaughan",
          },
        ]}
      />

      <GallerySection
        title="Drywall & Plastering"
        images={[
          
        ]}
      />

      {/* Add more service sections as needed */}
      <GallerySection
        title="Wall Covering"
        images={[
          
        ]}
      />

      <GallerySection
        title="Fencing"
        images={[
          
        ]}
      />
    </div>
  );
}
