"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RefreshHandler() {
  const router = useRouter();

  useEffect(() => {
    try {
      const navEntries = (performance as any).getEntriesByType
        ? (performance as any).getEntriesByType("navigation")
        : [];
      const navType = navEntries?.[0]?.type;

      // Redirect to '/' only when the browser performed a full reload.
      if (navType === "reload") {
        router.replace("/");
      }
    } catch (e) {
      // ignore errors
    }
    // run only once on mount
  }, [router]);

  return null;
}
