"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SuccessToast() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setToast("Data berhasil dipublikasikan!");
      
      const timer = setTimeout(() => {
        setToast(null);
        // Clean up URL without refreshing the page
        window.history.replaceState({}, '', pathname);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams, pathname]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c1322] border border-white/10 text-white px-6 py-3 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)] z-[100] flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
      <span className="font-medium text-sm">{toast}</span>
    </div>
  );
}
