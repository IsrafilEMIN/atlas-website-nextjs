import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      className="
        relative flex items-center overflow-hidden bg-white
        min-h-[calc(100svh_-_5rem)]  /* full visible height on phones   */
        md:min-h-[75vh]              /* original desktop heights        */
        lg:min-h-[80vh]
        pt-20                         /* clears the fixed navbar        */
      "
    >
      <Image
        src="/images/hero-luxury-white-glove.png"
        alt="Atlas HomeServices – luxury white‑glove painting"
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-top"
      />

      {/* optional dark tint */}
      <div className="absolute inset-0 bg-black/10" />

      {/* overlay */}
      <div className="absolute inset-0 flex items-center">
        <div
          className="
            ml-6 md:ml-24 max-w-[34rem]
            pt-24 md:pt-0          /* ↓ push text lower only on phones */
          "
        >
          <h1
            className="
              font-serif text-[#162733] mb-6 leading-tight
              text-3xl            /* phones  */
              sm:text-4xl
              md:text-5xl         /* original desktop size */
            "
          >
            Make Your Home Look Magazine‑Worthy  Without Lifting a Finger
          </h1>

          <p
            className="
              text-[#2A1C14]          /* darker brand colour for stronger contrast   */
              font-medium             /* was font‑light → thicker strokes            */
              drop-shadow-sm          /* subtle halo so it pops on busy backgrounds  */
              mb-8
              text-base               /* phones                                      */
              sm:text-lg
              md:text-l              /* original desktop size                       */
              leading-relaxed
            "
          >
            Luxury interior painting with zero mess, no prep, and white‑glove care.
            Book today — start in as little as&nbsp;48&nbsp;hours.
          </p>


          {/* divider */}
          <div className="mt-8 h-px w-full bg-[#162733]" />

          {/* CTA */}
          <div className="mt-10">
            <Button
              size="lg"
              className="
                px-10 py-5 font-semibold
                text-lg md:text-xl
                bg-[#cdb898] text-[#162733] border-2 border-[#162733]
                hover:bg-[#162733] hover:text-white transition
              "
              onClick={() => (window.location.href = 'https://atlas-paint.com/booking/')}
            >
              Ready to Transform Your Home?
            </Button>
          </div>
          <div className="text-xs text-gray-700 italic mt-2">
            🕒 Average project start: <strong>2–4 days</strong> from quote
          </div>


          {/* trust badges */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#2e3e4e] font-medium tracking-wide">
            <span>🎯 Free Quote → No Final Payment Until You're Thrilled</span>
            <span>🚚 We Handle Everything → You Sit Back</span>
            <span className="basis-full w-full">📸 Optional Progress Updates</span>
            <span>🛡️ 5‑Year Free Touch‑up Warranty</span>
          </div>
        </div>
      </div>
    </section>
  );
}
