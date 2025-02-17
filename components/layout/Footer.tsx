"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Footer() {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);

  // Set the current pathname on the client
  useEffect(() => {
    // Your logic that depends on router.pathname
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

  const handleMailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowOptions(!showOptions);
  };

  return (
    <footer className="bg-black border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-300 mb-4">
              Professional painting services for residential and commercial properties.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/people/Atlas-HomeServices-Inc/61572733726450/"
                className="text-gray-300 hover:text-white/60"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/Atlas_Paint"
                className="text-gray-300 hover:text-white/60"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/atlas_homeservices/"
                className="text-gray-300 hover:text-white/60"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" passHref onClick={handleClick("/")} className="text-gray-300 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  onClick={handleClick("/services")}
                  className="text-gray-300 hover:underline"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  onClick={handleClick("/pricing")}
                  className="text-gray-300 hover:underline"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  onClick={handleClick("/gallery")}
                  className="text-gray-300 hover:underline"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  onClick={handleClick("/booking")}
                  className="text-gray-300 hover:underline"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-2" />
                <Link href="tel:+16479160826" className="hover:underline">
                  (647) 916-0826
                </Link>
              </li>
              {/* Email with Selection Prompt */}
              <li className="flex items-center text-gray-300 relative">
                <Mail className="w-5 h-5 mr-2" />
                <button onClick={handleMailClick} className="hover:underline">
                  atlas.homeservices@icloud.com
                </button>

                {/* Dropdown for Email Selection */}
                {showOptions && (
                    <div className="absolute left-0 top-10 bg-gray-800 p-3 rounded-md shadow-md border border-gray-700 z-50">
                      <p className="text-gray-400 text-sm mb-2">Choose how to send email:</p>
                      <ul className="space-y-2">
                        <li>
                          <a href="mailto:atlas.homeservices@icloud.com" className="text-blue-400 hover:underline">
                            Default Mail App
                          </a>
                        </li>
                        <li>
                          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=atlas.homeservices@icloud.com"
                             target="_blank"
                             rel="noopener noreferrer"
                             className="text-blue-400 hover:underline">
                            Gmail
                          </a>
                        </li>
                        <li>
                          <a href="https://outlook.live.com/owa/?path=/mail/action/compose&to=atlas.homeservices@icloud.com"
                             target="_blank"
                             rel="noopener noreferrer"
                             className="text-blue-400 hover:underline">
                            Outlook
                          </a>
                        </li>
                        <li>
                          <a href="https://compose.mail.yahoo.com/?to=atlas.homeservices@icloud.com"
                             target="_blank"
                             rel="noopener noreferrer"
                             className="text-blue-400 hover:underline">
                            Yahoo Mail
                          </a>
                        </li>
                      </ul>
                    </div>
                )}
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2" />
                <span>atlas-paint.com</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Business Hours</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Mon - Sun: 8:00 - 20:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t text-gray-300 mt-12 pt-8">
          <p className="text-center text-gray-300">
            Copyright © {new Date().getFullYear()} Atlas HomeServices. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
