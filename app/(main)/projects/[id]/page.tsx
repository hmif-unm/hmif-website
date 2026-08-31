import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";

export const revalidate = 300;

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#060a14]">
      <article className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium mb-8 transition-colors hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Karya
        </Link>

        {/* Hero Header */}
        <header className="mb-12">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight break-words">
              {project.title}
            </h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                Dipublikasikan pada {new Date(project.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric", month: "long", year: "numeric"
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Massive Hero Image */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <Image 
            src={project.image_url} 
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="prose prose-invert prose-lg max-w-none text-slate-300 font-serif leading-relaxed mb-16 whitespace-pre-wrap break-words">
          {project.description}
        </div>

        {/* Call to Action */}
        {project.link && (
          <div className="flex justify-center border-t border-white/10 pt-12">
            <Link 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
            >
              Kunjungi Proyek <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        )}
      </article>
    </main>
  );
}
