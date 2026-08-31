"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Rocket, Users, Target, ShieldCheck, Cpu, Camera, Calendar, ArrowRight, Activity, Zap } from "lucide-react";

const divisions = [
  {
    id: "humas",
    name: "Hubungan Masyarakat",
    shortName: "Humas",
    icon: Users,
    color: "from-emerald-400 to-teal-500",
    glowColor: "bg-emerald-500/20",
    textGlow: "text-emerald-400",
    description: "Menjaga relasi baik dengan pihak eksternal, alumni, dan himpunan dari universitas lain. Wajah HMIF di mata publik.",
    programs: [
      { title: "Company Visit", desc: "Kunjungan ke perusahaan teknologi besar (Startup/Unicorn)." },
      { title: "Alumni Mengajar", desc: "Sesi sharing pengalaman karir dari alumni yang sukses di industri." },
      { title: "Studi Banding", desc: "Pertukaran program kerja dengan himpunan universitas lain." }
    ],
    achievements: ["Kerjasama 5 Tech Company", "Network 500+ Alumni"]
  },
  {
    id: "pdd",
    name: "Publikasi, Dekorasi & Dokumentasi",
    shortName: "PDD",
    icon: Camera,
    color: "from-pink-400 to-rose-500",
    glowColor: "bg-pink-500/20",
    textGlow: "text-pink-400",
    description: "Bertanggung jawab atas visual, branding, dan dokumentasi setiap kegiatan HMIF. Mengelola desain dan media sosial.",
    programs: [
      { title: "Visual Branding", desc: "Pembuatan identitas visual dan konten media sosial HMIF." },
      { title: "Dokumentasi Kegiatan", desc: "Pengambilan foto, video, dan after-movie acara himpunan." },
      { title: "Pelatihan Desain", desc: "Workshop UI/UX dan Graphic Design untuk anggota." }
    ],
    achievements: ["10k+ Followers", "Rebranding HMIF Visuals"]
  },
  {
    id: "keilmuan",
    name: "Keilmuan",
    shortName: "Keilmuan",
    icon: BookOpen,
    color: "from-blue-400 to-indigo-500",
    glowColor: "bg-blue-500/20",
    textGlow: "text-blue-400",
    description: "Fokus pada peningkatan akademik dan keahlian teknis (hard skills) mahasiswa Informatika.",
    programs: [
      { title: "Study Group", desc: "Kelompok belajar rutin untuk mata kuliah inti seperti Struktur Data." },
      { title: "Pelatihan Sertifikasi", desc: "Workshop persiapan sertifikasi internasional." },
      { title: "Informatika Berkarya", desc: "Ruang untuk mengenal berbagai kegiatan, karya, dan kontribusi mahasiswa Informatika." }
    ],
    achievements: ["95% Lulus Sertifikasi", "50+ Modul Belajar"]
  },
  {
    id: "riset_teknologi",
    name: "Riset & Teknologi",
    shortName: "Riset & Tech",
    icon: Rocket,
    color: "from-violet-400 to-purple-500",
    glowColor: "bg-violet-500/20",
    textGlow: "text-violet-400",
    description: "Mewadahi minat mahasiswa dalam penelitian teknologi terbaru seperti Web Dev, AI, dan Cybersecurity.",
    programs: [
      { title: "HMIF Dev Portal", desc: "Pengembangan dan pemeliharaan website resmi HMIF." },
      { title: "Hackathon Internal", desc: "Kompetisi ngoding untuk memecahkan masalah kampus." },
      { title: "Tech Research", desc: "Proyek penelitian kolaboratif bersama dosen." }
    ],
    achievements: ["Website HMIF 2.0", "12 Prototype Aplikasi"]
  },
  {
    id: "acara",
    name: "Acara",
    shortName: "Acara",
    icon: Calendar,
    color: "from-orange-400 to-red-500",
    glowColor: "bg-orange-500/20",
    textGlow: "text-orange-400",
    description: "Merancang, mengelola, dan mengeksekusi semua acara besar serta kegiatan internal himpunan.",
    programs: [
      { title: "Makrab HMIF", desc: "Malam keakraban untuk menyambut mahasiswa baru Informatika." },
      { title: "IT Fest", desc: "Festival teknologi tahunan terbesar jurusan Informatika." },
      { title: "Seminar Nasional", desc: "Seminar bertema IT dengan pembicara ternama nasional." }
    ],
    achievements: ["Sukses IT Fest 2025", "1000+ Peserta Seminar"]
  }
];

