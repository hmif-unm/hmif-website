"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updatePointerType = () => setIsFinePointer(mediaQuery.matches);

    updatePointerType();
    mediaQuery.addEventListener("change", updatePointerType);

    return () => mediaQuery.removeEventListener("change", updatePointerType);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const moveCursor = (event: PointerEvent) => {
      const transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;

      if (dotRef.current) {
        dotRef.current.style.transform = transform;
        dotRef.current.style.opacity = "1";
      }

      if (ringRef.current) {
        ringRef.current.style.transform = transform;
        ringRef.current.style.opacity = "1";
      }

      const target = event.target;
      const nextIsHovering =
        target instanceof Element && Boolean(target.closest("a, button, input, select, textarea"));

      if (nextIsHovering !== isHoveringRef.current) {
        isHoveringRef.current = nextIsHovering;
        setIsHovering(nextIsHovering);
      }
    };

    const hideCursor = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", moveCursor);
    document.addEventListener("pointerleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerleave", hideCursor);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[60] h-8 w-8 pointer-events-none opacity-0 transition-[transform,opacity] duration-150 ease-out will-change-transform"
      >
        <div
          className={`h-full w-full rounded-full border transition-[transform,border-color,background-color] duration-150 ${
            isHovering
              ? "scale-150 border-brand-400 bg-brand-500/10"
              : "scale-100 border-brand-500/50 bg-transparent"
          }`}
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[60] h-2 w-2 pointer-events-none opacity-0 will-change-transform"
      >
        <div
          className={`h-full w-full rounded-full bg-brand-400 transition-transform duration-75 ${
            isHovering ? "scale-0" : "scale-100"
          }`}
        />
      </div>
    </>
  );
}
