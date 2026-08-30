import { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
}

export function StaggerContainer({ children, className = "" }: StaggerContainerProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  // Use native Tailwind CSS animations: animate-in, fade-in, and slide-in from bottom.
  // This is completely zero-JS and runs purely on the browser's CSS engine (GPU).
  return (
    <div className={`animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both ${className}`}>
      {children}
    </div>
  );
}
