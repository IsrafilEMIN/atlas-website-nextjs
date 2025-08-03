//components/home/Hero.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assuming this path is correct

// Define image sources
const DESKTOP_IMAGE_SRC = "/heroImages/atlas-hero-image.png"; 
const MOBILE_IMAGE_SRC = "/heroImages/atlas-mobile-hero-image.png";
const MOBILE_IMAGE_WIDTH = 2048;
const MOBILE_IMAGE_HEIGHT = 1632;

export default function Hero() {
  // Common text content can be defined once if you prefer
  const headingText = <>ARE YOU A REALTOR LOOKING FOR A PAINTER?</>;
  const paragraphText = "We help realtors make their properties ready for listing in 72 hours.";
  const buttonText = "GET A QUOTE";
  // const bookingLink = "/booking";
  const bookingLink = "/painting-offer";

  return (
    <>
      {/* --- MOBILE VERSION --- */}
      {/* Visible by default, hidden on medium screens (md) and up */}
      <section className="md:hidden flex flex-col">
        {/* White text block at the top for mobile */}
        <div className="bg-white px-4 pt-12 pb-8 text-center sm:px-6">
          <h1
            className="
              font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif]
              font-black uppercase text-[#162733]
              mb-6 leading-tight
              text-4xl sm:text-3xl {/* Mobile-specific H1 sizes */}
            "
          >
            {headingText}
          </h1>
          <p
            className="
              font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif]
              text-[#162733]
              text-xl sm:text-xl {/* Mobile-specific P sizes */}
              mb-8
            "
          >
            {paragraphText}
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              className="
                w-full sm:w-auto
                rounded-full
                px-8 py-4              /* Mobile-specific button padding */
                font-bold
                text-base sm:text-lg    /* Mobile-specific button text sizes */
                bg-[#0F52BA] text-white
                hover:bg-[#0F52BA] hover:text-white transition
              "
              onClick={() => (window.location.href = bookingLink)}
            >
              {buttonText}
            </Button>
          </div>
        </div>

        {/* Image below text block for mobile */}
        <div className="w-full"> {/* Container for the responsive image */}
          <Image
            src={MOBILE_IMAGE_SRC}
            alt="Transform your home with our expert painting services (mobile view)" // Descriptive alt text
            width={MOBILE_IMAGE_WIDTH}
            height={MOBILE_IMAGE_HEIGHT}
            layout="responsive" // Scales image nicely, maintaining aspect ratio
            className="object-cover" // Ensures it covers if aspect ratio differs from image, but might crop
            quality={80} // Adjusted quality for mobile if needed
            priority // Consider if this is LCP for mobile
          />
        </div>
      </section>

      {/* --- DESKTOP VERSION --- */}
      {/* Hidden by default, shown from md breakpoint up */}
      <section
        className="
          hidden md:flex items-center overflow-hidden bg-white
          w-full max-w-[1920px]
          h-[550px]
          mx-auto
          relative /* For absolute positioning of children */
        "
      >
        <Image
          src={DESKTOP_IMAGE_SRC}
          alt="Atlas HomeServices – Luxury Painting (desktop view)"
          fill
          priority
          sizes="(max-width: 1920px) 100vw, 1920px"
          quality={90}
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/10" /> {/* Tint */}
        
        {/* Overlayed text content for desktop */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-5xl w-full px-6 text-center pt-0"> {/* pt-0 as vertical centering is handled by flex parent */}
            <h1
              className="
                font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif]
                font-black uppercase text-[#162733]
                mb-6 leading-tight
                text-6xl {/* Desktop H1 size (was md:text-6xl, simplified) */}
              "
            >
              {headingText}
            </h1>
            <p
              className="
                font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif]
                text-[#162733]
                text-2xl {/* Desktop P size (was md:text-2xl, simplified) */}
                mb-8
              "
            >
              {paragraphText}
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                className="
                  rounded-full
                  px-20 py-7              /* Desktop button padding */
                  font-bold
                  text-xl                 /* Desktop button text size (was md:text-xl, simplified) */
                  bg-[#0F52BA] text-white
                  hover:bg-[#0F52BA] hover:text-white transition
                "
                onClick={() => (window.location.href = bookingLink)}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}