import {motion} from "framer-motion";
import Head from "next/head";
import React from "react";

interface ServicePageProps {
    title: string;
    metaDescription: string;
    heading: string;
    introParagraph: string;
    services: { title: string; description: string }[];
    locations: string[];
}

// const locations = [
//     "Toronto",
//     "Mississauga",
//     "Vaughan",
//     "Hamilton",
//     "Markham",
//     "Oakville",
//     "Richmond Hill",
//     "Burlington",
//     "Niagara Falls",
//     "St. Catharines",
// ];

const ServicePage: React.FC<ServicePageProps> = ({
                                                     title,
                                                     metaDescription,
                                                     heading,
                                                     introParagraph,
                                                     services,
                                                     locations,
                                                 }) => {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>{title} | Atlas Painting</title>
                <meta name="description" content={metaDescription}/>
            </Head>

            <ServicePage
                title="Commercial Painting Services"
                metaDescription="Atlas Painting provides top-tier commercial painting services in Toronto and nearby areas. Improve your business appearance with professional results."
                heading="Professional Commercial Painting"
                introParagraph="Atlas Painting offers professional commercial painting services to businesses looking to enhance their brand image and maintain their properties."
                services={[
                    {
                        title: "Interior Commercial Painting",
                        description: "Expert interior painting tailored to your business space, minimizing disruptions and ensuring outstanding results."
                    },
                    {
                        title: "Exterior Commercial Painting",
                        description: "Durable exterior painting that enhances the professional appearance and protects your commercial property."
                    },
                ]}
                locations={locations}
            />

            <div className="container mx-auto px-6 pt-32 pb-16">
                <motion.section
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2}}
                    className="mb-16"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">{heading}</h1>
                    <p className="text-gray-600 mb-6">{introParagraph}</p>

                    {services.map((service) => (
                        <div key={service.title} className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                {service.title}
                            </h2>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Service Areas
                    </h2>
                    <ul className="list-disc list-inside text-gray-600">
                        {locations.map((city) => (
                            <li key={city}>{city}</li>
                        ))}
                    </ul>
                </motion.section>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5}}
                    className="mt-12 text-gray-600"
                >
                    <p>
                        Contact Atlas Painting today for professional services and a free
                        consultation.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

// Example usage for each service:

// Drywall & Plastering
// <ServicePage
//   title="Drywall & Plastering Services"
//   metaDescription="Reliable drywall and plastering services in Toronto and the surrounding regions. Trust Atlas Painting for seamless results every time."
//   heading="Expert Drywall & Plastering"
//   introParagraph="Our skilled team specializes in drywall and plastering solutions, delivering seamless finishes and exceptional durability."
//   services={[
//     { title: "Drywall Installation & Repair", description: "High-quality drywall installation and professional repairs for a flawless look." },
//     { title: "Plastering Services", description: "Expert plastering that ensures smooth and long-lasting surfaces." },
//   ]}
//   locations={locations}
// />

// Wall Covering
// <ServicePage
//   title="Wall Covering Services"
//   metaDescription="Transform your space with professional wall covering services from Atlas Painting, proudly serving Toronto and surrounding areas."
//   heading="Premium Wall Covering Solutions"
//   introParagraph="Atlas Painting offers sophisticated wall covering services to transform your interiors, providing both aesthetic appeal and practicality."
//   services={[
//     { title: "Wallpaper Installation", description: "Professional wallpaper installation for striking visual impact." },
//     { title: "Custom Wall Treatments", description: "Unique and customized wall coverings tailored to your style and needs." },
//   ]}
//   locations={locations}
// />

// Fencing
// <ServicePage
//   title="Fencing Services"
//   metaDescription="Professional fencing solutions by Atlas Painting, enhancing privacy, security, and curb appeal in Toronto and neighboring communities."
//   heading="Reliable Fencing Solutions"
//   introParagraph="Secure your property with expertly installed fencing. Atlas Painting provides durable fencing solutions for residential and commercial properties."
//   services={[
//     { title: "Fence Installation", description: "Custom fence installation designed for style, security, and longevity." },
//     { title: "Fence Repair & Maintenance", description: "Comprehensive fence repair services to maintain durability and appearance." },
//   ]}
//   locations={locations}
// />

export default ServicePage;