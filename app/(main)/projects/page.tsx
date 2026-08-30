import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="min-h-screen pt-32 pb-20 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Karya <span className="text-brand-500">Mahasiswa</span>
        </h1>
        <p className="text-slate-300 mb-12 max-w-2xl text-lg">
          Kumpulan portofolio, aplikasi, dan karya inovatif yang diciptakan oleh mahasiswa Teknik Informatika.
        </p>

        {projects.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5">
            <h2 className="text-2xl text-slate-300 font-bold mb-2">Belum ada karya</h2>
            <p className="text-slate-300">Klik ikon + di pojok kanan bawah untuk menambahkan karya pertama.</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <StaggerItem key={project.id} className="h-full">
                <Link href={`/projects/${project.id}`} className="group relative h-full block bg-[#0c1322] border border-white/10 rounded-2xl overflow-hidden hover:border-brand-500/50 transition-colors hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(99,102,241,0.15)]">
                  <div className="aspect-video relative overflow-hidden bg-[#0c1322]">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-300 text-sm line-clamp-3">{project.description}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

      <Link 
        href="/upload?type=karya"
        className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-brand-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-110 transition-transform"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </main>
  );
}
