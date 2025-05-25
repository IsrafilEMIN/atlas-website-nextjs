// components/layout/Header.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Ensure Next/Image is imported
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

interface NavLinkItem {
  href: string;
  label: string;
}

const HEADER_DESKTOP_HEIGHT = '70px'; 

export default function Header() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0)", "rgba(0, 0, 0)"]
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // isActive function is no longer needed for link color if all links are always white
  // const isActive = (path: string) => router.pathname === path; 

  // MODIFIED: Updated style for quicklinks - always white, hover underline
  const quickLinkStyle = (_path?: string) => // path parameter is optional now
    `cursor-pointer transition-colors duration-200 text-base font-medium font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif] text-white hover:underline`;

  const handleLinkClick = (path: string) => (e: React.MouseEvent) => {
    if (router.pathname === path && path === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navLinks: NavLinkItem[] = [
    { href: "/booking", label: "Booking" },
    { href: "/guides", label: "Free Guides" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <motion.header
      style={{
        backgroundColor: backgroundColor.get(), 
        height: HEADER_DESKTOP_HEIGHT, 
      }}
      className="z-40" 
    >
      <div className="mx-auto px-4 sm:px-6 max-w-6xl h-full flex items-center justify-between text-[#D8C6A1]"> {/* Default color for other elements if any */}
        
        {/* Group 1: Combined Logo Image (will be on the left) */}
        <div className="flex items-center"> 
          <Link href="/" passHref legacyBehavior>
            <a onClick={handleLinkClick("/")} className="flex items-center group" aria-label="Go to Homepage">
              <Image 
                src="/assets/website-header-logo.png" // Assuming this IS your new combined logotype
                alt="Atlas HomeServices"
                // These are the INTRINSIC dimensions of your image file.
                // Ensure these match your actual combined logo file's width and height.
                width={500} 
                height={100}
                // This className styles the DISPLAYED image.
                // h-[50px] makes it display 50px tall. w-auto maintains aspect ratio.
                // Added group-hover:scale-105 back for a nice hover effect.
                className="h-[50px] w-auto transition-transform duration-300"
                priority // Good for LCP elements like logos
              />
            </a>
          </Link>
        </div>

        {/* Group 2: Desktop Quicklinks Nav (will be on the right on desktop) */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-6"> 
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} passHref legacyBehavior>
              <a onClick={handleLinkClick(link.href)} className={quickLinkStyle(link.href)}>
                {link.label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Group 3: Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="text-[#D8C6A1] p-2 touch-manipulation" // Mobile toggle color
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#162733] md:hidden overflow-hidden z-50 shadow-lg"
          >
            <nav className="flex flex-col px-6 py-3 space-y-1"> {/* text-[#D8C6A1] removed here to let quickLinkStyle handle color */}
              {navLinks.map((link) => (
                <Link key={`mobile-${link.label}`} href={link.href} passHref legacyBehavior>
                  <a onClick={handleLinkClick(link.href)} className={`${quickLinkStyle(link.href)} block py-3 text-base`}>
                    {link.label}
                  </a>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}