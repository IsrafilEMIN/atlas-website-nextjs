import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insertBookingSchema } from "@/lib/shared/schema";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import Head from "next/head";
import * as React from "react";

type BookingFormValues = z.infer<typeof insertBookingSchema>;

export default function Booking() {
  const { toast } = useToast();

  // Initialize the form with the BookingFormValues type
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(insertBookingSchema),
    mode: "onSubmit",
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      serviceType: "",
      projectDetails: "",
      availableTime: "",
    },
  });

  // onSubmit now receives the form data (of type BookingFormValues) directly
  const onSubmit: SubmitHandler<BookingFormValues> = async (data) => {
    if (!data.availableTime) {
      toast({
        title: "Error",
        description: "Please enter your available time",
        className: "bg-white text-black",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          status: "pending",
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to book appointment");
      }

      // Reset form
      form.reset();

      toast({
        title: "Success",
        description: "Booking successful! We will contact you very soon. You will receive confirmation email.",
        className: "bg-white text-black",
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to book appointment. Please try again.",
        className: "bg-white text-black",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
        <Head>
            <title>Book a Painting Service | Schedule Your Project | Atlas Painting</title>
            <meta name="description" content="Ready for a transformation? Book a premium residential or commercial painting service with Atlas Painting today. Easy scheduling & expert results!" />
        </Head>
      <div className="container mx-auto px-6 pt-32 pb-16 relative">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-8"
          >
            Book an Appointment
          </motion.h1>

          {/* Booking Form */}
          <div className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Service Type */}
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent side="bottom" position="popper" className="bg-white text-gray-900 z-50">
                          <SelectItem className="rounded-md hover:bg-black hover:text-white" value="Residential Painting">Residential Painting</SelectItem>
                          <SelectItem className="rounded-md hover:bg-black hover:text-white" value="Commercial Painting">Commercial Painting</SelectItem>
                          <SelectItem className="rounded-md hover:bg-black hover:text-white" value="Exterior Painting">Exterior Painting</SelectItem>
                          <SelectItem className="rounded-md hover:bg-black hover:text-white" value="Wall Covering">Wall Covering</SelectItem>
                          <SelectItem className="rounded-md hover:bg-black hover:text-white" value="Drywall & Plastering">Drywall & Plastering</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500"/>
                    </FormItem>
                  )}
                />
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-white text-gray-900 border-gray-300" />
                      </FormControl>
                      <FormMessage className="text-red-500"/>
                    </FormItem>
                  )}
                />
                {/* Email */}
                <FormField
                  control={form.control}
                  name="customerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} className="bg-white text-gray-900 border-gray-300" />
                      </FormControl>
                      <FormMessage className="text-red-500"/>
                    </FormItem>
                  )}
                />
                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(555) 123-4567" {...field} className="bg-white text-gray-900 border-gray-300" />
                      </FormControl>
                      <FormMessage className="text-red-500"/>
                    </FormItem>
                  )}
                />
                {/* Available Time Field */}
                <FormField
                  control={form.control}
                  name="availableTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Available Time</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: anytime or Tue 10:00 - 14:00"
                          {...field}
                          value={field.value ?? ""}
                          className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500"/>
                    </FormItem>
                  )}
                />
                {/* Project Details */}
                <FormField
                  control={form.control}
                  name="projectDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Project Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your project (size, current condition, special requirements, etc.)"
                          className="h-32 bg-white text-gray-900 border-gray-300"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-black/80 text-white"
                >
                  Schedule Consultation
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}