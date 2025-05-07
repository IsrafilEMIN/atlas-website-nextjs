import React from "react";

type Review = {
  customerName: string;
  comment: string;
  rating: number;
  createdAt: string;
};

interface GrandSlamOfferProps {
  reviews: Review[];
}

const GrandSlamOffer: React.FC<GrandSlamOfferProps> = ({ reviews }) => {
  return (
    <section className="bg-[#f9f6f2] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Left: Offer Value Stack */}
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-[#162733] mb-6 uppercase tracking-wide drop-shadow-sm">
            🏆 The Atlas Grand Slam Offer – Designed for Luxury Homes
          </h2>

          <ul className="text-[#2c3e50] space-y-4 text-base md:text-lg font-light">
            <li>
              ✅ <strong>Flawless Results:</strong> Crisp lines, premium paints, and perfection in every room
            </li>
            <li>
              ✅ <strong>White-Glove Care:</strong> We move, cover, and protect everything — zero mess
            </li>
            <li>
              ✅ <strong>Video Updates (Optional):</strong> Stay in the loop, even when you&apos;re away
            </li>
            <li>
              ✅ <strong>5-Year Warranty:</strong> Confidence in quality that lasts
            </li>
            <li>
              ✅ <strong>No Final Payment Until You’re Thrilled:</strong> 100% satisfaction backed in writing
            </li>
            <li>🎨 Premium Benjamin Moore or Sherwin-Williams paints included</li>
            <li>🧽 Full prep & cleanup — furniture protection, floor coverings, caulking</li>
            <li>📦 Free touch-up kit post-project</li>
            <li>📸 Final before/after photo package (optional)</li>

            {/* Value Comparison Table */}
            <div className="bg-white mt-8 p-6 rounded-lg shadow text-sm">
              <h3 className="font-bold text-[#162733] mb-3">Why Homeowners Choose Atlas:</h3>
              <ul className="space-y-1 text-[#2c3e50]">
                <li>
                  ✔️ Zero-Mess Guarantee —
                  <span className="text-[#e6b800] font-semibold"> others don’t offer</span>
                </li>
                <li>
                  ✔️ 5-Year Warranty —
                  <span className="text-[#e6b800] font-semibold"> industry standard is 1 year</span>
                </li>
                <li>
                  ✔️ No Final Payment Until You’re Thrilled —
                  <span className="text-[#e6b800] font-semibold"> most ask for 50% upfront</span>
                </li>
              </ul>
            </div>
          </ul>
        </div>

        {/* Right: CTA Column with Risk Reversal + Reviews */}
        <div className="bg-white shadow-lg rounded-xl p-8 border border-[#ded3c1] space-y-6">

          <p className="text-[#3d4b5e] text-base">
            📅 Free quotes available <strong>immediately</strong>
          </p>

          <p className="text-[#2c3e50] text-sm">
            Discover how stress-free and flawless your painting project can be — backed by airtight guarantees and white-glove care that delights even the most discerning homeowners.
          </p>

          {/* Risk Reversal Message */}
          <div className="border border-yellow-300 bg-yellow-50 p-4 rounded-lg shadow-inner text-sm md:text-base text-gray-800">
            <div className="flex items-start gap-3 mb-2">
              <span className="text-yellow-500 text-xl">💡</span>
              <p className="font-semibold">What if I’m not happy with the work?</p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We built our business around <span className="font-semibold text-gray-900">you loving the final result</span>.
              That’s why we don’t ask for final payment until you’re genuinely thrilled.
              We also offer optional video check-ins to keep you <span className="font-semibold text-gray-900">fully in control</span> — even when you’re away.
            </p>
          </div>

          {/* CTA Button */}
          <a
            href="#booking"
            className="inline-block w-full text-center bg-[#e6d4b5] hover:bg-[#ddc8a5] text-[#162733] font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 uppercase tracking-wide text-sm md:text-base"
          >
            Book My White-Glove Consultation
          </a>

          {/* Scarcity Note */}
          <p className="text-xs text-gray-500 italic">
            ⚠️ Only 3 spots left this month — book early to reserve yours.
          </p>

          {/* Google Review Peek */}
{reviews?.length > 0 && (
  <div className="mt-6 border-t pt-4">
    <h3 className="text-sm font-semibold text-[#162733] mb-3 flex items-center gap-2">
      ⭐ What People Are Saying on Google
    </h3>
    {reviews.slice(0, 3).map((r, i) => (
      <div key={i} className="mb-4">
        <p className="text-sm text-gray-700 italic">
          “{r.comment.slice(0, 140)}{r.comment.length > 140 ? '...' : ''}”
        </p>
        <p className="text-xs mt-1 text-gray-500 font-medium">— {r.customerName}</p>
      </div>
    ))}
  </div>
)}


        </div>
      </div>
    </section>
  );
};

export default GrandSlamOffer;
