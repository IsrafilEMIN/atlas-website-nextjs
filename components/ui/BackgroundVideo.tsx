"use client";
import { useEffect, useRef, useState } from "react";

export default function BackgroundVideo() {
    // Type the ref as HTMLVideoElement for video element access
    const videoRef = useRef<HTMLVideoElement>(null);
    // Type the state as boolean to track video errors
    const [videoError, setVideoError] = useState<boolean>(false);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Attempt to play the video and handle errors
            video.play().catch(() => {
                setVideoError(true); // Trigger fallback if autoplay fails
            });

            // Check if the video is playing after 2 seconds
            const checkPlaying = setTimeout(() => {
                if (video.paused) {
                    setVideoError(true); // Trigger fallback if video isn’t playing
                }
            }, 2000);

            // Cleanup timeout on unmount
            return () => clearTimeout(checkPlaying);
        }
    }, []);

    // Render fallback GIF if there’s an error
    if (videoError) {
        return (
            <img
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
            {/* Optional: WebM format for broader browser support */}
            <source src="/assets/hero-background.webm" type="video/webm" />
        </video>
    );
}