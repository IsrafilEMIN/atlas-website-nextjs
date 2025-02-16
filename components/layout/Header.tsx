"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "@/components/ui/Logo";

export default function Header() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"] // solid black
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clientLocation, setClientLocation] = useState<string>("");

  // Set the current pathname on the client
  useEffect(() => {
    setClientLocation(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => clientLocation === path;

  // Navigation link styling - updated with smaller text
  const linkStyle = (path: string) =>
    `cursor-pointer transition-colors duration-200 text-sm font-medium font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif] ${
      isActive(path) ? "text-white" : "text-gray-300 hover:text-white"
    }`;

  const handleClick = (path: string) => (e: React.MouseEvent) => {
    if (clientLocation === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-300 ${
        isScrolled ? "py-1.5 border-b border-gray-800/50" : "py-2"
      }`}
    >
      <div className="mx-auto px-6 max-w-6xl flex items-center justify-between relative box-content">
        <Link href="/" onClick={handleClick("/")}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-16">
          <Link href="/" onClick={handleClick("/")}>
            <span className={`${linkStyle("/")} ${isActive("/") ? "active" : ""}`}>Home</span>
          </Link>
          <Link href="/services" onClick={handleClick("/services")}>
            <span className={`${linkStyle("/")} ${isActive("/") ? "active" : ""}`}>Services</span>
          </Link>
          <Link href="/pricing" onClick={handleClick("/pricing")}>
            <span className={`${linkStyle("/")} ${isActive("/") ? "active" : ""}`}>Pricing</span>
          </Link>
          <Link href="/gallery" onClick={handleClick("/gallery")}>
            <span className={`${linkStyle("/")} ${isActive("/") ? "active" : ""}`}>Gallery</span>
          </Link>
          <Link href="/contact" onClick={handleClick("/contact")}>
            <span className={`${linkStyle("/")} ${isActive("/") ? "active" : ""}`}>Contact</span>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/booking" onClick={handleClick("/booking")}>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Book Now
            </Button>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black border-t border-gray-800 md:hidden">
            <nav className="flex flex-col px-6 py-4">
              <Link href="/" onClick={handleClick("/")}>
                <span className={`${linkStyle("/")} block py-2`}>Home</span>
              </Link>
              <Link href="/services" onClick={handleClick("/services")}>
                <span className={`${linkStyle("/services")} block py-2`}>Services</span>
              </Link>
              <Link href="/pricing" onClick={handleClick("/pricing")}>
                <span className={`${linkStyle("/pricing")} block py-2`}>Pricing</span>
              </Link>
              <Link href="/gallery" onClick={handleClick("/gallery")}>
                <span className={`${linkStyle("/gallery")} block py-2`}>Gallery</span>
              </Link>
              <Link href="/contact" onClick={handleClick("/contact")}>
                <span className={`${linkStyle("/contact")} block py-2`}>Contact</span>
              </Link>
            </nav>
          </div>
        )}

        {/* Desktop Book Now Button */}
        <div className="hidden md:block">
          <Link href="/booking" onClick={handleClick("/booking")}>
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