export default function DivisionsPage() {
  const [activeTab, setActiveTab] = useState(divisions[0].id);
  const activeDiv = divisions.find(d => d.id === activeTab)!;
  const ActiveIcon = activeDiv.icon;

  return (
    <div className="min-h-screen pt-24 pb-24 overflow-hidden relative">
      {/* Background Ambient Glow for active division */}
      <motion.div 
        key={`bg-${activeTab}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10 opacity-30 mix-blend-screen pointer-events-none ${activeDiv.glowColor}`}
      />

      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-brand-400" />
              <span className="text-sm font-medium text-slate-300">Struktur Organisasi</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              Divisi <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500">& Departemen</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-300 leading-relaxed"
            >
              Urat nadi pergerakan HMIF. Temukan peran, inovasi, dan program kerja cemerlang dari setiap divisi yang ada di himpunan kami.
            </motion.p>
          </div>
        </div>

        {/* Main Interactive Layout (Split View) */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 relative">
          
          {/* Left Sidebar Menu */}
          <div className="lg:col-span-4 flex lg:flex-col flex-row gap-3 overflow-x-auto pb-4 lg:pb-0 relative z-10 snap-x hide-scrollbar">
            {divisions.map((div, idx) => {
              const isActive = activeTab === div.id;
              const Icon = div.icon;
              
              return (
                <motion.button
                  key={div.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveTab(div.id)}
                  className={`group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left overflow-hidden shrink-0 w-[240px] lg:w-auto snap-center ${
                    isActive 
                      ? `bg-white/10 border-white/20 shadow-lg` 
                      : `hover:bg-white/5 border border-transparent`
                  }`}
                >
                  {/* Active Gradient Border/Background */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-sidebar"
                      className={`absolute inset-0 border-2 rounded-2xl bg-gradient-to-r ${div.color} opacity-10`}
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="active-sidebar-border"
                      className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${div.color} rounded-l-2xl`}
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <div className={`p-3 rounded-xl transition-colors duration-300 relative z-10 ${
                    isActive ? 'bg-black/20' : 'bg-white/5 group-hover:bg-white/10'
                  }`}>
                    <Icon className={`w-6 h-6 transition-colors duration-300 ${
                      isActive ? div.textGlow : 'text-slate-300 group-hover:text-slate-300'
                    }`} />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className={`text-lg font-bold transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-slate-300 group-hover:text-slate-300'
                    }`}>
                      {div.shortName}
                    </h3>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Content Area (Bento-style details) */}
          <div className="lg:col-span-8 relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full"
              >
                {/* Huge Title Card */}
                <div className={`md:col-span-2 rounded-3xl p-8 relative overflow-hidden border border-white/10 ${activeDiv.glowColor}`}>
                  <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
                    <ActiveIcon className="w-48 h-48" />
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-lg leading-tight">
                      {activeDiv.name}
                    </h2>
                    <p className="text-lg text-slate-300 max-w-xl leading-relaxed font-medium">
                      {activeDiv.description}
                    </p>
                  </div>
                </div>

                {/* Info Card */}
                <div className="md:col-span-2 rounded-3xl p-8 glass border border-white/10 flex flex-col justify-center items-center text-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className={`w-6 h-6 ${activeDiv.textGlow}`} />
                    <h3 className="text-xl font-bold text-white">Status</h3>
                  </div>
                  <div className="flex items-end justify-center gap-2">
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
                      {activeDiv.programs.length}
                    </span>
                    <span className="text-slate-300 mb-1 font-medium">Program Aktif</span>
                  </div>
                </div>

                {/* Programs Bento (Spans full width) */}
                <div className="md:col-span-2 rounded-3xl p-8 glass border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Cpu className={`w-6 h-6 ${activeDiv.textGlow}`} /> Program Kerja
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {activeDiv.programs.map((prog, i) => (
                      <div 
                        key={i} 
                        className="bg-black/20 hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 rounded-2xl p-5 group cursor-default"
                      >
                        <h4 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors flex justify-between items-start">
                          {prog.title}
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {prog.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
