"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Code2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface FlipCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  techStack: string[];
}

export function FlipCard({ name, role, image, bio, techStack }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-[350px] [perspective:1000px] cursor-pointer group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#0c1322] rounded-2xl overflow-hidden border border-white/10 p-1">
          <div className="w-full h-[240px] relative rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1322] via-black/50 to-transparent" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-brand-400 font-medium text-sm">{role}</p>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#0c1322] rounded-2xl border border-brand-500/30 p-6 flex flex-col items-center justify-center text-center overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Code2 className="w-16 h-16 text-brand-400" />
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
          <p className="text-slate-300 text-sm mb-4">{bio}</p>
          
          <div className="w-full mb-4">
            <p className="text-xs text-slate-300 mb-2 uppercase tracking-wider font-semibold">Tech Stack</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {techStack.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-brand-500/20 text-brand-300 text-xs rounded-md border border-brand-500/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 mt-auto">
            <button className="text-slate-300 hover:text-white transition-colors">
              <FaGithub className="w-5 h-5" />
            </button>
            <button className="text-slate-300 hover:text-[#0a66c2] transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
