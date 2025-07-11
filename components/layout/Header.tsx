"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

interface NavLinkItem {
  href: string;
  label: string;
}

const HEADER_DESKTOP_HEIGHT = '70px';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavLinkItem[] = [
    { href: "/booking", label: "Booking" },
    { href: "/guides", label: "Free Guides" },
    // { href: "/socials", label: "Socials" },
    { href: "/gallery", label: "Gallery" },
    // { href: "/partner-with-us", label: "Partner With Us" },
  ];

  const handleLinkClick = (path: string) => (e: React.MouseEvent) => {
    if (router.pathname === path && path === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="z-40 relative bg-[#131628]" style={{ height: HEADER_DESKTOP_HEIGHT }}>
      <div className="mx-auto px-4 sm:px-6 max-w-6xl h-full flex items-center justify-between text-white">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" passHref legacyBehavior>
            <a onClick={handleLinkClick("/")} className="flex items-center group" aria-label="Go to Homepage">
              <Image
                src="/assets/website-header-logo.png"
                alt="Atlas HomeServices"
                width={500}
                height={100}
                className="h-[50px] w-auto transition-transform duration-300"
                priority
              />
            </a>
          </Link>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-6">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} passHref legacyBehavior>
              <a
                onClick={handleLinkClick(link.href)}
                className="cursor-pointer transition-colors duration-200 text-base font-medium font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif] text-white hover:underline"
              >
                {link.label}
              </a>
            </Link>
          ))}
        </nav>
        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="text-white p-2 touch-manipulation"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#131628] bg-opacity-100 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-[80px] right-4 text-white p-2 z-50"
              aria-label="Close Menu"
            >
              <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Centered Links */}
            <nav className="flex flex-1 flex-col justify-center items-center space-y-5 px-6">
              {navLinks.map((link) => (
                <Link key={`mobile-${link.label}`} href={link.href} passHref legacyBehavior>
                  <a
                    onClick={handleLinkClick(link.href)}
                    className="w-full max-w-xs rounded-2xl py-4 px-8 text-xl font-semibold bg-[#0F52BA] text-white shadow-xl hover:bg-[#0F52BA] hover:text-white transition-colors duration-200 text-center"
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
