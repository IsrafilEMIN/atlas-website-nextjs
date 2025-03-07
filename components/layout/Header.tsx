"use client";
import { useState, useEffect } from "react";
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
      ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"] // solid black
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Set the current pathname on the client
  useEffect(() => {
    // Your logic that depends on router.pathname
    console.log("Path changed:", router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => router.pathname === path;

  // Navigation link styling - updated with smaller text
  const linkStyle = (path: string) =>
      `cursor-pointer transition-colors duration-200 text-sm font-medium font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif] ${
          isActive(path) ? "text-white" : "text-gray-300 hover:text-white"
      }`;

  const handleClick = (path: string) => (e: React.MouseEvent) => {
    if (router.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(path);
    }
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
      <motion.header
          style={{ backgroundColor }}
          className={`fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-300 ${
              isScrolled ? "py-1.5" : "py-2"
          }`}
      >
        <div className="mx-auto px-6 max-w-6xl flex items-center justify-between relative box-content">
          <Link href="https://atlas-paint.com" passHref onClick={handleClick("https://atlas-paint.com")}>
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-16">
            <Link href="https://atlas-paint.com" passHref>
              <span onClick={handleClick("https://atlas-paint.com")} className={`${linkStyle("/")} ${isActive("/") ? "active" : ""}`}>Home</span>
            </Link>
            <Link href="https://atlas-paint.com/services" passHref>
              <span onClick={handleClick("https://atlas-paint.com/services")} className={`${linkStyle("/")} ${isActive("/") ? "active" : ""}`}>Services</span>
            </Link>
            <Link href="https://atlas-paint.com/pricing" passHref>
              <span onClick={handleClick("https://atlas-paint.com/pricing")} className={`${linkStyle("/")} ${isActive("/") ? "active" : ""}`}>Pricing</span>
            </Link>
            <Link href="https://atlas-paint.com/gallery" passHref>
              <span onClick={handleClick("https://atlas-paint.com/gallery")} className={`${linkStyle("/")} ${isActive("/") ? "active" : ""}`}>Gallery</span>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-4 md:hidden">
            <Link href="https://atlas-paint.com/booking" passHref>
              <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                  onClick={handleClick("https://atlas-paint.com/booking")}
              >
                Book Now
              </Button>
            </Link>
            <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="text-white p-2 touch-manipulation"
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

          {/* Mobile Hamburger Menu */}
          <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 bg-black md:hidden overflow-hidden z-50"
                >
                  <nav className="flex flex-col px-6 py-4">
                    <Link href="https://atlas-paint.com" passHref>
                      <span onClick={handleClick("/")} className={`${linkStyle("https://atlas-paint.com")} block py-2`}>Home</span>
                    </Link>
                    <Link href="https://atlas-paint.com/services" passHref>
                      <span  onClick={handleClick("/services")} className={`${linkStyle("https://atlas-paint.com/services")} block py-2`}>Services</span>
                    </Link>
                    <Link href="https://atlas-paint.com/pricing" passHref>
                      <span onClick={handleClick("/pricing")} className={`${linkStyle("https://atlas-paint.com/pricing")} block py-2`}>Pricing</span>
                    </Link>
                    <Link href="https://atlas-paint.com/gallery" passHref>
                      <span onClick={handleClick("/gallery")} className={`${linkStyle("https://atlas-paint.com/gallery")} block py-2`}>Gallery</span>
                    </Link>
                  </nav>
                </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Book Now Button */}
          <div className="hidden md:block">
            <Link href="https://atlas-paint.com/booking" onClick={handleClick("https://atlas-paint.com/booking")}>
              <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>
  );
}
