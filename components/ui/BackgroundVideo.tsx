"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS compatibility fix — set attribute manually to avoid React warning
    video.setAttribute("webkit-playsinline", "true");

    const handleCanPlay = () => {
      video.play().catch((error) => {
        console.error("Play error:", error);
        setVideoError(true);
      });
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
      setVideoError(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  if (videoError) {
    return (
      <Image
        src="/assets/fallback-background.gif"
        alt="Background fallback"
        className="object-cover w-full h-full"
        fill
        sizes="100vw"
        priority
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="object-cover w-full h-full"
    >
      <source src="/assets/hero-background.mp4" type="video/mp4" />
    </video>
  );
}
