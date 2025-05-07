"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(22, 39, 51, 1)", "rgba(22, 39, 51, 1)"]
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => router.pathname === path;

  const linkStyle = (path: string) =>
    `cursor-pointer transition-colors duration-200 text-sm font-medium font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif] ` +
    `${isActive(path) ? "text-[#D8C6A1]" : "text-[#D8C6A1] hover:text-white"}`;

  const handleClick = (path: string) => (e: React.MouseEvent) => {
    if (router.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4"
    >
      <div className="mx-auto px-4 sm:px-6 max-w-6xl flex items-center justify-between text-[#D8C6A1]">
        <Link href="/" passHref onClick={handleClick("/")}>
          <Logo className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-12">
          <Link href="/" passHref>
            <span onClick={handleClick("/")} className={linkStyle("/")}>Home</span>
          </Link>
          <Link href="/pricing" passHref>
            <span onClick={handleClick("/pricing")} className={linkStyle("/pricing")}>Pricing</span>
          </Link>
          <Link href="/gallery" passHref>
            <span onClick={handleClick("/gallery")} className={linkStyle("/gallery")}>Gallery</span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle Only (no mobile Book Now button) */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="text-[#D8C6A1] p-2 touch-manipulation"
            aria-label="Toggle Menu"
            role="button"
            tabIndex={0}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-[#162733] md:hidden overflow-hidden z-50"
            >
              <nav className="flex flex-col px-6 py-4 text-[#D8C6A1]">
                <Link href="/" passHref>
                  <span onClick={handleClick("/")} className={`${linkStyle("/")} block py-2`}>Home</span>
                </Link>
                <Link href="/pricing" passHref>
                  <span onClick={handleClick("/pricing")} className={`${linkStyle("/pricing")} block py-2`}>Pricing</span>
                </Link>
                <Link href="/gallery" passHref>
                  <span onClick={handleClick("/gallery")} className={`${linkStyle("/gallery")} block py-2`}>Gallery</span>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Book Now Button */}
        <div className="hidden md:block">
          <Link href="/booking" onClick={handleClick("/booking")}>
            <Button
              variant="outline"
              className="border-[#D8C6A1] text-[#D8C6A1] hover:bg-white hover:text-black"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
