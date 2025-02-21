"use client";
import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch((error) => console.log("Auto-play blocked:", error));
        }
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
        >
            <source src="/assets/hero-background.webm" type="video/webm" />
            <source src="/assets/hero-background.mp4" type="video/mp4" />
        </video>
    );
}
