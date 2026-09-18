"use client";

import { motion } from "framer-motion";
import { FlipCard } from "@/components/ui/FlipCard";
import { Users, Target, Rocket } from "lucide-react";

const pengurus = [
  // Badan Pengurus Inti
  { name: "Nizar Qashid", role: "Ketua Himpunan", category: "BPI", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Ketua.JPG", bio: "Memimpin dan mengayomi seluruh elemen himpunan.", techStack: ["Leadership", "Management"] },
  { name: "Feby Rizki Muharram", role: "Wakil Ketua", category: "BPI", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Wakil%20Ketua.JPG", bio: "Mendampingi ketua dan memastikan roda organisasi berjalan.", techStack: ["Problem Solving"] },
  { name: "Zulfa Naura", role: "Sekretaris 1", category: "BPI", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Sek%20Nau.JPG", bio: "Mengelola administrasi dan persuratan organisasi.", techStack: ["Administration", "Docs"] },
  { name: "Syifa Aisyah", role: "Sekretaris 2", category: "BPI", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Sek%20Sipa.JPG", bio: "Mengelola administrasi dan kearsipan himpunan.", techStack: ["Administration", "Notion"] },
  { name: "Afra Nur Rafifah", role: "Bendahara", category: "BPI", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Bendahara.JPG", bio: "Mengatur dan mengawasi sirkulasi keuangan HMIF.", techStack: ["Finance", "Excel"] },
  
  // Advisor
  { name: "Farros Althaf", role: "Advisor Divisi", category: "Advisor", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Advisor.JPG", bio: "Mengkoordinasi sinergi antar divisi.", techStack: ["Advisor", "Agile"] },

  // Koordinator Divisi
  { name: "M. Guntur Ilham", role: "Koordinator Divisi", category: "Koordinator", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Kor%20Guntur.JPG", bio: "Mengkoordinasi sinergi antar divisi.", techStack: ["Coordination", "Agile"] },
  { name: "Azmi Rama", role: "Koordinator Divisi", category: "Koordinator", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Kor%20Azmi.JPG", bio: "Memastikan program kerja tiap divisi berjalan lancar.", techStack: ["Monitoring", "Teamwork"] },

  // PIC (Ketua Divisi / Koordinator Divisi)
  { name: "Nurima Agusnita", role: "Koordinator Humas", category: "PIC Divisi", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Kor%20Humas.JPG", bio: "Menjaga relasi dan komunikasi publik HMIF.", techStack: ["Public Relations", "Communication"] },
  { name: "Rofi Ahnaf Fahrezi", role: "Koordinator PDD", category: "PIC Divisi", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Kor%20Mekref.JPG", bio: "Menangani publikasi, dekorasi, dan dokumentasi.", techStack: ["Design", "Photography"] },
  { name: "Reza Rabbani", role: "Koordinator Keilmuan", category: "PIC Divisi", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Kor%20Keilmuan.JPG", bio: "Meningkatkan kualitas akademik dan keilmuan mahasiswa.", techStack: ["Education", "Research"] },
  { name: "Andriyan Maulana", role: "Koordinator Ristek", category: "PIC Divisi", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Kor%20Ristek.JPG", bio: "Memimpin riset dan pengembangan teknologi HMIF.", techStack: ["AI", "Software Dev"] },
  { name: "Ana Aqela S.K", role: "Koordinator Acara", category: "PIC Divisi", image: "https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/members/Kor%20Acara.JPG", bio: "Merancang dan mengeksekusi acara-acara besar himpunan.", techStack: ["Event Management", "Planning"] },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Hero Photo — full bleed with responsive framing and smooth fade out */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full aspect-[16/9] max-h-[85vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://raw.githubusercontent.com/hmif-unm/hmif-assets/refs/heads/main/about_us/Hmif%20Lengkap.JPG"
            alt="HMIF Anggota Lengkap"
            className="w-full h-full object-cover object-[center_18%]"
          />
          {/* Top subtle shadow for navbar readability */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050a14]/60 to-transparent pointer-events-none" />
          {/* Bottom fade out so there is no cut-off line */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050a14] from-10% via-[#050a14]/50 via-50% to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Tentang HMIF — sits below the photo */}
      <section className="container mx-auto px-6 max-w-3xl text-center pt-16 pb-10">
        <motion.div
          initial={false}
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 border border-white/10"
        >
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-brand-500/20 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <Target className="w-8 h-8 text-brand-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Visi</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-justify">
                Menjadikan himpunan mahasiswa informatika yang bersatu, profesional dan berkualitas demi mencapai visi misi program studi informatika dengan semangat juang yang responsif, progresif , inovatif.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-500/20 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <Rocket className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Misi</h3>
              </div>
              <ol className="text-slate-300 space-y-3 list-decimal text-justify pl-5">
                <li className="leading-relaxed text-justify pl-2">
                  <span className="font-semibold text-white">Menyelenggarakan Tridharma Perguruan Tinggi</span> dan aktif berpartisipasi dalam seluruh kegiatan kampus.
                </li>
                <li className="leading-relaxed text-justify pl-2">
                  <span className="font-semibold text-white">Membangun sinergi dan keharmonisan</span> antar-mahasiswa Informatika serta dengan organisasi mitra.
                </li>
                <li className="leading-relaxed text-justify pl-2">
                  <span className="font-semibold text-white">Menampung dan merealisasikan aspirasi</span> mahasiswa program studi Informatika secara efektif.
                </li>
                <li className="leading-relaxed text-justify pl-2">
                  <span className="font-semibold text-white">Menumbuhkan semangat juang</span> serta loyalitas seluruh mahasiswa terhadap himpunan.
                </li>
                <li className="leading-relaxed text-justify pl-2">
                  <span className="font-semibold text-white">Meningkatkan kompetensi hard skill dan soft skill</span> mahasiswa di bidang keinformatikaan.
                </li>
              </ol>
            </div>
          </div>
        </motion.div>
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
                initial={false}
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
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + (index * 0.1) }}
                className="w-full sm:w-[280px]"
              >
                <FlipCard {...person} />
              </motion.div>
            ))}
          </div>

          {/* Level 4: Advisor */}
          <div className="w-full flex justify-center flex-wrap gap-8 mb-12 relative z-10">
            {pengurus.slice(5, 6).map((person, index) => (
              <motion.div
                key={person.name}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="w-full sm:w-[280px]"
              >
                <FlipCard {...person} />
              </motion.div>
            ))}
          </div>

          {/* Level 5: Koordinator */}
          <div className="w-full flex justify-center flex-wrap gap-8 md:gap-32 mb-12 relative z-10">
            {pengurus.slice(6, 8).map((person, index) => (
              <motion.div
                key={person.name}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="w-full sm:w-[280px]"
              >
                <FlipCard {...person} />
              </motion.div>
            ))}
          </div>

          {/* Level 6: PIC Divisi */}
          <div className="w-full flex justify-center flex-wrap gap-4 relative z-10">
            {pengurus.slice(8).map((person, index) => (
              <motion.div
                key={person.name}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (index * 0.1) }}
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
