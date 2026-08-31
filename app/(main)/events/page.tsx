import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Plus } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="min-h-screen pt-32 pb-20 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Acara & <span className="text-brand-500">Kegiatan</span>
        </h1>
        <p className="text-slate-300 mb-12 max-w-2xl text-lg">
          Jangan lewatkan berbagai seminar, workshop, dan kegiatan seru dari himpunan.
        </p>

        {events.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5">
            <h2 className="text-2xl text-slate-300 font-bold mb-2">Belum ada acara</h2>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <StaggerItem key={event.id} className="h-full">
                <Link href={`/events/${event.id}`} className="h-full block bg-[#0c1322] border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-brand-500/50 transition-colors hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(99,102,241,0.15)] group">
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={event.image_url} 
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      {event.status === "upcoming" ? "Akan Datang" : "Selesai"}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col min-w-0">
                    <div className="text-brand-400 text-xs font-bold mb-2 uppercase tracking-wide truncate">{event.category}</div>
                    <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-brand-300 transition-colors break-words">{event.title}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-slate-300">
                        <Calendar className="w-4 h-4 text-brand-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-300">
                        <Clock className="w-4 h-4 text-brand-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-300">
                        <MapPin className="w-4 h-4 text-brand-500" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 text-sm line-clamp-3 mt-auto border-t border-white/10 pt-4 break-words">
                      {event.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </main>
  );
}
