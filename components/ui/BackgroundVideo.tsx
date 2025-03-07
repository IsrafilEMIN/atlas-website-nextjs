"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BackgroundVideo() {
    // Type the ref as HTMLVideoElement for video element access
    const videoRef = useRef<HTMLVideoElement>(null);
    // Type the state as boolean to track video errors
    const [videoError, setVideoError] = useState<boolean>(false);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handleCanPlay = () => {
                video.play()
                    .then(() => {
                        console.log("Video started playing");
                    })
                    .catch((error) => {
                        console.error("Play error:", error);
                        setVideoError(true); // Trigger fallback if play fails
                    });
            };

            const handleError = (e: Event) => {
                console.error("Video error:", e);
                setVideoError(true); // Trigger fallback if video encounters an error
            };

            // Add event listeners
            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('error', handleError);

            // Cleanup event listeners on unmount
            return () => {
                video.removeEventListener('canplay', handleCanPlay);
                video.removeEventListener('error', handleError);
            };
        }
    }, []);

    // Render fallback GIF if there’s an error
    if (videoError) {
        return (
            <Image
                src="/assets/fallback-background.gif" // Replace with your fallback asset path
                alt="Background Fallback"
                className="object-cover w-full h-full"
            />
        );
    }

    // Render the video element
    return (
        <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline // Added for older iOS compatibility
            preload="auto"
            className="object-cover w-full h-full"
        >
            <source src="/assets/hero-background.mp4" type="video/mp4" />
            {/*/!* Optional: WebM format for broader browser support *!/*/}
            {/*<source src="/assets/hero-background.webm" type="video/webm" />*/}
        </video>
    );
}