"use client";

import { motion } from "framer-motion";
import { FlipCard } from "@/components/ui/FlipCard";
import { Users, Target, Rocket } from "lucide-react";

const pengurus = [
  // Badan Pengurus Inti
  { name: "Nizar", role: "Ketua Himpunan", category: "BPI", image: "https://ui-avatars.com/api/?name=Nizar&background=6366f1&color=fff&size=500", bio: "Memimpin dan mengayomi seluruh elemen himpunan.", techStack: ["Leadership", "Management"] },
  { name: "Farros", role: "Wakil Ketua", category: "BPI", image: "https://ui-avatars.com/api/?name=Farros&background=4f46e5&color=fff&size=500", bio: "Mendampingi ketua dan memastikan roda organisasi berjalan.", techStack: ["Next.js", "Problem Solving"] },
  { name: "Zulfa Naura", role: "Sekretaris 1", category: "BPI", image: "https://ui-avatars.com/api/?name=Zulfa+Naura&background=312e81&color=fff&size=500", bio: "Mengelola administrasi dan persuratan organisasi.", techStack: ["Administration", "Docs"] },
  { name: "Syifa Aisyah", role: "Sekretaris 2", category: "BPI", image: "https://ui-avatars.com/api/?name=Syifa+Aisyah&background=312e81&color=fff&size=500", bio: "Mengelola administrasi dan kearsipan himpunan.", techStack: ["Administration", "Notion"] },
  { name: "Afra Nur Rafifah", role: "Bendahara", category: "BPI", image: "https://ui-avatars.com/api/?name=Afra+Nur&background=1e1b4b&color=fff&size=500", bio: "Mengatur dan mengawasi sirkulasi keuangan HMIF.", techStack: ["Finance", "Excel"] },
  
  // Koordinator Divisi
  { name: "M. Guntur Ilham", role: "Koordinator Divisi", category: "Koordinator", image: "https://ui-avatars.com/api/?name=Guntur+Ilham&background=0ea5e9&color=fff&size=500", bio: "Mengkoordinasi sinergi antar divisi.", techStack: ["Coordination", "Agile"] },
  { name: "Azmi Rama", role: "Koordinator Divisi", category: "Koordinator", image: "https://ui-avatars.com/api/?name=Azmi+Rama&background=0284c7&color=fff&size=500", bio: "Memastikan program kerja tiap divisi berjalan lancar.", techStack: ["Monitoring", "Teamwork"] },

  // PIC (Ketua Divisi)
  { name: "Nurima Agusnita", role: "Ketua Divisi Humas", category: "PIC Divisi", image: "https://ui-avatars.com/api/?name=Nurima+Agusnita&background=10b981&color=fff&size=500", bio: "Menjaga relasi dan komunikasi publik HMIF.", techStack: ["Public Relations", "Communication"] },
  { name: "Rofi Ahnaf Fahrezi", role: "Ketua Divisi PDD", category: "PIC Divisi", image: "https://ui-avatars.com/api/?name=Rofi+Ahnaf&background=f59e0b&color=fff&size=500", bio: "Menangani publikasi, dekorasi, dan dokumentasi.", techStack: ["Design", "Photography"] },
  { name: "Reza Rabbani", role: "Ketua Divisi Keilmuan", category: "PIC Divisi", image: "https://ui-avatars.com/api/?name=Reza+Rabbani&background=3b82f6&color=fff&size=500", bio: "Meningkatkan kualitas akademik dan keilmuan mahasiswa.", techStack: ["Education", "Research"] },
  { name: "Andriyan Maulana", role: "Ketua Divisi R&T", category: "PIC Divisi", image: "https://ui-avatars.com/api/?name=Andriyan+Maulana&background=8b5cf6&color=fff&size=500", bio: "Memimpin riset dan pengembangan teknologi HMIF.", techStack: ["AI", "Software Dev"] },
  { name: "Ana Aqela S.K", role: "Ketua Divisi Acara", category: "PIC Divisi", image: "https://ui-avatars.com/api/?name=Ana+Aqela&background=ec4899&color=fff&size=500", bio: "Merancang dan mengeksekusi acara-acara besar himpunan.", techStack: ["Event Management", "Planning"] },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Hero Photo — full bleed, tall */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/DSCF0895.JPG')" }}
        />
        {/* only a very subtle bottom fade so the section below reads cleanly */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/80 via-transparent to-transparent" />
      </section>

      {/* Tentang HMIF — sits below the photo */}
      <section className="container mx-auto px-6 max-w-3xl text-center pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500">HMIF</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
            Kami adalah komunitas mahasiswa pembelajar, pembangun, dan inovator.
            Membentuk masa depan teknologi melalui kolaborasi dan kode.
          </p>
        </motion.div>
      </section>

      {/* Visi Misi Section */}
      <section className="container mx-auto px-6 mb-24 relative z-20 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 border border-white/10"
          >
            <div className="bg-brand-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-brand-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Visi</h3>
            <p className="text-slate-300 leading-relaxed">
              Menjadi wadah pengembangan potensi mahasiswa Informatika yang progresif, 
              adaptif terhadap perkembangan teknologi, dan berdaya saing global melalui 
              inovasi digital.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 border border-white/10"
          >
            <div className="bg-indigo-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <Rocket className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Misi</h3>
            <ul className="text-slate-300 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-brand-400 font-bold mt-0.5">•</span>
                Membangun ekosistem belajar yang kolaboratif.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 font-bold mt-0.5">•</span>
                Mewadahi riset dan pengembangan perangkat lunak mahasiswa.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400 font-bold mt-0.5">•</span>
                Mengabdi kepada masyarakat melalui solusi teknologi.
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Struktur Organisasi Section */}
      <section className="container mx-auto px-6 mt-32 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center bg-white/5 border border-white/10 rounded-full p-3 mb-6"
          >
            <Users className="w-6 h-6 text-brand-400" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Struktur Organisasi</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Di balik setiap program kerja dan inovasi, terdapat tim yang berdedikasi 
            tinggi. Kenali para penggerak HMIF tahun ini. (Arahkan kursor ke kartu!)
          </p>
        </div>

        <div className="flex flex-col items-center relative">
          {/* Central connecting line for the diagram effect */}
          <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-brand-500/50 via-brand-500/20 to-transparent -z-10 hidden md:block" />

          {/* Level 1: Ketua & Wakil */}
          <div className="w-full flex justify-center flex-wrap gap-8 mb-12 relative z-10">
            {pengurus.slice(0, 2).map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-full sm:w-[280px]"
              >
                <FlipCard {...person} />
              </motion.div>
            ))}
          </div>

          {/* Level 3: Sekretaris & Bendahara */}
          <div className="w-full flex justify-center flex-wrap gap-6 mb-12 relative z-10">
            {pengurus.slice(2, 5).map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + (index * 0.1) }}
                className="w-full sm:w-[280px]"
              >
                <FlipCard {...person} />
              </motion.div>
            ))}
          </div>

          {/* Level 4: Koordinator */}
          <div className="w-full flex justify-center flex-wrap gap-8 md:gap-32 mb-12 relative z-10">
            {pengurus.slice(5, 7).map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="w-full sm:w-[280px]"
              >
                <FlipCard {...person} />
              </motion.div>
            ))}
          </div>

          {/* Level 5: PIC Divisi */}
          <div className="w-full flex justify-center flex-wrap gap-4 relative z-10">
            {pengurus.slice(7).map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="w-full sm:w-[220px]"
              >
                <FlipCard {...person} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
