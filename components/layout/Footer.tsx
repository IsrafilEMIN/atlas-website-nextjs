// components/layout/Footer.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion"; // AnimatePresence not used here
import { useRouter } from "next/router";

interface NavLinkItem {
  href: string;
  label: string;
}

// Consider making height responsive or different for footer if needed
// const FOOTER_DESKTOP_HEIGHT = 'auto'; // Height will be determined by content now

export default function Footer() {
  const router = useRouter();
  // scrollY and backgroundColor transform might not be relevant for a static footer
  // If the footer is always at the bottom and doesn't change with scroll, these can be removed.
  const { scrollY } = useScroll(); 
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(15,82,186,1)", "rgba(15,82,186,1)"] // This is a solid blue, no actual transform
  );
  // isMenuOpen and related mobile menu logic are not typical for a footer like this.
  // If you don't intend a collapsible mobile menu in the footer, this can be removed.
  // const [isMenuOpen, setIsMenuOpen] = useState(false); 

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const primaryLinkStyle = (_path?: string) =>
    `cursor-pointer transition-colors duration-200 text-sm md:text-base font-medium font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif] text-white hover:underline`;
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const secondaryLinkStyle = (_path?: string) =>
    `cursor-pointer transition-colors duration-200 text-sm md:text-base font-medium text-gray-300 hover:text-white hover:underline`;


  const handleLinkClick = (path: string) => (e: React.MouseEvent) => {
    if (router.pathname === path && path === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // setIsMenuOpen(false); // Only if mobile menu state is used
  };

  const primaryNavLinks: NavLinkItem[] = [
    { href: "/booking", label: "Booking" },
    { href: "/guides", label: "Free Guides" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact Us" },
  ];

  const secondaryNavLinks: NavLinkItem[] = [
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/disclosure", label: "Disclosure" },
    // Add more links as needed
  ];

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      style={{
        backgroundColor: backgroundColor.get(), // This is your blue color: rgba(15,82,186,1)
      }}
      className="pt-4 pb-12 md:pt-6 md:pb-16 text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl flex flex-col items-center space-y-8">
        
        {/* Line 1: Logo and Primary Quicklinks */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
          {/* Group 1: Logo Image (will be on the left) */}
          <div className="flex items-center mb-4 md:mb-0"> 
            <Link href="/" passHref legacyBehavior>
              <a onClick={handleLinkClick("/")} className="flex items-center group" aria-label="Go to Homepage">
                <Image 
                  src="/assets/website-footer-logo.png" 
                  alt="Atlas HomeServices Footer Logo"
                  width={500} // Adjusted intrinsic width (example, use your actual image's aspect ratio)
                  height={100}  // Adjusted intrinsic height (example)
                  className="h-[40px] md:h-[50px] w-auto transition-transform duration-300" // Adjusted display height
                  priority 
                />
              </a>
            </Link>
          </div>

          {/* Group 2: Desktop Primary Quicklinks Nav (will be on the right on desktop) */}
          <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 md:gap-x-5 lg:gap-x-6"> 
            {primaryNavLinks.map((link) => (
              <Link key={link.label} href={link.href} passHref legacyBehavior>
                <a onClick={handleLinkClick(link.href)} className={primaryLinkStyle(link.href)}>
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>

        {/* Line 2: Centered Secondary Quicklinks (Terms, Privacy, etc.) */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-6">
          {secondaryNavLinks.map((link) => (
            <Link key={link.label} href={link.href} passHref legacyBehavior>
              <a onClick={handleLinkClick(link.href)} className={secondaryLinkStyle(link.href)}>
                {link.label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Line 3: SEO Blob + Copyright */}
        <div className="text-center text-medium font-bold text-white max-w-3xl mb-10">
          <p >
            {/* Your SEO Blob text goes here. Example: */}
            Atlas HomeServices: Your trusted partner for professional painting in Niagara Falls, St. Catharines, Welland, and the entire Niagara Region. We specialize in interior and exterior residential and commercial painting, offering quality craftsmanship and lasting results. Contact us for a free quote on your next painting project.
          </p>
          <p>
            &copy; {currentYear} Atlas HomeServices. All Rights Reserved.
          </p>
        </div>

      </div>
      {/* Mobile menu (<AnimatePresence> and related logic) is typically not part of a footer like this. 
          If you had a specific design for a collapsible footer menu on mobile, it would be different.
          For now, I've removed it as the links above will wrap and be accessible.
      */}
    </motion.footer>
  );
}