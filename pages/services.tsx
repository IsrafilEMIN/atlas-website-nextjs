import { motion } from "framer-motion";
import Head from "next/head";
import * as React from "react";
import Link from "next/link";


export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Expert Painting & Wall Finishing Services | Atlas Painting</title>
        <meta name="description" content="Atlas Painting offers premium residential & commercial painting in the Greater Toronto Area, Niagara, Hamilton & more. Get a flawless finish—Call today!" />
      </Head>
      <div className="container mx-auto px-6 pt-32 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Our Services
        </motion.h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link
              href="/services/residential-painting"
              className="block transition-transform hover:scale-[1.02] duration-300 w-full"
          >
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Residential Painting</h3>
              <p className="text-gray-600">Transform your home with timeless elegance. Our expert painters deliver flawless interior and exterior finishes, using high-quality, durable paints that enhance beauty and protect your space. Whether it’s a modern refresh or classic restoration, we bring precision, craftsmanship, and sophistication to every brushstroke.</p>
            </div>
          </Link>

          <Link
              href="/services/commercial-painting"
              className="block transition-transform hover:scale-[1.02] duration-300 w-full"
          >
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Commercial Painting</h3>
              <p className="text-gray-600">Elevate your business with a professional, high-end finish. From corporate offices to luxury retail spaces, we provide seamless, durable coatings designed to impress clients and enhance productivity. Our team works efficiently to minimize downtime, ensuring a flawless application with premium-grade, long-lasting materials.</p>
            </div>
          </Link>


          <Link
              href="/services/drywall-plastering"
              className="block transition-transform hover:scale-[1.02] duration-300 w-full"
          >
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Drywall & Plastering</h3>
              <p className="text-gray-600">Flawless walls, perfect foundations. We specialize in expert drywall installation, repairs, and high-end plaster finishing, ensuring seamless, smooth surfaces for paint application. Whether fixing imperfections or preparing a space for a luxury finish, our craftsmanship delivers structural integrity and aesthetic perfection.</p>
            </div>
          </Link>

          <Link
              href="/services/wall-covering"
              className="block transition-transform hover:scale-[1.02] duration-300 w-full"
          >
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Wall Covering</h3>
              <p className="text-gray-600">Enhance your walls with premium wall coverings that add texture, elegance, and personality to any space. From luxury wallpapers to durable vinyl coverings, our expert team ensures precise application for a flawless, long-lasting finish. Whether you&apos;re looking to create a bold statement or a subtle, sophisticated ambiance, we provide customized solutions for both residential and commercial interiors. Elevate your walls with high-quality materials and professional craftsmanship for a refined, stylish look.</p>
            </div>
          </Link>

          <Link
              href="/services/fencing"
              className="block transition-transform hover:scale-[1.02] duration-300 w-full"
          >
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fencing</h3>
              <p className="text-gray-600">
                Define and secure your property with expertly crafted fencing solutions. We offer a variety of high-quality materials, including wood, vinyl, and metal, to match your aesthetic and functional needs. Whether you&apos;re looking for privacy, security, or a decorative boundary, our skilled team ensures precision installation for durability and visual appeal. Enhance your outdoor space with a custom fence that blends strength, style, and long-lasting performance.
              </p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
