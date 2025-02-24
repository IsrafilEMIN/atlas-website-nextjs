
import { motion } from "framer-motion";
import Head from "next/head";
import * as React from "react";

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
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Residential Painting</h3>
            <p className="text-gray-600">Transform your home with timeless elegance. Our expert painters deliver flawless interior and exterior finishes, using high-quality, durable paints that enhance beauty and protect your space. Whether it’s a modern refresh or classic restoration, we bring precision, craftsmanship, and sophistication to every brushstroke.</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Commercial Painting</h3>
            <p className="text-gray-600">Elevate your business with a professional, high-end finish. From corporate offices to luxury retail spaces, we provide seamless, durable coatings designed to impress clients and enhance productivity. Our team works efficiently to minimize downtime, ensuring a flawless application with premium-grade, long-lasting materials.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Drywall & Plastering</h3>
            <p className="text-gray-600">Flawless walls, perfect foundations. We specialize in expert drywall installation, repairs, and high-end plaster finishing, ensuring seamless, smooth surfaces for paint application. Whether fixing imperfections or preparing a space for a luxury finish, our craftsmanship delivers structural integrity and aesthetic perfection.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Wall Covering</h3>
            <p className="text-gray-600">Enhance your walls with premium wall coverings that add texture, elegance, and personality to any space. From luxury wallpapers to durable vinyl coverings, our expert team ensures precise application for a flawless, long-lasting finish. Whether you&apos;re looking to create a bold statement or a subtle, sophisticated ambiance, we provide customized solutions for both residential and commercial interiors. Elevate your walls with high-quality materials and professional craftsmanship for a refined, stylish look.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
