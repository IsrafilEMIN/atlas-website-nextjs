import GallerySection from "@/components/gallery/GallerySection";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white py-24 px-6">
      <GallerySection /> {/* ← Single call, no props needed */}
    </div>
  );
}
