"use client";

export default function BackgroundVideo() {
    return (
        <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
        >
            <source src="/assets/hero-background.mp4" type="video/mp4" />
        </video>
    );
}
