import { motion } from "framer-motion";
import Head from "next/head";
import * as React from "react";

export default function Fencing() {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <link rel="canonical" href="https://www.atlas-paint.com/services/fencing" />
                <title>
                    Fencing Services in Toronto, Mississauga, Vaughan, Hamilton, Markham, Oakville, Richmond Hill, Burlington, Niagara Falls, and St. Catharines
                </title>
                <meta
                    name="description"
                    content="High-quality fencing installation and repair services in Toronto, Mississauga, Vaughan, Hamilton, Markham, Oakville, Richmond Hill, Burlington, Niagara Falls, and St. Catharines."
                />
            </Head>

            <div className="container mx-auto px-6 pt-32 pb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-gray-900 mb-8"
                >
                    Fencing Services
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-600 mb-8"
                >
                    Enhance your property&apos;s security, privacy, and curb appeal with
                    our professional fencing services. From wood and vinyl to wrought iron,
                    we offer custom designs and installations that stand the test of time.
                </motion.p>

                {/* Toronto */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Fencing in Toronto
                    </h2>
                    <p className="text-gray-600">
                        Secure your Toronto home or business with a durable,
                        stylish fence. Our experts handle design, installation,
                        and repairs, ensuring your fence complements the property
                        while meeting local regulations. Wood, metal, or vinyl—our
                        team has the expertise to execute your vision.
                    </p>
                </motion.div>

                {/* Mississauga */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-10"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Fencing in Mississauga
                    </h2>
                    <p className="text-gray-600">
                        For Mississauga properties, we deliver quality fencing solutions
                        that blend aesthetics and functionality. Whether you want a
                        private backyard oasis or a sturdy commercial perimeter,
                        our team ensures a smooth, efficient installation from start
                        to finish.
                    </p>
                </motion.div>

                {/* Vaughan */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-10"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Fencing in Vaughan
                    </h2>
                    <p className="text-gray-600">
                        Protect and beautify your Vaughan property with our range
                        of fence options, including decorative metal designs and
                        traditional wood. Our goal is to combine style and durability,
                        giving you a fence that suits your taste and stands strong
                        against the elements.
                    </p>
                </motion.div>

                {/* Hamilton */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-10"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Fencing in Hamilton
                    </h2>
                    <p className="text-gray-600">
                        From backyard privacy fences to industrial security fencing,
                        we serve Hamilton clients with high-quality materials and
                        expert craftsmanship. Our installations are built to withstand
                        harsh conditions, ensuring long-lasting protection and peace of mind.
                    </p>
                </motion.div>

                {/* Markham */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-10"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Fencing in Markham
                    </h2>
                    <p className="text-gray-600">
                        Create a welcoming yet secure boundary around your Markham home
                        or office. Our fencing options span everything from modern
                        composite materials to classic wooden picket fences,
                        all installed with close attention to detail and local building codes.
                    </p>
                </motion.div>

                {/* Oakville */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mb-10"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Fencing in Oakville
                    </h2>
                    <p className="text-gray-600">
                        Enhance your Oakville property&apos;s curb appeal with a
                        beautifully designed fence. We can match your home&apos;s
                        architectural style or provide a unique statement piece,
                        all while delivering top-notch installation and durability.
                    </p>
                </motion.div>

                {/* Richmond Hill */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-10"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Fencing in Richmond Hill
                    </h2>
                    <p className="text-gray-600">
                        Our Richmond Hill fencing services provide an ideal blend of
                        functionality and style. Whether you need a secure enclosure
                        for pets and children or a decorative boundary that enhances
                        your property&apos;s look, we have a solution tailored to your needs.
                    </p>
                </motion.div>

                {/* Burlington */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mb-10"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Fencing in Burlington
                    </h2>
                    <p className="text-gray-600">
                        Burlington homeowners and businesses rely on us for reliable,
                        high-quality fencing that boosts security without compromising
                        on aesthetics. Count on our dedicated team for flawless
                        installations, repairs, and maintenance.
                    </p>
                </motion.div>

                {/* Niagara Falls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="mb-10"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Fencing in Niagara Falls
                    </h2>
                    <p className="text-gray-600">
                        Surround your Niagara Falls property with a fence that combines
                        function and style. From ornate wrought iron designs to
                        low-maintenance vinyl solutions, we offer a range of options
                        to protect and beautify your outdoor space.
                    </p>
                </motion.div>

                {/* St. Catharines */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="mb-10"
                >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Fencing in St. Catharines
                    </h2>
                    <p className="text-gray-600">
                        Our fencing solutions in St. Catharines offer durability,
                        privacy, and visual appeal. We use top-quality materials
                        and proven techniques to ensure every installation stands
                        strong and looks great for years to come.
                    </p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="text-gray-600"
                >
                    Ready to upgrade your fence or install a brand-new one? Contact us
                    for a consultation. We&apos;ll help you choose the right materials
                    and design to match your property&apos;s style, all while
                    prioritizing safety, durability, and aesthetic appeal.
                </motion.p>
            </div>
        </div>
    );
}
