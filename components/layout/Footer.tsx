import Link from "next/link";
import { useRouter } from "next/router";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import Logo from "@/components/ui/Logo";

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-label="X (Twitter)"
  >
    <path d="M18.205 2.25h3.308l-7.227 8.26 8.502 11.24h-6.64l-5.204-6.81-5.952 6.81H1.685l7.73-8.835-8.15-10.665h6.816l4.692 6.203 5.432-6.203zm-1.325 17.73h1.84L6.665 4.26H4.72l12.16 15.72z" />
  </svg>
);

export default function Footer() {
  const router = useRouter();

  const handleClick = (path: string) => (e: React.MouseEvent) => {
    if (router.pathname === path) {
      e.preventDefault();
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      router.push(path);
    }
  };

  return (
    <footer className="bg-[#162733] border-t border-[#162733]">
      <div className="container mx-auto px-6 py-12 text-[#D8C6A1]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Logo className="mb-4" />
            <p className="text-[#CBB990] text-sm mb-4 leading-relaxed">
              Atlas HomeServices provides expert house painting solutions across Toronto, Niagara, and the GTA.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/atlas_homeservices/"
                target="_blank"
                aria-label="Instagram"
                className="text-[#D8C6A1] hover:text-[#CBB990]"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@atlas_homeservices"
                target="_blank"
                aria-label="TikTok"
                className="text-[#D8C6A1] hover:text-[#CBB990]"
              >
                <FaTiktok className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/Atlas_Paint"
                target="_blank"
                aria-label="Twitter"
                className="text-[#D8C6A1] hover:text-[#CBB990]"
              >
                <XIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.facebook.com/people/Atlas-HomeServices-Inc/61572733726450/"
                target="_blank"
                aria-label="Facebook"
                className="text-[#D8C6A1] hover:text-[#CBB990]"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#D8C6A1] mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/pricing", label: "Pricing" },
                { href: "/gallery", label: "Gallery" },
                { href: "/booking", label: "Book Now" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={handleClick(href)}
                    className="text-[#D8C6A1] hover:text-[#CBB990]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#D8C6A1] mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-[#CBB990]">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <Link href="tel:+16479160826" className="hover:underline">
                  (647) 916-0826
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <Link href="mailto:atlas.homeservices@icloud.com" className="hover:underline">
                  atlas.homeservices@icloud.com
                </Link>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1" />
                <span className="whitespace-pre-line">
                  Greater Toronto Area{"\n"}Niagara Region{"\n"}Hamilton & More
                </span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold text-[#D8C6A1] mb-4">Business Hours</h3>
            <p className="text-sm text-[#CBB990]">Open 7 days a week:</p>
            <p className="text-sm text-[#CBB990]">Mon – Sun: 8:00 AM – 8:00 PM</p>
          </div>
        </div>

        {/* Trust Booster Box */}
        <div className="mt-12 bg-[#1f344b] py-6 px-6 rounded-lg text-center text-[#CBB990] text-sm font-light shadow-inner border border-[#2e4b65]">
          <h4 className="text-base font-semibold mb-2 text-[#D8C6A1] tracking-wide uppercase">
            What Makes Atlas Different?
          </h4>
          <p>
            We don’t rest until you’re thrilled. Optional video updates. Premium materials.
            5-year guarantee.
          </p>
        </div>

        {/* SEO Blurb */}
        <div className="mt-12 text-center text-[#CBB990] text-xs leading-relaxed">
          <p className="max-w-4xl mx-auto">
            Atlas Painting is a trusted residential and commercial painting company serving clients
            in Toronto, Mississauga, Hamilton, Oakville, Vaughan, Niagara Falls, and surrounding
            areas. We specialize in house painting, interior painting, drywall repair, wall
            coverings, and exterior fence painting — delivering premium finishes with professional
            care.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#162733] mt-8 pt-6 text-center text-[#CBB990] text-xs">
          <p>© {new Date().getFullYear()} Atlas HomeServices. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
