// components/layout/ClientOnlyLocation.tsx
import { useLocation } from "wouter";

export default function ClientOnlyLocation() {
  const [location] = useLocation();
  return <span>{location}</span>;
}
