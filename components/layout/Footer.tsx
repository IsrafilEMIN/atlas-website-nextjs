"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import Logo from "@/components/ui/Logo";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

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

  useEffect(() => {
    console.log("Path changed:", router.pathname);
  }, [router.pathname]);

  const handleClick = (path: string) => (e: React.MouseEvent) => {
    if (router.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(path);
    }
  };

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Logo className="mb-4" />
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Atlas HomeServices provides expert house painting, drywall, wall covering, and fencing solutions across Toronto, Niagara, and the GTA.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/atlas_homeservices/"
                className="text-gray-300 hover:text-white/70"
                target="_blank"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@atlas_homeservices"
                className="text-gray-300 hover:text-white/70"
                target="_blank"
                aria-label="TikTok"
              >
                <FaTiktok className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/Atlas_Paint"
                className="text-gray-300 hover:text-white/70"
                target="_blank"
                aria-label="Twitter"
              >
                <XIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.facebook.com/people/Atlas-HomeServices-Inc/61572733726450/"
                className="text-gray-300 hover:text-white/70"
                target="_blank"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/pricing", label: "Pricing" },
                { href: "/gallery", label: "Gallery" },
                { href: "/blog", label: "Blog" },
                { href: "/booking", label: "Book Now" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={handleClick(href)}
                    className="text-gray-300 hover:text-white/80"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
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
            <h3 className="text-lg font-semibold text-white mb-4">Business Hours</h3>
            <p className="text-sm text-gray-300">Open 7 days a week:</p>
            <p className="text-sm text-gray-300">Mon – Sun: 8:00 AM – 8:00 PM</p>
          </div>
        </div>

        {/* SEO Blurb for Footer */}
        <div className="mt-12 text-center text-gray-400 text-xs leading-relaxed">
          <p className="max-w-4xl mx-auto">
            Atlas Painting is a trusted residential and commercial painting company serving clients in Toronto, Mississauga, Hamilton, Oakville, Vaughan, Niagara Falls, and surrounding areas. We specialize in house painting, interior painting, drywall repair, wall coverings, and exterior fence painting — delivering premium finishes with professional care.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-xs">
          <p>
            © {new Date().getFullYear()} Atlas HomeServices. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
