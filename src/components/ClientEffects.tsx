"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import CustomCursor from "./animations/CustomCursor";

export default function ClientEffects() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsDesktop(window.innerWidth >= 768);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <LoadingScreen />
      {isDesktop && <CustomCursor />}
    </>
  );
}
