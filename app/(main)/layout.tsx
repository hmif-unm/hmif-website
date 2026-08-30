import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SuccessToast } from "@/components/ui/SuccessToast";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://hmif-unm.vercel.app"),

  title: {
    default: "HMIF Universitas Nusa Mandiri",
    template: "%s | HMIF Universitas Nusa Mandiri",
  },

  description:
    "Himpunan Mahasiswa Informatika Universitas Nusa Mandiri.",

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://hmif-unm.vercel.app",
    siteName: "HMIF Universitas Nusa Mandiri",
    title: "HMIF Universitas Nusa Mandiri",
    description:
      "Himpunan Mahasiswa Informatika Universitas Nusa Mandiri.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HMIF Universitas Nusa Mandiri",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HMIF Universitas Nusa Mandiri",
    description:
      "Himpunan Mahasiswa Informatika Universitas Nusa Mandiri.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

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