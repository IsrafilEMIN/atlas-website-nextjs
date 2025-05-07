/* pages/pricing.tsx  –  quick‑fix version that ONLY handles
   interior‑painting estimates (standard / premium / luxury)   */

   import { motion } from "framer-motion";
   import { Card } from "@/components/ui/card";
   import { Button } from "@/components/ui/button";
   import { Input } from "@/components/ui/input";
   import { Label } from "@/components/ui/label";
   import {
     Select,
     SelectTrigger,
     SelectValue,
     SelectContent,
     SelectItem
   } from "@/components/ui/select";
   import { useState } from "react";
   import Header from "@/components/layout/Header";
   import Head from "next/head";
   
   /* ────────────────────────────────────────────────────────── */
   /*  Data & helpers                                           */
   /* ────────────────────────────────────────────────────────── */
   
   const rates = {
     standard: 3,
     premium: 4,
     luxury: 5
   } as const; // interior‑painting $/sq ft
   
   type Quality = keyof typeof rates;
   
   const isPositiveNumber = (value: string) => parseFloat(value) > 0;
   
   /* ────────────────────────────────────────────────────────── */
   /*  Component                                                */
   /* ────────────────────────────────────────────────────────── */
   
   export default function Pricing() {
     /* form state */
     const [paintQuality, setPaintQuality] = useState<Quality | "">("");
     const [squareFeet, setSquareFeet] = useState("");
     const [rooms, setRooms] = useState("");
   
     /* is everything filled in? */
     const ready =
       paintQuality &&
       isPositiveNumber(squareFeet) &&
       isPositiveNumber(rooms);
   
     /* estimate calc */
     const estimate = (() => {
       if (!ready) return 0;
       const sqft = parseFloat(squareFeet);
       const numRooms = parseInt(rooms);
       const basePrice = sqft * rates[paintQuality as Quality];
       const roomComplexity = numRooms * 100; // flat $100 / room
       return basePrice + roomComplexity;
     })();
   
     /* schema for SEO (unchanged) */
     const schemaPayload = {
       "@context": "https://schema.org",
       "@graph": [
         {
           "@type": "WebPage",
           "@id": "https://atlas-paint.com/pricing",
           url: "https://atlas-paint.com/pricing",
           name: "Pricing - Atlas HomeServices",
           description:
             "View pricing for our interior painting services and get an instant estimate."
         }
       ]
     };
   
     /* ─────────────────────────────────────────────────────── */
   
     return (
       <div className="min-h-screen bg-white">
         <Head>
           <script
             type="application/ld+json"
             dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPayload) }}
           />
           <link rel="canonical" href="https://atlas-paint.com/pricing/" />
           <title>
             Interior Painting Estimate | Atlas HomeServices – Get a Free Quote
           </title>
           <meta
             name="description"
             content="Instantly calculate the cost of interior painting for your home. Standard, premium, or luxury finishes – see your estimate in seconds."
           />
         </Head>
   
         <Header />
   
         <div className="container mx-auto px-6 pt-32 pb-16">
           <div className="max-w-4xl mx-auto">
             <motion.h1
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-4xl font-bold text-gray-900 mb-8"
             >
               Interior Painting Cost Calculator
             </motion.h1>
   
             <Card className="p-6 bg-white shadow-lg border border-gray-200">
               <div className="space-y-6">
                 {/* inputs */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <Label htmlFor="sqft" className="text-gray-900">
                       Square Footage
                     </Label>
                     <Input
                       id="sqft"
                       type="number"
                       min="0"
                       placeholder="Enter total square feet"
                       value={squareFeet}
                       onChange={(e) => setSquareFeet(e.target.value)}
                       className="bg-white text-gray-900 border-gray-300"
                     />
                   </div>
   
                   <div className="space-y-2">
                     <Label htmlFor="rooms" className="text-gray-900">
                       Number of Rooms
                     </Label>
                     <Input
                       id="rooms"
                       type="number"
                       min="0"
                       placeholder="Number of rooms"
                       value={rooms}
                       onChange={(e) => setRooms(e.target.value)}
                       className="bg-white text-gray-900 border-gray-300"
                     />
                   </div>
                 </div>
   
                 {/* paint quality */}
                 <div className="space-y-2">
                   <Label className="text-gray-900">Paint Quality</Label>
                   <Select
                     value={paintQuality}
                     onValueChange={(v) => setPaintQuality(v as Quality)}
                   >
                     <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                       <SelectValue placeholder="Select paint quality" />
                     </SelectTrigger>
                     <SelectContent className="bg-white text-gray-900 z-50">
                       <SelectItem value="standard">Standard</SelectItem>
                       <SelectItem value="premium">Premium</SelectItem>
                       <SelectItem value="luxury">Luxury</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
   
                 {/* estimate */}
                 <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                   <h3 className="text-xl font-semibold text-gray-900 mb-4">
                     Estimated Cost
                   </h3>
                   <p className="text-3xl font-bold text-gray-900">
                     ${estimate.toFixed(2)}
                   </p>
                   <p className="text-sm text-gray-500 mt-2">
                     This is a rough estimate. Final price may vary based on
                     project specifics.
                   </p>
                 </div>
   
                 <Button
                   disabled={!ready}
                   className="w-full bg-[#162733] hover:bg-[#162733]/80 text-[#D8C6A1]"
                   onClick={() => (window.location.href = "/booking")}
                 >
                   Schedule a Consultation
                 </Button>
               </div>
             </Card>
           </div>
         </div>
       </div>
     );
   }
   