"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";

function ProgressBarInner() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  // Complete progress on pathname change
  useEffect(() => {
    if (isNavigating || visible) {
      setProgress(100);
      const timer = setTimeout(() => {
        setVisible(false);
        setIsNavigating(false);
        setProgress(0);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Intercept all internal navigation clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, target="_blank", or hash-only links
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        href.startsWith("#") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check if it's the exact same path
      const targetPath = href.split("?")[0].split("#")[0];
      const currentPath = window.location.pathname;
      if (targetPath === currentPath && !href.includes("?")) return;

      // Start loading bar immediately!
      setVisible(true);
      setIsNavigating(true);
      setProgress(20);

      const t1 = setTimeout(() => {
        setProgress((prev) => (prev < 65 ? 65 : prev));
      }, 120);

      const t2 = setTimeout(() => {
        setProgress((prev) => (prev < 88 ? 88 : prev));
      }, 300);

      // Safety timeout: in case navigation is cancelled or instantaneous
      const t3 = setTimeout(() => {
        setProgress((prev) => {
          if (prev >= 88) return 95;
          return prev;
        });
      }, 1000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none h-[3.5px] bg-transparent overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-red-600 via-red-500 to-brand-400 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(239,68,68,0.9),0_0_6px_rgba(239,68,68,0.6)]"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}

export default function AppProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarInner />
    </Suspense>
  );
}
