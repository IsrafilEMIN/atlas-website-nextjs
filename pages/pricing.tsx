import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Head from "next/head";
import * as React from "react";

// Define the Rates interface for type safety
interface Rates {
  painting: {
    interior: { standard: number; premium: number; luxury: number };
    exterior: { standard: number; premium: number; luxury: number };
    commercial: { standard: number; premium: number; luxury: number };
  };
  drywall: {
    standard: number;
    fireResistant: number;
    moistureResistant: number;
  };
  plastering: {
    standard: number;
    decorative: number;
  };
  wallCovering: {
    standardWallpaper: number;
    premiumWallpaper: number;
    vinyl: number;
  };
}

export default function Pricing() {
  // State variables with type annotations
  const [service, setService] = useState<"painting" | "drywall" | "plastering" | "wallCovering" | "">("");
  const [subOption, setSubOption] = useState<string>("");
  const [paintQuality, setPaintQuality] = useState<"standard" | "premium" | "luxury" | "">("");
  const [squareFeet, setSquareFeet] = useState<string>("");
  const [rooms, setRooms] = useState<string>("");

  // Rates object with updated exterior painting rates
  const rates: Rates = {
    painting: {
      interior: { standard: 3.5, premium: 5, luxury: 7 },
      exterior: { standard: 3.0, premium: 4.0, luxury: 5.0 }, // Updated rates
      commercial: { standard: 4.5, premium: 6.5, luxury: 9 }
    },
    drywall: {
      standard: 3.0,
      fireResistant: 3.5,
      moistureResistant: 4.0
    },
    plastering: {
      standard: 2.75,
      decorative: 15.0
    },
    wallCovering: {
      standardWallpaper: 4.6,
      premiumWallpaper: 6.0,
      vinyl: 5.0
    }
  };

  // Helper function to check if all required fields are filled
  const isEstimateReady = (): boolean => {
    if (!service || !subOption) return false;
    if (service === "painting" && (!paintQuality || !squareFeet || parseFloat(squareFeet) <= 0 || !rooms || parseInt(rooms) < 0)) {
      return false;
    }
    if (service !== "painting" && (!squareFeet || parseFloat(squareFeet) <= 0)) {
      return false;
    }
    return true;
  };

  // Calculate estimate based on selected service, sub-option, and inputs
  const calculateEstimate = (): number => {
    if (!isEstimateReady()) return 0;

    const sqft = parseFloat(squareFeet) || 0;
    const numRooms = parseInt(rooms) || 0;

    let baseRate: number;
    if (service === "painting") {
      const paintingSubOptions = rates.painting;
      const subOptionKey = subOption as keyof typeof paintingSubOptions;
      const qualityOptions = paintingSubOptions[subOptionKey];
      const qualityKey = paintQuality as keyof typeof qualityOptions;
      baseRate = qualityOptions[qualityKey];
    } else {
      const serviceRates = rates[service as keyof Rates];
      const subOptionKey = subOption as keyof typeof serviceRates;
      baseRate = serviceRates[subOptionKey];
    }

    const basePrice = sqft * baseRate;
    const roomComplexityFactor = service === "painting" ? numRooms * 100 : 0;

    return basePrice + roomComplexityFactor;
  };

  const estimate = calculateEstimate();

  return (
      <div className="min-h-screen bg-white">
        <Head>
          <link rel="canonical" href="https://www.atlas-paint.com/pricing/" />
          <title>Get a Free Quote | Atlas HomeServices</title>
          <meta
              name="description"
              content="Explore our competitive pricing for residential & commercial painting, drywall installation, plastering, and wall covering services. Get a free quote today and transform your space with premium craftsmanship!"
          />
        </Head>
        <Header />
        <div className="container mx-auto px-6 pt-32 pb-16 relative">
          <div className="max-w-4xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-gray-900 mb-8"
            >
              Project Cost Calculator
            </motion.h1>

            <div className="space-y-6">
              <Card className="p-6 bg-white shadow-lg border border-gray-200">
                <div className="space-y-6">
                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-gray-900">Select Service</Label>
                    <Select onValueChange={(value) => {
                      setService(value as typeof service);
                      setSubOption("");
                      setPaintQuality("");
                    }} value={service}>
                      <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent side="bottom" position="popper" className="bg-white text-gray-900 z-50">
                        <SelectItem className="rounded-md hover:bg-black hover:text-white" value="painting">Painting</SelectItem>
                        <SelectItem className="rounded-md hover:bg-black hover:text-white" value="drywall">Drywall Installation</SelectItem>
                        <SelectItem className="rounded-md hover:bg-black hover:text-white" value="plastering">Plastering</SelectItem>
                        <SelectItem className="rounded-md hover:bg-black hover:text-white" value="wallCovering">Wall Covering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sub-Option Selection */}
                  {service && (
                      <div className="space-y-2">
                        <Label htmlFor="subOption" className="text-gray-900">Select Sub-Option</Label>
                        <Select onValueChange={setSubOption} value={subOption}>
                          <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                            <SelectValue placeholder="Select a sub-option" />
                          </SelectTrigger>
                          <SelectContent side="bottom" position="popper" className="bg-white text-gray-900 z-50">
                            {service === "painting" && (
                                <>
                                  <SelectItem className="rounded-md hover:bg-black hover:text-white" value="interior">Interior Painting</SelectItem>
                                  <SelectItem className="rounded-md hover:bg-black hover:text-white" value="exterior">Exterior Painting</SelectItem>
                                  <SelectItem className="rounded-md hover:bg-black hover:text-white" value="commercial">Commercial Painting</SelectItem>
                                </>
                            )}
                            {service === "drywall" && (
                                <>
                                  <SelectItem className="rounded-md hover:bg-black hover:text-white" value="standard">Standard Drywall</SelectItem>
                                  <SelectItem className="rounded-md hover:bg-black hover:text-white" value="fireResistant">Fire-Resistant Drywall</SelectItem>
                                  <SelectItem className="rounded-md hover:bg-black hover:text-white" value="moistureResistant">Moisture-Resistant Drywall</SelectItem>
                                </>
                            )}
                            {service === "plastering" && (
                                <>
                                  <SelectItem className="rounded-md hover:bg-black hover:text-white" value="standard">Standard Plastering</SelectItem>
                                  <SelectItem className="rounded-md hover:bg-black hover:text-white" value="decorative">Decorative Plastering</SelectItem>
                                </>
                            )}
                            {service === "wallCovering" && (
                                <>
                                  <SelectItem className="rounded-md hover:bg-black hover:text-white" value="standardWallpaper">Standard Wallpaper</SelectItem>
                                  <SelectItem className="rounded-md hover:bg-black hover:text-white" value="premiumWallpaper">Premium Wallpaper</SelectItem>
                                  <SelectItem className="rounded-md hover:bg-black hover:text-white" value="vinyl">Vinyl Wall Covering</SelectItem>
                                </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                  )}

                  {/* Inputs for Square Footage and Rooms */}
                  {service && subOption && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="sqft" className="text-gray-900">Square Footage</Label>
                          <Input
                              id="sqft"
                              type="number"
                              placeholder="Enter total square feet"
                              value={squareFeet}
                              onChange={(e) => setSquareFeet(e.target.value)}
                              className="bg-white text-gray-900 border-gray-300"
                          />
                        </div>
                        {service === "painting" && (
                            <div className="space-y-2">
                              <Label htmlFor="rooms" className="text-gray-900">Number of Rooms</Label>
                              <Input
                                  id="rooms"
                                  type="number"
                                  placeholder="Number of rooms"
                                  value={rooms}
                                  onChange={(e) => setRooms(e.target.value)}
                                  className="bg-white text-gray-900 border-gray-300"
                              />
                            </div>
                        )}
                      </div>
                  )}

                  {/* Paint Quality Selection */}
                  {service === "painting" && subOption && (
                      <div className="space-y-2">
                        <Label htmlFor="quality" className="text-gray-900">Paint Quality</Label>
                        <Select
                            onValueChange={(value) => setPaintQuality(value as "standard" | "premium" | "luxury")}
                            value={paintQuality || ""}
                        >
                          <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                            <SelectValue placeholder="Select paint quality" />
                          </SelectTrigger>
                          <SelectContent side="bottom" position="popper" className="bg-white text-gray-900 z-50">
                            <SelectItem className="rounded-md hover:bg-black hover:text-white" value="standard">Standard</SelectItem>
                            <SelectItem className="rounded-md hover:bg-black hover:text-white" value="premium">Premium</SelectItem>
                            <SelectItem className="rounded-md hover:bg-black hover:text-white" value="luxury">Luxury</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                  )}

                  {/* Estimate Display */}
                  {isEstimateReady() && (
                      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Estimated Cost</h3>
                        <p className="text-3xl font-bold text-gray-900">${estimate.toFixed(2)}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          This is a rough estimate. Final price may vary based on project specifics.
                        </p>
                      </div>
                  )}

                  <Button
                      className="w-full bg-black hover:bg-black/80 text-white mt-6"
                      onClick={() => window.location.href = "/booking"}
                  >
                    Schedule a Consultation
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
}