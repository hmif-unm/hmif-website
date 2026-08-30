"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, Lock } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Tentang", href: "/about" },
  { name: "Divisi", href: "/divisions" },
  { name: "Karya", href: "/projects" },
  { name: "Acara", href: "/events" },
  { name: "Blog", href: "/blog" },
  { name: "Pendaftar", href: "/pendaftar", icon: <Lock className="w-3 h-3 inline-block mr-1 mb-0.5" /> },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 transition-all duration-300">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-brand-500/20 p-2 rounded-lg group-hover:bg-brand-500/30 transition-colors">
            <Terminal className="w-5 h-5 text-brand-400" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">HMIF</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-2 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link key={link.href} href={link.href} className="relative px-4 py-2">
                <motion.span 
                  whileTap={{ scale: 0.9 }}
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? "text-brand-400" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.icon && link.icon}
                  {link.name}
                </motion.span>
                
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-brand-500/10 border border-brand-500/20 rounded-lg -z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center justify-center px-4 py-2 text-sm font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded-lg hover:bg-brand-500/20 transition-colors"
          >
            Terminal Mode <span className="ml-2 font-mono text-xs opacity-50">&gt;_</span>
          </motion.button>
          <button className="md:hidden p-2 text-slate-300">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
