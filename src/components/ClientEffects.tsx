"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function ClientEffects() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <LoadingScreen />;
}
