import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, Tag } from "lucide-react";
import { AdminActions } from "@/components/ui/AdminActions";

interface EventDetailProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailProps) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id }
  });

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#060a14]">
      <article className="container mx-auto px-4 max-w-5xl">
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium mb-8 transition-colors hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Acara
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content: Title, Image, Description */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="inline-block bg-brand-500/10 border border-brand-500/20 text-brand-400 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-4">
                  {event.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {event.title}
                </h1>
              </div>
              <AdminActions id={event.id} type="acara" redirectUrl="/events" />
            </div>

            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <Image 
                src={event.image} 
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm border border-white/20 text-white font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                {event.status === "upcoming" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Akan Datang
                  </span>
                ) : (
                  <span className="text-slate-300">Selesai</span>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Tentang Acara</h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </div>
            </div>
          </div>

          {/* Sidebar: Event Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-[#0c1322] border border-white/10 rounded-2xl p-5 sticky top-32 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-5">Detail Informasi</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 font-medium mb-0.5">Tanggal</div>
                    <div className="text-sm text-white font-medium">{event.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 font-medium mb-0.5">Waktu</div>
                    <div className="text-sm text-white font-medium">{event.time}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 font-medium mb-0.5">Lokasi</div>
                    <div className="text-sm text-white font-medium">{event.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <Tag className="w-4 h-4 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 font-medium mb-0.5">Kategori</div>
                    <div className="text-sm text-white font-medium">{event.category}</div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
