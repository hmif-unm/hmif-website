"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Cpu, Globe, Terminal } from "lucide-react";
import Link from "next/link";
import { TerminalModal } from "@/components/ui/TerminalModal";

import { SiJavascript, SiReact, SiPhp, SiDocker, SiRuby, SiPython, SiMikrotik, SiCisco } from "react-icons/si";
import { FaAws, FaCloud } from "react-icons/fa";

export default function HomePage() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 px-6">
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
        
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden max-w-7xl mx-auto z-0">
          <motion.div 
            animate={{ y: [0, -20, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-20 left-[5%] p-4 glass rounded-full border border-white/10 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
          >
            <SiJavascript className="w-8 h-8" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
            className="absolute top-[45%] left-[10%] p-4 glass rounded-full border border-white/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            <SiReact className="w-8 h-8" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -25, 0] }} 
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 left-[8%] p-4 glass rounded-full border border-white/10 text-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.2)]"
          >
            <SiPhp className="w-8 h-8" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -20, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.8 }}
            className="absolute top-24 right-[5%] p-4 glass rounded-full border border-white/10 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <SiPython className="w-8 h-8" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-[50%] right-[10%] p-4 glass rounded-full border border-white/10 text-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.2)]"
          >
            <SiDocker className="w-8 h-8" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -25, 0] }} 
            transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.2 }}
            className="absolute bottom-24 right-[12%] p-4 glass rounded-full border border-white/10 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          >
            <SiRuby className="w-8 h-8" />
          </motion.div>
          
          {/* New Network & Cloud Icons */}
          <motion.div 
            animate={{ y: [0, -18, 0] }} 
            transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.3 }}
            className="absolute top-[30%] left-[2%] p-4 glass rounded-full border border-white/10 text-slate-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <SiMikrotik className="w-8 h-8" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -22, 0] }} 
            transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 1.2 }}
            className="absolute bottom-[30%] left-[18%] p-4 glass rounded-full border border-white/10 text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <SiCisco className="w-8 h-8" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -16, 0] }} 
            transition={{ repeat: Infinity, duration: 4.1, ease: "easeInOut", delay: 0.7 }}
            className="absolute top-[35%] right-[2%] p-4 glass rounded-full border border-white/10 text-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.2)]"
          >
            <FaAws className="w-8 h-8" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -20, 0] }} 
            transition={{ repeat: Infinity, duration: 3.9, ease: "easeInOut", delay: 1.8 }}
            className="absolute bottom-[35%] right-[18%] p-4 glass rounded-full border border-white/10 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
          >
            <FaCloud className="w-8 h-8" />
          </motion.div>
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span>Sistem Terhubung! Siap digunakan.</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            Himpunan Mahasiswa <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-500">
              Informatika
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Wadah inovasi, riset, dan pengembangan teknologi mahasiswa IT. 
            Membangun masa depan digital baris demi baris.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/projects" 
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              Lihat Karya <ArrowRight className="w-4 h-4" />
            </Link>
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 glass hover:bg-white/5 text-white rounded-xl font-medium transition-colors"
            >
              <Terminal className="w-4 h-4" /> Masuk Terminal
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Bento Box */}
      <section className="container mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Code2 className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-brand-400 font-medium mb-2">Proyek Aktif</div>
              <p className="text-sm text-slate-300">Aplikasi web, mobile, hingga riset AI buatan mahasiswa.</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="text-4xl font-bold text-white mb-2">4</div>
              <div className="text-indigo-400 font-medium mb-2">Divisi Utama</div>
              <p className="text-sm text-slate-300">Pendidikan, R&D, Kominfo, dan Hubungan Masyarakat.</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 border border-white/5 relative overflow-hidden group md:col-span-1 sm:col-span-2"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Globe className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-400 font-medium mb-2">Sistem Publik</div>
              <p className="text-sm text-slate-300">API Terbuka untuk digunakan sebagai bahan belajar.</p>
            </div>
          </motion.div>
        </div>
      </section>



      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </div>
  );
}
