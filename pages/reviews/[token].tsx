"use client";

import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import Head from "next/head";
import { FormProvider, useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import { insertReviewSchema } from "@lib/shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { Textarea } from "@components/ui/textarea";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { token } = context.params!;
    const reviewToken = await prisma.reviewToken.findUnique({
        where: { token: String(token) },
        include: { customer: true },
    });

    if (!reviewToken || reviewToken.used || reviewToken.expiryTime < new Date()) {
        return { notFound: true };
    }

    return {
        props: {
            token: reviewToken.token,
            customerName: reviewToken.customer?.name || "",
        },
    };
};

type ReviewFormValues = z.infer<typeof insertReviewSchema> & {
    rating: number;
};

export default function ReviewPage({
                                       token,
                                       customerName,
                                   }: {
    token: string;
    customerName: string;
}) {
    console.log("ReviewPage component is loading in the browser...");
    const { toast } = useToast() as {
        toast: (config: { title: string; description: string; variant?: string }) => void;
    };
    const [submitting, setSubmitting] = useState(false);
    // Removed local state for rating since we rely on react-hook-form

    const formMethods = useForm<ReviewFormValues>({
        resolver: zodResolver(insertReviewSchema),
        mode: "onSubmit",
        defaultValues: {
            customerName: customerName, // pre-populate from props
            rating: 5,
            comment: "",
            serviceType: "",
        },
    });

    const onSubmit: SubmitHandler<ReviewFormValues> = async (data) => {
        console.log("onSubmit triggered with data:", data);
        setSubmitting(true);
        try {
            // Use data from react-hook-form directly
            const response = await fetch("/api/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    rating: data.rating,
                    comment: data.comment,
                    serviceType: data.serviceType,
                }),
            });
            console.log("API response status:", response.status);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit review");
            }
            toast({
                title: "Success",
                description: "Review submitted successfully!",
            });
            formMethods.reset();
        } catch (error) {
            console.error("Error submitting review:", error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Error submitting review",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const onError: SubmitErrorHandler<ReviewFormValues> = (errors) => {
        console.log("Validation errors:", errors);
    };

    return (
        <>
            <Head>
                <title className="text-4xl font-bold text-gray-900 mb-8">Leave a Review</title>
            </Head>
            <div className="min-h-screen bg-white text-black">
                <div className="max-w-2xl mx-auto px-4 pt-24 pb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        Leave a Review
                    </h1>
                    <p className="text-gray-600 mb-8">
                        We value your feedback! Please fill out the form below to share your experience.
                    </p>
                    <FormProvider {...formMethods}>
                        <form onSubmit={formMethods.handleSubmit(onSubmit, onError)} className="space-y-6">
                            {/* Rating Dropdown */}
                            <FormField
                                control={formMethods.control}
                                name="rating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-900">Rating (1-5)</FormLabel>
                                        <Select
                                            onValueChange={(value: string) => {
                                                field.onChange(Number(value));
                                            }}
                                            defaultValue={String(field.value)}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-white text-gray-900 border-gray-300 rounded-md">
                                                    <SelectValue placeholder="Select a rating" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent side="bottom" position="popper" className="bg-white text-gray-900 z-50">
                                                {["5", "4", "3", "2", "1"].map((val) => (
                                                    <SelectItem key={val} value={val} className="rounded-md hover:bg-black hover:text-white">
                                                        {val}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Comment Field */}
                            <FormField
                                control={formMethods.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-900">Comment</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter your comment..."
                                                {...field}
                                                value={field.value ?? ""}
                                                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows={5}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Service Type Dropdown */}
                            <FormField
                                control={formMethods.control}
                                name="serviceType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-900">Service Type</FormLabel>
                                        <Select
                                            onValueChange={(value: string) => {
                                                field.onChange(value);
                                            }}
                                            defaultValue={field.value || ""}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-white text-gray-900 border-gray-300 rounded-md">
                                                    <SelectValue placeholder="Select a service" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent side="bottom" position="popper" className="bg-white text-gray-900 z-50">
                                                <SelectItem className="rounded-md hover:bg-black hover:text-white" value="RESIDENTIAL">
                                                    Residential Painting
                                                </SelectItem>
                                                <SelectItem className="rounded-md hover:bg-black hover:text-white" value="COMMERCIAL">
                                                    Commercial Painting
                                                </SelectItem>
                                                <SelectItem className="rounded-md hover:bg-black hover:text-white" value="EXTERIOR">
                                                    Exterior Painting
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={submitting}
                                onClick={() => console.log("Button onClick fired!")}
                                className="w-full bg-black hover:bg-black/80 text-white"
                            >
                                {submitting ? "Submitting..." : "Submit Review"}
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </>
    );
}
