import { Navbar } from "@/components/ui/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SuccessToast } from "@/components/ui/SuccessToast";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <CustomCursor />
      <Navbar />
      <main className="flex-1 pt-16 flex flex-col">
        {children}
      </main>
      {/* Footer can go here later */}
      <Suspense fallback={null}>
        <SuccessToast />
      </Suspense>
    </div>
  );
}
