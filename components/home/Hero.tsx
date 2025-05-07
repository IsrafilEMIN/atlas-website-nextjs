import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-luxury-white-glove.png"
        alt="Atlas HomeServices – luxury white‑glove painting"
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-top"
      />

      {/* Optional dark tint */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center">
        <div className="ml-6 md:ml-24 max-w-[34rem]">
          {/* Headline */}
          <h1 className="font-serif text-[clamp(1.8rem,4.5vw,3rem)] leading-tight tracking-wide text-[#162733] drop-shadow-md uppercase">
            Toronto’s First White-Glove Painting Service
          </h1>

          {/* Divider */}
          <div className="mt-8 h-px w-full bg-[#162733]" />

          {/* CTA */}
          <div className="mt-10">
            <Button
              size="lg"
              className="px-10 py-5 text-lg md:text-xl font-semibold
                         bg-[#cdb898] text-[#162733] border-2 border-[#162733]
                         hover:bg-[#162733] hover:text-white transition"
              onClick={() => (window.location.href = 'https://atlas-paint.com/booking/')}
            >
              Book Your Free Quote Now
            </Button>
          </div>

           {/* Trust badge bar */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#2e3e4e] font-medium tracking-wide">
            <span>🎯 5-Year Warranty</span>
            <span>🎥 Optional Video Updates</span>
            <span>💸 No Final Payment Until You&apos;re Thrilled</span>
          </div>
        </div>
      </div>
    </section>
  );
}
