"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [step, setStep] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [valError, setValError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ 
    nama: "", 
    umur: "", 
    asalSekolah: "",
    nim: "",
    alasanMasuk: "",
    harapan: "",
    nomorTelepon: "",
    cabangKampus: ""
  });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when step changes or modal opens
  useEffect(() => {
    if (isOpen && step < 8) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (!isOpen) {
      // Reset form when closed
      setStep(0);
      setFormData({ nama: "", umur: "", asalSekolah: "", nim: "", alasanMasuk: "", harapan: "", nomorTelepon: "", cabangKampus: "" });
      setInputVal("");
      setSubmitError(null);
      setValError(null);
      setIsSubmitting(false);
    }
  }, [isOpen, step]);

  // Scroll to bottom when step changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step, isSubmitting, submitError]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = inputVal.trim();
      
      if (val === "") {
        setValError("Error: Input tidak boleh kosong.");
        return;
      }
      
      let currentData = { ...formData };
      
      if (step === 0) {
        if (!/^[a-zA-Z\s]+$/.test(val)) {
          setValError("Error: Nama hanya boleh berisi huruf dan spasi.");
          return;
        }
        currentData.nama = val;
      }
      if (step === 1) {
        if (!/^\d+$/.test(val) || parseInt(val) <= 0 || parseInt(val) > 100) {
          setValError("Error: Umur harus berupa angka valid (contoh: 19).");
          return;
        }
        currentData.umur = val;
      }
      if (step === 2) currentData.asalSekolah = val;
      if (step === 3) {
        if (!/^[a-zA-Z0-9]+$/.test(val) || val.length < 5) {
          setValError("Error: NIM harus valid (minimal 5 karakter huruf/angka).");
          return;
        }
        currentData.nim = val;
      }
      if (step === 4) currentData.alasanMasuk = val;
      if (step === 5) currentData.harapan = val;
      if (step === 6) {
        if (!/^[0-9+\s\-]+$/.test(val) || val.length < 9) {
          setValError("Error: Nomor telepon harus valid (contoh: 08123456789).");
          return;
        }
        currentData.nomorTelepon = val;
      }
      if (step === 7) {
        if (val === "1" || val.toLowerCase().includes("margonda")) {
          currentData.cabangKampus = "UNM Margonda";
        } else if (val === "2" || val.toLowerCase().includes("jatiwaringin")) {
          currentData.cabangKampus = "UNM Jatiwaringin";
        } else if (val === "3" || val.toLowerCase().includes("rawamangun")) {
          currentData.cabangKampus = "UNM Rawamangun";
        } else {
          setValError("Error: Pilihan tidak valid. Ketik 1, 2, atau 3.");
          return;
        }
      }

      setValError(null);
      setFormData(currentData);
      setInputVal("");
      
      if (step === 7) {
        // Last step answered, now submit to DB!
        setStep(8);
        setIsSubmitting(true);
        setSubmitError(null);

        try {
          const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentData),
          });

          const data = await res.json();
          setIsSubmitting(false);

          if (!res.ok) {
            setSubmitError(data.error || "Gagal menyimpan data ke server.");
            setStep(9); // Error state
          } else {
            setStep(10); // Success state
          }
        } catch (err) {
          setIsSubmitting(false);
          setSubmitError("Gagal menghubungi server. Periksa koneksi.");
          setStep(9);
        }
      } else {
        setStep(prev => prev + 1);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0c0c0c] border border-[#222] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-[#222]">
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2 text-[#888] text-xs font-medium">
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>bash — hmif_registration — 80x24</span>
              </div>
              <div className="w-10" />
            </div>

            {/* Terminal Body */}
            <div 
              className="p-6 text-sm text-green-400 h-[450px] overflow-y-auto"
              onClick={() => step < 8 && inputRef.current?.focus()}
            >
              <div className="mb-4 text-slate-300">
                <p>Welcome to HMIF Core System (v2.0.26).</p>
                <p>Type your responses and press [ENTER] to continue.</p>
                <p className="mt-2 text-yellow-400">WARNING: Database connection established.</p>
              </div>

              <div className="space-y-3">
                {/* Init */}
                <div>
                  <span className="text-blue-400">guest@hmif</span>:<span className="text-brand-400">~</span>$ ./register.sh
                  <br />
                  <span className="text-slate-300">Initializing Open Recruitment sequence...</span>
                  <br />
                  <span className="text-green-400">Status: OK</span>
                </div>

                {/* Prompts map */}
                {[
                  { label: "Masukkan Nama Lengkap:", field: "nama" },
                  { label: "Masukkan Umur (Angka):", field: "umur" },
                  { label: "Asal Sekolah / Universitas:", field: "asalSekolah" },
                  { label: "Masukkan NIM:", field: "nim" },
                  { label: "Alasan Masuk HMIF:", field: "alasanMasuk" },
                  { label: "Harapan bila diterima di HMIF:", field: "harapan" },
                  { label: "Nomor Telepon / WA:", field: "nomorTelepon" },
                  { label: "Pilih Cabang Kampus [1] Margonda [2] Jatiwaringin [3] Rawamangun:", field: "cabangKampus" },
                ].map((q, idx) => (
                  step >= idx && (
                    <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex flex-wrap items-center">
                        <span className="text-purple-400">hmif</span> <span className="text-slate-300 ml-1">{q.label}</span> 
                        {step > idx && <span className="text-white ml-2">{(formData as any)[q.field]}</span>}
                        {step === idx && (
                          <input
                            ref={inputRef}
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-white ml-2 flex-1 min-w-[150px] focus:ring-0 p-0"
                            autoComplete="off"
                            spellCheck="false"
                          />
                        )}
                      </div>
                      {step === idx && valError && (
                        <div className="text-red-400 mt-1 pl-6">
                          {valError}
                        </div>
                      )}
                    </motion.div>
                  )
                ))}

                {/* Submitting state */}
                {isSubmitting && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-yellow-400">
                    <p>Compiling data...</p>
                    <p>Executing INSERT query into hmif_db.registration...</p>
                    <p className="animate-pulse">Awaiting server response...</p>
                  </motion.div>
                )}

                {/* Error State */}
                {step === 9 && submitError && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 border border-red-500/30 bg-red-500/10 p-4 rounded-lg">
                    <p className="text-red-400 font-bold mb-2">ERROR: TRANSACTION FAILED</p>
                    <p className="text-slate-300">{submitError}</p>
                    <button 
                      onClick={() => { setStep(0); setFormData({ nama: "", umur: "", asalSekolah: "", nim: "", alasanMasuk: "", harapan: "", nomorTelepon: "", cabangKampus: "" }); setSubmitError(null); }}
                      className="mt-4 px-4 py-1.5 bg-red-500/20 text-red-400 font-bold text-sm hover:bg-red-500/40 transition-colors rounded border border-red-500/50"
                    >
                      Retry ./register.sh
                    </button>
                  </motion.div>
                )}

                {/* Success Message */}
                {step === 10 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="mt-6 border border-green-500/30 bg-green-500/10 p-4 rounded-lg"
                  >
                    <p className="text-green-400 font-bold mb-2">ACCESS GRANTED: RECORD SAVED</p>
                    <p className="text-slate-300">Data successfully appended to PostgreSQL/MySQL database.</p>
                    <p className="text-slate-300 mt-2">Welcome aboard, {formData.nama}!</p>
                    <p className="text-slate-300">Your registration ID has been generated securely.</p>
                    
                    <button 
                      onClick={onClose}
                      className="mt-4 px-4 py-1.5 bg-green-500 text-black font-bold text-sm hover:bg-green-400 transition-colors rounded"
                    >
                      Exit Terminal
                    </button>
                  </motion.div>
                )}
                
                <div ref={terminalEndRef} className="h-4" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
