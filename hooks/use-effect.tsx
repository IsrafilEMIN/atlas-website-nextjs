import { useEffect, useState } from "react";

export default function Header() {
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    setCurrentLocation(window.location.href);
  }, []);

  return <header>Current URL: {currentLocation}</header>;
}
